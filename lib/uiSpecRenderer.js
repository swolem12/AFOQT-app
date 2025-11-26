/**
 * uiSpecRenderer.js - Safe, whitelist-based SVG renderer for uiSpec diagrams
 * 
 * This module provides a secure way to render geometric diagrams from uiSpec objects.
 * It uses a whitelist approach to validate all inputs and only supports a defined set
 * of element types (lines, rays, points, angleLabels, arcs).
 * 
 * Usage:
 *   import { renderUiSpec } from './lib/uiSpecRenderer.js';
 *   // or in browser: <script src="lib/uiSpecRenderer.js"></script>
 *   
 *   const svg = renderUiSpec(question.uiSpec, containerElement, { theme: 'dark' });
 * 
 * @module uiSpecRenderer
 */

(function(global) {
    'use strict';

    // ========================================================================
    // Constants and Whitelist Configuration
    // ========================================================================

    /** Allowed top-level keys in a uiSpec object */
    const ALLOWED_UISPEC_KEYS = new Set([
        'type', 'width', 'height', 'showGrid', 'lines', 'rays', 'points',
        'angleLabels', 'angleArc', 'arcs', 'styleHints', 'xRange', 'yRange'
    ]);

    /** Allowed keys in a line/ray object */
    const ALLOWED_LINE_KEYS = new Set(['from', 'to', 'label', 'style', 'color']);

    /** Allowed keys in a point object */
    const ALLOWED_POINT_KEYS = new Set(['x', 'y', 'name', 'label', 'style', 'color']);

    /** Allowed keys in an angleLabel object */
    const ALLOWED_ANGLE_LABEL_KEYS = new Set([
        'vertex', 'label', 'highlight', 'position', 'color'
    ]);

    /** Allowed keys in an arc object */
    const ALLOWED_ARC_KEYS = new Set([
        'center', 'radius', 'startAngle', 'endAngle', 'startRay', 'endRay',
        'label', 'measureDegrees', 'style', 'color'
    ]);

    /** Allowed keys in styleHints object */
    const ALLOWED_STYLE_HINT_KEYS = new Set([
        'baseLineColor', 'highlightAngleColor', 'labelsColor', 'labelColor',
        'pointColor', 'gridColor', 'axisColor', 'backgroundColor'
    ]);

    /** Maximum allowed dimension to prevent resource exhaustion */
    const MAX_DIMENSION = 800;
    const MIN_DIMENSION = 50;

    /** Default colors for the retro terminal theme */
    const DEFAULT_COLORS = {
        line: '#00ffff',
        ray: '#00ffff',
        point: '#00ffff',
        label: '#00ffff',
        arc: '#ff3366',
        grid: '#001a1a',
        axis: '#006666',
        background: '#000000',
        highlight: '#ff3366'
    };

    // ========================================================================
    // Validation Functions
    // ========================================================================

    /**
     * Sanitize a string to prevent XSS - only allow safe characters
     * @param {*} value - Value to sanitize
     * @returns {string} Sanitized string
     */
    function sanitizeString(value) {
        if (typeof value !== 'string') {
            value = String(value || '');
        }
        // Only allow alphanumeric, spaces, basic math symbols, and Greek letters
        return value
            .replace(/[<>'"&]/g, '') // Remove HTML-sensitive chars
            .replace(/[^\w\s°∠αβγδεζηθικλμνξοπρστυφχψω\-+=/().,:;!?]/gi, '')
            .substring(0, 100); // Limit length
    }

    /**
     * Validate and clamp a numeric value
     * @param {*} value - Value to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     * @param {number} defaultVal - Default value if invalid
     * @returns {number} Validated number
     */
    function validateNumber(value, min, max, defaultVal) {
        const num = parseFloat(value);
        if (isNaN(num) || !isFinite(num)) return defaultVal;
        return Math.max(min, Math.min(max, num));
    }

    /**
     * Validate a color string (hex format only)
     * @param {*} value - Color value to validate
     * @param {string} defaultColor - Default color if invalid
     * @returns {string} Valid hex color
     */
    function validateColor(value, defaultColor) {
        if (typeof value !== 'string') return defaultColor;
        // Only allow hex colors
        const hexMatch = value.match(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/);
        return hexMatch ? value : defaultColor;
    }

    /**
     * Validate a coordinate object {x, y}
     * @param {*} coord - Coordinate object
     * @param {number} maxVal - Maximum coordinate value
     * @returns {{x: number, y: number}|null} Validated coordinate or null
     */
    function validateCoordinate(coord, maxVal) {
        if (!coord || typeof coord !== 'object') return null;
        const x = validateNumber(coord.x, -maxVal, maxVal, null);
        const y = validateNumber(coord.y, -maxVal, maxVal, null);
        if (x === null || y === null) return null;
        return { x, y };
    }

    /**
     * Validate keys in an object against a whitelist
     * @param {Object} obj - Object to validate
     * @param {Set<string>} allowedKeys - Set of allowed keys
     * @returns {Object} Object with only allowed keys
     */
    function filterAllowedKeys(obj, allowedKeys) {
        if (!obj || typeof obj !== 'object') return {};
        const filtered = {};
        for (const key of Object.keys(obj)) {
            if (allowedKeys.has(key)) {
                filtered[key] = obj[key];
            }
        }
        return filtered;
    }

    // ========================================================================
    // SVG Generation Helpers
    // ========================================================================

    /**
     * Create an SVG element with proper namespace
     * @param {string} tagName - SVG element tag name
     * @param {Object} attributes - Attributes to set
     * @returns {SVGElement} Created SVG element
     */
    function createSvgElement(tagName, attributes = {}) {
        const el = document.createElementNS('http://www.w3.org/2000/svg', tagName);
        for (const [key, value] of Object.entries(attributes)) {
            if (value !== null && value !== undefined) {
                el.setAttribute(key, String(value));
            }
        }
        return el;
    }

    /**
     * Calculate angle in degrees from point A to point B
     * @param {{x: number, y: number}} from - Start point
     * @param {{x: number, y: number}} to - End point
     * @returns {number} Angle in degrees
     */
    function calculateAngle(from, to) {
        return Math.atan2(to.y - from.y, to.x - from.x) * (180 / Math.PI);
    }

    /**
     * Calculate distance between two points
     * @param {{x: number, y: number}} p1 - First point
     * @param {{x: number, y: number}} p2 - Second point
     * @returns {number} Distance
     */
    function calculateDistance(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Generate SVG arc path
     * @param {number} cx - Center x
     * @param {number} cy - Center y
     * @param {number} radius - Arc radius
     * @param {number} startAngle - Start angle in degrees
     * @param {number} endAngle - End angle in degrees
     * @returns {string} SVG path d attribute
     */
    function describeArc(cx, cy, radius, startAngle, endAngle) {
        const start = polarToCartesian(cx, cy, radius, endAngle);
        const end = polarToCartesian(cx, cy, radius, startAngle);
        const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;
        
        return [
            'M', start.x, start.y,
            'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
        ].join(' ');
    }

    /**
     * Convert polar coordinates to Cartesian
     * @param {number} cx - Center x
     * @param {number} cy - Center y
     * @param {number} radius - Radius
     * @param {number} angleInDegrees - Angle in degrees
     * @returns {{x: number, y: number}} Cartesian coordinates
     */
    function polarToCartesian(cx, cy, radius, angleInDegrees) {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180;
        return {
            x: cx + (radius * Math.cos(angleInRadians)),
            y: cy + (radius * Math.sin(angleInRadians))
        };
    }

    // ========================================================================
    // Rendering Functions
    // ========================================================================

    /**
     * Render a grid pattern
     * @param {SVGElement} svg - Parent SVG element
     * @param {number} width - Grid width
     * @param {number} height - Grid height
     * @param {string} color - Grid line color
     */
    function renderGrid(svg, width, height, color) {
        const defs = createSvgElement('defs');
        const pattern = createSvgElement('pattern', {
            id: 'uispec-grid-pattern',
            width: '30',
            height: '30',
            patternUnits: 'userSpaceOnUse'
        });
        
        pattern.appendChild(createSvgElement('path', {
            d: 'M 30 0 L 0 0 0 30',
            fill: 'none',
            stroke: color,
            'stroke-width': '0.5'
        }));
        
        defs.appendChild(pattern);
        svg.appendChild(defs);
        
        const rect = createSvgElement('rect', {
            width: width,
            height: height,
            fill: 'url(#uispec-grid-pattern)'
        });
        svg.appendChild(rect);
    }

    /**
     * Render a line segment
     * @param {SVGElement} svg - Parent SVG element
     * @param {{x: number, y: number}} from - Start point
     * @param {{x: number, y: number}} to - End point
     * @param {string} color - Line color
     * @param {string} label - Optional label
     */
    function renderLine(svg, from, to, color, label) {
        const line = createSvgElement('line', {
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y,
            stroke: color,
            'stroke-width': '2',
            'stroke-linecap': 'round'
        });
        svg.appendChild(line);
        
        if (label) {
            const midX = (from.x + to.x) / 2;
            const midY = (from.y + to.y) / 2;
            renderLabel(svg, midX, midY - 10, label, color);
        }
    }

    /**
     * Render a ray (line with arrowhead)
     * @param {SVGElement} svg - Parent SVG element
     * @param {{x: number, y: number}} from - Start point (origin)
     * @param {{x: number, y: number}} to - Direction point
     * @param {string} color - Ray color
     * @param {string} label - Optional label
     */
    function renderRay(svg, from, to, color, label) {
        // Draw the line
        const line = createSvgElement('line', {
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y,
            stroke: color,
            'stroke-width': '2',
            'stroke-linecap': 'round'
        });
        svg.appendChild(line);
        
        // Draw arrowhead at the end
        const angle = calculateAngle(from, to);
        const arrowSize = 8;
        const arrowAngle = 25;
        
        const arrow1 = polarToCartesian(to.x, to.y + 90, arrowSize, angle + 180 - arrowAngle + 90);
        const arrow2 = polarToCartesian(to.x, to.y + 90, arrowSize, angle + 180 + arrowAngle + 90);
        
        const arrowPath = createSvgElement('path', {
            d: `M ${to.x} ${to.y} L ${arrow1.x} ${arrow1.y} M ${to.x} ${to.y} L ${arrow2.x} ${arrow2.y}`,
            stroke: color,
            'stroke-width': '2',
            'stroke-linecap': 'round',
            fill: 'none'
        });
        svg.appendChild(arrowPath);
        
        if (label) {
            const labelX = to.x + 10;
            const labelY = to.y - 10;
            renderLabel(svg, labelX, labelY, label, color);
        }
    }

    /**
     * Render a point
     * @param {SVGElement} svg - Parent SVG element
     * @param {{x: number, y: number}} point - Point coordinates
     * @param {string} color - Point color
     * @param {string} name - Optional point name/label
     */
    function renderPoint(svg, point, color, name) {
        const circle = createSvgElement('circle', {
            cx: point.x,
            cy: point.y,
            r: '4',
            fill: color,
            stroke: color,
            'stroke-width': '1'
        });
        
        // Add glow effect
        circle.style.filter = `drop-shadow(0 0 3px ${color})`;
        svg.appendChild(circle);
        
        if (name) {
            renderLabel(svg, point.x + 8, point.y - 8, name, color);
        }
    }

    /**
     * Render a text label
     * @param {SVGElement} svg - Parent SVG element
     * @param {number} x - X position
     * @param {number} y - Y position
     * @param {string} text - Label text
     * @param {string} color - Text color
     */
    function renderLabel(svg, x, y, text, color) {
        const textEl = createSvgElement('text', {
            x: x,
            y: y,
            fill: color,
            'font-family': 'monospace',
            'font-size': '12',
            'font-weight': 'bold'
        });
        textEl.textContent = sanitizeString(text);
        textEl.style.textShadow = '0 0 3px rgba(0,0,0,0.8)';
        svg.appendChild(textEl);
    }

    /**
     * Render an angle arc
     * @param {SVGElement} svg - Parent SVG element
     * @param {{x: number, y: number}} center - Arc center
     * @param {number} radius - Arc radius
     * @param {number} startAngle - Start angle in degrees
     * @param {number} endAngle - End angle in degrees
     * @param {string} color - Arc color
     * @param {string} label - Optional label
     */
    function renderArc(svg, center, radius, startAngle, endAngle, color, label) {
        const pathD = describeArc(center.x, center.y, radius, startAngle, endAngle);
        
        const path = createSvgElement('path', {
            d: pathD,
            stroke: color,
            'stroke-width': '2',
            fill: 'none'
        });
        svg.appendChild(path);
        
        if (label) {
            // Position label at the midpoint of the arc
            const midAngle = (startAngle + endAngle) / 2;
            const labelPos = polarToCartesian(center.x, center.y, radius + 15, midAngle);
            renderLabel(svg, labelPos.x, labelPos.y, label, color);
        }
    }

    /**
     * Render an angle label at a vertex
     * @param {SVGElement} svg - Parent SVG element
     * @param {{x: number, y: number}} vertex - Vertex position
     * @param {string} label - Angle label text
     * @param {string} color - Label color
     * @param {boolean} highlight - Whether to highlight
     */
    function renderAngleLabel(svg, vertex, label, color, highlight) {
        const textEl = createSvgElement('text', {
            x: vertex.x + 12,
            y: vertex.y - 12,
            fill: highlight ? DEFAULT_COLORS.highlight : color,
            'font-family': 'monospace',
            'font-size': '13',
            'font-weight': 'bold'
        });
        textEl.textContent = sanitizeString(label);
        textEl.style.textShadow = '0 0 4px rgba(0,0,0,0.8)';
        svg.appendChild(textEl);
    }

    // ========================================================================
    // Main Rendering Function
    // ========================================================================

    /**
     * Render a uiSpec object to an SVG element
     * 
     * @param {Object} uiSpec - The uiSpec object describing the diagram
     * @param {HTMLElement} containerEl - Container element to render into
     * @param {Object} opts - Rendering options
     * @param {string} opts.theme - Color theme ('dark' or 'light')
     * @returns {SVGElement|null} The rendered SVG element, or null if invalid
     * 
     * @example
     * const svg = renderUiSpec({
     *   type: 'geometry_angle_diagram',
     *   width: 300,
     *   height: 300,
     *   lines: [
     *     { from: { x: 150, y: 150 }, to: { x: 150, y: 30 }, label: 'Ray AB' },
     *     { from: { x: 150, y: 150 }, to: { x: 260, y: 210 }, label: 'Ray AC' }
     *   ],
     *   angleArc: {
     *     center: { x: 150, y: 150 },
     *     radius: 35,
     *     startRay: 0,
     *     endRay: 1,
     *     label: '∠BAC',
     *     measureDegrees: 60
     *   }
     * }, document.getElementById('diagram-container'));
     */
    function renderUiSpec(uiSpec, containerEl, opts = {}) {
        // Validate inputs
        if (!uiSpec || typeof uiSpec !== 'object') {
            console.warn('uiSpecRenderer: Invalid uiSpec object');
            return null;
        }

        if (!containerEl || !(containerEl instanceof HTMLElement)) {
            console.warn('uiSpecRenderer: Invalid container element');
            return null;
        }

        // Filter to allowed keys only
        const spec = filterAllowedKeys(uiSpec, ALLOWED_UISPEC_KEYS);

        // Validate dimensions
        const width = validateNumber(spec.width, MIN_DIMENSION, MAX_DIMENSION, 300);
        const height = validateNumber(spec.height, MIN_DIMENSION, MAX_DIMENSION, 300);

        // Get style hints
        const styleHints = filterAllowedKeys(spec.styleHints || {}, ALLOWED_STYLE_HINT_KEYS);
        const colors = {
            line: validateColor(styleHints.baseLineColor, DEFAULT_COLORS.line),
            point: validateColor(styleHints.pointColor, DEFAULT_COLORS.point),
            label: validateColor(styleHints.labelColor || styleHints.labelsColor, DEFAULT_COLORS.label),
            arc: validateColor(styleHints.highlightAngleColor, DEFAULT_COLORS.arc),
            grid: validateColor(styleHints.gridColor, DEFAULT_COLORS.grid),
            background: validateColor(styleHints.backgroundColor, DEFAULT_COLORS.background)
        };

        // Create SVG element
        const svg = createSvgElement('svg', {
            width: width,
            height: height,
            viewBox: `0 0 ${width} ${height}`,
            class: 'uispec-diagram'
        });
        svg.style.background = colors.background;
        svg.style.borderRadius = '8px';
        svg.style.border = `2px solid ${colors.line}`;

        // Render grid if requested
        if (spec.showGrid) {
            renderGrid(svg, width, height, colors.grid);
        }

        // Store lines for angle arc calculation
        const lineData = [];

        // Render lines
        if (Array.isArray(spec.lines)) {
            spec.lines.forEach((lineSpec, index) => {
                const line = filterAllowedKeys(lineSpec, ALLOWED_LINE_KEYS);
                const from = validateCoordinate(line.from, MAX_DIMENSION);
                const to = validateCoordinate(line.to, MAX_DIMENSION);
                
                if (from && to) {
                    const color = validateColor(line.color, colors.line);
                    const label = line.label ? sanitizeString(line.label) : null;
                    
                    // Check if this should be a ray (has label containing "Ray")
                    if (label && label.toLowerCase().includes('ray')) {
                        renderRay(svg, from, to, color, label);
                    } else {
                        renderLine(svg, from, to, color, label);
                    }
                    
                    lineData.push({ from, to, index });
                }
            });
        }

        // Render explicit rays
        if (Array.isArray(spec.rays)) {
            spec.rays.forEach(raySpec => {
                const ray = filterAllowedKeys(raySpec, ALLOWED_LINE_KEYS);
                const from = validateCoordinate(ray.from, MAX_DIMENSION);
                const to = validateCoordinate(ray.to, MAX_DIMENSION);
                
                if (from && to) {
                    const color = validateColor(ray.color, colors.line);
                    const label = ray.label ? sanitizeString(ray.label) : null;
                    renderRay(svg, from, to, color, label);
                }
            });
        }

        // Render points
        if (Array.isArray(spec.points)) {
            spec.points.forEach(pointSpec => {
                const point = filterAllowedKeys(pointSpec, ALLOWED_POINT_KEYS);
                const coord = validateCoordinate(point, MAX_DIMENSION);
                
                if (coord) {
                    const color = validateColor(point.color, colors.point);
                    const name = point.name ? sanitizeString(point.name) : null;
                    renderPoint(svg, coord, color, name);
                }
            });
        }

        // Render angle arc
        if (spec.angleArc && typeof spec.angleArc === 'object') {
            const arc = filterAllowedKeys(spec.angleArc, ALLOWED_ARC_KEYS);
            const center = validateCoordinate(arc.center, MAX_DIMENSION);
            const radius = validateNumber(arc.radius, 5, 100, 35);
            
            if (center) {
                let startAngle = 0;
                let endAngle = 90;
                
                // Calculate angles from line references if provided
                if (typeof arc.startRay === 'number' && typeof arc.endRay === 'number') {
                    const startLine = lineData[arc.startRay];
                    const endLine = lineData[arc.endRay];
                    
                    if (startLine && endLine) {
                        startAngle = calculateAngle(startLine.from, startLine.to) + 90;
                        endAngle = calculateAngle(endLine.from, endLine.to) + 90;
                    }
                } else if (typeof arc.startAngle === 'number' && typeof arc.endAngle === 'number') {
                    startAngle = validateNumber(arc.startAngle, -360, 360, 0);
                    endAngle = validateNumber(arc.endAngle, -360, 360, 90);
                }
                
                const arcColor = validateColor(arc.color, colors.arc);
                let arcLabel = arc.label ? sanitizeString(arc.label) : null;
                
                // Add degree measure to label if provided
                if (arc.measureDegrees && arcLabel) {
                    const degrees = validateNumber(arc.measureDegrees, 0, 360, null);
                    if (degrees !== null) {
                        arcLabel = `${arcLabel} = ${degrees}°`;
                    }
                }
                
                renderArc(svg, center, radius, startAngle, endAngle, arcColor, arcLabel);
            }
        }

        // Render explicit arcs
        if (Array.isArray(spec.arcs)) {
            spec.arcs.forEach(arcSpec => {
                const arc = filterAllowedKeys(arcSpec, ALLOWED_ARC_KEYS);
                const center = validateCoordinate(arc.center, MAX_DIMENSION);
                const radius = validateNumber(arc.radius, 5, 100, 35);
                
                if (center) {
                    const startAngle = validateNumber(arc.startAngle, -360, 360, 0);
                    const endAngle = validateNumber(arc.endAngle, -360, 360, 90);
                    const arcColor = validateColor(arc.color, colors.arc);
                    const label = arc.label ? sanitizeString(arc.label) : null;
                    
                    renderArc(svg, center, radius, startAngle, endAngle, arcColor, label);
                }
            });
        }

        // Render angle labels
        if (Array.isArray(spec.angleLabels)) {
            spec.angleLabels.forEach(labelSpec => {
                const label = filterAllowedKeys(labelSpec, ALLOWED_ANGLE_LABEL_KEYS);
                const vertexName = sanitizeString(label.vertex || '');
                const labelText = sanitizeString(label.label || '');
                const highlight = Boolean(label.highlight);
                
                // Find the corresponding point for the vertex
                if (Array.isArray(spec.points)) {
                    const vertexPoint = spec.points.find(p => 
                        sanitizeString(p.name || '') === vertexName
                    );
                    if (vertexPoint) {
                        const coord = validateCoordinate(vertexPoint, MAX_DIMENSION);
                        if (coord) {
                            renderAngleLabel(svg, coord, labelText, colors.label, highlight);
                        }
                    }
                }
            });
        }

        // Clear container and append SVG
        containerEl.innerHTML = '';
        containerEl.appendChild(svg);

        return svg;
    }

    // ========================================================================
    // Exports
    // ========================================================================

    // Export for module systems
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { renderUiSpec };
    }

    // Export to global scope for browser usage
    global.renderUiSpec = renderUiSpec;
    global.uiSpecRenderer = { renderUiSpec };

})(typeof window !== 'undefined' ? window : global);
