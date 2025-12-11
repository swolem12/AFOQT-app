// ============================================================================
// AFOQT Study Console - Main Application
// Offline single-page app with localStorage persistence
// ============================================================================

console.log('app.js loading - v86');

// ============================================================================
// Anime.js v4 Enhanced Animation System
// Using anime.animate(), anime.stagger(), anime.createTimeline()
// ============================================================================

// Helper to check if anime.js is available
function hasAnime() {
    return typeof anime !== 'undefined' && typeof anime.animate === 'function';
}

// ============================================================================
// Anime.js Enhanced Particle Effects
// ============================================================================
function createParticles(x, y, color, count = 20) {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(container);
    
    const particles = [];
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
        `;
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Use anime.js v4 for smooth particle animation
    if (hasAnime()) {
        anime.animate(particles, {
            translateX: () => (Math.random() - 0.5) * 300,
            translateY: () => (Math.random() - 0.5) * 300,
            scale: [1, 0],
            opacity: [1, 0],
            duration: 1000,
            ease: 'outExpo',
            delay: anime.stagger(20),
            onComplete: () => container.remove()
        });
    } else {
        // Fallback to CSS animation if anime.js not loaded
        particles.forEach((particle, i) => {
            const angle = (Math.PI * 2 * i) / count;
            const velocity = 100 + Math.random() * 100;
            particle.style.setProperty('--vx', `${Math.cos(angle) * velocity}px`);
            particle.style.setProperty('--vy', `${Math.sin(angle) * velocity}px`);
            particle.style.animation = 'particleFloat 1s ease-out forwards';
        });
        setTimeout(() => container.remove(), 1000);
    }
}

// ============================================================================
// Enhanced Celebration Effect (Level Up, Perfect Score)
// ============================================================================
function createCelebration(type = 'levelup') {
    if (!hasAnime()) return;
    
    const colors = type === 'levelup' 
        ? ['#FFD700', '#FFA500', '#FF6347', '#00FF00', '#00FFFF']
        : ['#00FFFF', '#00FF00', '#FFFFFF'];
    
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(container);
    
    // Create multiple particle bursts
    for (let burst = 0; burst < 3; burst++) {
        setTimeout(() => {
            const burstX = Math.random() * window.innerWidth;
            const burstY = Math.random() * window.innerHeight * 0.5;
            
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                const color = colors[Math.floor(Math.random() * colors.length)];
                particle.style.cssText = `
                    position: absolute;
                    left: ${burstX}px;
                    top: ${burstY}px;
                    width: ${4 + Math.random() * 4}px;
                    height: ${4 + Math.random() * 4}px;
                    background: ${color};
                    border-radius: 50%;
                    box-shadow: 0 0 10px ${color};
                `;
                container.appendChild(particle);
                
                anime.animate(particle, {
                    translateX: (Math.random() - 0.5) * 400,
                    translateY: [0, (Math.random() - 0.3) * 400],
                    scale: [1, 0],
                    opacity: [1, 0],
                    duration: 1500 + Math.random() * 500,
                    ease: 'outQuart',
                    delay: Math.random() * 200
                });
            }
        }, burst * 300);
    }
    
    setTimeout(() => container.remove(), 3000);
}

// ============================================================================
// Ripple Effect for Buttons (anime.js v4)
// ============================================================================
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple-effect';
    ripple.style.cssText = `
        position: absolute;
        left: ${x}px;
        top: ${y}px;
        width: 0;
        height: 0;
        background: var(--color-primary-glow, rgba(0, 255, 255, 0.4));
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    `;
    
    // Ensure button has position relative for ripple positioning
    const originalPosition = button.style.position;
    if (!button.style.position || button.style.position === 'static') {
        button.style.position = 'relative';
    }
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    if (hasAnime()) {
        const size = Math.max(rect.width, rect.height) * 2.5;
        anime.animate(ripple, {
            width: [0, size],
            height: [0, size],
            opacity: [0.6, 0],
            duration: 600,
            ease: 'outExpo',
            onComplete: () => {
                ripple.remove();
                if (originalPosition) button.style.position = originalPosition;
            }
        });
    } else {
        ripple.remove();
    }
}

// ============================================================================
// Panel Entrance Animation (anime.js v4)
// ============================================================================
function animatePanelEntrance() {
    if (!hasAnime()) return;
    
    const panels = document.querySelectorAll('.panel, .subject-card, .topic-card, .player-item-login');
    if (panels.length === 0) return;
    
    // Set initial state
    panels.forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(30px)';
    });
    
    anime.animate(panels, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: anime.stagger(80, { start: 100 }),
        ease: 'outQuart'
    });
}

// ============================================================================
// Quiz Option Button Animations (anime.js v4)
// ============================================================================
function animateQuizOptions() {
    if (!hasAnime()) return;
    
    const options = document.querySelectorAll('.option-btn');
    if (options.length === 0) return;
    
    // Set initial state
    options.forEach(opt => {
        opt.style.opacity = '0';
        opt.style.transform = 'translateX(-30px)';
    });
    
    anime.animate(options, {
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: anime.stagger(100, { start: 200 }),
        ease: 'outQuart'
    });
}

// ============================================================================
// Correct/Wrong Answer Feedback Animation (anime.js v4)
// ============================================================================
function animateAnswerFeedback(element, isCorrect) {
    if (!hasAnime() || !element) return;
    
    if (isCorrect) {
        // Pulse and glow for correct
        anime.animate(element, {
            scale: [1, 1.05, 1],
            duration: 400,
            ease: 'outElastic(1, .6)'
        });
    } else {
        // Shake for wrong
        anime.animate(element, {
            translateX: [0, -10, 10, -10, 10, 0],
            duration: 400,
            ease: 'inOutQuad'
        });
    }
}

// ============================================================================
// Score Counter Animation (anime.js v4)
// ============================================================================
function animateScoreChange(element, fromValue, toValue) {
    if (!hasAnime() || !element) return;
    
    const obj = { value: fromValue };
    anime.animate(obj, {
        value: toValue,
        duration: 800,
        ease: 'outQuart',
        round: 1,
        update: () => {
            element.textContent = Math.round(obj.value);
        }
    });
}

// ============================================================================
// Screen Transition Animation (anime.js v4)
// ============================================================================
function animateScreenTransition(callback) {
    if (!hasAnime()) {
        if (callback) callback();
        return;
    }
    
    const root = document.getElementById('app-root');
    if (!root) {
        if (callback) callback();
        return;
    }
    
    anime.animate(root, {
        opacity: [1, 0],
        translateY: [0, -20],
        duration: 150,
        ease: 'inQuad',
        onComplete: () => {
            if (callback) callback();
            anime.animate(root, {
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 300,
                ease: 'outQuart'
            });
        }
    });
}

// ============================================================================
// Stat Bar Fill Animation (anime.js v4)
// ============================================================================
function animateStatBar(element, targetPercent) {
    if (!hasAnime() || !element) return;
    
    anime.animate(element, {
        width: [`0%`, `${targetPercent}%`],
        duration: 1000,
        ease: 'outQuart',
        delay: 200
    });
}

// ============================================================================
// Button Hover Glow Animation (anime.js v4)
// ============================================================================
function initButtonAnimations() {
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, .option-btn, .subject-card, .topic-card').forEach(btn => {
        if (!btn.dataset.rippleInit) {
            btn.addEventListener('click', createRipple);
            btn.dataset.rippleInit = 'true';
        }
    });
}

// ============================================================================
// Boot Screen Logo Animation (anime.js v4 Timeline)
// ============================================================================
function animateBootLogo(logoElement, bootTextElement) {
    if (!hasAnime() || !logoElement) return;
    
    // Create a timeline for the boot sequence
    const timeline = anime.createTimeline({
        ease: 'outExpo'
    });
    
    timeline
        .add(logoElement, {
            opacity: [0, 1],
            scale: [0.8, 1],
            filter: ['blur(10px)', 'blur(0px)'],
            duration: 1000
        })
        .add(logoElement, {
            textShadow: [
                '0 0 10px var(--color-primary)',
                '0 0 30px var(--color-primary), 0 0 50px var(--color-primary)'
            ],
            duration: 500
        }, '-=300');
    
    return timeline;
}

// Add CSS for animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes particleFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--vx), var(--vy)) scale(0);
            opacity: 0;
        }
    }
    
    .btn, .option-btn, .subject-card, .topic-card {
        position: relative;
        overflow: hidden;
        transition: transform 0.2s ease, box-shadow 0.3s ease;
    }
    
    .btn:hover, .option-btn:hover {
        transform: translateY(-2px);
        box-shadow: 
            0 0 15px var(--color-primary-glow, rgba(0, 255, 255, 0.4)),
            0 0 30px var(--color-primary-dim, rgba(0, 255, 255, 0.2));
    }
    
    .btn:active, .option-btn:active {
        transform: translateY(0);
    }
    
    /* Enhanced card hover effects */
    .subject-card:hover, .topic-card:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 
            0 0 20px var(--color-primary-glow, rgba(0, 255, 255, 0.5)),
            0 0 40px var(--color-primary-dim, rgba(0, 255, 255, 0.3)),
            0 10px 30px rgba(0, 0, 0, 0.3);
    }
    
    .subject-card:active, .topic-card:active {
        transform: translateY(-2px) scale(1.01);
    }
    
    /* Mode card special effects */
    .mode-card {
        transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }
    
    .mode-card:hover {
        transform: translateY(-6px) scale(1.03);
        border-color: var(--color-primary);
        box-shadow: 
            0 0 25px var(--color-primary-glow, rgba(0, 255, 255, 0.6)),
            0 15px 40px rgba(0, 0, 0, 0.4);
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
    }
    
    /* Glowing neon effect for interactive elements */
    .neon-glow {
        animation: neonPulse 2s ease-in-out infinite alternate;
    }
    
    @keyframes neonPulse {
        from {
            box-shadow: 
                0 0 5px var(--color-primary-glow),
                0 0 10px var(--color-primary-dim);
        }
        to {
            box-shadow: 
                0 0 10px var(--color-primary-glow),
                0 0 20px var(--color-primary-dim),
                0 0 30px var(--color-primary-dim);
        }
    }
    
    /* Floating animation for decorative elements */
    .float-animation {
        animation: floatUpDown 3s ease-in-out infinite;
    }
    
    @keyframes floatUpDown {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
    
    /* Correct answer glow effect */
    .option-btn.correct {
        animation: correctPulse 0.5s ease-out;
    }
    
    @keyframes correctPulse {
        0% { box-shadow: 0 0 0 rgba(0, 255, 0, 0); }
        50% { box-shadow: 0 0 30px rgba(0, 255, 0, 0.8); }
        100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.4); }
    }
    
    /* Wrong answer shake effect */
    .option-btn.wrong {
        animation: wrongShake 0.4s ease-out;
    }
    
    @keyframes wrongShake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-6px); }
        80% { transform: translateX(6px); }
    }
    
    /* Score increase animation */
    .score-increase {
        animation: scoreUp 0.5s ease-out;
    }
    
    @keyframes scoreUp {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); color: var(--color-success); }
        100% { transform: scale(1); }
    }
    
    /* Panel header typing cursor */
    .panel-header::after {
        content: '_';
        animation: blink 1s step-end infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(animationStyles);

// ============================================================================
// Boot Screen Effect - Enhanced ASCII RPG Style
// ============================================================================
function showBootScreen() {
    // Configuration constants
    const MATRIX_COLUMN_WIDTH = 20;
    const MATRIX_RESET_PROBABILITY = 0.975;
    const FADE_DURATION_MS = 800;
    const AUTO_FINISH_DELAY_MS = 2000;
    const TYPING_INTERVAL_MS = 100;
    
    // Detect mobile device
    const isMobile = window.innerWidth <= 768;
    
    // Simplified logo for mobile devices
    const mobileLogo = `
    ╔════════════════════════════════════╗
    ║     █████  ███████  ██████  ████████     ║
    ║    ██   ██ ██      ██    ██    ██        ║
    ║    ███████ █████   ██    ██    ██        ║
    ║    ██   ██ ██      ██ ▄▄ ██    ██        ║
    ║    ██   ██ ██       ██████     ██        ║
    ║                        ▀▀                 ║
    ║          >>> QUEST <<<                    ║
    ║       [ NEURAL LINK ACTIVE ]              ║
    ╚════════════════════════════════════╝
    `;
    
    const desktopLogo = `
    ╔═══════════════════════════════════════════════════════════════════════╗
    ║                                                                       ║
    ║     ▄▄▄        █████▒ ▒█████    █████   ▄▄▄█████▓                   ║
    ║    ▒████▄    ▓██   ▒ ▒██▒  ██▒▒██▓  ██▒ ▓  ██▒ ▓▒                   ║
    ║    ▒██  ▀█▄  ▒████ ░ ▒██░  ██▒▒██▒  ██░ ▒ ▓██░ ▒░                   ║
    ║    ░██▄▄▄▄██ ░▓█▒  ░ ▒██   ██░░██  █▀ ░ ░ ▓██▓ ░                    ║
    ║     ▓█   ▓██▒░▒█░    ░ ████▓▒░░▒███▒█▄    ▒██▒ ░                    ║
    ║     ▒▒   ▓▒█░ ▒ ░    ░ ▒░▒░▒░ ░░ ▒▒░ ▒    ▒ ░░                      ║
    ║      ▒   ▒▒ ░ ░        ░ ▒ ▒░  ░ ▒░  ░      ░                       ║
    ║      ░   ▒    ░ ░    ░ ░ ░ ▒     ░   ░    ░                         ║
    ║          ░  ░            ░ ░      ░                                  ║
    ║                                                                       ║
    ║              ███████  ██    ██ ███████ ███████ ████████              ║
    ║             ██     ██ ██    ██ ██      ██         ██                 ║
    ║             ██     ██ ██    ██ █████   ███████    ██                 ║
    ║             ██  ▄▄ ██ ██    ██ ██           ██    ██                 ║
    ║              ██████ █  ██████  ███████ ███████    ██                 ║
    ║                 ▀▀                                                    ║
    ║                                                                       ║
    ║               >> R P G   S T U D Y   S Y S T E M <<                  ║
    ║                     [  NEURAL  LINK  ACTIVE  ]                       ║
    ╚═══════════════════════════════════════════════════════════════════════╝
    `;
    
    const asciiLogo = isMobile ? mobileLogo : desktopLogo;
    
    const bootMessages = [
        '',
        '>> SYSTEM INITIALIZATION SEQUENCE...',
        '>> Establishing neural link...',
        '',
        '>> LOADING CORE MODULES:',
        '   ├─ Math Combat Engine................ [✓] READY',
        '   ├─ Verbal Processing Unit............ [✓] READY', 
        '   ├─ Reading Comprehension Matrix...... [✓] READY',
        '   ├─ Science Knowledge Database........ [✓] READY',
        '   └─ Audio Synthesis System............ [✓] READY',
        '',
        '>> INITIALIZING PLAYER SYSTEMS:',
        '   ├─ Character Profile Manager......... [✓] ONLINE',
        '   ├─ Experience Point Calculator....... [✓] ONLINE',
        '   ├─ Progress Tracker.................. [✓] ONLINE',
        '   └─ LocalStorage Persistence.......... [✓] ONLINE',
        '',
        '>> LOADING QUEST DATABASE:',
        '   ├─ Math Topics (27 Quests)........... [✓] LOADED',
        '   ├─ Verbal Challenges................. [✓] LOADED',
        '   ├─ Reading Missions.................. [✓] LOADED',
        '   └─ Science Encounters................ [✓] LOADED',
        '',
        '>> ALL SYSTEMS OPERATIONAL',
        '>> NEURAL LINK ESTABLISHED',
        '',
        '┌─────────────────────────────────────────────────────────────────┐',
        '│  WELCOME TO THE VIRTUAL STUDY REALM                            │',
        '│  Your journey to mastery begins now...                         │',
        '└─────────────────────────────────────────────────────────────────┘',
        '',
        '>> Press any key or wait to continue...'
    ];
    
    const bootScreen = document.createElement('div');
    bootScreen.id = 'boot-screen';
    bootScreen.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        color: #00ffff;
        font-family: 'Courier New', monospace;
        padding: ${isMobile ? '10px' : '20px'};
        z-index: 10000;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: ${isMobile ? 'center' : 'flex-start'};
        align-items: center;
    `;
    
    // Create matrix rain background effect (lighter on mobile for performance)
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: ${isMobile ? '0.08' : '0.15'};
        z-index: 1;
    `;
    bootScreen.appendChild(matrixCanvas);
    
    const bootContent = document.createElement('div');
    bootContent.style.cssText = `
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: ${isMobile ? '100%' : '900px'};
        padding: ${isMobile ? '0 5px' : '0'};
    `;
    bootScreen.appendChild(bootContent);
    
    const logoText = document.createElement('pre');
    logoText.className = 'boot-logo';
    logoText.style.cssText = `
        font-size: ${isMobile ? '7px' : '10px'};
        line-height: 1.2;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
        text-align: center;
        margin-bottom: ${isMobile ? '10px' : '20px'};
        opacity: 0;
        overflow-x: auto;
        transform: scale(0.9);
        filter: blur(5px);
    `;
    logoText.textContent = asciiLogo;
    bootContent.appendChild(logoText);
    
    const bootText = document.createElement('pre');
    bootText.className = 'boot-messages';
    bootText.style.cssText = `
        font-size: ${isMobile ? '9px' : '13px'};
        line-height: 1.6;
        text-shadow: 0 0 5px #00ffff;
        margin-top: ${isMobile ? '10px' : '20px'};
        overflow-x: auto;
    `;
    bootContent.appendChild(bootText);
    
    // Add CSS for fallback and glitch animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes textGlitch {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            75% { transform: translateX(-1px); }
        }
        .boot-line {
            opacity: 0;
            transform: translateX(-20px);
        }
        .boot-line.visible {
            opacity: 1;
            transform: translateX(0);
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bootScreen);
    
    // Use anime.js v4 for logo entrance animation
    if (hasAnime()) {
        anime.animate(logoText, {
            opacity: [0, 1],
            scale: [0.9, 1],
            filter: ['blur(5px)', 'blur(0px)'],
            duration: 1000,
            ease: 'outExpo'
        });
    } else {
        // Fallback CSS animation
        logoText.style.animation = 'logoFadeIn 1s ease-out forwards';
    }
    
    // Matrix rain effect (simplified on mobile)
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const columns = Math.floor(matrixCanvas.width / (isMobile ? MATRIX_COLUMN_WIDTH * 1.5 : MATRIX_COLUMN_WIDTH));
    const drops = Array(columns).fill(1);
    
    // Matrix characters: binary digits + Japanese katakana for cyberpunk aesthetic
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = `${isMobile ? '12px' : '15px'} monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            const colWidth = isMobile ? MATRIX_COLUMN_WIDTH * 1.5 : MATRIX_COLUMN_WIDTH;
            ctx.fillText(text, i * colWidth, drops[i] * colWidth);
            
            if (drops[i] * colWidth > matrixCanvas.height && Math.random() > MATRIX_RESET_PROBABILITY) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, isMobile ? 80 : 50);
    
    // Enable audio on first user interaction (required by browser autoplay policy)
    const enableAudio = createAudioEnabler(() => playSfx('boot'));
    
    // Listen for any user interaction to enable audio
    bootScreen.addEventListener('click', enableAudio, { once: true });
    document.addEventListener('keydown', enableAudio, { once: true });
    
    // Type out boot messages
    let currentLine = 0;
    const typeInterval = setInterval(() => {
        if (currentLine < bootMessages.length) {
            const line = bootMessages[currentLine];
            bootText.textContent += line + '\n';
            
            // Auto-scroll to bottom
            bootScreen.scrollTop = bootScreen.scrollHeight;
            
            currentLine++;
            
            // Play sound effects for certain lines
            if (line.includes('[✓]') || line.includes('READY') || line.includes('ONLINE') || line.includes('LOADED')) {
                playSfx('nav');
            } else if (line.includes('OPERATIONAL') || line.includes('ESTABLISHED')) {
                playSfx('complete');
            }
        } else {
            clearInterval(typeInterval);
            
            // Allow click or key to skip - use anime.js v4 for smooth exit
            const finishBoot = () => {
                clearInterval(matrixInterval);
                
                if (hasAnime()) {
                    // Create a timeline for exit animation
                    const exitTimeline = anime.createTimeline({
                        ease: 'inQuart'
                    });
                    
                    exitTimeline
                        .add(bootContent, {
                            opacity: [1, 0],
                            translateY: [0, -30],
                            duration: 400
                        })
                        .add(bootScreen, {
                            opacity: [1, 0],
                            duration: 400,
                            onComplete: () => {
                                bootScreen.remove();
                                style.remove();
                            }
                        }, '-=200');
                } else {
                    // Fallback to CSS transition
                    bootScreen.style.transition = `opacity ${FADE_DURATION_MS / 1000}s`;
                    bootScreen.style.opacity = '0';
                    setTimeout(() => {
                        bootScreen.remove();
                        style.remove();
                    }, FADE_DURATION_MS);
                }
            };
            
            // Auto-finish after delay or on user interaction
            const autoFinishTimeout = setTimeout(finishBoot, AUTO_FINISH_DELAY_MS);
            
            const userInteract = () => {
                clearTimeout(autoFinishTimeout);
                finishBoot();
                bootScreen.removeEventListener('click', userInteract);
                document.removeEventListener('keydown', userInteract);
            };
            
            bootScreen.addEventListener('click', userInteract);
            document.addEventListener('keydown', userInteract);
        }
    }, TYPING_INTERVAL_MS);
}

// ============================================================================
// Constants
// ============================================================================
const DIFFICULTY_LEVELS = ['beginner', 'advanced', 'expert'];

// ============================================================================
// Global State
// ============================================================================
const state = {
    screen: 'login', // 'login' | 'create-account' | 'home' | 'subject' | 'mode-select' | 'difficulty-select' | 'quiz' | 'results' | 'status' | 'equipment' | 'settings'
    players: [],
    currentPlayer: null,
    currentSubject: null,
    currentTopic: null,
    quizMode: 'practice', // 'practice' | 'test' | 'sprint'
    difficulty: 'beginner', // 'beginner' | 'advanced' | 'expert'
    lastScreenBeforeBoot: 'login', // Save user's last screen for session persistence
    settings: {
        theme: 'default', // 21 themes: default, eva01, eva02, rx0, eva03, purple-gundam, gray-gundam, celestial-pink, blue-terminal, green-terminal, orange-terminal, red-terminal, solo-leveling, nova-kit, hydra-kit, cyberpunk-purple, red-yellow-mech, gray-white-gundam, purple-white-gundam, wb-mecha, yellow-terminal
        panelStyle: 'default', // 14 panel styles: default, blue-mech, cyberpunk01, cyberpunk02, gungale, pink-mech, purple-mech, unicorn, wb-mecha, white-scifi01, white-scifi02, white-scifi03, word-boxes, yellow-mech
        uiLayout: 'default', // 14 UI layouts: default, aida, blue-mech, blue-terminal, celestial-pink, covert-ops, green-terminal, nova-kit, orange-scifi, orange-terminal, pink-mech, purple-mech, yellow-mech, yellow-terminal
        bootAnimation: 'classic', // 5 boot animations: classic, inspiration1, inspiration2, inspiration3, retro-tech
        characterLayout: 'default', // 3 character layouts: default, equipment-loadout, gundam-loadout
        visualEffects: {
            glassmorphism: true,
            neonBorders: true,
            floatingAnimations: true,
            gradientEffects: false,
            premiumButtons: false
        },
        volumes: {
            master: 0.5,
            nav: 0.5,
            correct: 0.5,
            wrong: 0.5,
            levelup: 0.5,
            boot: 0.5,
            modal: 0.5,
            bgMusic: 0.3
        },
        bgMusicEnabled: false
    },
    quiz: {
        questions: [],
        currentIndex: 0,
        score: 0,
        selectedAnswer: null,
        questionStartTime: null,
        questionTimes: [],
        userAnswers: [], // Track user's answer for each question
        timerInterval: null,
        mode: 'practice', // Store mode with quiz session
        difficulty: 'beginner', // Store difficulty with quiz session
        showFeedback: true, // Patch 18: control feedback visibility
        isPracticeTest: false // Patch 18: flag for AFOQT practice tests
    },
    patch18Loaded: false // Track if Patch 18 content is loaded
};

// ============================================================================
// Subjects and Topics Configuration
// ============================================================================
const subjects = [
    {
        id: 'math_knowledge',
        name: 'Math',
        description: 'AFOQT quantitative reasoning'
    },
    {
        id: 'arithmetic_reasoning',
        name: 'Arithmetic Reasoning',
        description: 'AFOQT arithmetic reasoning word problems',
        isAfoqtOfficialSubject: true
    },
    {
        id: 'vocabulary',
        name: 'Vocabulary',
        description: 'Word knowledge and analogies',
        isAfoqtOfficialSubject: true,
        mappedGameSubtopics: ['synonyms', 'antonyms', 'verbal_analogies', 'vocabulary_in_context', 'confusing_word_pairs', 'highfreq_vocab', 'sentence_completion', 'word_roots_affixes']
    },
    {
        id: 'reading_comprehension',
        name: 'Reading Comprehension',
        description: 'AFOQT reading passages and comprehension',
        isAfoqtOfficialSubject: true
    },
    {
        id: 'physical_science',
        name: 'Physical Science',
        description: 'Physics, chemistry, earth & space science'
    },
    {
        id: 'situational',
        name: 'Situational Judgement',
        description: 'Decision-making and leadership'
    },
    {
        id: 'aviation',
        name: 'Aviation Knowledge',
        description: 'Aircraft and flight principles'
    },
    {
        id: 'instrument_comprehension',
        name: 'Instrument Comprehension',
        description: 'AFOQT aircraft attitude and heading from instruments',
        isAfoqtOfficialSubject: true
    },
    {
        id: 'table_reading',
        name: 'Table Reading',
        description: 'AFOQT data extraction and speed reading from tables',
        isAfoqtOfficialSubject: true
    },
    {
        id: 'block_counting',
        name: 'Block Counting',
        description: 'AFOQT spatial block counting',
        isAfoqtOfficialSubject: true
    }
];

// ============================================================================
// Topics with Question Generators - MATH
// ============================================================================
const mathTopics = [
    {
        id: 'evaluate_expressions',
        name: 'Evaluate Expressions (Substitution)',
        description: 'Substitute values and evaluate',
        generateQuestion: () => {
            const x = Math.floor(Math.random() * 10) + 1;
            const y = Math.floor(Math.random() * 10) + 1;
            const z = Math.floor(Math.random() * 5) + 1;
            const expr = `2x + 3y - z`;
            const correct = 2 * x + 3 * y - z;
            const options = [
                correct,
                correct + Math.floor(Math.random() * 3) + 1,
                correct - Math.floor(Math.random() * 3) - 1,
                correct + Math.floor(Math.random() * 5) + 3
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Evaluate ${expr} when x = ${x}, y = ${y}, z = ${z}`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(correct),
                explanation: `Substitute values: 2(${x}) + 3(${y}) - ${z} = ${2*x} + ${3*y} - ${z} = ${correct}`
            };
        }
    },
    {
        id: 'distributive_foil',
        name: 'Distributive & FOIL',
        description: 'Expand expressions',
        generateQuestion: () => {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 5) + 1;
            const c = Math.floor(Math.random() * 5) + 1;
            const correct = a * b + a * c;
            const options = [
                correct,
                a * b + c,
                a * (b * c),
                correct + a
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Expand ${a}(${b} + ${c})`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(correct),
                explanation: `Using distributive property: ${a}(${b} + ${c}) = ${a}×${b} + ${a}×${c} = ${a*b} + ${a*c} = ${correct}`
            };
        }
    },
    {
        id: 'linear_equations',
        name: 'Linear Equations (Solve for x)',
        description: 'Solve basic equations',
        generateQuestion: () => {
            const solution = Math.floor(Math.random() * 15) + 1;
            const a = Math.floor(Math.random() * 5) + 2;
            const b = a * solution;
            const options = [
                solution,
                solution + 1,
                solution - 1,
                solution + 2
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Solve for x: ${a}x = ${b}`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(solution),
                explanation: `Divide both sides by ${a}: x = ${b}/${a} = ${solution}`
            };
        }
    },
    {
        id: 'inequalities',
        name: 'Inequalities (Solve inequalities)',
        description: 'Solve inequality expressions',
        generateQuestion: () => {
            const solution = Math.floor(Math.random() * 10) + 1;
            const a = Math.floor(Math.random() * 3) + 2;
            const b = a * solution;
            const options = [
                `x > ${solution}`,
                `x < ${solution}`,
                `x ≥ ${solution}`,
                `x ≤ ${solution - 1}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Solve: ${a}x > ${b}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`x > ${solution}`),
                explanation: `Divide both sides by ${a}: x > ${b}/${a} = ${solution}`
            };
        }
    },
    {
        id: 'systems_linear',
        name: 'Systems (Solve systems)',
        description: 'Solve system of equations',
        generateQuestion: () => {
            const x = Math.floor(Math.random() * 5) + 1;
            const y = Math.floor(Math.random() * 5) + 1;
            const a1 = 2, b1 = 1, c1 = 2 * x + y;
            const a2 = 1, b2 = 1, c2 = x + y;
            const options = [
                `x = ${x}, y = ${y}`,
                `x = ${y}, y = ${x}`,
                `x = ${x+1}, y = ${y}`,
                `x = ${x}, y = ${y+1}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Solve: 2x + y = ${c1} and x + y = ${c2}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`x = ${x}, y = ${y}`),
                explanation: `Subtract second from first: x = ${x}. Substitute: ${x} + y = ${c2}, so y = ${y}`
            };
        }
    },
    {
        id: 'factoring',
        name: 'Factoring (Factor quadratics)',
        description: 'Factor quadratic expressions',
        generateQuestion: () => {
            const p = Math.floor(Math.random() * 4) + 2;
            const q = Math.floor(Math.random() * 4) + 1;
            const b = p + q;
            const c = p * q;
            const options = [
                `(x + ${p})(x + ${q})`,
                `(x + ${b})(x + ${c})`,
                `(x + ${p-1})(x + ${q+1})`,
                `(x - ${p})(x - ${q})`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Factor: x² + ${b}x + ${c}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`(x + ${p})(x + ${q})`),
                explanation: `Find two numbers that multiply to ${c} and add to ${b}: ${p} and ${q}. Answer: (x + ${p})(x + ${q})`
            };
        }
    },
    {
        id: 'quadratic_equations',
        name: 'Quadratic Equations (Solve quadratics)',
        description: 'Solve quadratic equations',
        generateQuestion: () => {
            const r1 = Math.floor(Math.random() * 5) + 1;
            const r2 = -(Math.floor(Math.random() * 5) + 1);
            const b = -(r1 + r2);
            const c = r1 * r2;
            const options = [
                `x = ${r1} or x = ${r2}`,
                `x = ${r2} only`,
                `x = ${r1} only`,
                `x = ${-r1} or x = ${-r2}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Solve: x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`x = ${r1} or x = ${r2}`),
                explanation: `Factor: (x - ${r1})(x - ${r2}) = 0. Solutions: x = ${r1} or x = ${r2}`
            };
        }
    },
    {
        id: 'exponents_roots',
        name: 'Exponents (Laws of exponents)',
        description: 'Apply exponent rules',
        generateQuestion: () => {
            const base = Math.floor(Math.random() * 3) + 2;
            const exp1 = Math.floor(Math.random() * 3) + 2;
            const exp2 = Math.floor(Math.random() * 3) + 1;
            const correct = exp1 + exp2;
            const options = [
                `${base}^${correct}`,
                `${base}^${exp1 * exp2}`,
                `${base}^${exp1 - exp2}`,
                `${base * 2}^${exp1}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Simplify: ${base}^${exp1} × ${base}^${exp2}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`${base}^${correct}`),
                explanation: `When multiplying same bases, add exponents: ${base}^${exp1} × ${base}^${exp2} = ${base}^${exp1}+${exp2} = ${base}^${correct}`
            };
        }
    },
    {
        id: 'radicals',
        name: 'Radicals (Simplify radicals)',
        description: 'Simplify square roots',
        generateQuestion: () => {
            const perfect = [4, 9, 16, 25, 36, 49];
            const p = perfect[Math.floor(Math.random() * perfect.length)];
            const mult = Math.floor(Math.random() * 3) + 2;
            const under = p * mult;
            const correct = `${Math.sqrt(p)}√${mult}`;
            const options = [
                correct,
                `√${under}`,
                `${Math.sqrt(p) + 1}√${mult}`,
                `${Math.sqrt(p)}√${mult + 1}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Simplify: √${under}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(correct),
                explanation: `√${under} = √${p}×${mult} = √${p} × √${mult} = ${Math.sqrt(p)}√${mult}`
            };
        }
    },
    {
        id: 'scientific-notation',
        name: 'Scientific Notation (Sci ↔ Standard)',
        description: 'Convert between notations',
        generateQuestion: () => {
            const coef = (Math.random() * 9 + 1).toFixed(1);
            const exp = Math.floor(Math.random() * 5) + 3;
            const standard = parseFloat(coef) * Math.pow(10, exp);
            const options = [
                standard.toString(),
                (standard * 10).toString(),
                (standard / 10).toString(),
                (standard + 1000).toString()
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Convert to standard form: ${coef} × 10^${exp}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(standard.toString()),
                explanation: `Move decimal ${exp} places right: ${coef} × 10^${exp} = ${standard}`
            };
        }
    },
    {
        id: 'absolute_value',
        name: 'Absolute Value (Solve |x − a| = b)',
        description: 'Solve absolute value equations',
        generateQuestion: () => {
            const a = Math.floor(Math.random() * 10) + 1;
            const b = Math.floor(Math.random() * 5) + 2;
            const sol1 = a + b;
            const sol2 = a - b;
            const options = [
                `x = ${sol1} or x = ${sol2}`,
                `x = ${sol1} only`,
                `x = ${-sol1} or x = ${-sol2}`,
                `x = ${a} or x = ${b}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Solve: |x - ${a}| = ${b}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`x = ${sol1} or x = ${sol2}`),
                explanation: `|x - ${a}| = ${b} means x - ${a} = ${b} or x - ${a} = -${b}. Solutions: x = ${sol1} or x = ${sol2}`
            };
        }
    },
    {
        id: 'rational_expressions',
        name: 'Rational Expressions (Simplify fractions)',
        description: 'Simplify algebraic fractions',
        generateQuestion: () => {
            const n = Math.floor(Math.random() * 5) + 2;
            const factor = Math.floor(Math.random() * 3) + 2;
            const num = n * factor;
            const den = factor;
            const options = [
                `${n}`,
                `${num}/${den}`,
                `${n + 1}`,
                `${num}/${den + 1}`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Simplify: ${num}x/${den}x`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`${n}`),
                explanation: `Cancel common factor x: ${num}x/${den}x = ${num}/${den} = ${n}`
            };
        }
    },
    {
        id: 'functions',
        name: 'Functions (Evaluate f(x))',
        description: 'Evaluate function values',
        generateQuestion: () => {
            const a = Math.floor(Math.random() * 5) + 2;
            const b = Math.floor(Math.random() * 10) + 1;
            const x = Math.floor(Math.random() * 5) + 1;
            const correct = a * x + b;
            const options = [
                correct,
                a * x - b,
                correct + 1,
                correct - 1
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `If f(x) = ${a}x + ${b}, find f(${x})`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(correct),
                explanation: `Substitute x = ${x}: f(${x}) = ${a}(${x}) + ${b} = ${a*x} + ${b} = ${correct}`
            };
        }
    },
    {
        id: 'angles',
        name: 'Angles (Complementary/Supplementary)',
        description: 'Find angle relationships',
        generateQuestion: () => {
            const angle = Math.floor(Math.random() * 60) + 20;
            const complement = 90 - angle;
            const options = [
                `${complement}°`,
                `${180 - angle}°`,
                `${90 + angle}°`,
                `${complement + 5}°`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Find the complement of ${angle}°`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`${complement}°`),
                explanation: `Complementary angles sum to 90°: 90° - ${angle}° = ${complement}°`
            };
        }
    },
    {
        id: 'triangles',
        name: 'Triangles (Angle sum)',
        description: 'Find missing angles in triangles',
        generateQuestion: () => {
            const a1 = Math.floor(Math.random() * 60) + 30;
            const a2 = Math.floor(Math.random() * 60) + 30;
            const a3 = 180 - a1 - a2;
            const options = [
                `${a3}°`,
                `${a3 + 5}°`,
                `${a3 - 5}°`,
                `${180 - a1}°`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `In a triangle with angles ${a1}° and ${a2}°, find the third angle`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`${a3}°`),
                explanation: `Triangle angles sum to 180°: 180° - ${a1}° - ${a2}° = ${a3}°`
            };
        }
    },
    {
        id: 'quadrilaterals',
        name: 'Quadrilaterals (Angle sum)',
        description: 'Find angles in quadrilaterals',
        generateQuestion: () => {
            const a1 = 90;
            const a2 = 90;
            const a3 = Math.floor(Math.random() * 60) + 60;
            const a4 = 360 - a1 - a2 - a3;
            const options = [
                `${a4}°`,
                `${a4 + 10}°`,
                `${a4 - 10}°`,
                `${180 - a3}°`
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `In a quadrilateral with angles 90°, 90°, and ${a3}°, find the fourth angle`,
                options: shuffled,
                correctIndex: shuffled.indexOf(`${a4}°`),
                explanation: `Quadrilateral angles sum to 360°: 360° - 90° - 90° - ${a3}° = ${a4}°`
            };
        }
    },
    {
        id: 'circles',
        name: 'Circles (Area & circumference)',
        description: 'Calculate circle measurements',
        generateQuestion: () => {
            const r = Math.floor(Math.random() * 8) + 2;
            const area = Math.PI * r * r;
            const correct = area.toFixed(1);
            const options = [
                correct,
                (2 * Math.PI * r).toFixed(1),
                (Math.PI * r).toFixed(1),
                (area + 5).toFixed(1)
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Find the area of a circle with radius ${r} (use π ≈ 3.14)`,
                options: shuffled,
                correctIndex: shuffled.indexOf(correct),
                explanation: `Area = πr² = π(${r})² = ${r*r}π ≈ ${correct}`
            };
        }
    },
    {
        id: 'area-volume',
        name: 'Area/Volume (2D + 3D)',
        description: 'Calculate areas and volumes',
        generateQuestion: () => {
            const l = Math.floor(Math.random() * 8) + 3;
            const w = Math.floor(Math.random() * 6) + 2;
            const h = Math.floor(Math.random() * 5) + 2;
            const volume = l * w * h;
            const options = [
                volume,
                l * w,
                volume + 10,
                volume - 10
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Find the volume of a rectangular prism with length ${l}, width ${w}, height ${h}`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(volume),
                explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${volume}`
            };
        }
    },
    {
        id: 'pythagorean',
        name: 'Pythagorean (Right triangles)',
        description: 'Use Pythagorean theorem',
        generateQuestion: () => {
            const triples = [[3,4,5], [5,12,13], [8,15,17], [7,24,25]];
            const triple = triples[Math.floor(Math.random() * triples.length)];
            const [a, b, c] = triple;
            const options = [
                c,
                c + 1,
                c - 1,
                a + b
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `In a right triangle with legs ${a} and ${b}, find the hypotenuse`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(c),
                explanation: `Using a² + b² = c²: ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a + b*b} = ${c}² → c = ${c}`
            };
        }
    },
    {
        id: 'coordinate_geometry',
        name: 'Coordinate Geometry (Distance, midpoint, slope)',
        description: 'Work with coordinate plane',
        generateQuestion: () => {
            const x1 = Math.floor(Math.random() * 5) + 1;
            const y1 = Math.floor(Math.random() * 5) + 1;
            const x2 = x1 + Math.floor(Math.random() * 5) + 2;
            const y2 = y1 + Math.floor(Math.random() * 5) + 2;
            const slope = (y2 - y1) / (x2 - x1);
            const correct = slope.toFixed(1);
            const options = [
                correct,
                ((y2 - y1) / (x2 - x1) + 0.5).toFixed(1),
                ((x2 - x1) / (y2 - y1)).toFixed(1),
                ((y2 - y1) / (x2 - x1) - 0.5).toFixed(1)
            ];
            const shuffled = shuffleArray([...new Set(options)]);
            return {
                prompt: `Find the slope between points (${x1}, ${y1}) and (${x2}, ${y2})`,
                options: shuffled,
                correctIndex: shuffled.indexOf(correct),
                explanation: `Slope = (y₂ - y₁)/(x₂ - x₁) = (${y2} - ${y1})/(${x2} - ${x1}) = ${y2-y1}/${x2-x1} = ${correct}`
            };
        }
    },
    {
        id: 'parallel-perp',
        name: 'Parallel & Perp (Slopes)',
        description: 'Find parallel/perpendicular slopes',
        generateQuestion: () => {
            const m = Math.floor(Math.random() * 5) + 1;
            const perpSlope = -1 / m;
            const correct = perpSlope.toFixed(2);
            const options = [
                correct,
                m.toFixed(2),
                (-m).toFixed(2),
                (1/m).toFixed(2)
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Find the slope perpendicular to ${m}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(correct),
                explanation: `Perpendicular slope is negative reciprocal: -1/${m} = ${correct}`
            };
        }
    },
    {
        id: 'triangle-similarity',
        name: 'Triangle Similarity (Proportional)',
        description: 'Use similar triangles',
        generateQuestion: () => {
            const a = Math.floor(Math.random() * 5) + 3;
            const b = Math.floor(Math.random() * 5) + 3;
            const scale = Math.floor(Math.random() * 3) + 2;
            const c = a * scale;
            const d = b * scale;
            const options = [
                d,
                d + 1,
                d - 1,
                b + scale
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Two similar triangles have sides ${a} and ${b}. If the first side becomes ${c}, what is the second side?`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(d),
                explanation: `Scale factor = ${c}/${a} = ${scale}. Second side = ${b} × ${scale} = ${d}`
            };
        }
    },
    {
        id: 'number-properties',
        name: 'Number Properties (Associative/commutative/distributive)',
        description: 'Identify number properties',
        generateQuestion: () => {
            const props = [
                { name: 'Commutative', example: 'a + b = b + a' },
                { name: 'Associative', example: '(a + b) + c = a + (b + c)' },
                { name: 'Distributive', example: 'a(b + c) = ab + ac' },
                { name: 'Identity', example: 'a + 0 = a' }
            ];
            const prop = props[Math.floor(Math.random() * props.length)];
            const otherProps = props.filter(p => p.name !== prop.name).map(p => p.name);
            const options = [prop.name, ...otherProps.slice(0, 3)];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Which property is shown: ${prop.example}?`,
                options: shuffled,
                correctIndex: shuffled.indexOf(prop.name),
                explanation: `This is the ${prop.name} property`
            };
        }
    },
    {
        id: 'number-classification',
        name: 'Number Classification (Rational/irrational/integers/etc.)',
        description: 'Classify number types',
        generateQuestion: () => {
            const examples = [
                { num: '√2', type: 'Irrational' },
                { num: '3/4', type: 'Rational' },
                { num: '-5', type: 'Integer' },
                { num: 'π', type: 'Irrational' }
            ];
            const ex = examples[Math.floor(Math.random() * examples.length)];
            const options = ['Rational', 'Irrational', 'Integer', 'Whole'];
            const shuffled = shuffleArray(options);
            return {
                prompt: `Classify ${ex.num}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(ex.type),
                explanation: `${ex.num} is ${ex.type}`
            };
        }
    },
    {
        id: 'trigonometry',
        name: 'Trigonometry (SOH-CAH-TOA)',
        description: 'Basic trigonometric ratios',
        generateQuestion: () => {
            const opp = Math.floor(Math.random() * 8) + 3;
            const adj = Math.floor(Math.random() * 8) + 3;
            const hyp = Math.sqrt(opp * opp + adj * adj).toFixed(1);
            const sinValue = (opp / parseFloat(hyp)).toFixed(2);
            const cosValue = (adj / parseFloat(hyp)).toFixed(2);
            const options = [
                sinValue,
                cosValue,
                (opp / adj).toFixed(2),
                (adj / opp).toFixed(2)
            ];
            const shuffled = shuffleArray([...new Set(options)]);
            return {
                prompt: `In a right triangle with opposite = ${opp} and hypotenuse = ${hyp}, find sin(θ)`,
                options: shuffled,
                correctIndex: shuffled.indexOf(sinValue),
                explanation: `sin(θ) = opposite/hypotenuse = ${opp}/${hyp} = ${sinValue}`
            };
        }
    },
    {
        id: 'sequences',
        name: 'Sequences (Arithmetic/geometric)',
        description: 'Find sequence terms',
        generateQuestion: () => {
            const first = Math.floor(Math.random() * 10) + 2;
            const diff = Math.floor(Math.random() * 5) + 2;
            const n = Math.floor(Math.random() * 5) + 4;
            const term = first + (n - 1) * diff;
            const options = [
                term,
                term + diff,
                term - diff,
                first + n * diff
            ];
            const shuffled = shuffleArray(options);
            return {
                prompt: `In the arithmetic sequence ${first}, ${first+diff}, ${first+2*diff}, ..., find the ${n}th term`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(term),
                explanation: `nth term = first + (n-1)×d = ${first} + ${n-1}×${diff} = ${first} + ${(n-1)*diff} = ${term}`
            };
        }
    },
    {
        id: 'statistics',
        name: 'Statistics (Mean/median/range)',
        description: 'Calculate basic statistics',
        generateQuestion: () => {
            const data = Array.from({length: 5}, () => Math.floor(Math.random() * 20) + 10).sort((a,b) => a-b);
            const mean = (data.reduce((a,b) => a+b, 0) / data.length).toFixed(1);
            const median = data[2];
            const options = [
                mean,
                median.toFixed(1),
                data[0].toFixed(1),
                data[4].toFixed(1)
            ];
            const shuffled = shuffleArray([...new Set(options)]);
            return {
                prompt: `Find the mean of: ${data.join(', ')}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(mean),
                explanation: `Mean = sum/count = ${data.reduce((a,b) => a+b, 0)}/5 = ${mean}`
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - VOCABULARY
// ============================================================================
const vocabularyTopics = [
    {
        id: 'synonyms',
        name: 'Synonyms',
        description: 'Words with similar meanings',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            // Fallback generator - will be replaced by content-based questions from Patch 18
            const words = [
                { word: 'BENEVOLENT', correct: 'Kind', options: ['Angry', 'Confused', 'Wealthy'], definition: 'well-meaning and kindly' },
                { word: 'METICULOUS', correct: 'Careful', options: ['Messy', 'Quick', 'Lazy'], definition: 'showing great attention to detail' }
            ];
            const item = words[Math.floor(Math.random() * words.length)];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `${item.word} most nearly means:`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: `${item.word} means ${item.definition}.`
            };
        }
    },
    {
        id: 'antonyms',
        name: 'Antonyms',
        description: 'Words with opposite meanings',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const words = [
                { word: 'HOT', correct: 'Cold', options: ['Warm', 'Spicy', 'Bright'] },
                { word: 'HAPPY', correct: 'Sad', options: ['Joyful', 'Excited', 'Content'] }
            ];
            const item = words[Math.floor(Math.random() * words.length)];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `Select the word that means the OPPOSITE of ${item.word}:`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: `The opposite of ${item.word} is ${item.correct}.`
            };
        }
    },
    {
        id: 'verbal_analogies',
        name: 'Verbal Analogies',
        description: 'Word relationship patterns',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const analogies = [
                { pair1: ['CAT', 'KITTEN'], pair2: ['DOG', 'PUPPY'], options: ['PUPPY', 'BONE', 'BARK', 'LEASH'], correct: 0, relation: 'adult to young' },
                { pair1: ['HOT', 'COLD'], pair2: ['UP', 'DOWN'], options: ['DOWN', 'CLIMB', 'TALL', 'FALL'], correct: 0, relation: 'opposites' }
            ];
            const analogy = analogies[Math.floor(Math.random() * analogies.length)];
            const shuffled = shuffleArray(analogy.options);
            return {
                prompt: `${analogy.pair1[0]} is to ${analogy.pair1[1]} as ${analogy.pair2[0]} is to _____`,
                options: shuffled,
                correctIndex: shuffled.indexOf(analogy.options[analogy.correct]),
                explanation: `This is a ${analogy.relation} relationship.`
            };
        }
    },
    {
        id: 'vocabulary_in_context',
        name: 'Vocabulary in Context',
        description: 'Word meanings from context',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const examples = [
                { sentence: 'The lawyer\'s argument was very COGENT and convinced the jury.', word: 'COGENT', correct: 'Convincing', options: ['Confusing', 'Weak', 'Lengthy'] }
            ];
            const item = examples[0];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `${item.sentence}\n\nWhat does ${item.word} mean in this context?`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: `In context, ${item.word} means ${item.correct}.`
            };
        }
    },
    {
        id: 'confusing_word_pairs',
        name: 'Confusing Word Pairs',
        description: 'Commonly confused words',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const pairs = [
                { sentence: 'The weather ___ nice today.', correct: 'is', wrong: 'its', explanation: '"is" is a verb, "its" is possessive' }
            ];
            const item = pairs[0];
            const shuffled = shuffleArray([item.correct, item.wrong, 'was', 'are']);
            return {
                prompt: `Choose the correct word: ${item.sentence}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: item.explanation
            };
        }
    },
    {
        id: 'highfreq_vocab',
        name: 'High Frequency Vocabulary',
        description: 'Common AFOQT vocabulary words',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const words = [
                { word: 'ELOQUENT', correct: 'Articulate', options: ['Silent', 'Confused', 'Angry'], definition: 'fluent in speech' }
            ];
            const item = words[0];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `${item.word} most nearly means:`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: `${item.word} means ${item.definition}.`
            };
        }
    },
    {
        id: 'sentence_completion',
        name: 'Sentence Completion',
        description: 'Fill in the blank with best word',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const sentences = [
                { sentence: 'Despite the ___ weather, we enjoyed our picnic.', correct: 'inclement', options: ['pleasant', 'sunny', 'warm'], explanation: 'inclement means harsh or severe weather' }
            ];
            const item = sentences[0];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `Complete the sentence: ${item.sentence}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: item.explanation
            };
        }
    },
    {
        id: 'word_roots_affixes',
        name: 'Word Roots & Affixes',
        description: 'Latin and Greek word origins',
        subjectId: 'vocabulary',
        isOfficialAfoqtTopic: true,
        generateQuestion: (difficulty = 'beginner') => {
            const roots = [
                { root: 'bene', meaning: 'good', example: 'benefit', correct: 'good', options: ['bad', 'water', 'light'] }
            ];
            const item = roots[0];
            const allOptions = [item.correct, ...item.options];
            const shuffled = shuffleArray(allOptions);
            return {
                prompt: `The root "${item.root}" means:`,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.correct),
                explanation: `"${item.root}" means ${item.meaning}, as in ${item.example}.`
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - READING
// ============================================================================
const readingTopics = [
    {
        id: 'reading-comprehension',
        name: 'Reading Comprehension',
        description: 'Analyze passages',
        subjectId: 'reading_comprehension',
        generateQuestion: () => {
            const passages = [
                {
                    text: "The Wright brothers, Orville and Wilbur, achieved the first powered, sustained, and controlled airplane flight on December 17, 1903. Their aircraft, the Wright Flyer, flew for 12 seconds and covered 120 feet during its first flight. This historic achievement marked the beginning of the aviation age.",
                    questions: [
                        { q: "How long did the first flight last?", a: "12 seconds", opts: ["10 seconds", "15 seconds", "20 seconds"] },
                        { q: "What was the name of the aircraft?", a: "Wright Flyer", opts: ["Flying Machine", "Sky Rider", "Air Pioneer"] },
                        { q: "In what year did the first flight occur?", a: "1903", opts: ["1900", "1905", "1910"] }
                    ]
                },
                {
                    text: "Photosynthesis is the process by which plants convert light energy into chemical energy. Using chlorophyll, plants absorb sunlight and combine carbon dioxide from the air with water from the soil to produce glucose and oxygen. This process is essential for life on Earth.",
                    questions: [
                        { q: "What do plants produce through photosynthesis?", a: "Glucose and oxygen", opts: ["Carbon dioxide", "Water only", "Nitrogen"] },
                        { q: "What pigment helps plants absorb sunlight?", a: "Chlorophyll", opts: ["Hemoglobin", "Melanin", "Carotene"] },
                        { q: "What is the main purpose of photosynthesis?", a: "Convert light to chemical energy", opts: ["Create water", "Produce soil", "Generate heat"] }
                    ]
                },
                {
                    text: "The Roman Empire, at its height, controlled much of Europe, North Africa, and the Middle East. Its influence on law, language, architecture, and engineering can still be seen today. Latin, the language of Rome, evolved into the Romance languages including French, Spanish, and Italian.",
                    questions: [
                        { q: "Which modern languages evolved from Latin?", a: "Romance languages", opts: ["Germanic languages", "Slavic languages", "Asian languages"] },
                        { q: "What regions did Rome control?", a: "Europe, Africa, Middle East", opts: ["Only Europe", "Only Africa", "Only Asia"] },
                        { q: "What was Rome's language?", a: "Latin", opts: ["Greek", "Hebrew", "Arabic"] }
                    ]
                }
            ];
            
            const passage = passages[Math.floor(Math.random() * passages.length)];
            const question = passage.questions[Math.floor(Math.random() * passage.questions.length)];
            const allOptions = [question.a, ...question.opts];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: `Passage: "${passage.text}"\n\nQuestion: ${question.q}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(question.a),
                explanation: `The correct answer is "${question.a}" based on the information in the passage.`
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - PHYSICAL SCIENCE
// ============================================================================
const scienceTopics = [
    {
        id: 'chemistry_basics',
        name: 'Chemistry Basics',
        description: 'Atomic structure, periodic table, reactions',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            // Loaded from patch-loader.js physical_science question registry
            return null;
        }
    },
    {
        id: 'earth_space',
        name: 'Earth & Space Science',
        description: 'Geology, atmosphere, solar system',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    },
    {
        id: 'electricity_magnetism',
        name: 'Electricity & Magnetism',
        description: 'Circuits, current, magnetic fields',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    },
    {
        id: 'energy_heat',
        name: 'Energy & Heat',
        description: 'Energy transfer, temperature, thermodynamics',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    },
    {
        id: 'fluids_pressure',
        name: 'Fluids & Pressure',
        description: 'Density, buoyancy, fluid dynamics',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    },
    {
        id: 'motion_mechanics',
        name: 'Motion & Mechanics',
        description: 'Forces, Newton\'s laws, kinematics',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    },
    {
        id: 'optics_waves',
        name: 'Optics & Waves',
        description: 'Light, sound, electromagnetic spectrum',
        subjectId: 'physical_science',
        generateQuestion: (difficulty = 'beginner') => {
            return null;
        }
    }
];

// ============================================================================
// Topics with Question Generators - SITUATIONAL JUDGEMENT
// ============================================================================
const situationalTopics = [
    {
        id: 'situational-judgement',
        name: 'Situational Judgement',
        description: 'Leadership and decision-making scenarios',
        subjectId: 'situational',
        generateQuestion: () => {
            const scenarios = [
                {
                    scenario: "You are leading a team that is falling behind schedule on an important project. One team member suggests cutting corners to meet the deadline.",
                    question: "What is the MOST effective action?",
                    best: "Discuss with the team alternative ways to prioritize tasks without compromising quality",
                    options: [
                        "Accept the suggestion to meet the deadline",
                        "Report the team member to superiors",
                        "Extend the deadline without consulting anyone"
                    ]
                },
                {
                    scenario: "During a briefing, you notice a colleague presenting incorrect information that could affect the mission.",
                    question: "What should you do?",
                    best: "Politely raise the issue privately with your colleague after the briefing",
                    options: [
                        "Interrupt the briefing immediately",
                        "Ignore it and let them finish",
                        "Report them to their supervisor"
                    ]
                },
                {
                    scenario: "A subordinate comes to you with a personal problem that is affecting their work performance.",
                    question: "What is the BEST response?",
                    best: "Listen empathetically and help them identify appropriate resources or support",
                    options: [
                        "Tell them to keep personal issues separate from work",
                        "Try to solve their problem yourself",
                        "Report them to human resources"
                    ]
                },
                {
                    scenario: "You discover that a popular policy you implemented is not working as intended and may need to be reversed.",
                    question: "What should you do?",
                    best: "Acknowledge the issue, gather data, and adjust the policy based on feedback",
                    options: [
                        "Defend the policy regardless of results",
                        "Blame others for poor implementation",
                        "Quietly stop enforcing it without announcement"
                    ]
                },
                {
                    scenario: "Two team members are in conflict, affecting team morale and productivity.",
                    question: "What is the MOST effective approach?",
                    best: "Meet with both parties together to facilitate communication and find common ground",
                    options: [
                        "Ignore it and hope they work it out",
                        "Take sides with the person you know better",
                        "Separate them permanently"
                    ]
                },
                {
                    scenario: "You are assigned a task that you believe is inefficient, but your supervisor insists on a specific approach.",
                    question: "What should you do?",
                    best: "Respectfully present your alternative approach with supporting rationale",
                    options: [
                        "Do it your way without telling them",
                        "Complain to other team members",
                        "Follow orders without question"
                    ]
                }
            ];
            
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            const allOptions = [scenario.best, ...scenario.options];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: `${scenario.scenario}\n\n${scenario.question}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(scenario.best),
                explanation: `The best approach demonstrates leadership, communication, and sound judgment.`
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - AVIATION KNOWLEDGE
// ============================================================================
const aviationTopics = [
    {
        id: 'aviation-knowledge',
        name: 'Aviation Knowledge',
        description: 'Aircraft systems and flight principles',
        subjectId: 'aviation',
        generateQuestion: (difficulty = 'beginner') => {
            // Questions organized by difficulty level
            // NOTE: Per requirements, each difficulty should have 100 questions to cycle through.
            // This is a demonstration with 10+ questions per difficulty.
            // Expanding to 100 questions per difficulty would require significant content creation.
            const questionsByDifficulty = {
                beginner: [
                    { q: "What are the four forces of flight?", a: "Lift, Weight, Thrust, Drag", opts: ["Lift, Gravity, Speed, Wind", "Up, Down, Forward, Backward", "Pitch, Roll, Yaw, Speed"], exp: "The four forces are Lift (up), Weight (down), Thrust (forward), and Drag (backward)" },
                    { q: "What does the rudder control?", a: "Yaw", opts: ["Pitch", "Roll", "Altitude"], exp: "The rudder controls yaw, which is rotation around the vertical axis" },
                    { q: "What does the elevator control?", a: "Pitch", opts: ["Yaw", "Roll", "Speed"], exp: "The elevator controls pitch, which is rotation around the lateral axis" },
                    { q: "What does the aileron control?", a: "Roll", opts: ["Pitch", "Yaw", "Altitude"], exp: "Ailerons control roll, which is rotation around the longitudinal axis" },
                    { q: "What is the purpose of flaps?", a: "Increase lift and drag at lower speeds", opts: ["Increase speed", "Control direction", "Reduce weight"], exp: "Flaps increase wing camber to generate more lift and drag for takeoff and landing" },
                    { q: "What instrument shows rate of climb or descent?", a: "Vertical Speed Indicator", opts: ["Altimeter", "Airspeed Indicator", "Attitude Indicator"], exp: "The VSI (Vertical Speed Indicator) shows rate of climb or descent" },
                    { q: "Which direction does a propeller rotate (viewed from cockpit) in most single-engine aircraft?", a: "Clockwise", opts: ["Counterclockwise", "Either direction", "Depends on altitude"], exp: "Most single-engine aircraft have propellers that rotate clockwise when viewed from the cockpit" },
                    { q: "What is the altimeter used for?", a: "Measuring altitude", opts: ["Measuring speed", "Measuring direction", "Measuring fuel"], exp: "The altimeter measures the aircraft's altitude above sea level or ground level" },
                    { q: "What does AGL stand for?", a: "Above Ground Level", opts: ["Above Glide Level", "Air Ground Limit", "Altitude Gain Level"], exp: "AGL means Above Ground Level, measuring height above the terrain" },
                    { q: "What is the airspeed indicator used for?", a: "Measuring speed through the air", opts: ["Measuring altitude", "Measuring fuel", "Measuring direction"], exp: "The airspeed indicator shows how fast the aircraft is moving through the air" },
                    { q: "What does MSL stand for?", a: "Mean Sea Level", opts: ["Maximum Speed Limit", "Minimum Safe Level", "Medium Service Level"], exp: "MSL stands for Mean Sea Level, a standard reference for altitude measurements" },
                    { q: "What is the heading indicator used for?", a: "Showing aircraft direction", opts: ["Showing altitude", "Showing speed", "Showing fuel level"], exp: "The heading indicator displays the direction the aircraft is pointing" },
                    { q: "What does the turn coordinator show?", a: "Rate of turn and bank angle", opts: ["Only altitude", "Only speed", "Only direction"], exp: "The turn coordinator displays the rate of turn and the bank angle of the aircraft" },
                ],
                advanced: [
                    { q: "What is the standard sea level atmospheric pressure?", a: "29.92 inches Hg", opts: ["30.00 inches Hg", "14.7 psi only", "1013 mb only"], exp: "Standard sea level pressure is 29.92 inches of mercury (or 1013.25 mb)" },
                    { q: "What is V1 speed?", a: "Decision speed for takeoff", opts: ["Landing speed", "Cruise speed", "Stall speed"], exp: "V1 is the critical engine failure recognition speed during takeoff" },
                    { q: "What does 'angle of attack' mean?", a: "Angle between chord line and relative wind", opts: ["Angle of the aircraft to ground", "Angle of climb", "Bank angle"], exp: "Angle of attack is the angle between the wing's chord line and the oncoming airflow" },
                    { q: "What is the minimum safe altitude over congested areas?", a: "1,000 feet above highest obstacle within 2,000 feet", opts: ["500 feet AGL", "1,500 feet MSL", "Any altitude"], exp: "FAA regulations require 1,000 feet above the highest obstacle within a 2,000-foot radius" },
                    { q: "What is VR speed?", a: "Rotation speed for takeoff", opts: ["Refusal speed", "Range speed", "Reduced speed"], exp: "VR is the speed at which the player rotates the aircraft nose up during takeoff" },
                    { q: "What is the purpose of trim tabs?", a: "Reduce control pressure", opts: ["Increase speed", "Control temperature", "Measure altitude"], exp: "Trim tabs help reduce the control pressure needed to maintain a desired flight attitude" },
                    { q: "What does the compass deviation card show?", a: "Magnetic compass errors", opts: ["Altitude errors", "Speed errors", "Fuel errors"], exp: "The compass deviation card shows corrections for magnetic compass errors in the aircraft" },
                    { q: "What is ground effect?", a: "Increased lift near the ground", opts: ["Decreased lift near ground", "No change in lift", "Only affects helicopters"], exp: "Ground effect provides increased lift and reduced drag when flying close to the ground" },
                    { q: "What does METAR stand for?", a: "Aviation Routine Weather Report", opts: ["Meteorological Terminal Report", "Measure Temperature And Range", "Medium Altitude Reading"], exp: "METAR is the format for reporting aviation routine weather observations" },
                    { q: "What is the purpose of the pitot tube?", a: "Measure dynamic air pressure", opts: ["Measure temperature", "Measure altitude", "Measure fuel"], exp: "The pitot tube measures dynamic air pressure to determine airspeed" },
                    { q: "What is carburetor ice?", a: "Ice formation in the carburetor", opts: ["Ice on the wings", "Ice on the windshield", "Ice in the fuel"], exp: "Carburetor ice forms when moisture freezes in the carburetor, reducing engine power" },
                ],
                expert: [
                    { q: "What causes an aircraft to stall?", a: "Exceeding critical angle of attack", opts: ["Flying too fast", "Running out of fuel", "Engine failure"], exp: "A stall occurs when the wing exceeds its critical angle of attack, disrupting airflow" },
                    { q: "What is P-factor?", a: "Asymmetric propeller thrust", opts: ["Power factor", "Pressure factor", "Pitch factor"], exp: "P-factor is the asymmetric thrust produced by a propeller at high angles of attack" },
                    { q: "What is the purpose of a mixture control?", a: "Adjust fuel-to-air ratio", opts: ["Control speed", "Control altitude", "Control direction"], exp: "The mixture control adjusts the fuel-to-air ratio for optimal engine performance at different altitudes" },
                    { q: "What is adverse yaw?", a: "Yaw opposite to turn direction", opts: ["Yaw in turn direction", "No yaw during turn", "Vertical yaw only"], exp: "Adverse yaw is the tendency of an aircraft to yaw in the opposite direction of a turn due to differential drag" },
                    { q: "What is Dutch roll?", a: "Combined yaw and roll oscillation", opts: ["Only pitch oscillation", "Only yaw oscillation", "Controlled maneuver"], exp: "Dutch roll is an oscillatory instability involving coupled rolling and yawing motions" },
                    { q: "What is the coffin corner?", a: "Where stall speed meets max speed", opts: ["Landing pattern corner", "Fuel tank corner", "Cockpit corner"], exp: "Coffin corner is the altitude where stall speed and maximum speed converge, limiting flight envelope" },
                    { q: "What causes a spin?", a: "Stalled condition with yaw", opts: ["High speed turn", "Engine failure", "Low fuel"], exp: "A spin occurs when one wing is more stalled than the other, combined with yaw" },
                    { q: "What is load factor in a 60° bank?", a: "2G", opts: ["1G", "1.5G", "3G"], exp: "In a 60-degree coordinated turn, the load factor is 2G, doubling the aircraft's weight" },
                    { q: "What is Mach tuck?", a: "Nose-down pitch at high Mach", opts: ["Nose-up pitch", "Wing flutter", "Engine surge"], exp: "Mach tuck is a nose-down pitching moment that occurs at high Mach numbers due to shock wave formation" },
                    { q: "What is the critical Mach number?", a: "Speed where supersonic flow first appears", opts: ["Speed of sound", "Stall speed", "Maximum speed"], exp: "Critical Mach number is the speed at which airflow over some part of the aircraft first reaches Mach 1" },
                    { q: "What is the area rule?", a: "Design to reduce transonic drag", opts: ["Fuel capacity rule", "Weight limit rule", "Speed limit rule"], exp: "The area rule is a design principle that reduces drag at transonic speeds by maintaining constant cross-sectional area" },
                ]
            };
            
            // Select questions based on difficulty
            const questions = questionsByDifficulty[difficulty] || questionsByDifficulty.beginner;
            const item = questions[Math.floor(Math.random() * questions.length)];
            const allOptions = [item.a, ...item.opts];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: item.q,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.a),
                explanation: item.exp,
                image: item.img || null
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - INSTRUMENT COMPREHENSION
// ============================================================================
const instrumentTopics = [
    {
        id: 'attitude-indicator-basic',
        name: 'Attitude Indicator - Basic',
        description: 'Basic aircraft attitude interpretation',
        subjectId: 'instrument_comprehension',
        generateQuestion: (difficulty = 'beginner') => {
            // Beginner: Simple attitudes with clear descriptions (9 questions)
            const beginnerAttitudes = [
                { heading: "North", bank: "Level", pitch: "Level", desc: "Straight and level flight", img: "assets/icons/attitude-level.svg", details: "No bank, no climb or descent" },
                { heading: "East", bank: "Level", pitch: "Climbing", desc: "Climbing straight ahead", img: "assets/icons/attitude-climbing.svg", details: "Nose up, wings level" },
                { heading: "South", bank: "Level", pitch: "Descending", desc: "Descending straight ahead", img: "assets/icons/attitude-descending.svg", details: "Nose down, wings level" },
                { heading: "West", bank: "Right 30°", pitch: "Level", desc: "Banking right 30 degrees", img: "assets/icons/attitude-right-30.svg", details: "Right wing down, level pitch" },
                { heading: "North", bank: "Left 20°", pitch: "Level", desc: "Banking left 20 degrees", img: "assets/icons/attitude-left-20.svg", details: "Left wing down, level pitch" },
                { heading: "Southeast", bank: "Right 15°", pitch: "Level", desc: "Banking right 15 degrees", img: "assets/icons/attitude-right-15.svg", details: "Slight right bank, wings not level" },
                { heading: "Northwest", bank: "Left 25°", pitch: "Level", desc: "Banking left 25 degrees", img: "assets/icons/attitude-left-25.svg", details: "Moderate left bank, level pitch" },
                { heading: "Northeast", bank: "Level", pitch: "Climbing", desc: "Climbing with wings level", img: "assets/icons/attitude-climbing.svg", details: "Straight climb, no turn" },
                { heading: "Southwest", bank: "Level", pitch: "Descending", desc: "Descending with wings level", img: "assets/icons/attitude-descending.svg", details: "Straight descent, no turn" }
            ];
            
            // Advanced: Combined maneuvers (9 questions)
            const advancedAttitudes = [
                { heading: "Northeast", bank: "Right 15°", pitch: "Climbing", desc: "Climbing right turn", img: "assets/icons/attitude-right-15.svg", details: "Banking right 15° while climbing" },
                { heading: "Southeast", bank: "Left 25°", pitch: "Descending", desc: "Descending left turn", img: "assets/icons/attitude-left-25.svg", details: "Banking left 25° while descending" },
                { heading: "Southwest", bank: "Right 30°", pitch: "Descending", desc: "Steep descending right turn", img: "assets/icons/attitude-right-30.svg", details: "Banking right 30° with nose down" },
                { heading: "Northwest", bank: "Left 20°", pitch: "Climbing", desc: "Climbing left turn", img: "assets/icons/attitude-left-20.svg", details: "Banking left 20° while climbing" },
                { heading: "East", bank: "Right 30°", pitch: "Climbing", desc: "Steep climbing right turn", img: "assets/icons/attitude-right-30.svg", details: "Right 30° bank with climb" },
                { heading: "West", bank: "Left 25°", pitch: "Climbing", desc: "Moderate climbing left turn", img: "assets/icons/attitude-left-25.svg", details: "Left 25° bank while ascending" },
                { heading: "North", bank: "Right 15°", pitch: "Descending", desc: "Descending right turn", img: "assets/icons/attitude-right-15.svg", details: "Right 15° bank with descent" },
                { heading: "South", bank: "Left 20°", pitch: "Descending", desc: "Descending left turn", img: "assets/icons/attitude-left-20.svg", details: "Left 20° bank while descending" },
                { heading: "Northeast", bank: "Right 30°", pitch: "Level", desc: "Steep level right turn", img: "assets/icons/attitude-right-30.svg", details: "Sharp turn without altitude change" }
            ];
            
            // Expert: Precise identification with specific angles (9 questions)
            const expertAttitudes = [
                { heading: "045°", bank: "Right 15°", pitch: "5° climb", desc: "Right 15° bank, 5° nose up, heading 045°", img: "assets/icons/attitude-right-15.svg", details: "Shallow climbing right turn to northeast" },
                { heading: "135°", bank: "Left 25°", pitch: "10° descent", desc: "Left 25° bank, 10° nose down, heading 135°", img: "assets/icons/attitude-left-25.svg", details: "Medium descending left turn to southeast" },
                { heading: "225°", bank: "Right 30°", pitch: "Level", desc: "Right 30° bank, level pitch, heading 225°", img: "assets/icons/attitude-right-30.svg", details: "Steep right turn to southwest" },
                { heading: "315°", bank: "Left 20°", pitch: "8° climb", desc: "Left 20° bank, 8° nose up, heading 315°", img: "assets/icons/attitude-left-20.svg", details: "Moderate climbing left turn to northwest" },
                { heading: "090°", bank: "Right 30°", pitch: "12° descent", desc: "Right 30° bank, 12° nose down, heading 090°", img: "assets/icons/attitude-right-30.svg", details: "Steep descending right turn to east" },
                { heading: "180°", bank: "Left 25°", pitch: "6° climb", desc: "Left 25° bank, 6° nose up, heading 180°", img: "assets/icons/attitude-left-25.svg", details: "Medium climbing left turn to south" },
                { heading: "270°", bank: "Right 15°", pitch: "3° descent", desc: "Right 15° bank, 3° nose down, heading 270°", img: "assets/icons/attitude-right-15.svg", details: "Shallow descending right turn to west" },
                { heading: "000°", bank: "Left 20°", pitch: "Level", desc: "Left 20° bank, level pitch, heading 000°", img: "assets/icons/attitude-left-20.svg", details: "Moderate left turn to north" },
                { heading: "060°", bank: "Right 30°", pitch: "10° climb", desc: "Right 30° bank, 10° nose up, heading 060°", img: "assets/icons/attitude-right-30.svg", details: "Steep climbing right turn to ENE" }
            ];
            
            let attitudes;
            if (difficulty === 'expert') {
                attitudes = expertAttitudes;
            } else if (difficulty === 'advanced') {
                attitudes = advancedAttitudes;
            } else {
                attitudes = beginnerAttitudes;
            }
            
            const correct = attitudes[Math.floor(Math.random() * attitudes.length)];
            const otherAttitudes = attitudes.filter(a => a !== correct);
            const shuffledOthers = shuffleArray(otherAttitudes);
            const distractors = shuffledOthers.slice(0, 3);
            
            const allOptions = [correct, ...distractors];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: `What is the aircraft's attitude in the instrument panel shown?`,
                options: shuffled.map(a => a.desc),
                correctIndex: shuffled.indexOf(correct),
                explanation: `The correct interpretation is: ${correct.desc}. ${correct.details}`,
                image: correct.img
            };
        }
    },
    {
        id: 'aircraft-controls',
        name: 'Aircraft Control Surfaces',
        description: 'Understanding control surface functions',
        subjectId: 'instrument_comprehension',
        generateQuestion: (difficulty = 'beginner') => {
            // Beginner: Single control surface identification (9 questions)
            const beginnerQuestions = [
                {
                    prompt: "Which control surface is primarily responsible for controlling the aircraft's roll (banking)?",
                    correct: "Ailerons",
                    wrong: ["Elevator", "Rudder", "Flaps"],
                    explanation: "Ailerons are located on the outer trailing edge of the wings and control roll by moving oppositely to each other."
                },
                {
                    prompt: "Which control surface controls the aircraft's pitch (nose up/down)?",
                    correct: "Elevator",
                    wrong: ["Ailerons", "Rudder", "Spoilers"],
                    explanation: "The elevator is on the horizontal stabilizer and controls pitch by deflecting up or down."
                },
                {
                    prompt: "Which control surface controls the aircraft's yaw (left/right turning)?",
                    correct: "Rudder",
                    wrong: ["Ailerons", "Elevator", "Trim tabs"],
                    explanation: "The rudder is on the vertical stabilizer and controls yaw by deflecting left or right."
                },
                {
                    prompt: "What axis does the elevator control?",
                    correct: "Lateral axis (pitch)",
                    wrong: ["Longitudinal axis (roll)", "Vertical axis (yaw)", "Diagonal axis"],
                    explanation: "The elevator controls rotation around the lateral axis, which produces pitch changes."
                },
                {
                    prompt: "To roll the aircraft to the right, which aileron moves up?",
                    correct: "Right aileron",
                    wrong: ["Left aileron", "Both ailerons", "Neither aileron"],
                    explanation: "To roll right, the right aileron moves up (reducing lift on right wing) while the left aileron moves down."
                },
                {
                    prompt: "What axis does the rudder control?",
                    correct: "Vertical axis (yaw)",
                    wrong: ["Lateral axis (pitch)", "Longitudinal axis (roll)", "Horizontal axis"],
                    explanation: "The rudder controls rotation around the vertical axis, creating left or right yaw."
                },
                {
                    prompt: "What axis do the ailerons control?",
                    correct: "Longitudinal axis (roll)",
                    wrong: ["Lateral axis (pitch)", "Vertical axis (yaw)", "Transverse axis"],
                    explanation: "Ailerons control rotation around the longitudinal axis, causing the aircraft to roll left or right."
                },
                {
                    prompt: "Where is the elevator typically located on an aircraft?",
                    correct: "On the horizontal stabilizer at the tail",
                    wrong: ["On the wings near the fuselage", "On the vertical stabilizer", "On the nose section"],
                    explanation: "The elevator is mounted on the horizontal stabilizer (tail plane) and moves to control pitch."
                },
                {
                    prompt: "When the pilot pushes the control yoke/stick forward, which direction does the elevator deflect?",
                    correct: "Downward",
                    wrong: ["Upward", "To the left", "To the right"],
                    explanation: "Pushing forward deflects the elevator down, creating an upward force on the tail that pitches the nose down."
                }
            ];
            
            // Advanced: Combined controls and effects
            const advancedQuestions = [
                {
                    prompt: "To execute a coordinated right turn, which combination of controls is needed?",
                    correct: "Right aileron down, left aileron up, rudder right",
                    wrong: ["Right aileron up, left aileron down, rudder left", "Both ailerons down, rudder right", "Elevator up, rudder right"],
                    explanation: "A coordinated turn requires aileron input for bank and rudder input to prevent adverse yaw."
                },
                {
                    prompt: "What happens when the pilot pulls back on the control yoke?",
                    correct: "Elevator deflects up, nose pitches up",
                    wrong: ["Elevator deflects down, nose pitches down", "Ailerons deflect up, aircraft rolls", "Rudder deflects, aircraft yaws"],
                    explanation: "Pulling back raises the elevator's trailing edge, creating downward force on the tail and pitching the nose up."
                },
                {
                    prompt: "During a left climbing turn, which three controls are coordinated?",
                    correct: "Left aileron down, right aileron up, rudder left, elevator up",
                    wrong: ["Left aileron up, rudder right, elevator down", "Both ailerons up, rudder left, elevator up", "Left aileron down, rudder right, elevator up"],
                    explanation: "A climbing left turn requires left bank (ailerons), left yaw (rudder), and pitch up (elevator)."
                },
                {
                    prompt: "What is 'adverse yaw' and which control surface corrects it?",
                    correct: "Unwanted yaw during roll, corrected by rudder",
                    wrong: ["Unwanted roll during yaw, corrected by ailerons", "Unwanted pitch during turn, corrected by elevator", "Excessive bank angle, corrected by trim"],
                    explanation: "Adverse yaw occurs when the down aileron creates more drag, causing unwanted yaw opposite to the roll direction. Rudder corrects this."
                },
                {
                    prompt: "In a steep right bank (45°), what additional control input is typically needed?",
                    correct: "Back pressure on elevator to maintain altitude",
                    wrong: ["Forward pressure on elevator to prevent climb", "Left rudder to prevent right yaw", "No additional input needed"],
                    explanation: "In steep banks, vertical lift component decreases, requiring increased elevator back pressure to maintain altitude."
                }
            ];
            
            // Expert: Complex scenarios and aerodynamics
            const expertQuestions = [
                {
                    prompt: "During a spin recovery, what is the correct sequence of control inputs?",
                    correct: "1) Reduce power, 2) Opposite rudder, 3) Forward elevator, 4) Neutral ailerons",
                    wrong: ["1) Full power, 2) Aileron into spin, 3) Pull elevator back", "1) Opposite aileron, 2) Back elevator, 3) Full rudder", "1) Neutral all controls, 2) Wait for recovery"],
                    explanation: "Standard spin recovery: PARE - Power idle, Ailerons neutral, Rudder opposite spin, Elevator forward to break stall."
                },
                {
                    prompt: "What causes 'overbanking tendency' in steep turns and how is it corrected?",
                    correct: "Outer wing travels faster creating more lift; corrected with opposite aileron pressure",
                    wrong: ["Inner wing stalls first; corrected with rudder", "Centrifugal force pulls aircraft outward; corrected with elevator", "Weight shifts to lower wing; no correction needed"],
                    explanation: "In steep turns, the outer wing travels a longer path at higher speed, generating more lift and increasing bank. This requires opposite aileron to maintain constant bank."
                },
                {
                    prompt: "During a power-off stall, why might the left wing drop first in a typical single-engine aircraft?",
                    correct: "P-factor and torque create asymmetric airflow, left wing stalls first",
                    wrong: ["Right wing always generates more lift at slow speeds", "Pilot weight is typically on left side", "Ailerons are designed with left bias"],
                    explanation: "Propeller torque and P-factor (asymmetric thrust) create left-turning tendencies. At high angle of attack, the left wing may reach critical angle first."
                },
                {
                    prompt: "What is the purpose of differential ailerons and when are they most beneficial?",
                    correct: "Up aileron deflects more than down, reduces adverse yaw during roll entry",
                    wrong: ["Both ailerons move equally, improves roll rate at high speed", "Down aileron deflects more, prevents tip stall", "Ailerons move in same direction, assists rudder"],
                    explanation: "Differential ailerons have greater upward deflection than downward, creating more drag on the rising wing to counteract adverse yaw."
                },
                {
                    prompt: "In a sideslip maneuver, how are the controls crossed?",
                    correct: "Bank one direction with aileron, opposite rudder to prevent turn",
                    wrong: ["Rudder and aileron in same direction for tight turn", "Elevator up, rudder neutral, ailerons neutral", "Both ailerons up, rudder centered"],
                    explanation: "A sideslip uses crossed controls: bank with ailerons while applying opposite rudder to maintain heading, useful for crosswind landings or losing altitude."
                }
            ];
            
            let questions;
            if (difficulty === 'expert') {
                questions = expertQuestions;
            } else if (difficulty === 'advanced') {
                questions = advancedQuestions;
            } else {
                questions = beginnerQuestions;
            }
            
            const q = questions[Math.floor(Math.random() * questions.length)];
            const options = shuffleArray([q.correct, ...q.wrong]);
            
            return {
                prompt: q.prompt,
                options: options,
                correctIndex: options.indexOf(q.correct),
                explanation: q.explanation,
                image: "assets/icons/aircraft-controls.svg"
            };
        }
    },
    {
        id: 'aircraft-forces',
        name: 'Four Forces of Flight',
        description: 'Lift, Weight, Thrust, and Drag',
        subjectId: 'instrument_comprehension',
        generateQuestion: (difficulty = 'beginner') => {
            // Beginner: Basic force identification and direction
            const beginnerQuestions = [
                {
                    prompt: "Which force acts upward on an aircraft in flight?",
                    correct: "Lift",
                    wrong: ["Weight", "Thrust", "Drag"],
                    explanation: "Lift is the upward force created by the wings that opposes weight and keeps the aircraft airborne."
                },
                {
                    prompt: "Which force always acts downward toward the center of the Earth?",
                    correct: "Weight",
                    wrong: ["Lift", "Thrust", "Drag"],
                    explanation: "Weight is the downward force of gravity acting on the aircraft's mass."
                },
                {
                    prompt: "Which force propels the aircraft forward?",
                    correct: "Thrust",
                    wrong: ["Lift", "Weight", "Drag"],
                    explanation: "Thrust is the forward force produced by the engine/propeller that overcomes drag."
                },
                {
                    prompt: "Which force opposes the aircraft's motion through the air?",
                    correct: "Drag",
                    wrong: ["Lift", "Weight", "Thrust"],
                    explanation: "Drag is the rearward force caused by air resistance that opposes thrust."
                },
                {
                    prompt: "In straight and level flight at constant speed, what is true about the four forces?",
                    correct: "Lift equals Weight, Thrust equals Drag",
                    wrong: ["All four forces are equal", "Thrust is greater than all other forces", "Weight is greater than Lift"],
                    explanation: "In equilibrium flight, opposing forces are balanced: Lift = Weight and Thrust = Drag."
                }
            ];
            
            // Advanced: Force relationships and changes
            const advancedQuestions = [
                {
                    prompt: "What happens to lift when the aircraft's angle of attack increases (up to the critical angle)?",
                    correct: "Lift increases due to greater pressure differential",
                    wrong: ["Lift decreases due to increased drag", "Lift remains constant", "Lift becomes negative"],
                    explanation: "As angle of attack increases, the pressure differential between upper and lower wing surfaces increases, generating more lift until the critical angle is reached."
                },
                {
                    prompt: "During a climb at constant airspeed, which forces are NOT equal?",
                    correct: "Lift is less than Weight (vertical component of thrust helps support aircraft)",
                    wrong: ["Lift equals Weight exactly", "Thrust is less than Drag", "All forces remain balanced as in level flight"],
                    explanation: "In a climb, lift is less than weight because a component of thrust is directed upward, helping support the aircraft."
                },
                {
                    prompt: "What are the two main types of drag?",
                    correct: "Parasite drag and Induced drag",
                    wrong: ["Front drag and Rear drag", "Wing drag and Fuselage drag", "Fast drag and Slow drag"],
                    explanation: "Total drag consists of parasite drag (form, friction, interference) and induced drag (byproduct of lift generation)."
                },
                {
                    prompt: "How does induced drag change with airspeed?",
                    correct: "Induced drag decreases as speed increases",
                    wrong: ["Induced drag increases as speed increases", "Induced drag remains constant", "Induced drag is independent of speed"],
                    explanation: "Induced drag is inversely proportional to the square of airspeed - it's highest at low speeds and decreases as speed increases."
                },
                {
                    prompt: "In a steady descent at constant airspeed, how does thrust compare to drag?",
                    correct: "Thrust is less than Drag (gravity provides additional forward component)",
                    wrong: ["Thrust equals Drag", "Thrust is greater than Drag", "Thrust and Drag are not related in descents"],
                    explanation: "During descent, a component of weight acts forward along the flight path, so less thrust is needed than drag."
                }
            ];
            
            // Expert: Complex force interactions and performance
            const expertQuestions = [
                {
                    prompt: "At what airspeed does total drag reach its minimum, and what is this speed called?",
                    correct: "Where induced drag equals parasite drag; called L/D max or best glide speed",
                    wrong: ["At maximum airspeed; called Vne", "At minimum controllable airspeed; called Vmc", "At cruise speed; called Vc"],
                    explanation: "Total drag is minimized where the induced drag curve intersects the parasite drag curve. This is L/D max, the most efficient flight condition."
                },
                {
                    prompt: "What is 'ground effect' and how does it affect the four forces during landing?",
                    correct: "Reduced induced drag and increased lift due to disruption of wingtip vortices near ground",
                    wrong: ["Increased drag due to ground friction on wheels", "Decreased lift due to downwash interference", "No effect on forces, only on handling"],
                    explanation: "Ground effect occurs within one wingspan of the surface. The ground disrupts wingtip vortices, reducing induced drag and slightly increasing lift efficiency."
                },
                {
                    prompt: "How does the lift equation (L = CL × ½ρV²S) change with altitude at constant airspeed and angle of attack?",
                    correct: "Lift decreases because air density (ρ) decreases with altitude",
                    wrong: ["Lift increases due to less air resistance", "Lift remains constant as speed compensates", "Lift increases because wing efficiency improves"],
                    explanation: "At higher altitudes, lower air density (ρ) reduces lift for the same airspeed and angle of attack. Aircraft must fly faster or at higher angle of attack to maintain altitude."
                },
                {
                    prompt: "What is 'region of reversed command' and why is it dangerous?",
                    correct: "Flight regime where more power is needed to fly slower; risk of settling with power on",
                    wrong: ["High-speed regime where controls reverse; causes loss of control", "Inverted flight where lift acts downward; very unstable", "Supersonic regime where shockwaves form; structural danger"],
                    explanation: "Behind the drag curve (below L/D max speed), induced drag dominates and increases rapidly at slower speeds, requiring more power to maintain altitude - counterintuitive and dangerous if not managed properly."
                },
                {
                    prompt: "In a coordinated level turn, how does the required lift compare to straight-and-level flight, and what generates this additional lift?",
                    correct: "Lift must increase by the load factor (1/cos(bank angle)); generated by increased angle of attack",
                    wrong: ["Lift remains the same; turn is generated by redirecting existing lift", "Lift decreases; centrifugal force helps support the aircraft", "Lift doubles in all turns regardless of bank angle"],
                    explanation: "In a turn, lift must both support weight and provide centripetal force. A 60° bank requires 2G (twice the lift). This is achieved by increasing angle of attack, which also increases induced drag and requires more power."
                }
            ];
            
            let questions;
            if (difficulty === 'expert') {
                questions = expertQuestions;
            } else if (difficulty === 'advanced') {
                questions = advancedQuestions;
            } else {
                questions = beginnerQuestions;
            }
            
            const q = questions[Math.floor(Math.random() * questions.length)];
            const options = shuffleArray([q.correct, ...q.wrong]);
            
            return {
                prompt: q.prompt,
                options: options,
                correctIndex: options.indexOf(q.correct),
                explanation: q.explanation,
                image: "assets/icons/aircraft-forces.svg"
            };
        }
    },
    {
        id: 'airspeed-indicator',
        name: 'Airspeed Indicator (ASI)',
        description: 'Reading and interpreting airspeed',
        subjectId: 'instrument_comprehension',
        generateQuestion: (difficulty = 'beginner') => {
            const beginnerQuestions = [
                {
                    prompt: "What does the Airspeed Indicator (ASI) measure?",
                    correct: "The speed of the aircraft through the air",
                    wrong: ["The speed of the aircraft over the ground", "The altitude of the aircraft", "The rate of climb or descent"],
                    explanation: "The ASI measures indicated airspeed (IAS) - the speed of the aircraft moving through the air mass, not ground speed."
                },
                {
                    prompt: "What color is the arc on the ASI that represents the normal operating range?",
                    correct: "Green arc",
                    wrong: ["White arc", "Yellow arc", "Red line"],
                    explanation: "The green arc shows the normal operating range from stall speed (dirty) to maximum structural cruise speed."
                },
                {
                    prompt: "What does the white arc on the ASI represent?",
                    correct: "Flap operating range",
                    wrong: ["Normal operating range", "Caution range", "Never exceed speed"],
                    explanation: "The white arc shows the range where full flaps can be safely deployed, from stall speed with flaps to maximum flap extension speed (VFE)."
                },
                {
                    prompt: "What does the yellow arc on the ASI indicate?",
                    correct: "Caution range - smooth air operations only",
                    wrong: ["Normal operating range", "Flap operating range", "Stall warning range"],
                    explanation: "The yellow arc is the caution range between maximum structural cruise speed and never-exceed speed, to be used only in smooth air."
                },
                {
                    prompt: "What does the red radial line (VNE) on the ASI represent?",
                    correct: "Never-exceed speed",
                    wrong: ["Maximum cruise speed", "Maximum flap speed", "Stall speed"],
                    explanation: "VNE (velocity never exceed) is the red line marking the maximum speed limit beyond which structural damage may occur."
                },
                {
                    prompt: "The Airspeed Indicator works by measuring the difference between what two pressures?",
                    correct: "Pitot pressure and static pressure",
                    wrong: ["Engine pressure and ambient pressure", "Cabin pressure and outside pressure", "Dynamic pressure and vacuum pressure"],
                    explanation: "The ASI measures the difference between ram air pressure from the pitot tube and static pressure from the static port."
                },
                {
                    prompt: "If the pitot tube becomes blocked while in flight, what happens to the airspeed indication?",
                    correct: "The airspeed reading freezes at the current indication",
                    wrong: ["The airspeed drops to zero", "The airspeed shows maximum", "The airspeed becomes erratic"],
                    explanation: "A blocked pitot tube traps the existing pressure, causing the ASI to freeze at the last indicated airspeed before blockage."
                },
                {
                    prompt: "What is indicated airspeed (IAS)?",
                    correct: "The speed shown directly on the airspeed indicator",
                    wrong: ["The true speed through the air mass", "The speed over the ground", "The speed corrected for wind"],
                    explanation: "IAS is the uncorrected speed reading directly from the instrument, before adjustments for altitude, temperature, or installation errors."
                },
                {
                    prompt: "At what airspeed should a pilot be most concerned about operating in turbulent conditions?",
                    correct: "In the yellow arc (caution range)",
                    wrong: ["In the green arc (normal range)", "In the white arc (flap range)", "Below the green arc"],
                    explanation: "The yellow arc indicates speeds that should only be used in smooth air. In turbulence, gusts could push the aircraft beyond structural limits."
                }
            ];
            
            const advancedQuestions = [
                {
                    prompt: "How does true airspeed (TAS) compare to indicated airspeed (IAS) as altitude increases?",
                    correct: "TAS increases relative to IAS due to decreasing air density",
                    wrong: ["TAS decreases relative to IAS", "TAS and IAS remain equal at all altitudes", "TAS becomes half of IAS at high altitude"],
                    explanation: "At higher altitudes, thinner air means the aircraft must move faster through the air mass to maintain the same dynamic pressure, so TAS exceeds IAS by approximately 2% per 1,000 feet."
                },
                {
                    prompt: "If both the pitot tube and static port become blocked simultaneously in flight, how will the ASI behave during a climb?",
                    correct: "ASI will show an increase in airspeed",
                    wrong: ["ASI will freeze at current reading", "ASI will show a decrease", "ASI will read zero"],
                    explanation: "With both blocked, the trapped air in the system expands as altitude increases (pressure decreases), creating a false increase in the pressure differential that the ASI reads as increased airspeed."
                },
                {
                    prompt: "What is the relationship between calibrated airspeed (CAS) and indicated airspeed (IAS)?",
                    correct: "CAS is IAS corrected for installation and instrument errors",
                    wrong: ["CAS is IAS corrected for altitude", "CAS is IAS corrected for temperature", "CAS and IAS are always identical"],
                    explanation: "CAS corrects IAS for position error (installation location of the pitot-static system) and instrument error. This correction is usually small and varies with airspeed."
                },
                {
                    prompt: "Why is it important to use indicated airspeed rather than ground speed for takeoff and landing?",
                    correct: "Aerodynamic forces depend on airspeed, not ground speed",
                    wrong: ["Ground speed is always less accurate", "Indicated airspeed accounts for wind", "Ground speed varies too much"],
                    explanation: "Lift, drag, and stall characteristics are determined by the speed of air flowing over the wings (airspeed), regardless of how fast the aircraft is moving over the ground."
                },
                {
                    prompt: "What is 'equivalent airspeed' (EAS)?",
                    correct: "CAS corrected for adiabatic compressible flow at altitude",
                    wrong: ["IAS corrected for temperature only", "TAS corrected for wind", "The average of IAS and TAS"],
                    explanation: "EAS is CAS corrected for the compressibility of air. At high speeds and altitudes, air compression affects the pressure readings, and EAS accounts for this."
                },
                {
                    prompt: "If an aircraft maintains a constant IAS while climbing, what is happening to its TAS?",
                    correct: "TAS is increasing as altitude increases",
                    wrong: ["TAS is decreasing", "TAS remains constant", "TAS oscillates unpredictably"],
                    explanation: "To maintain constant IAS at higher altitudes where air is thinner, the aircraft must fly faster TAS to generate the same dynamic pressure on the pitot tube."
                },
                {
                    prompt: "What speed is represented by the lower end of the green arc on the ASI?",
                    correct: "VS1 - stall speed with flaps and gear up",
                    wrong: ["VS0 - stall speed with flaps down", "VFE - maximum flap extension speed", "VNO - maximum structural cruise speed"],
                    explanation: "The bottom of the green arc marks VS1, the stall speed in the clean configuration (gear and flaps up) at maximum gross weight."
                },
                {
                    prompt: "During a rapid descent, if the static port becomes blocked, what will happen to the ASI indication?",
                    correct: "ASI will show decreasing airspeed",
                    wrong: ["ASI will show increasing airspeed", "ASI will freeze at current reading", "ASI will become erratic"],
                    explanation: "With blocked static port during descent, the trapped static pressure remains high, making the pitot-static differential smaller, causing the ASI to read lower than actual."
                },
                {
                    prompt: "What is 'Mach number' and how does it relate to true airspeed?",
                    correct: "Ratio of TAS to speed of sound; varies with temperature",
                    wrong: ["Ratio of IAS to cruise speed; constant value", "Ratio of ground speed to TAS; varies with wind", "Ratio of climb rate to airspeed; varies with altitude"],
                    explanation: "Mach number is TAS divided by the local speed of sound. Since sound speed decreases with temperature (and altitude), the same TAS yields higher Mach numbers at altitude."
                }
            ];
            
            const expertQuestions = [
                {
                    prompt: "In the 'coffin corner' at high altitude, what aerodynamic limitation occurs?",
                    correct: "Low-speed stall and high-speed buffet converge",
                    wrong: ["Engines lose all thrust capability", "Controls become ineffective", "Mach tuck becomes unrecoverable"],
                    explanation: "At high altitude where air is thin, the margin between stall speed (which increases with altitude in TAS terms) and critical Mach number (where shock waves form) becomes dangerously small."
                },
                {
                    prompt: "What causes 'Mach tuck' and how does it affect aircraft control?",
                    correct: "Shock wave formation moves center of pressure aft, pitching nose down",
                    wrong: ["Engine thrust reduces at high Mach, nose drops", "Control surfaces stiffen, unable to pull up", "Airflow separation causes random pitch changes"],
                    explanation: "At transonic speeds, shock waves form on the wing, shifting the center of pressure rearward, creating a strong nose-down pitching moment that can overpower elevator authority."
                },
                {
                    prompt: "How does the ASI behave differently in a sideslip compared to coordinated flight?",
                    correct: "May show errors due to altered airflow at pitot tube location",
                    wrong: ["Reads exactly the same in all attitudes", "Always reads higher in a sideslip", "Becomes completely unreliable"],
                    explanation: "In a sideslip, the relative wind approaches from a different angle, potentially causing position errors in the pitot-static system depending on probe location and aircraft attitude."
                },
                {
                    prompt: "What is the significance of 'critical Mach number' (Mcrit)?",
                    correct: "Mach number where local airflow first reaches sonic speed",
                    wrong: ["Mach number where aircraft structure fails", "Mach number where engines flame out", "Mach number where controls reverse"],
                    explanation: "Mcrit is when airflow accelerating over the wing first reaches Mach 1 locally (even though aircraft is subsonic), causing shock wave formation and increased drag."
                },
                {
                    prompt: "In accelerated flight (turning or pulling g's), how does stall speed change relative to straight-and-level flight?",
                    correct: "Stall speed increases proportionally to square root of load factor",
                    wrong: ["Stall speed decreases due to increased airflow", "Stall speed remains constant regardless of g-load", "Stall speed doubles for each g of load factor"],
                    explanation: "The stall speed increases by √(load factor). At 2g's, stall speed is 1.41 times higher; at 3g's, it's 1.73 times higher due to increased wing loading."
                },
                {
                    prompt: "What is 'density altitude' and why is it critical for performance?",
                    correct: "Pressure altitude corrected for temperature; affects engine and aerodynamic performance",
                    wrong: ["True altitude corrected for pressure; only affects instruments", "Altitude where air density is standard; not important for performance", "Indicated altitude adjusted for wind; affects navigation only"],
                    explanation: "Density altitude is what the aircraft 'feels' in performance. High density altitude (hot, high elevation) reduces engine power, propeller efficiency, and lift, degrading all performance metrics."
                },
                {
                    prompt: "How do wing-mounted vortex generators affect the airspeed indicator accuracy?",
                    correct: "Usually minimal effect, but can reduce position error at high AoA",
                    wrong: ["Make the ASI read 10% high at all speeds", "Cause ASI to become unreliable in turns", "Have no effect on any instruments"],
                    explanation: "Vortex generators energize the boundary layer, potentially improving airflow characteristics around the aircraft and reducing position error effects, especially near stall speeds."
                },
                {
                    prompt: "What is 'ground effect' and how does it affect the ASI during landing?",
                    correct: "Altered pressure field may cause slight indicated airspeed errors",
                    wrong: ["ASI always reads 20 knots low in ground effect", "ASI becomes completely accurate in ground effect", "Ground effect only affects vertical speed, not airspeed"],
                    explanation: "Ground effect alters the pressure distribution around the aircraft, potentially affecting both pitot and static pressures. Effects are usually small but can vary by aircraft design."
                },
                {
                    prompt: "In a jet aircraft, what is the relationship between VMO (maximum operating velocity) and MMO (maximum operating Mach)?",
                    correct: "VMO limits speed at low altitude, MMO limits at high altitude",
                    wrong: ["VMO and MMO are always the same value", "MMO only applies in supersonic flight", "VMO is twice the value of MMO"],
                    explanation: "VMO is an indicated airspeed limit (structural), while MMO is a Mach limit (compressibility). At low altitude, VMO is reached first; at high altitude, MMO is the limiting factor."
                }
            ];
            
            let questions;
            if (difficulty === 'expert') {
                questions = expertQuestions;
            } else if (difficulty === 'advanced') {
                questions = advancedQuestions;
            } else {
                questions = beginnerQuestions;
            }
            
            const q = questions[Math.floor(Math.random() * questions.length)];
            const options = shuffleArray([q.correct, ...q.wrong]);
            
            return {
                prompt: q.prompt,
                options: options,
                correctIndex: options.indexOf(q.correct),
                explanation: q.explanation,
                image: "assets/icons/instruments/asi/asi.svg"
            };
        }
    },
    {
        id: 'altimeter',
        name: 'Altimeter (ALT)',
        description: 'Reading altitude and pressure settings',
        subjectId: 'instrument_comprehension',
        generateQuestion: (difficulty = 'beginner') => {
            const beginnerQuestions = [
                {
                    prompt: "What does the altimeter measure?",
                    correct: "The aircraft's height above a reference pressure level",
                    wrong: ["The aircraft's height above ground level always", "The aircraft's true altitude above sea level", "The aircraft's distance from the nearest airport"],
                    explanation: "The altimeter measures pressure altitude - height above a reference pressure datum set in the Kollsman window."
                },
                {
                    prompt: "How many hands (pointers) does a standard altimeter have?",
                    correct: "Three hands",
                    wrong: ["One hand", "Two hands", "Four hands"],
                    explanation: "A standard altimeter has three hands: a short wide hand for 10,000-foot increments, a medium hand for 1,000-foot increments, and a long thin hand for 100-foot increments."
                },
                {
                    prompt: "What is the Kollsman window on an altimeter used for?",
                    correct: "Setting the barometric pressure reference",
                    wrong: ["Reading the outside air temperature", "Displaying ground speed", "Showing magnetic heading"],
                    explanation: "The Kollsman window displays the barometric pressure setting (in inches of mercury or millibars) that establishes the altitude reference."
                },
                {
                    prompt: "What barometric setting should be used when flying below 18,000 feet in the United States?",
                    correct: "Local altimeter setting from the nearest station",
                    wrong: ["Always 29.92 inches Hg", "Always 30.00 inches Hg", "No setting is needed"],
                    explanation: "Below 18,000 feet, pilots set the local altimeter setting to show indicated altitude (height above sea level) for terrain clearance."
                },
                {
                    prompt: "What altimeter setting is used at or above 18,000 feet (FL180) in the United States?",
                    correct: "29.92 inches Hg (standard pressure)",
                    wrong: ["Local barometric pressure", "30.00 inches Hg", "31.00 inches Hg"],
                    explanation: "Above 18,000 feet (in the flight levels), all aircraft use 29.92 to ensure consistent altitude separation between aircraft."
                },
                {
                    prompt: "If you fly from high pressure to low pressure without adjusting your altimeter, what happens?",
                    correct: "The altimeter reads higher than actual altitude",
                    wrong: ["The altimeter reads lower than actual altitude", "The altimeter remains accurate", "The altimeter stops working"],
                    explanation: "Remember 'High to low, look out below.' Flying into lower pressure without resetting makes the altimeter read high while the aircraft is actually lower."
                },
                {
                    prompt: "What does 'QNH' represent in aviation?",
                    correct: "Altimeter setting to read field elevation on the ground",
                    wrong: ["Aircraft's current altitude", "Height above ground level", "Cabin pressure setting"],
                    explanation: "QNH is the barometric pressure setting that, when set in the altimeter on the ground, causes it to display the field elevation (airport altitude above sea level)."
                },
                {
                    prompt: "The altimeter measures altitude based on:",
                    correct: "Atmospheric pressure decreasing with height",
                    wrong: ["Radio waves bouncing off the ground", "GPS satellite signals", "Magnetic field strength"],
                    explanation: "The altimeter is essentially a barometer calibrated to show altitude based on the standard relationship between pressure and height in the atmosphere."
                },
                {
                    prompt: "What is 'indicated altitude'?",
                    correct: "The altitude shown on the altimeter with current setting",
                    wrong: ["True height above mean sea level", "Height above ground level", "Pressure altitude corrected for temperature"],
                    explanation: "Indicated altitude is simply what the altimeter reads with the current barometric pressure setting in the Kollsman window."
                }
            ];
            
            const advancedQuestions = [
                {
                    prompt: "What is 'pressure altitude'?",
                    correct: "Indicated altitude when altimeter is set to 29.92 inches Hg",
                    wrong: ["True altitude corrected for pressure", "Indicated altitude corrected for temperature", "Height above ground level"],
                    explanation: "Pressure altitude is the height above the standard datum plane (29.92 inches Hg). It's the altitude used for flight levels and performance calculations."
                },
                {
                    prompt: "What is 'density altitude' and why is it important?",
                    correct: "Pressure altitude corrected for non-standard temperature; affects aircraft performance",
                    wrong: ["Indicated altitude corrected for wind", "True altitude at standard temperature", "Altitude where air density is maximum"],
                    explanation: "Density altitude is what the aircraft 'feels' for performance. High density altitude (hot, high) reduces engine power, propeller efficiency, and wing lift."
                },
                {
                    prompt: "How does temperature affect the altimeter reading?",
                    correct: "Cold temperatures make altimeter read higher than actual; warm makes it read lower",
                    wrong: ["Temperature has no effect on altimeter", "Cold makes it read lower; warm makes it read higher", "Altimeter automatically compensates for temperature"],
                    explanation: "On a cold day, air is denser than standard, so aircraft is actually lower than indicated. 'High to low or hot to cold, look out below.'"
                },
                {
                    prompt: "What is 'true altitude'?",
                    correct: "Actual height above mean sea level (MSL)",
                    wrong: ["Height indicated on the altimeter", "Height above ground level", "Pressure altitude plus temperature correction"],
                    explanation: "True altitude is the actual vertical distance above mean sea level, accounting for all pressure and temperature variations from standard atmosphere."
                },
                {
                    prompt: "If the static port becomes blocked during a climb, what happens to the altimeter?",
                    correct: "Altimeter freezes at the altitude where blockage occurred",
                    wrong: ["Altimeter continues to show increasing altitude", "Altimeter shows decreasing altitude", "Altimeter shows maximum altitude"],
                    explanation: "A blocked static port traps the air pressure at that altitude, causing the altimeter to freeze regardless of actual altitude changes."
                },
                {
                    prompt: "What is the standard pressure lapse rate in the atmosphere?",
                    correct: "Approximately 1 inch Hg per 1,000 feet",
                    wrong: ["1 inch Hg per 100 feet", "1 inch Hg per 10,000 feet", "Pressure increases with altitude"],
                    explanation: "In standard atmosphere near sea level, pressure decreases approximately 1 inch of mercury per 1,000 feet of altitude gain."
                },
                {
                    prompt: "What is an 'altimeter error' and when is it most significant?",
                    correct: "Difference between indicated and true altitude; significant in non-standard conditions",
                    wrong: ["Manufacturing defect in the instrument", "Only occurs above 50,000 feet", "Can only happen if the instrument is broken"],
                    explanation: "Altimeter errors occur because the atmosphere rarely matches the standard model used to calibrate the instrument, especially with temperature variations."
                },
                {
                    prompt: "What does 'QFE' represent?",
                    correct: "Altimeter setting to read zero at a particular airfield",
                    wrong: ["Current barometric pressure at sea level", "Standard pressure of 29.92", "Temperature at field elevation"],
                    explanation: "QFE sets the altimeter to read zero (or runway elevation) when on the ground at a specific airport, showing height above that airport."
                },
                {
                    prompt: "How often should pilots update their altimeter setting during flight below 18,000 feet?",
                    correct: "Each time passing near a reporting station or when ATC provides updated setting",
                    wrong: ["Every 10 minutes regardless of location", "Only once at departure", "Only during approach"],
                    explanation: "Pilots should update the altimeter setting periodically as they travel through areas of changing pressure and whenever ATC provides new settings for accurate terrain clearance."
                }
            ];
            
            const expertQuestions = [
                {
                    prompt: "What causes 'altimeter lag' and how can it affect flight safety?",
                    correct: "Mechanical inertia in aneroid wafers causes delayed response to rapid pressure changes",
                    wrong: ["Electrical delay in digital displays", "Pilot reaction time to altitude changes", "Wind effects on static pressure"],
                    explanation: "Altimeter lag occurs during rapid altitude changes because the aneroid wafers and mechanical linkages take time to respond, potentially showing outdated altitude in critical situations."
                },
                {
                    prompt: "In the international standard atmosphere (ISA), what is the temperature lapse rate?",
                    correct: "2°C per 1,000 feet (or approximately 1.98°C)",
                    wrong: ["1°C per 1,000 feet", "5°C per 1,000 feet", "Temperature is constant with altitude"],
                    explanation: "ISA assumes standard temperature decreases at approximately 2°C (3.5°F) per 1,000 feet up to 36,089 feet (tropopause)."
                },
                {
                    prompt: "What is the 'transition altitude' and 'transition level' concept?",
                    correct: "Altitude where pilots switch from local QNH to standard 29.92; varies by country",
                    wrong: ["Fixed at 18,000 feet worldwide", "Only applies to commercial aviation", "Altitude where pressurization is required"],
                    explanation: "Transition altitude (where pilots change to 29.92) and transition level (lowest usable flight level) create the transition layer. It's 18,000 ft in the US but varies globally."
                },
                {
                    prompt: "How does the '4 inch per degree' rule help pilots compensate for temperature on altitude?",
                    correct: "For each degree Celsius below ISA, add 4 feet per 1,000 feet of altitude",
                    wrong: ["Subtract 4 feet for each degree above ISA", "Add 4 inches of Hg for each degree of temperature", "Only applies to humidity, not temperature"],
                    explanation: "This rule of thumb helps estimate true altitude corrections: on a cold day, actual altitude is lower than indicated by approximately 4 feet per 1,000 feet per degree below ISA."
                },
                {
                    prompt: "What is an 'ICAO Standard Atmosphere' and what are its baseline conditions?",
                    correct: "15°C and 29.92 inches Hg at sea level; basis for all aviation calculations",
                    wrong: ["20°C and 30.00 inches Hg; only used in the tropics", "0°C and 29.92 inches Hg; winter standard", "10°C and 28.00 inches Hg; mountain standard"],
                    explanation: "ICAO Standard Atmosphere defines 15°C (59°F) and 29.92 inches Hg (1013.25 mb) at sea level as the baseline for all performance calculations and altimeter calibration."
                },
                {
                    prompt: "What is 'geometric altitude' and how does it differ from pressure altitude?",
                    correct: "Actual vertical distance from a reference point; differs from pressure altitude in non-standard conditions",
                    wrong: ["Altitude measured by GPS; always matches pressure altitude", "Altitude calculated from aircraft angle; unrelated to pressure", "A theoretical concept with no practical use"],
                    explanation: "Geometric altitude is the actual physical height, often measured by GPS or radar. It differs from pressure altitude whenever atmospheric conditions deviate from the standard model."
                },
                {
                    prompt: "How do 'blocking highs' or 'low pressure systems' affect large-area altimeter errors?",
                    correct: "Create regional pressure deviations requiring pilots to update settings frequently for accurate altitude",
                    wrong: ["Have no effect on modern GPS-based systems", "Only affect aircraft above 40,000 feet", "Automatically compensated by modern altimeters"],
                    explanation: "Large weather systems create regional pressure anomalies from standard atmosphere. Without frequent altimeter updates, indicated altitude can deviate significantly from true altitude."
                },
                {
                    prompt: "What is 'hypsometric equation' relevance to altitude measurement?",
                    correct: "Relates pressure differences to geometric height considering temperature; basis of altimetry",
                    wrong: ["Equation for calculating groundspeed from airspeed", "Formula for determining stall speed at altitude", "Calculation for fuel consumption at different altitudes"],
                    explanation: "The hypsometric equation describes the relationship between pressure and height in the atmosphere, accounting for temperature. It's the theoretical foundation of pressure altimetry."
                },
                {
                    prompt: "Why do some aircraft have 'servo altimeters' instead of traditional aneroid altimeters?",
                    correct: "Provide more accurate readings by using electronic sensing and correction algorithms",
                    wrong: ["Required by law for all commercial aircraft", "Only work above 50,000 feet", "Cheaper to manufacture than aneroid types"],
                    explanation: "Servo altimeters use electronic pressure transducers and can apply corrections for temperature and other factors, providing greater accuracy than purely mechanical aneroid systems."
                }
            ];
            
            let questions;
            if (difficulty === 'expert') {
                questions = expertQuestions;
            } else if (difficulty === 'advanced') {
                questions = advancedQuestions;
            } else {
                questions = beginnerQuestions;
            }
            
            const q = questions[Math.floor(Math.random() * questions.length)];
            const options = shuffleArray([q.correct, ...q.wrong]);
            
            return {
                prompt: q.prompt,
                options: options,
                correctIndex: options.indexOf(q.correct),
                explanation: q.explanation,
                image: "assets/icons/instruments/alt/alt.svg"
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - TABLE READING
// ============================================================================
const tableTopics = [
    {
        id: 'table-reading',
        name: 'Table Reading',
        description: 'Quick data extraction from tables',
        subjectId: 'table',
        generateQuestion: (difficulty = 'beginner') => {
            // Generate a random data table
            const rows = 5;
            const cols = 5;
            const rowLabels = Array.from({length: rows}, (_, i) => (i + 1) * 10);
            const colLabels = Array.from({length: cols}, (_, i) => (i + 1) * 5);
            
            // Create table data
            const table = {};
            rowLabels.forEach(row => {
                table[row] = {};
                colLabels.forEach(col => {
                    table[row][col] = Math.floor(Math.random() * 90) + 10;
                });
            });
            
            // Pick a random cell
            const targetRow = rowLabels[Math.floor(Math.random() * rows)];
            const targetCol = colLabels[Math.floor(Math.random() * cols)];
            const correctValue = table[targetRow][targetCol];
            
            // Generate distractors from nearby cells
            const distractors = [];
            rowLabels.forEach(row => {
                colLabels.forEach(col => {
                    if (row !== targetRow || col !== targetCol) {
                        distractors.push(table[row][col]);
                    }
                });
            });
            
            const shuffledDistractors = shuffleArray(distractors);
            const options = [correctValue, ...shuffledDistractors.slice(0, 3)];
            const shuffled = shuffleArray([...new Set(options)].map(String)); // Remove duplicates
            
            // Build table display
            let tableDisplay = `Row\\Col  ${colLabels.join('   ')}\n`;
            rowLabels.forEach(row => {
                tableDisplay += `${row.toString().padStart(3)}     `;
                tableDisplay += colLabels.map(col => table[row][col].toString().padStart(2)).join('  ');
                tableDisplay += '\n';
            });
            
            return {
                prompt: `Find the value at Row ${targetRow}, Column ${targetCol}:\n\n${tableDisplay}`,
                options: shuffled,
                correctIndex: shuffled.indexOf(String(correctValue)),
                explanation: `The value at Row ${targetRow}, Column ${targetCol} is ${correctValue}`,
                image: "assets/icons/table-sample.svg"
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - BLOCK COUNTING
// ============================================================================
const blockTopics = [
    {
        id: 'stacked_cubes',
        name: 'Block Counting (Procedural)',
        description: 'Spatial reasoning with block configurations',
        subjectId: 'block_counting',
        generateQuestion: (difficulty = 'beginner') => {
            const scenarios = [
                {
                    desc: "A 3×3×3 cube with all blocks visible",
                    blocks: 27,
                    hidden: 1,
                    touching: 6,
                    img: "assets/icons/blocks-3x3x3.svg"
                },
                {
                    desc: "A 4×4×4 cube",
                    blocks: 64,
                    hidden: 8,
                    touching: 24,
                    img: "assets/icons/blocks-4x4x4.svg"
                },
                {
                    desc: "A 2×3×4 rectangular configuration",
                    blocks: 24,
                    hidden: 0,
                    touching: 11,
                    img: "assets/icons/blocks-2x3x4.svg"
                },
                {
                    desc: "A pyramid with a 4×4 base, 3 layers",
                    blocks: 30,
                    hidden: 1,
                    touching: 13,
                    img: "assets/icons/blocks-pyramid.svg"
                },
                {
                    desc: "An L-shaped configuration: 5 blocks on bottom row, 3 on second layer",
                    blocks: 8,
                    hidden: 0,
                    touching: 4,
                    img: "assets/icons/blocks-l-shape.svg"
                }
            ];
            
            const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            
            const questionTypes = [
                {
                    q: "How many total blocks are in this configuration?",
                    a: scenario.blocks,
                    distractors: [scenario.blocks - 1, scenario.blocks + 1, scenario.blocks + 3]
                },
                {
                    q: "How many blocks are completely hidden from view?",
                    a: scenario.hidden,
                    distractors: [scenario.hidden + 1, scenario.hidden + 2, Math.max(0, scenario.hidden - 1)]
                },
                {
                    q: "How many blocks touch the center block?",
                    a: scenario.touching,
                    distractors: [scenario.touching - 2, scenario.touching + 1, scenario.touching + 3]
                }
            ];
            
            const question = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            const options = [question.a, ...question.distractors];
            const shuffled = shuffleArray(options);
            
            return {
                prompt: `${scenario.desc}\n\n${question.q}`,
                options: shuffled.map(String),
                correctIndex: shuffled.indexOf(question.a),
                explanation: `The correct answer is ${question.a} blocks.`,
                image: scenario.img
            };
        }
    }
];

// Function to create math topics from questionRegistry
function createMathTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.math_knowledge) {
        console.warn('Math knowledge content not loaded, using procedural fallbacks');
        return mathTopics.map(t => ({ ...t, subjectId: 'math_knowledge' }));
    }
    
    const mathContent = questionRegistry.math_knowledge;
    const dynamicTopics = [];
    
    // Topic name mapping
    const topicNames = {
        'word_problems_equation_setup': 'Word Problems (Equation setup)',
        'absolute_value': 'Absolute Value (Solve |x - a| = b)',
        'coordinate_geometry': 'Coordinate Geometry (Distance, midpoint, slopes)',
        'distributive_foil': 'Distributive & FOIL',
        'evaluate_expressions': 'Evaluate Expressions (Substitution)',
        'exponents_roots': 'Exponents (Laws of exponents)',
        'factoring': 'Factoring (Factor quadratics)',
        'fractions': 'Fractions (Add/subtract/multiply/divide)',
        'function_evaluation': 'Functions (Evaluate f(x))',
        'functions': 'Functions (Evaluate f(x))',
        'geometry_basics': 'Geometry Basics (Perimeter/Area)',
        'graph_interpretation': 'Graph Interpretation (Read charts/graphs)',
        'graphing_linear_functions': 'Graphing Linear Functions (y=mx+b)',
        'inequalities': 'Inequalities (Solve inequalities)',
        'linear_equations': 'Linear Equations (Solve for x)',
        'number_sets': 'Number Classification (real/irrational/integers/etc)',
        'order_of_operations': 'Order of Operations (PEMDAS)',
        'polygons_and_angles': 'Polygons & Angles (Interior/exterior angles)',
        'polynomials': 'Polynomials (Add/subtract)',
        'probability': 'Probability (Simple events)',
        'quadratic_equations': 'Quadratic Equations (Solve quadratics)',
        'radicals': 'Radicals (Simplify radicals)',
        'ratio_and_proportion': 'Ratio & Proportion (Solve proportions)',
        'rational_expressions': 'Rational Expressions (Simplify fractions)',
        'sequences': 'Sequences (Arithmetic/geometric)',
        'slope': 'Slope (Rise over run)',
        'statistics': 'Statistics (Mean/median/range)',
        'systems_linear': 'Systems (Solve systems)',
        'transformations': 'Transformations (Reflections/rotations)'
    };
    
    const topicDescriptions = {
        'word_problems_equation_setup': 'Translating word problems into equations',
        'absolute_value': 'Solve absolute value equations',
        'coordinate_geometry': 'Work with coordinate planes',
        'distributive_foil': 'Expand expressions',
        'evaluate_expressions': 'Substitute values and evaluate',
        'exponents_roots': 'Apply exponent rules',
        'factoring': 'Factor quadratic expressions',
        'fractions': 'Operations with fractions',
        'function_evaluation': 'Evaluate function values',
        'functions': 'Evaluate function values',
        'geometry_basics': 'Calculate area and perimeter',
        'graph_interpretation': 'Read data from graphs',
        'graphing_linear_functions': 'Graph linear functions',
        'inequalities': 'Solve inequality expressions',
        'linear_equations': 'Solve basic equations',
        'number_sets': 'Classify number types',
        'order_of_operations': 'Apply PEMDAS correctly',
        'polygons_and_angles': 'Work with polygon angles',
        'polynomials': 'Polynomial operations',
        'probability': 'Calculate probabilities',
        'quadratic_equations': 'Solve quadratic equations',
        'radicals': 'Simplify square roots',
        'ratio_and_proportion': 'Solve proportions',
        'rational_expressions': 'Simplify algebraic fractions',
        'sequences': 'Find sequence terms',
        'slope': 'Calculate line slopes',
        'statistics': 'Calculate basic statistics',
        'systems_linear': 'Solve system of equations',
        'transformations': 'Apply geometric transformations'
    };
    
    // Create topics from loaded content
    for (const subtopicId in mathContent) {
        dynamicTopics.push({
            id: subtopicId,
            name: topicNames[subtopicId] || subtopicId.replace(/_/g, ' '),
            description: topicDescriptions[subtopicId] || 'Math practice',
            subjectId: 'math_knowledge',
            hasContent: true
        });
    }
    
    console.log(`Created ${dynamicTopics.length} math topics from content`);
    return dynamicTopics;
}

// Function to create arithmetic reasoning topics from questionRegistry (Patch 19)
function createArithmeticTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.arithmetic_reasoning) {
        console.warn('Arithmetic content not loaded');
        return [];
    }
    const arContent = questionRegistry.arithmetic_reasoning;
    const names = {
        'basic_arithmetic': 'Basic Arithmetic',
        'basic_word_problems': 'Word Problems (Basic)',
        'fractions_decimals': 'Fractions & Decimals',
        'percent_problems': 'Percent Problems',
        'ratio_proportion': 'Ratio & Proportion',
        'time_rates_work': 'Time/Rates/Work',
        'average_word_problems': 'Average Word Problems',
        'algebra_word_problems': 'Algebra Word Problems'
    };
    const desc = {
        'basic_arithmetic': 'Add/subtract/multiply/divide whole numbers',
        'basic_word_problems': 'Translate and solve basic word problems',
        'fractions_decimals': 'Operate on fractions and decimals',
        'percent_problems': 'Compute percents, increases, discounts',
        'ratio_proportion': 'Solve ratios and proportions',
        'time_rates_work': 'Solve rate and work problems',
        'average_word_problems': 'Compute averages from word problems',
        'algebra_word_problems': 'Form equations to solve word problems'
    };
    const topicsAR = [];
    for (const subtopicId in arContent) {
        topicsAR.push({
            id: subtopicId,
            name: names[subtopicId] || subtopicId.replace(/_/g, ' '),
            description: desc[subtopicId] || 'Arithmetic reasoning practice',
            subjectId: 'arithmetic_reasoning',
            hasContent: true
        });
    }
    console.log(`Created ${topicsAR.length} arithmetic topics from content`);
    return topicsAR;
}

// Function to create Reading Comprehension topics from questionRegistry (Patch 20)
function createReadingTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.reading_comprehension) {
        console.warn('Reading comprehension content not loaded');
        return [];
    }
    const rcContent = questionRegistry.reading_comprehension;
    const topicsRC = [];
    for (const subtopicId in rcContent) {
        topicsRC.push({
            id: subtopicId,
            name: 'Reading Comprehension Passages',
            description: 'AFOQT-style reading passages with clustered questions',
            subjectId: 'reading_comprehension',
            hasContent: true
        });
    }
    console.log(`Created ${topicsRC.length} reading topics from content`);
    return topicsRC;
}

// Function to create Instrument Comprehension topics from questionRegistry (Patch 21)
function createInstrumentTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.instrument_comprehension) {
        console.warn('Instrument comprehension content not loaded');
        return [];
    }
    const icContent = questionRegistry.instrument_comprehension;
    const topicsIC = [];
    for (const subtopicId in icContent) {
        topicsIC.push({
            id: subtopicId,
            name: 'Basic Attitude and Heading',
            description: 'Interpret aircraft instruments - attitude indicator, compass, and heading',
            subjectId: 'instrument_comprehension',
            hasContent: true
        });
    }
    console.log(`Created ${topicsIC.length} instrument topics from content`);
    return topicsIC;
}

// Function to create Table Reading topics from questionRegistry (Patch 22)
function createTableReadingTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.table_reading) {
        console.warn('Table reading content not loaded');
        return [];
    }
    const trContent = questionRegistry.table_reading;
    const topicsTR = [];
    for (const subtopicId in trContent) {
        topicsTR.push({
            id: subtopicId,
            name: 'Basic Lookup',
            description: 'Locate values quickly in data tables using X and Y coordinates',
            subjectId: 'table_reading',
            hasContent: true
        });
    }
    console.log(`Created ${topicsTR.length} table reading topics from content`);
    return topicsTR;
}

// Function to create Block Counting topics from questionRegistry
function createBlockCountingTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.block_counting) {
        console.warn('Block counting content not loaded');
        return [];
    }
    const bcContent = questionRegistry.block_counting;
    const topicsBC = [];
    for (const subtopicId in bcContent) {
        topicsBC.push({
            id: subtopicId,
            name: 'Isometric Block Counting',
            description: 'Count cubes in isometric stacks including hidden support blocks',
            subjectId: 'block_counting',
            hasContent: true
        });
    }
    console.log(`Created ${topicsBC.length} block counting topics from content`);
    return topicsBC;
}

// Function to create Vocabulary topics from questionRegistry (Patch 18 - Word Knowledge & Verbal Analogies)
function createVocabularyTopicsFromRegistry() {
    const vocabTopics = [];
    
    // Topic name mapping
    const topicNames = {
        'synonyms': 'Synonyms',
        'antonyms': 'Antonyms',
        'verbal_analogies': 'Verbal Analogies',
        'vocabulary_in_context': 'Vocabulary in Context',
        'confusing_word_pairs': 'Confusing Word Pairs',
        'high_frequency_vocab': 'High Frequency Vocabulary',
        'sentence_completion': 'Sentence Completion',
        'word_roots_affixes': 'Word Roots & Affixes'
    };
    
    const topicDescriptions = {
        'synonyms': 'Words with similar meanings',
        'antonyms': 'Words with opposite meanings',
        'verbal_analogies': 'Word relationship patterns',
        'vocabulary_in_context': 'Word meanings from context',
        'confusing_word_pairs': 'Commonly confused words',
        'high_frequency_vocab': 'Common AFOQT vocabulary words',
        'sentence_completion': 'Fill in the blank with best word',
        'word_roots_affixes': 'Latin and Greek word origins'
    };
    
    // Check word_knowledge content
    if (questionRegistry && questionRegistry.word_knowledge) {
        const wkContent = questionRegistry.word_knowledge;
        for (const subtopicId in wkContent) {
            vocabTopics.push({
                id: subtopicId,
                name: topicNames[subtopicId] || subtopicId.replace(/_/g, ' '),
                description: topicDescriptions[subtopicId] || 'Vocabulary practice',
                subjectId: 'word_knowledge',
                isOfficialAfoqtTopic: true,
                hasContent: true
            });
        }
    }
    
    // Check verbal_analogies content
    if (questionRegistry && questionRegistry.verbal_analogies) {
        const vaContent = questionRegistry.verbal_analogies;
        for (const subtopicId in vaContent) {
            vocabTopics.push({
                id: subtopicId,
                name: topicNames[subtopicId] || 'Verbal Analogies',
                description: topicDescriptions[subtopicId] || 'Word relationship patterns',
                subjectId: 'verbal_analogies',
                isOfficialAfoqtTopic: true,
                hasContent: true
            });
        }
    }
    
    if (vocabTopics.length === 0) {
        console.warn('Vocabulary content not loaded, using procedural fallbacks');
        return vocabularyTopics;
    }
    
    console.log(`Created ${vocabTopics.length} vocabulary topics from content`);
    return vocabTopics;
}

// Function to create Physical Science topics from questionRegistry
function createPhysicalScienceTopicsFromRegistry() {
    if (!questionRegistry || !questionRegistry.physical_science) {
        console.warn('Physical science content not loaded, using procedural fallbacks');
        return scienceTopics;
    }
    
    const psContent = questionRegistry.physical_science;
    const dynamicTopics = [];
    
    // Topic name mapping (remove 'physical_science_' prefix from subtopicId)
    const topicNames = {
        'chemistry_basics': 'Chemistry Basics',
        'earth_space': 'Earth & Space Science',
        'electricity_magnetism': 'Electricity & Magnetism',
        'energy_heat': 'Energy & Heat',
        'fluids_pressure': 'Fluids & Pressure',
        'motion_mechanics': 'Motion & Mechanics',
        'optics_waves': 'Optics & Waves'
    };
    
    const topicDescriptions = {
        'chemistry_basics': 'Chemical reactions, compounds, and periodic table',
        'earth_space': 'Geology, astronomy, and Earth systems',
        'electricity_magnetism': 'Electric circuits, magnetism, and electromagnetic fields',
        'energy_heat': 'Energy forms, conservation, and thermodynamics',
        'fluids_pressure': 'Fluid mechanics, buoyancy, and pressure systems',
        'motion_mechanics': 'Kinematics, forces, and Newton\'s laws',
        'optics_waves': 'Light, sound, and wave properties'
    };
    
    // Create topics from loaded content
    for (const subtopicId in psContent) {
        // Remove 'physical_science_' prefix if present
        const cleanId = subtopicId.replace('physical_science_', '');
        dynamicTopics.push({
            id: cleanId,
            name: topicNames[cleanId] || cleanId.replace(/_/g, ' '),
            description: topicDescriptions[cleanId] || 'Physical science practice',
            subjectId: 'physical_science',
            hasContent: true
        });
    }
    
    console.log(`Created ${dynamicTopics.length} physical science topics from content`);
    return dynamicTopics;
}

// Combine all topics and add subject IDs
let topics = [
    ...vocabularyTopics,
    ...readingTopics,
    ...scienceTopics,
    ...situationalTopics,
    ...aviationTopics,
    ...instrumentTopics,
    ...tableTopics,
    ...blockTopics
];

// ============================================================================
// Web Audio Sound Effects - 12-bit Sci-Fi RPG Style
// ============================================================================
let audioContext = null;

function getAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContext;
}

// Utility function to enable audio after user interaction (required by browser autoplay policy)
// Returns a function that should be called on user interaction (click/keydown)
function createAudioEnabler(onEnabled) {
    let audioEnabled = false;
    
    const enableAudio = () => {
        if (!audioEnabled) {
            audioEnabled = true;
            const ctx = getAudioContext();
            if (ctx.state === 'suspended') {
                ctx.resume().then(() => {
                    console.log('Audio context resumed');
                    if (onEnabled) onEnabled();
                }).catch(e => console.warn('Could not resume audio:', e));
            } else if (onEnabled) {
                onEnabled();
            }
        }
    };
    
    // Try to enable immediately (will work if autoplay is allowed)
    const ctx = getAudioContext();
    if (ctx.state === 'running') {
        audioEnabled = true;
        if (onEnabled) onEnabled();
    }
    
    return enableAudio;
}

function playBeep(frequency, duration, type = 'sine', gainValue = 0.1, delay = 0) {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = type;
        
        // Apply master volume and category volume
        const masterVol = state.settings.volumes.master || 0.5;
        gainNode.gain.value = gainValue * masterVol;
        
        const startTime = ctx.currentTime + delay;
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    } catch (e) {
        console.warn('Audio not available:', e);
    }
}

// Enhanced sci-fi RPG sound effect with pitch sweep
function playSweep(startFreq, endFreq, duration, type = 'square', gainValue = 0.12, delay = 0) {
    try {
        const ctx = getAudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        oscillator.type = type;
        
        // Apply master volume
        const masterVol = state.settings.volumes.master || 0.5;
        gainNode.gain.value = gainValue * masterVol;
        
        const startTime = ctx.currentTime + delay;
        oscillator.frequency.setValueAtTime(startFreq, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
    } catch (e) {
        console.warn('Audio not available:', e);
    }
}

function playSfx(kind) {
    // Get category volume (default to 0.5 if not set)
    const categoryVol = state.settings.volumes[kind] || 0.5;
    const masterVol = state.settings.volumes.master || 0.5;
    const totalVol = categoryVol * masterVol;
    
    // If volume is 0, don't play
    if (totalVol === 0) return;
    
    // Helper to apply volume to gain values
    const applyVol = (baseGain) => baseGain * totalVol;
    
    switch (kind) {
        case 'boot':
            // Boot screen - mysterious awakening with crystal chimes
            playBeep(523, 0.08, 'sine', applyVol(0.15), 0);        // C
            playBeep(659, 0.08, 'sine', applyVol(0.15), 0.09);     // E
            playBeep(784, 0.08, 'sine', applyVol(0.15), 0.18);     // G
            playBeep(1047, 0.15, 'sine', applyVol(0.18), 0.27);    // C (high)
            playSweep(1047, 1568, 0.3, 'sine', applyVol(0.12), 0.42); // Magical shimmer
            break;
        case 'start':
            // Quiz start - epic battle start fanfare
            playBeep(392, 0.1, 'triangle', applyVol(0.15), 0);      // G
            playBeep(523, 0.1, 'triangle', applyVol(0.15), 0.11);   // C
            playBeep(659, 0.1, 'triangle', applyVol(0.15), 0.22);   // E
            playBeep(784, 0.15, 'triangle', applyVol(0.18), 0.33);  // G
            playBeep(1047, 0.2, 'sine', applyVol(0.18), 0.48);      // C (high)
            break;
        case 'correct':
            // Correct answer - victorious chime progression
            playBeep(659, 0.1, 'sine', applyVol(0.16), 0);          // E
            playBeep(784, 0.1, 'sine', applyVol(0.16), 0.11);       // G
            playBeep(1047, 0.12, 'sine', applyVol(0.16), 0.22);     // C
            playBeep(1319, 0.18, 'sine', applyVol(0.18), 0.34);     // E (high)
            // Add a sparkle effect
            playBeep(1568, 0.08, 'sine', applyVol(0.12), 0.52);
            playBeep(2093, 0.08, 'sine', applyVol(0.10), 0.56);
            break;
        case 'wrong':
            // Wrong answer - gentle but clear negative melody
            playBeep(440, 0.12, 'triangle', applyVol(0.14), 0);     // A
            playBeep(415, 0.12, 'triangle', applyVol(0.14), 0.13);  // G#
            playBeep(392, 0.12, 'triangle', applyVol(0.14), 0.26);  // G
            playBeep(349, 0.2, 'sine', applyVol(0.16), 0.39);       // F
            break;
        case 'nav':
            // Navigation - quick crystalline blip
            playBeep(1047, 0.04, 'sine', applyVol(0.12), 0);
            playBeep(1319, 0.03, 'sine', applyVol(0.10), 0.04);
            break;
        case 'player':
            // Player select - character theme
            playBeep(523, 0.1, 'triangle', applyVol(0.12), 0);
            playBeep(659, 0.1, 'triangle', applyVol(0.12), 0.11);
            playBeep(784, 0.15, 'sine', applyVol(0.14), 0.22);
            playBeep(1047, 0.12, 'sine', applyVol(0.12), 0.37);
            break;
        case 'levelup':
            // Level up - grand Final Fantasy style fanfare
            playBeep(523, 0.12, 'triangle', applyVol(0.16), 0);      // C
            playBeep(659, 0.12, 'triangle', applyVol(0.16), 0.13);   // E
            playBeep(784, 0.12, 'triangle', applyVol(0.16), 0.26);   // G
            playBeep(1047, 0.18, 'sine', applyVol(0.18), 0.39);      // C
            playBeep(1319, 0.18, 'sine', applyVol(0.18), 0.57);      // E
            playBeep(1568, 0.25, 'sine', applyVol(0.18), 0.75);      // G
            // Victory shimmer
            playSweep(1568, 2093, 0.4, 'sine', applyVol(0.14), 1.0);
            // Final chord
            playBeep(1047, 0.3, 'sine', applyVol(0.12), 1.4);
            playBeep(1319, 0.3, 'sine', applyVol(0.12), 1.4);
            playBeep(1568, 0.3, 'sine', applyVol(0.12), 1.4);
            break;
        case 'modal-open':
        case 'modal':
            // Modal open - upward magical sweep
            playSweep(523, 1047, 0.2, 'sine', applyVol(0.12), 0);
            playBeep(1319, 0.1, 'sine', applyVol(0.10), 0.2);
            break;
        case 'modal-close':
            // Modal close - downward magical sweep
            playSweep(1047, 523, 0.18, 'sine', applyVol(0.12), 0);
            break;
        case 'hover':
            // Hover - subtle menu cursor sound
            playBeep(1568, 0.02, 'sine', applyVol(0.08), 0);
            break;
        case 'select':
            // Selection - positive confirmation
            playBeep(1047, 0.08, 'sine', applyVol(0.12), 0);
            playBeep(1319, 0.1, 'sine', applyVol(0.12), 0.08);
            break;
        case 'timer-warning':
            // Timer running low - urgent but musical
            playBeep(880, 0.1, 'triangle', applyVol(0.14), 0);
            playBeep(880, 0.1, 'triangle', applyVol(0.14), 0.25);
            break;
        case 'complete':
            // Quiz complete - celebration melody
            playBeep(523, 0.12, 'triangle', applyVol(0.14), 0);
            playBeep(659, 0.12, 'triangle', applyVol(0.14), 0.13);
            playBeep(784, 0.12, 'triangle', applyVol(0.14), 0.26);
            playBeep(659, 0.12, 'triangle', applyVol(0.14), 0.39);
            playBeep(784, 0.18, 'sine', applyVol(0.16), 0.52);
            playBeep(1047, 0.35, 'sine', applyVol(0.18), 0.7);
            // Victory sparkles
            playBeep(1568, 0.1, 'sine', applyVol(0.12), 1.05);
            playBeep(2093, 0.1, 'sine', applyVol(0.10), 1.1);
            break;
    }
}

// ============================================================================
// Background Music System
// ============================================================================
let bgMusicOscillator = null;
let bgMusicGain = null;
let bgMusicInterval = null;

function startBackgroundMusic() {
    if (!state.settings.bgMusicEnabled) return;
    if (bgMusicOscillator) return; // Already playing
    
    try {
        const ctx = getAudioContext();
        
        // Create oscillator and gain nodes
        bgMusicOscillator = ctx.createOscillator();
        bgMusicGain = ctx.createGain();
        
        bgMusicOscillator.connect(bgMusicGain);
        bgMusicGain.connect(ctx.destination);
        
        // Atmospheric ambient music sequence
        const notes = [
            { freq: 130.81, duration: 2 },  // C3
            { freq: 155.56, duration: 2 },  // Eb3
            { freq: 196.00, duration: 2 },  // G3
            { freq: 233.08, duration: 2 },  // Bb3
            { freq: 261.63, duration: 2 },  // C4
            { freq: 196.00, duration: 2 },  // G3
            { freq: 155.56, duration: 2 },  // Eb3
            { freq: 130.81, duration: 2 }   // C3
        ];
        
        let noteIndex = 0;
        const masterVol = state.settings.volumes.master || 0.5;
        const bgMusicVol = state.settings.volumes.bgMusic || 0.3;
        
        bgMusicOscillator.type = 'sine';
        bgMusicOscillator.frequency.value = notes[0].freq;
        bgMusicGain.gain.value = bgMusicVol * masterVol * 0.15; // Keep it very subtle
        
        bgMusicOscillator.start();
        
        // Cycle through notes for ambient effect
        bgMusicInterval = setInterval(() => {
            if (!state.settings.bgMusicEnabled) {
                stopBackgroundMusic();
                return;
            }
            
            noteIndex = (noteIndex + 1) % notes.length;
            const note = notes[noteIndex];
            
            // Smoothly transition to next note
            bgMusicOscillator.frequency.exponentialRampToValueAtTime(
                note.freq, 
                ctx.currentTime + note.duration * 0.8
            );
        }, 2000);
        
    } catch (e) {
        console.warn('Background music not available:', e);
    }
}

function stopBackgroundMusic() {
    if (bgMusicOscillator) {
        try {
            bgMusicOscillator.stop();
        } catch (e) {
            // Already stopped
        }
        bgMusicOscillator = null;
    }
    if (bgMusicGain) {
        bgMusicGain = null;
    }
    if (bgMusicInterval) {
        clearInterval(bgMusicInterval);
        bgMusicInterval = null;
    }
}

function toggleBackgroundMusic(enabled) {
    state.settings.bgMusicEnabled = enabled;
    saveSettings();
    if (enabled) {
        startBackgroundMusic();
    } else {
        stopBackgroundMusic();
    }
}

// ============================================================================
// Achievements and Challenges System
// ============================================================================
const achievements = [
    // Beginner Achievements (1-10)
    {
        id: 'first_steps',
        name: 'First Steps',
        description: 'Complete your first quiz',
        icon: '⚔️',
        condition: (player) => player.sessions && player.sessions.length >= 1
    },
    {
        id: 'novice_warrior',
        name: 'Novice Warrior',
        description: 'Complete 5 quizzes',
        icon: '🛡️',
        condition: (player) => player.sessions && player.sessions.length >= 5
    },
    {
        id: 'apprentice_mage',
        name: 'Apprentice Mage',
        description: 'Complete 10 quizzes',
        icon: '🔮',
        condition: (player) => player.sessions && player.sessions.length >= 10
    },
    {
        id: 'bronze_shield',
        name: 'Bronze Shield',
        description: 'Reach level 5',
        icon: '🥉',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 5;
        }
    },
    {
        id: 'silver_blade',
        name: 'Silver Blade',
        description: 'Reach level 10',
        icon: '🥈',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 10;
        }
    },
    {
        id: 'gold_crown',
        name: 'Gold Crown',
        description: 'Reach level 15',
        icon: '🥇',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 15;
        }
    },
    {
        id: 'perfect_score',
        name: 'Flawless Victory',
        description: 'Get 100% on any quiz',
        icon: '💯',
        condition: (player) => {
            return player.sessions.some(s => s.score === s.total);
        }
    },
    {
        id: 'speed_demon',
        name: 'Lightning Strike',
        description: 'Average less than 30 seconds per question',
        icon: '⚡',
        condition: (player) => {
            return player.sessions.some(s => s.avgTime && s.avgTime < 30);
        }
    },
    {
        id: 'first_blood',
        name: 'First Blood',
        description: 'Score 80%+ on your first quiz',
        icon: '🩸',
        condition: (player) => {
            return player.sessions.length >= 1 && player.sessions[0].score / player.sessions[0].total >= 0.8;
        }
    },
    {
        id: 'quick_learner',
        name: 'Quick Learner',
        description: 'Complete 3 quizzes in beginner mode',
        icon: '📖',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'beginner').length >= 3;
        }
    },
    
    // Subject Mastery Achievements (11-20)
    {
        id: 'math_warrior',
        name: 'Math Warrior',
        description: 'Complete 10 math quizzes',
        icon: '🔢',
        condition: (player) => {
            const mathSessions = player.sessions.filter(s => s.topicId && (
                mathTopics.find(t => t.id === s.topicId)
            ));
            return mathSessions.length >= 10;
        }
    },
    {
        id: 'word_wizard',
        name: 'Word Wizard',
        description: 'Complete 10 vocabulary quizzes',
        icon: '📚',
        condition: (player) => {
            const verbalSessions = player.sessions.filter(s => s.topicId && (
                vocabularyTopics.find(t => t.id === s.topicId)
            ));
            return verbalSessions.length >= 10;
        }
    },
    {
        id: 'reading_champion',
        name: 'Reading Champion',
        description: 'Complete 10 reading quizzes',
        icon: '📜',
        condition: (player) => {
            const readingSessions = player.sessions.filter(s => s.topicId && (
                readingTopics.find(t => t.id === s.topicId)
            ));
            return readingSessions.length >= 10;
        }
    },
    {
        id: 'science_sage',
        name: 'Science Sage',
        description: 'Complete 10 science quizzes',
        icon: '🧪',
        condition: (player) => {
            const scienceSessions = player.sessions.filter(s => s.topicId && (
                scienceTopics.find(t => t.id === s.topicId)
            ));
            return scienceSessions.length >= 10;
        }
    },
    {
        id: 'all_rounder',
        name: 'Renaissance Soul',
        description: 'Complete at least 5 quizzes in each subject',
        icon: '🌟',
        condition: (player) => {
            const subjectCounts = {};
            player.sessions.forEach(s => {
                const subject = getSubjectForTopic(s.topicId);
                if (subject) {
                    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
                }
            });
            const uniqueSubjects = Object.values(subjectCounts).filter(c => c >= 5);
            return uniqueSubjects.length >= subjects.length - 1;
        }
    },
    {
        id: 'math_master',
        name: 'Arithmetic Archmage',
        description: 'Complete 25 math quizzes',
        icon: '🧮',
        condition: (player) => {
            const mathSessions = player.sessions.filter(s => s.topicId && (
                mathTopics.find(t => t.id === s.topicId)
            ));
            return mathSessions.length >= 25;
        }
    },
    {
        id: 'vocabulary_virtuoso',
        name: 'Vocabulary Virtuoso',
        description: 'Complete 25 vocabulary quizzes',
        icon: '✍️',
        condition: (player) => {
            const verbalSessions = player.sessions.filter(s => s.topicId && (
                vocabularyTopics.find(t => t.id === s.topicId)
            ));
            return verbalSessions.length >= 25;
        }
    },
    {
        id: 'knowledge_keeper',
        name: 'Knowledge Keeper',
        description: 'Complete at least 1 quiz in all subjects',
        icon: '🗝️',
        condition: (player) => {
            const subjectCounts = {};
            player.sessions.forEach(s => {
                const subject = getSubjectForTopic(s.topicId);
                if (subject) {
                    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
                }
            });
            return Object.keys(subjectCounts).length >= subjects.length - 1;
        }
    },
    {
        id: 'versatile_veteran',
        name: 'Versatile Veteran',
        description: 'Complete 10 quizzes in 3 different subjects',
        icon: '🎭',
        condition: (player) => {
            const subjectCounts = {};
            player.sessions.forEach(s => {
                const subject = getSubjectForTopic(s.topicId);
                if (subject) {
                    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
                }
            });
            return Object.values(subjectCounts).filter(c => c >= 10).length >= 3;
        }
    },
    {
        id: 'subject_specialist',
        name: 'Subject Specialist',
        description: 'Complete 50 quizzes in one subject',
        icon: '🎯',
        condition: (player) => {
            const subjectCounts = {};
            player.sessions.forEach(s => {
                const subject = getSubjectForTopic(s.topicId);
                if (subject) {
                    subjectCounts[subject] = (subjectCounts[subject] || 0) + 1;
                }
            });
            return Object.values(subjectCounts).some(c => c >= 50);
        }
    },
    
    // Progression Achievements (21-30)
    {
        id: 'iron_rank',
        name: 'Iron Rank',
        description: 'Reach level 20',
        icon: '⚙️',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 20;
        }
    },
    {
        id: 'platinum_tier',
        name: 'Platinum Tier',
        description: 'Reach level 25',
        icon: '💎',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 25;
        }
    },
    {
        id: 'diamond_league',
        name: 'Diamond League',
        description: 'Reach level 30',
        icon: '💠',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 30;
        }
    },
    {
        id: 'mythical_hero',
        name: 'Mythical Hero',
        description: 'Reach level 40',
        icon: '🌠',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 40;
        }
    },
    {
        id: 'legendary_champion',
        name: 'Legendary Champion',
        description: 'Reach level 50',
        icon: '👑',
        condition: (player) => {
            const totals = computePlayerTotals(player);
            return totals.level >= 50;
        }
    },
    {
        id: 'quiz_apprentice',
        name: 'Quiz Apprentice',
        description: 'Complete 25 quizzes',
        icon: '🎓',
        condition: (player) => player.sessions && player.sessions.length >= 25
    },
    {
        id: 'quiz_journeyman',
        name: 'Quiz Journeyman',
        description: 'Complete 50 quizzes',
        icon: '🏅',
        condition: (player) => player.sessions && player.sessions.length >= 50
    },
    {
        id: 'quiz_expert',
        name: 'Quiz Expert',
        description: 'Complete 100 quizzes',
        icon: '🏆',
        condition: (player) => player.sessions && player.sessions.length >= 100
    },
    {
        id: 'quiz_master',
        name: 'Quiz Master',
        description: 'Complete 200 quizzes',
        icon: '🎖️',
        condition: (player) => player.sessions && player.sessions.length >= 200
    },
    {
        id: 'quiz_grandmaster',
        name: 'Quiz Grandmaster',
        description: 'Complete 500 quizzes',
        icon: '👹',
        condition: (player) => player.sessions && player.sessions.length >= 500
    },
    
    // Difficulty Achievements (31-40)
    {
        id: 'advanced_initiate',
        name: 'Advanced Initiate',
        description: 'Complete 5 advanced quizzes',
        icon: '🎪',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'advanced').length >= 5;
        }
    },
    {
        id: 'advanced_warrior',
        name: 'Advanced Warrior',
        description: 'Complete 15 advanced quizzes',
        icon: '🗡️',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'advanced').length >= 15;
        }
    },
    {
        id: 'expert_initiate',
        name: 'Expert Initiate',
        description: 'Complete 5 expert quizzes',
        icon: '🔱',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'expert').length >= 5;
        }
    },
    {
        id: 'expert_slayer',
        name: 'Expert Slayer',
        description: 'Complete 15 expert quizzes',
        icon: '⚔️',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'expert').length >= 15;
        }
    },
    {
        id: 'challenge_seeker',
        name: 'Challenge Seeker',
        description: 'Complete 30 expert quizzes',
        icon: '🐉',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'expert').length >= 30;
        }
    },
    {
        id: 'ace_student',
        name: 'Ace Student',
        description: 'Score 90%+ on 5 expert quizzes',
        icon: '🌟',
        condition: (player) => {
            const expertSessions = player.sessions.filter(s => 
                s.difficulty === 'expert' && (s.score / s.total) >= 0.9
            );
            return expertSessions.length >= 5;
        }
    },
    {
        id: 'ace_pilot',
        name: 'Ace Pilot',
        description: 'Score 90%+ on 10 expert quizzes',
        icon: '✈️',
        condition: (player) => {
            const expertSessions = player.sessions.filter(s => 
                s.difficulty === 'expert' && (s.score / s.total) >= 0.9
            );
            return expertSessions.length >= 10;
        }
    },
    {
        id: 'perfect_expert',
        name: 'Perfect Expert',
        description: 'Get 100% on an expert quiz',
        icon: '🎆',
        condition: (player) => {
            return player.sessions.some(s => s.difficulty === 'expert' && s.score === s.total);
        }
    },
    {
        id: 'unstoppable',
        name: 'Unstoppable Force',
        description: 'Score 100% on 5 expert quizzes',
        icon: '🔥',
        condition: (player) => {
            return player.sessions.filter(s => s.difficulty === 'expert' && s.score === s.total).length >= 5;
        }
    },
    {
        id: 'difficulty_master',
        name: 'Difficulty Master',
        description: 'Complete 10 quizzes at each difficulty',
        icon: '🎲',
        condition: (player) => {
            const beginner = player.sessions.filter(s => s.difficulty === 'beginner').length >= 10;
            const advanced = player.sessions.filter(s => s.difficulty === 'advanced').length >= 10;
            const expert = player.sessions.filter(s => s.difficulty === 'expert').length >= 10;
            return beginner && advanced && expert;
        }
    },
    
    // Performance Achievements (41-50)
    {
        id: 'consistency_king',
        name: 'Consistency King',
        description: 'Score 80%+ on 5 consecutive quizzes',
        icon: '👑',
        condition: (player) => {
            for (let i = 0; i <= player.sessions.length - 5; i++) {
                const consecutive = player.sessions.slice(i, i + 5);
                if (consecutive.every(s => (s.score / s.total) >= 0.8)) {
                    return true;
                }
            }
            return false;
        }
    },
    {
        id: 'winning_streak',
        name: 'Winning Streak',
        description: 'Score 70%+ on 10 consecutive quizzes',
        icon: '🔗',
        condition: (player) => {
            for (let i = 0; i <= player.sessions.length - 10; i++) {
                const consecutive = player.sessions.slice(i, i + 10);
                if (consecutive.every(s => (s.score / s.total) >= 0.7)) {
                    return true;
                }
            }
            return false;
        }
    },
    {
        id: 'speed_runner',
        name: 'Speed Runner',
        description: 'Average less than 20 seconds per question',
        icon: '💨',
        condition: (player) => {
            return player.sessions.some(s => s.avgTime && s.avgTime < 20);
        }
    },
    {
        id: 'lightning_reflexes',
        name: 'Lightning Reflexes',
        description: 'Average less than 15 seconds per question',
        icon: '⚡',
        condition: (player) => {
            return player.sessions.some(s => s.avgTime && s.avgTime < 15);
        }
    },
    {
        id: 'perfectionist',
        name: 'Perfectionist',
        description: 'Get 100% on 3 quizzes',
        icon: '💫',
        condition: (player) => {
            return player.sessions.filter(s => s.score === s.total).length >= 3;
        }
    },
    {
        id: 'flawless_champion',
        name: 'Flawless Champion',
        description: 'Get 100% on 10 quizzes',
        icon: '🌈',
        condition: (player) => {
            return player.sessions.filter(s => s.score === s.total).length >= 10;
        }
    },
    {
        id: 'high_scorer',
        name: 'High Scorer',
        description: 'Score 95%+ on any quiz',
        icon: '🎯',
        condition: (player) => {
            return player.sessions.some(s => (s.score / s.total) >= 0.95);
        }
    },
    {
        id: 'elite_performer',
        name: 'Elite Performer',
        description: 'Score 95%+ on 5 quizzes',
        icon: '⭐',
        condition: (player) => {
            return player.sessions.filter(s => (s.score / s.total) >= 0.95).length >= 5;
        }
    },
    {
        id: 'night_owl',
        name: 'Night Owl',
        description: 'Complete a quiz after midnight',
        icon: '🦉',
        condition: (player) => {
            return player.sessions.some(s => {
                const hour = new Date(s.timestamp).getHours();
                return hour >= 0 && hour < 6;
            });
        }
    },
    {
        id: 'ultimate_scholar',
        name: 'Ultimate Scholar',
        description: 'Complete 1000 quizzes',
        icon: '🏰',
        condition: (player) => player.sessions && player.sessions.length >= 1000
    }
];

const challenges = [
    {
        id: 'daily_grind',
        name: 'Daily Grind',
        description: 'Complete 5 quizzes today',
        icon: '📅',
        target: 5,
        progressType: 'daily_quizzes'
    },
    {
        id: 'marathon',
        name: 'Marathon',
        description: 'Complete 20 quizzes in one week',
        icon: '🏃',
        target: 20,
        progressType: 'weekly_quizzes'
    },
    {
        id: 'accuracy_challenge',
        name: 'Accuracy Challenge',
        description: 'Score 80%+ on 5 consecutive quizzes',
        icon: '🎯',
        target: 5,
        progressType: 'consecutive_80plus'
    },
    {
        id: 'subject_mastery',
        name: 'Subject Mastery',
        description: 'Complete all topics in one subject',
        icon: '📖',
        target: 1,
        progressType: 'complete_subject'
    }
];

function getSubjectForTopic(topicId) {
    // Use the global topics array which contains all loaded topics
    const topic = topics.find(t => t.id === topicId);
    if (topic && topic.subjectId) {
        return topic.subjectId;
    }
    
    // Fallback to legacy lookup
    if (mathTopics.find(t => t.id === topicId)) return 'math';
    if (vocabularyTopics.find(t => t.id === topicId)) return 'verbal';
    if (readingTopics.find(t => t.id === topicId)) return 'reading';
    if (scienceTopics.find(t => t.id === topicId)) return 'physical_science';
    return null;
}

function checkAchievements(player) {
    if (!player.achievements) {
        player.achievements = [];
    }
    
    const newAchievements = [];
    achievements.forEach(achievement => {
        if (!player.achievements.includes(achievement.id)) {
            if (achievement.condition(player)) {
                player.achievements.push(achievement.id);
                newAchievements.push(achievement);
            }
        }
    });
    
    return newAchievements;
}

function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-content">
            <div class="achievement-title">Achievement Unlocked!</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-desc">${achievement.description}</div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Play achievement sound
    playSfx('levelup');
    
    // Remove after animation
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

function updateChallengeProgress(player, progressType, value = 1) {
    if (!player.challengeProgress) {
        player.challengeProgress = {};
    }
    
    if (!player.challengeProgress[progressType]) {
        player.challengeProgress[progressType] = 0;
    }
    
    player.challengeProgress[progressType] += value;
    savePlayers(state.players);
}

// ============================================================================
// Utility Functions
// ============================================================================
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function formatTime(seconds) {
    return seconds.toFixed(1);
}

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleString();
}

// ============================================================================
// RPG Character Status System
// ============================================================================
function computePlayerTotals(player) {
    const stats = player.stats || {};
    let totalStatPoints = 0;
    for (const topicId in stats) {
        totalStatPoints += stats[topicId].statPoints || 0;
    }
    const level = 1 + Math.floor(totalStatPoints / 5);
    const pointsIntoLevel = totalStatPoints % 5;
    const pointsToNextLevel = 5 - pointsIntoLevel;
    return { totalStatPoints, level, pointsIntoLevel, pointsToNextLevel };
}

function updatePlayerStats(player, topicId, correctCount, difficulty = 'beginner') {
    // Initialize stats if needed
    if (!player.stats) {
        player.stats = {};
    }
    
    // Initialize topic stats if needed
    if (!player.stats[topicId]) {
        player.stats[topicId] = {
            correctAnswers: 0,
            statPoints: 0
        };
    }
    
    // Calculate level before update
    const oldTotals = computePlayerTotals(player);
    const oldLevel = oldTotals.level;
    
    // XP multipliers based on difficulty
    const multipliers = {
        'beginner': 1.0,
        'advanced': 1.5,
        'expert': 2.0
    };
    
    const multiplier = multipliers[difficulty] || 1.0;
    
    // Update correct answers with multiplier applied
    player.stats[topicId].correctAnswers += correctCount;
    
    // Calculate stat points with difficulty multiplier
    // Base: 1 SP per 5 correct answers, then multiply by difficulty
    const baseStatPoints = Math.floor(player.stats[topicId].correctAnswers / 5);
    player.stats[topicId].statPoints = Math.floor(baseStatPoints * multiplier);
    
    // Calculate level after update
    const newTotals = computePlayerTotals(player);
    const newLevel = newTotals.level;
    
    // Check if leveled up
    if (newLevel > oldLevel) {
        playSfx('levelup');
        // Trigger celebration animation
        createCelebration('levelup');
    }
    
    return player;
}

// ============================================================================
// RPG Equipment System
// ============================================================================
const EQUIPMENT_ITEMS = {
    // HELMETS - Unlock with Math mastery
    helmet_basic: {
        id: 'helmet_basic',
        name: 'Scholar\'s Cap',
        type: 'helmet',
        description: 'Basic headgear for aspiring scholars',
        unlockLevel: 1,
        unlockSubject: null,
        statBonus: { intelligence: 1 },
        sprite: 'cap'
    },
    helmet_math: {
        id: 'helmet_math',
        name: 'Calculator Crown',
        type: 'helmet',
        description: 'Grants +3 INT from mathematical mastery',
        unlockLevel: 5,
        unlockSubject: 'math',
        statBonus: { intelligence: 3 },
        sprite: 'crown'
    },
    helmet_vocab: {
        id: 'helmet_vocab',
        name: 'Wordsmith\'s Circlet',
        type: 'helmet',
        description: 'Enhances verbal prowess +3 CHA',
        unlockLevel: 5,
        unlockSubject: 'vocabulary',
        statBonus: { charisma: 3 },
        sprite: 'circlet'
    },
    
    // ARMOR - Unlock with overall level
    armor_basic: {
        id: 'armor_basic',
        name: 'Student Robes',
        type: 'armor',
        description: 'Simple robes for dedicated students',
        unlockLevel: 1,
        unlockSubject: null,
        statBonus: { defense: 1 },
        sprite: 'robes'
    },
    armor_scholar: {
        id: 'armor_scholar',
        name: 'Scholar\'s Vestments',
        type: 'armor',
        description: '+2 INT, +2 DEF from academic dedication',
        unlockLevel: 10,
        unlockSubject: null,
        statBonus: { intelligence: 2, defense: 2 },
        sprite: 'vestments'
    },
    armor_master: {
        id: 'armor_master',
        name: 'Master\'s Regalia',
        type: 'armor',
        description: '+5 to all stats - true mastery',
        unlockLevel: 20,
        unlockSubject: null,
        statBonus: { intelligence: 5, charisma: 5, defense: 5, wisdom: 5 },
        sprite: 'regalia'
    },
    
    // WEAPONS - Unlock with Science/Reading
    weapon_basic: {
        id: 'weapon_basic',
        name: 'Wooden Stylus',
        type: 'weapon',
        description: 'A simple writing tool',
        unlockLevel: 1,
        unlockSubject: null,
        statBonus: { attack: 1 },
        sprite: 'stylus'
    },
    weapon_science: {
        id: 'weapon_science',
        name: 'Atomic Blade',
        type: 'weapon',
        description: 'Science-powered weapon +4 ATK',
        unlockLevel: 5,
        unlockSubject: 'science',
        statBonus: { attack: 4 },
        sprite: 'blade'
    },
    weapon_reading: {
        id: 'weapon_reading',
        name: 'Tome of Knowledge',
        type: 'weapon',
        description: '+3 WIS from literary mastery',
        unlockLevel: 5,
        unlockSubject: 'reading',
        statBonus: { wisdom: 3 },
        sprite: 'tome'
    },
    
    // ACCESSORIES - Special unlocks
    accessory_speed: {
        id: 'accessory_speed',
        name: 'Quick-Mind Amulet',
        type: 'accessory',
        description: 'Reduces avg answer time by 10%',
        unlockLevel: 8,
        unlockSubject: null,
        statBonus: { speed: 2 },
        sprite: 'amulet'
    },
    accessory_accuracy: {
        id: 'accessory_accuracy',
        name: 'Precision Ring',
        type: 'accessory',
        description: '+5% accuracy bonus',
        unlockLevel: 12,
        unlockSubject: null,
        statBonus: { accuracy: 5 },
        sprite: 'ring'
    },
    accessory_legendary: {
        id: 'accessory_legendary',
        name: 'AFOQT Champion Badge',
        type: 'accessory',
        description: 'Proof of true mastery +10 all',
        unlockLevel: 30,
        unlockSubject: null,
        statBonus: { intelligence: 10, charisma: 10, attack: 10, defense: 10, wisdom: 10 },
        sprite: 'badge'
    }
};

function initializePlayerEquipment(player) {
    if (!player.equipment) {
        player.equipment = {
            helmet: null,
            armor: 'armor_basic',
            weapon: 'weapon_basic',
            accessory: null
        };
    }
    if (!player.unlockedItems) {
        player.unlockedItems = ['helmet_basic', 'armor_basic', 'weapon_basic'];
    }
}

function getUnlockedItems(player) {
    initializePlayerEquipment(player);
    const playerLevel = computePlayerTotals(player).level;
    const subjectLevels = {};
    
    // Calculate level per subject
    if (player.stats) {
        for (const subjectId in player.stats) {
            const statPoints = player.stats[subjectId].statPoints || 0;
            subjectLevels[subjectId] = 1 + Math.floor(statPoints / 5);
        }
    }
    
    const unlocked = [];
    for (const itemId in EQUIPMENT_ITEMS) {
        const item = EQUIPMENT_ITEMS[itemId];
        
        // Check if unlocked
        if (item.unlockSubject) {
            // Requires specific subject level
            const subjectLevel = subjectLevels[item.unlockSubject] || 1;
            if (subjectLevel >= item.unlockLevel) {
                unlocked.push(itemId);
            }
        } else {
            // Requires overall level
            if (playerLevel >= item.unlockLevel) {
                unlocked.push(itemId);
            }
        }
    }
    
    return unlocked;
}

function equipItem(player, itemId) {
    const item = EQUIPMENT_ITEMS[itemId];
    if (!item) return false;
    
    initializePlayerEquipment(player);
    const unlocked = getUnlockedItems(player);
    
    if (!unlocked.includes(itemId)) return false;
    
    player.equipment[item.type] = itemId;
    savePlayers(state.players);
    playSfx('select');
    return true;
}

function unequipItem(player, slot) {
    initializePlayerEquipment(player);
    player.equipment[slot] = null;
    savePlayers(state.players);
    playSfx('nav');
}

function calculateEquipmentBonus(player) {
    initializePlayerEquipment(player);
    const totalBonus = {
        intelligence: 0,
        charisma: 0,
        attack: 0,
        defense: 0,
        wisdom: 0,
        speed: 0,
        accuracy: 0
    };
    
    for (const slot in player.equipment) {
        const itemId = player.equipment[slot];
        if (itemId && EQUIPMENT_ITEMS[itemId]) {
            const item = EQUIPMENT_ITEMS[itemId];
            for (const stat in item.statBonus) {
                totalBonus[stat] = (totalBonus[stat] || 0) + item.statBonus[stat];
            }
        }
    }
    
    return totalBonus;
}

// ============================================================================
// Database Functions (IndexedDB)
// ============================================================================

/**
 * Load all players from database
 * @returns {Promise<Array>}
 */
async function loadPlayers() {
    try {
        const players = await afoqtDB.getAllPlayers();
        
        // For each player, load their sessions
        for (const player of players) {
            const sessions = await afoqtDB.getPlayerSessions(player.id);
            player.sessions = sessions.map(s => {
                // Remove playerId and id from session object to maintain backward compatibility
                const { playerId, id, ...sessionData } = s;
                return sessionData;
            });
        }
        
        return players;
    } catch (e) {
        console.warn('Could not load players from database:', e);
        return [];
    }
}

/**
 * Save all players to database
 * @param {Array} players
 * @returns {Promise<void>}
 */
async function savePlayers(players) {
    try {
        for (const player of players) {
            // Separate sessions from player object
            const sessions = player.sessions || [];
            const playerWithoutSessions = { ...player };
            delete playerWithoutSessions.sessions;
            
            // Save player
            await afoqtDB.savePlayer(playerWithoutSessions);
            
            // Note: Sessions are saved individually when they're created
            // This function is kept for backward compatibility
        }
    } catch (e) {
        console.warn('Could not save players to database:', e);
    }
}

/**
 * Load settings from database
 * @returns {Promise<void>}
 */
async function loadSettings() {
    try {
        const loaded = await afoqtDB.getSettings('global');
        if (loaded) {
            // Merge with defaults to ensure all settings exist
            state.settings = {
                theme: loaded.theme || 'default',
                visualEffects: {
                    glassmorphism: loaded.visualEffects?.glassmorphism ?? true,
                    neonBorders: loaded.visualEffects?.neonBorders ?? true,
                    floatingAnimations: loaded.visualEffects?.floatingAnimations ?? true,
                    gradientEffects: loaded.visualEffects?.gradientEffects ?? true,
                    premiumButtons: loaded.visualEffects?.premiumButtons ?? true
                },
                volumes: {
                    ...state.settings.volumes,
                    ...(loaded.volumes || {})
                },
                bgMusicEnabled: loaded.bgMusicEnabled ?? false
            };
            // Apply the theme immediately
            applyTheme(state.settings.theme);
            // Apply panel style
            applyPanelStyle(state.settings.panelStyle || 'default');
            // Apply UI layout
            applyUILayout(state.settings.uiLayout || 'default');
            // Apply character layout
            applyCharacterLayout(state.settings.characterLayout || 'default');
            // Apply boot animation style
            applyBootAnimation(state.settings.bootAnimation || 'classic');
            // Apply visual effects
            applyVisualEffects();
        }
    } catch (e) {
        console.warn('Could not load settings from database:', e);
    }
}

/**
 * Save settings to database
 * @returns {Promise<void>}
 */
async function saveSettings() {
    try {
        await afoqtDB.saveSettings({ id: 'global', ...state.settings });
    } catch (e) {
        console.warn('Could not save settings to database:', e);
    }
}

// Apply theme to document
function applyTheme(themeName) {
    const root = document.documentElement;
    
    // Remove all existing theme classes
    const allThemes = [
        'theme-default', 'theme-eva01', 'theme-eva02', 'theme-rx0', 'theme-eva03',
        'theme-purple-gundam', 'theme-gray-gundam', 'theme-celestial-pink',
        'theme-blue-terminal', 'theme-green-terminal', 'theme-orange-terminal',
        'theme-red-terminal', 'theme-solo-leveling', 'theme-nova-kit', 'theme-hydra-kit',
        'theme-cyberpunk-purple', 'theme-red-yellow-mech', 'theme-gray-white-gundam',
        'theme-purple-white-gundam', 'theme-wb-mecha', 'theme-yellow-terminal'
    ];
    
    allThemes.forEach(theme => root.classList.remove(theme));
    
    // Add new theme class
    root.classList.add(`theme-${themeName}`);
    
    // Store current theme
    state.settings.theme = themeName;
}

// Apply panel style to all panels
function applyPanelStyle(panelStyle) {
    // Remove all existing panel style classes from all panels
    const allPanels = document.querySelectorAll('.panel');
    const panelStyles = [
        'panel-blue-mech', 'panel-cyberpunk01', 'panel-cyberpunk02', 'panel-gungale',
        'panel-pink-mech', 'panel-purple-mech', 'panel-unicorn', 'panel-wb-mecha',
        'panel-white-scifi01', 'panel-white-scifi02', 'panel-white-scifi03', 
        'panel-word-boxes', 'panel-yellow-mech'
    ];
    
    // Also remove body-level panel style classes for global styling
    const bodyPanelStyles = panelStyles.map(s => `panel-style-${s.replace('panel-', '')}`);
    bodyPanelStyles.forEach(style => document.body.classList.remove(style));
    
    allPanels.forEach(panel => {
        panelStyles.forEach(style => panel.classList.remove(style));
        
        // Add new panel style if not default
        if (panelStyle !== 'default') {
            panel.classList.add(`panel-${panelStyle}`);
        }
    });
    
    // Add body-level class for global styling (buttons, cards, etc.)
    if (panelStyle !== 'default') {
        document.body.classList.add(`panel-style-${panelStyle}`);
    }
    
    // Store current panel style
    state.settings.panelStyle = panelStyle;
}

// Apply visual effects to document
function applyVisualEffects() {
    const root = document.documentElement;
    const effects = state.settings.visualEffects;
    
    // Toggle effect classes on document root
    root.classList.toggle('effect-glassmorphism', effects.glassmorphism);
    root.classList.toggle('effect-neon-borders', effects.neonBorders);
    root.classList.toggle('effect-floating', effects.floatingAnimations);
    root.classList.toggle('effect-gradients', effects.gradientEffects);
    root.classList.toggle('effect-premium-buttons', effects.premiumButtons);
}

// Apply UI layout to body
function applyUILayout(layoutName) {
    const body = document.body;
    
    // Remove all existing layout classes
    const layoutClasses = [
        'layout-aida', 'layout-blue-mech', 'layout-blue-terminal', 'layout-celestial-pink',
        'layout-covert-ops', 'layout-green-terminal', 'layout-nova-kit', 'layout-orange-scifi',
        'layout-orange-terminal', 'layout-pink-mech', 'layout-purple-mech', 
        'layout-yellow-mech', 'layout-yellow-terminal'
    ];
    
    layoutClasses.forEach(cls => body.classList.remove(cls));
    
    // Add new layout class if not default
    if (layoutName !== 'default') {
        body.classList.add(`layout-${layoutName}`);
    }
    
    // Store current layout
    state.settings.uiLayout = layoutName;
}

// Apply character screen layout
function applyCharacterLayout(layoutName) {
    const body = document.body;
    
    // Remove all existing character layout classes
    const charLayoutClasses = [
        'char-equipment-loadout', 'char-gundam-loadout', 'char-primary-stats'
    ];
    
    charLayoutClasses.forEach(cls => body.classList.remove(cls));
    
    // Add new character layout class if not default
    if (layoutName !== 'default') {
        body.classList.add(`char-${layoutName}`);
    }
    
    // Store current character layout
    state.settings.characterLayout = layoutName;
}

// Apply boot animation style
function applyBootAnimation(animationName) {
    const body = document.body;
    
    // Remove all existing boot animation classes
    const bootClasses = [
        'boot-inspiration1', 'boot-inspiration2', 'boot-inspiration3', 'boot-retro-tech'
    ];
    
    bootClasses.forEach(cls => body.classList.remove(cls));
    
    // Add new boot animation class if not classic
    if (animationName !== 'classic') {
        body.classList.add(`boot-${animationName}`);
    }
    
    // Store current boot animation
    state.settings.bootAnimation = animationName;
}

// Preview boot animation
function previewBootAnimation(animationName) {
    // Temporarily apply the boot animation style
    const body = document.body;
    const bootClasses = [
        'boot-inspiration1', 'boot-inspiration2', 'boot-inspiration3', 'boot-retro-tech'
    ];
    
    bootClasses.forEach(cls => body.classList.remove(cls));
    
    if (animationName !== 'classic') {
        body.classList.add(`boot-${animationName}`);
    }
    
    // Show a simplified boot preview
    return new Promise((resolve) => {
        const previewHTML = `
            <div id="boot-preview" style="position: fixed; inset: 0; z-index: 10000; background: #000; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 20px;">
                <div class="boot-screen" style="color: var(--color-primary); font-family: 'Courier New', monospace; text-align: center; padding: 40px;">
                    <div class="boot-logo" style="font-size: 60px; margin-bottom: 30px;">⚡</div>
                    <div class="boot-line" style="margin: 10px 0; animation-delay: 0s;">SYSTEM BOOT PREVIEW</div>
                    <div class="boot-line" style="margin: 10px 0; animation-delay: 0.1s;">▶ INITIALIZING CORE SYSTEMS...</div>
                    <div class="boot-line" style="margin: 10px 0; animation-delay: 0.2s;">▶ LOADING AFOQT QUEST...</div>
                    <div class="boot-line" style="margin: 10px 0; animation-delay: 0.3s;">▶ BOOT ANIMATION: ${animationName.toUpperCase()}</div>
                    <div class="boot-line" style="margin: 10px 0; animation-delay: 0.4s;">✓ PREVIEW COMPLETE</div>
                </div>
                <button class="btn" id="close-boot-preview" style="padding: 12px 30px; font-size: 14px; z-index: 10001;">CLOSE PREVIEW</button>
            </div>
        `;
        
        const previewDiv = document.createElement('div');
        previewDiv.innerHTML = previewHTML;
        document.body.appendChild(previewDiv.firstElementChild);
        
        document.getElementById('close-boot-preview').addEventListener('click', () => {
            document.getElementById('boot-preview').remove();
            // Restore saved boot animation style
            bootClasses.forEach(cls => body.classList.remove(cls));
            if (state.settings.bootAnimation !== 'classic') {
                body.classList.add(`boot-${state.settings.bootAnimation}`);
            }
            resolve();
        });
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            const preview = document.getElementById('boot-preview');
            if (preview) {
                preview.remove();
                bootClasses.forEach(cls => body.classList.remove(cls));
                if (state.settings.bootAnimation !== 'classic') {
                    body.classList.add(`boot-${state.settings.bootAnimation}`);
                }
                resolve();
            }
        }, 5000);
    });
}

// ============================================================================
// Boot Initialization Sequence - Cyberpunk HUD Style with Anime.js
// Fusion of Boot Inspiration 2 (Arasaka/Red HUD) + Boot Inspiration 3 (3D Rotating Logo)
// ============================================================================

function showBootSequence() {
    return new Promise((resolve) => {
        const bootHTML = `
            <div id="boot-sequence">
                <!-- CRT Scanline Overlay -->
                <div class="boot-crt-overlay"></div>
                
                <!-- Glitch Overlay -->
                <div class="boot-glitch-overlay"></div>
                
                <!-- Hexagonal Grid Background -->
                <div class="boot-hex-grid"></div>
                
                <!-- Data Stream Particles -->
                <div class="boot-data-stream boot-data-stream-left"></div>
                <div class="boot-data-stream boot-data-stream-right"></div>
                
                <!-- Phase 1: HUD Frame & Three Circles Logo -->
                <div class="boot-phase boot-phase-hud">
                    <!-- Corner Brackets with enhanced styling -->
                    <div class="hud-corner hud-corner-tl">
                        <span class="corner-label">SYS.01</span>
                    </div>
                    <div class="hud-corner hud-corner-tr">
                        <span class="corner-label">SYS.02</span>
                    </div>
                    <div class="hud-corner hud-corner-bl">
                        <span class="corner-label">SYS.03</span>
                    </div>
                    <div class="hud-corner hud-corner-br">
                        <span class="corner-label">SYS.04</span>
                    </div>
                    
                    <!-- Side Bars with more segments -->
                    <div class="hud-sidebar hud-sidebar-left">
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                    </div>
                    <div class="hud-sidebar hud-sidebar-right">
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                        <div class="sidebar-segment"></div>
                    </div>
                    
                    <!-- Top Status Bar with binary decoration -->
                    <div class="hud-status-bar hud-status-top">
                        <div class="binary-decoration">01010101</div>
                        <div class="status-bar-line status-bar-left"></div>
                        <span class="status-text">NEURAL LINK ESTABLISHED</span>
                        <div class="status-bar-line status-bar-right"></div>
                        <div class="binary-decoration">10101010</div>
                    </div>
                    
                    <!-- Chevron Indicators with more arrows -->
                    <div class="hud-chevrons hud-chevrons-left">
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                        <span class="chevron">‹</span>
                    </div>
                    <div class="hud-chevrons hud-chevrons-right">
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                        <span class="chevron">›</span>
                    </div>
                    
                    <!-- Three Circles Logo with ring effects -->
                    <div class="boot-logo-container">
                        <div class="boot-circle-outer-ring"></div>
                        <div class="boot-circle boot-circle-1"></div>
                        <div class="boot-circle boot-circle-2"></div>
                        <div class="boot-circle boot-circle-3"></div>
                        <div class="boot-circle-stem"></div>
                        <div class="boot-circle-ring"></div>
                        <div class="boot-circle-pulse"></div>
                    </div>
                    
                    <!-- Hash Decorations -->
                    <div class="hud-hash-marks hud-hash-left">////////////////////</div>
                    <div class="hud-hash-marks hud-hash-right">\\\\\\\\\\\\\\\\\\\\</div>
                    
                    <!-- Bottom Progress Indicator -->
                    <div class="hud-bottom-bar">
                        <div class="bottom-bar-segment"></div>
                        <div class="bottom-bar-segment"></div>
                        <div class="bottom-bar-segment"></div>
                    </div>
                </div>
                
                <!-- Phase 2: 3D Rotating Title -->
                <div class="boot-phase boot-phase-3d-title">
                    <!-- 3D Title Container -->
                    <div class="title-3d-scene">
                        <div class="title-3d-container">
                            <!-- Chromatic aberration layers -->
                            <div class="title-3d-layer title-3d-red">AFOQT Quest</div>
                            <div class="title-3d-layer title-3d-cyan">AFOQT Quest</div>
                            <div class="title-3d-layer title-3d-main">AFOQT Quest</div>
                        </div>
                    </div>
                    
                    <!-- Decorative Frame -->
                    <div class="title-frame">
                        <div class="frame-line frame-top"></div>
                        <div class="frame-line frame-bottom"></div>
                        <div class="frame-bracket frame-bracket-left">›</div>
                        <div class="frame-bracket frame-bracket-right">‹</div>
                    </div>
                    
                    <!-- Status Box -->
                    <div class="boot-status-box">
                        <span class="status-bracket">[</span>
                        <span class="status-box-text">TRAINING PROTOCOL ACTIVE</span>
                        <span class="status-bracket">]</span>
                    </div>
                    
                    <!-- Bottom Chevrons -->
                    <div class="boot-bottom-indicator">
                        <span class="indicator-chevron">‹</span>
                        <span class="indicator-chevron">‹</span>
                    </div>
                </div>
                
                <!-- Phase 3: Final HUD -->
                <div class="boot-phase boot-phase-final">
                    <!-- Coordinate Display -->
                    <div class="boot-coords">
                        <div class="coord-line coord-y"><span class="coord-label">Y:</span> <span class="coord-value">0.00</span></div>
                        <div class="coord-line coord-x"><span class="coord-label">X:</span> <span class="coord-value">0.00</span></div>
                        <div class="coord-line coord-z"><span class="coord-label">Z:</span> <span class="coord-value">0.00</span></div>
                    </div>
                    
                    <!-- Radar/Scanner -->
                    <div class="boot-radar">
                        <div class="radar-ring radar-ring-outer"></div>
                        <div class="radar-ring radar-ring-mid"></div>
                        <div class="radar-ring radar-ring-inner"></div>
                        <div class="radar-sweep"></div>
                        <div class="radar-dot"></div>
                    </div>
                    
                    <!-- Progress Bar -->
                    <div class="boot-progress">
                        <div class="progress-track">
                            <div class="progress-fill"></div>
                        </div>
                        <div class="progress-markers">
                            <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                            <span>|</span><span>|</span><span>|</span><span>|</span><span>|</span>
                        </div>
                    </div>
                    
                    <!-- Version Labels -->
                    <div class="boot-labels">
                        <span class="label-left">USAF TRAINING SYSTEM v2.0</span>
                        <span class="label-right">NEURAL LINK v3.14.159</span>
                    </div>
                </div>
                
                <!-- Skip Button -->
                <button class="boot-skip-btn" id="boot-skip">
                    <span class="skip-text">SKIP</span>
                    <span class="skip-arrow">▶</span>
                </button>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', bootHTML);
        
        const bootSequence = document.getElementById('boot-sequence');
        
        // Enable audio on first interaction
        const enableAudio = createAudioEnabler();
        if (bootSequence) {
            bootSequence.addEventListener('click', enableAudio, { once: true });
            document.addEventListener('keydown', enableAudio, { once: true });
        }
        
        // Skip handler with cleanup
        let isSkipped = false;
        let typingInterval = null;
        
        const cleanupAndSkip = () => {
            if (isSkipped) return;
            isSkipped = true;
            
            // Clear typing interval if running
            if (typingInterval) {
                clearInterval(typingInterval);
                typingInterval = null;
            }
            
            // Remove keyboard listener
            document.removeEventListener('keydown', keyHandler);
            
            const bootSeq = document.getElementById('boot-sequence');
            if (bootSeq) {
                if (hasAnime()) {
                    anime.animate(bootSeq, {
                        opacity: [1, 0],
                        duration: 300,
                        ease: 'outQuad',
                        onComplete: () => {
                            bootSeq.remove();
                            resolve();
                        }
                    });
                } else {
                    bootSeq.remove();
                    resolve();
                }
            } else {
                resolve();
            }
        };
        
        const skipBtn = document.getElementById('boot-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', cleanupAndSkip, { once: true });
        }
        
        // Keyboard skip - listen for any skip key
        const keyHandler = (e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
                cleanupAndSkip();
            }
        };
        document.addEventListener('keydown', keyHandler);
        
        // Run the animation sequence after DOM is ready
        // Use setTimeout to ensure DOM is fully rendered before querying
        setTimeout(() => {
            if (hasAnime()) {
                runAnimeBootSequence(resolve, cleanupAndSkip, (interval) => { typingInterval = interval; });
            } else {
                // Fallback - just show briefly and resolve
                setTimeout(() => {
                    if (!isSkipped) cleanupAndSkip();
                }, 3000);
            }
        }, 50);
    });
}

// Main anime.js boot sequence
function runAnimeBootSequence(resolve, skipBoot, setTypingInterval) {
    const bootSeq = document.getElementById('boot-sequence');
    if (!bootSeq) {
        console.warn('Boot sequence element not found');
        return resolve();
    }
    
    // Phase elements
    const phaseHud = bootSeq.querySelector('.boot-phase-hud');
    const phase3d = bootSeq.querySelector('.boot-phase-3d-title');
    const phaseFinal = bootSeq.querySelector('.boot-phase-final');
    
    // Ensure all phases start hidden (with null checks)
    if (phaseHud) phaseHud.style.opacity = '0';
    if (phase3d) phase3d.style.opacity = '0';
    if (phaseFinal) phaseFinal.style.opacity = '0';
    
    // If essential phases are missing, skip boot
    if (!phaseHud || !phase3d || !phaseFinal) {
        console.warn('Boot sequence phases not found, skipping animation');
        skipBoot();
        return;
    }
    
    // Sound effects
    playSfx('boot');
    
    // ============ PHASE 1: HUD Frame (0-2.2s) ============
    
    // Show HUD phase with fade in
    anime.animate(phaseHud, {
        opacity: [0, 1],
        duration: 300,
        ease: 'outQuart'
    });
    
    // Corner brackets animation
    const corners = phaseHud.querySelectorAll('.hud-corner');
    anime.animate(corners, {
        opacity: [0, 1],
        scale: [0.3, 1],
        duration: 400,
        delay: anime.stagger(100, { start: 100 }),
        ease: 'outBack'
    });
    
    // Sidebar segments
    const leftSegments = phaseHud.querySelectorAll('.hud-sidebar-left .sidebar-segment');
    const rightSegments = phaseHud.querySelectorAll('.hud-sidebar-right .sidebar-segment');
    
    anime.animate(leftSegments, {
        opacity: [0, 0.8],
        scaleY: [0, 1],
        duration: 300,
        delay: anime.stagger(80, { start: 300 }),
        ease: 'outQuart'
    });
    
    anime.animate(rightSegments, {
        opacity: [0, 0.8],
        scaleY: [0, 1],
        duration: 300,
        delay: anime.stagger(80, { start: 350 }),
        ease: 'outQuart'
    });
    
    // Status bar
    const statusBar = phaseHud.querySelector('.hud-status-bar');
    const statusLines = phaseHud.querySelectorAll('.status-bar-line');
    const statusText = phaseHud.querySelector('.status-text');
    
    anime.animate(statusBar, {
        opacity: [0, 1],
        duration: 400,
        delay: 500,
        ease: 'outQuart'
    });
    
    anime.animate(statusLines[0], {
        scaleX: [0, 1],
        duration: 500,
        delay: 600,
        ease: 'outQuart'
    });
    
    anime.animate(statusLines[1], {
        scaleX: [0, 1],
        duration: 500,
        delay: 650,
        ease: 'outQuart'
    });
    
    // Status text typing effect with interval tracking for cleanup
    if (statusText) {
        const text = statusText.textContent;
        statusText.textContent = '';
        statusText.style.opacity = '1';
        let charIndex = 0;
        const typeInterval = setInterval(() => {
            if (charIndex < text.length) {
                statusText.textContent += text[charIndex];
                charIndex++;
            } else {
                clearInterval(typeInterval);
            }
        }, 40);
        
        // Pass interval reference for cleanup on skip
        if (setTypingInterval) {
            setTypingInterval(typeInterval);
        }
    }
    
    // Chevrons
    const leftChevrons = phaseHud.querySelectorAll('.hud-chevrons-left .chevron');
    const rightChevrons = phaseHud.querySelectorAll('.hud-chevrons-right .chevron');
    
    anime.animate(leftChevrons, {
        opacity: [0, 0.8],
        translateX: [20, 0],
        duration: 300,
        delay: anime.stagger(50, { start: 800 }),
        ease: 'outQuart'
    });
    
    anime.animate(rightChevrons, {
        opacity: [0, 0.8],
        translateX: [-20, 0],
        duration: 300,
        delay: anime.stagger(50, { start: 850 }),
        ease: 'outQuart'
    });
    
    // Chevron pulse animation (continuous)
    setTimeout(() => {
        anime.animate(leftChevrons, {
            translateX: [0, -8, 0],
            opacity: [0.8, 1, 0.8],
            duration: 1000,
            delay: anime.stagger(50),
            loop: true,
            ease: 'inOutSine'
        });
        
        anime.animate(rightChevrons, {
            translateX: [0, 8, 0],
            opacity: [0.8, 1, 0.8],
            duration: 1000,
            delay: anime.stagger(50),
            loop: true,
            ease: 'inOutSine'
        });
    }, 1200);
    
    // Three circles logo
    const circles = phaseHud.querySelectorAll('.boot-circle');
    const stem = phaseHud.querySelector('.boot-circle-stem');
    const ring = phaseHud.querySelector('.boot-circle-ring');
    
    anime.animate(circles, {
        opacity: [0, 1],
        scale: [0, 1],
        duration: 400,
        delay: anime.stagger(150, { start: 400 }),
        ease: 'outElastic(1, 0.5)'
    });
    
    anime.animate(stem, {
        opacity: [0, 1],
        scaleY: [0, 1],
        duration: 400,
        delay: 900,
        ease: 'outQuart'
    });
    
    anime.animate(ring, {
        opacity: [0, 0.6],
        scale: [0.5, 1],
        duration: 600,
        delay: 1100,
        ease: 'outQuart'
    });
    
    // Circle glow pulse (continuous)
    setTimeout(() => {
        anime.animate(circles, {
            boxShadow: [
                '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)',
                '0 0 40px rgba(255, 0, 0, 1), 0 0 80px rgba(255, 0, 0, 0.6)',
                '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.4)'
            ],
            duration: 1500,
            loop: true,
            ease: 'inOutSine'
        });
    }, 1000);
    
    // Hash marks
    const hashMarks = phaseHud.querySelectorAll('.hud-hash-marks');
    anime.animate(hashMarks, {
        opacity: [0, 0.5],
        duration: 500,
        delay: 1000,
        ease: 'outQuart'
    });
    
    // Bottom bar segments
    const bottomSegments = phaseHud.querySelectorAll('.bottom-bar-segment');
    anime.animate(bottomSegments, {
        opacity: [0, 0.7],
        scaleX: [0, 1],
        duration: 400,
        delay: anime.stagger(150, { start: 1200 }),
        ease: 'outQuart'
    });
    
    // Sound effect
    setTimeout(() => playSfx('nav'), 800);
    
    // ============ PHASE 2: 3D Title (2.2-4.2s) ============
    
    setTimeout(() => {
        // Fade out HUD phase
        anime.animate(phaseHud, {
            opacity: [1, 0],
            duration: 400,
            ease: 'outQuart'
        });
        
        // Show 3D title phase with fade in
        anime.animate(phase3d, {
            opacity: [0, 1],
            duration: 400,
            ease: 'outQuart'
        });
        
        const titleContainer = phase3d.querySelector('.title-3d-container');
        const titleLayers = phase3d.querySelectorAll('.title-3d-layer');
        const titleMain = phase3d.querySelector('.title-3d-main');
        const frameLines = phase3d.querySelectorAll('.frame-line');
        const frameBrackets = phase3d.querySelectorAll('.frame-bracket');
        const statusBox = phase3d.querySelector('.boot-status-box');
        const bottomIndicator = phase3d.querySelector('.boot-bottom-indicator');
        
        // Title entrance with dramatic 3D rotation from behind
        anime.animate(titleContainer, {
            opacity: [0, 1],
            rotateY: [-180, 0],
            rotateX: [30, 0],
            translateZ: [-500, 0],
            scale: [0.3, 1],
            duration: 1500,
            ease: 'outExpo'
        });
        
        // Chromatic aberration effect - more dramatic shifts
        anime.animate(phase3d.querySelector('.title-3d-red'), {
            translateX: [-8, -3, -8],
            translateY: [-2, 1, -2],
            opacity: [0, 0.8, 0.8],
            duration: 1500,
            loop: true,
            ease: 'inOutSine'
        });
        
        anime.animate(phase3d.querySelector('.title-3d-cyan'), {
            translateX: [8, 3, 8],
            translateY: [2, -1, 2],
            opacity: [0, 0.8, 0.8],
            duration: 1500,
            loop: true,
            ease: 'inOutSine',
            delay: 75
        });
        
        // Continuous full 360 Y-axis rotation like the reference
        setTimeout(() => {
            anime.animate(titleContainer, {
                rotateY: [0, 360],
                duration: 6000,
                loop: true,
                ease: 'linear'
            });
        }, 1500);
        
        // Add subtle X-axis tilt during rotation
        setTimeout(() => {
            anime.animate(titleContainer, {
                rotateX: [0, 10, 0, -10, 0],
                duration: 3000,
                loop: true,
                ease: 'inOutSine'
            });
        }, 1500);
        
        // Title glow pulse with more dramatic effect
        anime.animate(titleMain, {
            textShadow: [
                '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
                '0 0 60px rgba(255, 255, 255, 1), 0 0 120px rgba(0, 255, 255, 0.8)',
                '0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)'
            ],
            duration: 1500,
            loop: true,
            ease: 'inOutSine',
            delay: 500
        });
        
        // Frame lines
        anime.animate(frameLines, {
            scaleX: [0, 1],
            opacity: [0, 0.8],
            duration: 500,
            delay: anime.stagger(100, { start: 400 }),
            ease: 'outQuart'
        });
        
        // Frame brackets
        anime.animate(frameBrackets, {
            opacity: [0, 1],
            scale: [0.5, 1],
            duration: 400,
            delay: anime.stagger(100, { start: 600 }),
            ease: 'outBack'
        });
        
        // Status box
        anime.animate(statusBox, {
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 500,
            delay: 800,
            ease: 'outQuart'
        });
        
        // Bottom indicator
        anime.animate(bottomIndicator, {
            opacity: [0, 1],
            duration: 400,
            delay: 1000,
            ease: 'outQuart'
        });
        
        // Indicator chevrons bounce
        const indicatorChevrons = phase3d.querySelectorAll('.indicator-chevron');
        setTimeout(() => {
            anime.animate(indicatorChevrons, {
                translateY: [0, 5, 0],
                duration: 800,
                delay: anime.stagger(100),
                loop: true,
                ease: 'inOutSine'
            });
        }, 1200);
        
        playSfx('nav');
        
    }, 2200);
    
    // ============ PHASE 3: Final HUD (4.2-5.5s) ============
    
    setTimeout(() => {
        // Fade out 3D phase
        anime.animate(phase3d, {
            opacity: [1, 0],
            duration: 400,
            ease: 'outQuart'
        });
        
        // Show final phase with fade in
        anime.animate(phaseFinal, {
            opacity: [0, 1],
            duration: 400,
            ease: 'outQuart'
        });
        
        const coords = phaseFinal.querySelector('.boot-coords');
        const radar = phaseFinal.querySelector('.boot-radar');
        const radarRings = phaseFinal.querySelectorAll('.radar-ring');
        const radarSweep = phaseFinal.querySelector('.radar-sweep');
        const radarDot = phaseFinal.querySelector('.radar-dot');
        const progress = phaseFinal.querySelector('.boot-progress');
        const progressFill = phaseFinal.querySelector('.progress-fill');
        const progressMarkers = phaseFinal.querySelectorAll('.progress-markers span');
        const labels = phaseFinal.querySelectorAll('.boot-labels span');
        
        // Coordinates
        anime.animate(coords, {
            opacity: [0, 1],
            translateX: [-20, 0],
            duration: 400,
            ease: 'outQuart'
        });
        
        // Radar
        anime.animate(radar, {
            opacity: [0, 0.8],
            scale: [0.5, 1],
            duration: 600,
            delay: 200,
            ease: 'outQuart'
        });
        
        anime.animate(radarRings, {
            opacity: [0, 0.5],
            scale: [0.8, 1],
            duration: 400,
            delay: anime.stagger(100, { start: 300 }),
            ease: 'outQuart'
        });
        
        // Radar sweep rotation
        anime.animate(radarSweep, {
            rotate: ['-60deg', '60deg'],
            duration: 2000,
            loop: true,
            ease: 'linear',
            direction: 'alternate'
        });
        
        anime.animate(radarDot, {
            opacity: [0, 1],
            scale: [0, 1],
            duration: 300,
            delay: 500,
            ease: 'outBack'
        });
        
        // Progress bar
        anime.animate(progress, {
            opacity: [0, 1],
            duration: 400,
            delay: 400,
            ease: 'outQuart'
        });
        
        anime.animate(progressFill, {
            scaleX: [0, 1],
            duration: 800,
            delay: 500,
            ease: 'outQuart'
        });
        
        anime.animate(progressMarkers, {
            opacity: [0, 0.6],
            duration: 200,
            delay: anime.stagger(50, { start: 600 }),
            ease: 'outQuart'
        });
        
        // Labels
        anime.animate(labels, {
            opacity: [0, 0.7],
            duration: 500,
            delay: anime.stagger(100, { start: 700 }),
            ease: 'outQuart'
        });
        
        playSfx('correct');
        
    }, 4200);
    
    // ============ END SEQUENCE (5.5s) ============
    
    setTimeout(() => {
        const bootSeq = document.getElementById('boot-sequence');
        if (bootSeq) {
            anime.animate(bootSeq, {
                opacity: [1, 0],
                duration: 500,
                ease: 'outQuart',
                onComplete: () => {
                    bootSeq.remove();
                    resolve();
                }
            });
        } else {
            resolve();
        }
    }, 5500);
}

// Access Granted animation after player selection
function showAccessGranted() {
    return new Promise((resolve) => {
        const container = document.createElement('div');
        container.id = 'access-granted';
        container.innerHTML = `
            <div class="access-granted-content">
                <div class="access-corner access-corner-tl"></div>
                <div class="access-corner access-corner-tr"></div>
                <div class="access-corner access-corner-bl"></div>
                <div class="access-corner access-corner-br"></div>
                <div class="access-text">ACCESS GRANTED</div>
                <div class="access-subtext">PILOT AUTHENTICATION COMPLETE</div>
            </div>
        `;
        document.body.appendChild(container);
        
        // Animation timeline
        setTimeout(() => {
            container.classList.add('access-fade-in');
            // Play sound on fade-in
            playSfx('correct');
        }, 50);
        
        setTimeout(() => {
            container.classList.add('access-fade-out');
        }, 1800);
        
        setTimeout(() => {
            container.remove();
            resolve();
        }, 2300);
    });
}

// ============================================================================
// Player Management
// ============================================================================
function createPlayer(name) {
    const player = {
        id: Date.now().toString(),
        name: name.trim(),
        sessions: [],
        achievements: [], // Track unlocked achievement IDs
        challengeProgress: {} // Track progress toward challenges
    };
    state.players.push(player);
    savePlayers(state.players);
    state.currentPlayer = player;
    playSfx('player');
    return player;
}

function selectPlayer(playerId) {
    state.currentPlayer = state.players.find(p => p.id === playerId) || null;
    
    // Initialize achievements if not present
    if (state.currentPlayer && !state.currentPlayer.achievements) {
        state.currentPlayer.achievements = [];
        state.currentPlayer.challengeProgress = {};
        savePlayers(state.players);
    }
}

// ============================================================================
// Quiz Management
// ============================================================================

/**
 * Start an AFOQT Practice Test with official AFOQT subjects and difficulty level
 */
async function _startAFOQTPracticeTestAsync(difficulty = 'beginner') {
    console.log('Starting AFOQT Practice Test with difficulty:', difficulty);
    playSfx('select');
    
    state.quiz.questions = [];
    state.quiz.mode = 'practiceTestMode';
    state.quiz.difficulty = difficulty;
    state.quiz.showFeedback = false; // No feedback until end
    state.quiz.isPracticeTest = true;
    state.quiz.isAFOQTOfficial = true;
    
    // Collect official AFOQT subjects
    const officialSubjects = subjects.filter(s => s.isAfoqtOfficialSubject === true);
    console.log('Found official AFOQT subjects:', officialSubjects.length);
    
    if (officialSubjects.length === 0) {
        console.warn('No official AFOQT subjects found, using all subjects');
        // Fallback to all subjects if no official ones are marked
        officialSubjects.push(...subjects);
    }
    
    const playerId = state.currentPlayer ? state.currentPlayer.id : null;
    const questionCount = 40; // Standard AFOQT test length
    const questionsPerSubject = Math.ceil(questionCount / officialSubjects.length);
    
    console.log('Aggregating questions from subjects...');
    
    // Aggregate questions from all official AFOQT subjects
    for (const subject of officialSubjects) {
        const officialTopics = topics.filter(t => 
            t.subjectId === subject.id && 
            (t.isOfficialAfoqtTopic === true || !('isOfficialAfoqtTopic' in t))
        );
        
        if (officialTopics.length === 0) continue;
        
        // Get questions from each official topic
        for (const topic of officialTopics) {
            if (typeof getQuestionsWithSpacedRepetition === 'function') {
                const qs = await getQuestionsWithSpacedRepetition(
                    subject.id,
                    topic.id,
                    difficulty,
                    Math.ceil(questionsPerSubject / officialTopics.length),
                    playerId
                );
                state.quiz.questions.push(...qs);
            } else if (topic.generateQuestion && typeof topic.generateQuestion === 'function') {
                // Use procedural generator if spaced repetition not available
                const numToGenerate = Math.ceil(questionsPerSubject / officialTopics.length);
                for (let i = 0; i < numToGenerate && state.quiz.questions.length < questionCount; i++) {
                    const q = topic.generateQuestion(difficulty);
                    if (q) state.quiz.questions.push(q);
                }
            }
            
            if (state.quiz.questions.length >= questionCount) break;
        }
        
        if (state.quiz.questions.length >= questionCount) break;
    }
    
    // Fallback: If not enough content-based questions, generate from procedural generators
    if (state.quiz.questions.length < questionCount) {
        console.warn('Not enough questions (' + state.quiz.questions.length + '), filling with procedural generators');
        const usedQuestions = new Set();
        
        for (const subject of officialSubjects) {
            const subjectTopics = topics.filter(t => t.subjectId === subject.id);
            
            for (const topic of subjectTopics) {
                if (!topic.generateQuestion || typeof topic.generateQuestion !== 'function') continue;
                
                while (state.quiz.questions.length < questionCount && subjectTopics.length > 0) {
                    const question = topic.generateQuestion(difficulty);
                    if (!question) break;
                    
                    const questionKey = `${question.prompt}|${question.options[question.correctIndex]}`;
                    if (!usedQuestions.has(questionKey)) {
                        usedQuestions.add(questionKey);
                        state.quiz.questions.push(question);
                    }
                }
                
                if (state.quiz.questions.length >= questionCount) break;
            }
            
            if (state.quiz.questions.length >= questionCount) break;
        }
    }
    
    console.log('Total questions collected:', state.quiz.questions.length);
    
    // Shuffle questions
    state.quiz.questions = state.quiz.questions.sort(() => Math.random() - 0.5);
    
    // Limit to exact count
    state.quiz.questions = state.quiz.questions.slice(0, questionCount);
    
    console.log('Final question count:', state.quiz.questions.length);
    
    // Initialize quiz state
    state.quiz.currentQuestion = 0;
    state.quiz.answers = [];
    state.quiz.isAnswered = false;
    state.quiz.timeStarted = Date.now();
    state.quiz.selectedAnswer = null;
    
    state.screen = 'quiz';
    console.log('Transitioning to quiz screen');
    render();
}

async function startQuiz(topicId, mode = 'practice', difficulty = 'beginner') {
    const topic = topics.find(t => t.id === topicId);
    if (!topic) return;
    
    state.currentTopic = topic;
    state.quiz.questions = [];
    state.quiz.mode = mode;
    state.quiz.difficulty = difficulty;
    
    // Patch 18: Set feedback visibility based on mode
    // test/practiceTestMode = no feedback until end, practice/sprint = immediate feedback
    state.quiz.showFeedback = (mode !== 'practiceTestMode' && mode !== 'test');
    state.quiz.isPracticeTest = topic.isPracticeTest || false;
    
    // Patch 18: Check if this is an AFOQT practice test
    if (topic.isPracticeTest && topic.testConfig && typeof generateAfoqtPracticeTest === 'function') {
        // Use Patch 18 content-based questions
        state.quiz.questions = generateAfoqtPracticeTest(topic.testConfig);
        state.quiz.mode = 'practiceTestMode'; // Force practice test mode
        state.quiz.showFeedback = false;
    } else if ((topic.subjectId === 'vocabulary' || topic.subjectId === 'word_knowledge' || topic.subjectId === 'verbal_analogies' || topic.subjectId === 'math_knowledge') && typeof getQuestionsWithSpacedRepetition === 'function') {
        // Patch 18: Use content-based questions with spaced repetition for vocabulary and math topics
        const questionCount = mode === 'sprint' ? 5 : 10;
        const playerId = state.currentPlayer ? state.currentPlayer.id : null;
        
        if (mode === 'sprint') {
            // For sprint mode, get questions from all difficulties
            const difficulties = ['beginner', 'advanced', 'expert'];
            const questionsPerDifficulty = Math.ceil(questionCount / 3);
            
            for (const diff of difficulties) {
                const qs = await getQuestionsWithSpacedRepetition(
                    topic.subjectId, 
                    topic.id, 
                    diff, 
                    questionsPerDifficulty,
                    playerId
                );
                state.quiz.questions.push(...qs);
            }
            
            // Shuffle and limit to exact count
            state.quiz.questions = state.quiz.questions.sort(() => Math.random() - 0.5).slice(0, questionCount);
        } else {
            // Regular practice/test mode - use spaced repetition with specified difficulty
            state.quiz.questions = await getQuestionsWithSpacedRepetition(
                topic.subjectId, 
                topic.id, 
                difficulty, 
                questionCount,
                playerId
            );
        }
        
        // Fallback to procedural if no content available
        if (state.quiz.questions.length === 0) {
            console.warn(`No content-based questions found for ${topic.id}, using procedural generator`);
            const usedQuestions = new Set();
            const maxAttempts = questionCount * 10;
            let attempts = 0;
            
            while (state.quiz.questions.length < questionCount && attempts < maxAttempts) {
                const question = topic.generateQuestion(difficulty);
                if (!question) break;
                
                const questionKey = `${question.prompt}|${question.options[question.correctIndex]}`;
                if (!usedQuestions.has(questionKey)) {
                    usedQuestions.add(questionKey);
                    state.quiz.questions.push(question);
                }
                attempts++;
            }
        }
    } else if (topic.hasContent && typeof getQuestionsFromRegistry === 'function') {
        // Content-based subjects (instrument, table reading, block counting, etc.)
        const questionCount = mode === 'sprint' ? 5 : 10;
        if (mode === 'sprint') {
            const difficulties = ['beginner', 'advanced', 'expert'];
            const perDiff = Math.ceil(questionCount / difficulties.length);
            const pooled = [];
            difficulties.forEach(diff => {
                pooled.push(...getQuestionsFromRegistry(topic.subjectId, topic.id, diff, perDiff));
            });
            state.quiz.questions = pooled.sort(() => Math.random() - 0.5).slice(0, questionCount);
        } else {
            state.quiz.questions = getQuestionsFromRegistry(topic.subjectId, topic.id, difficulty, questionCount);
            // Fallback to beginner if chosen difficulty has no pool (common for arithmetic where only beginner exists)
            if ((!state.quiz.questions || state.quiz.questions.length === 0) && difficulty !== 'beginner') {
                state.quiz.questions = getQuestionsFromRegistry(topic.subjectId, topic.id, 'beginner', questionCount);
            }
        }

        // Fallback to procedural generator when registry is empty
        if ((!state.quiz.questions || state.quiz.questions.length === 0) && typeof topic.generateQuestion === 'function') {
            const usedQuestions = new Set();
            const maxAttempts = questionCount * 10;
            let attempts = 0;
            while (state.quiz.questions.length < questionCount && attempts < maxAttempts) {
                const question = topic.generateQuestion(difficulty);
                if (!question) break;
                const questionKey = `${question.prompt}|${question.options[question.correctIndex]}`;
                if (!usedQuestions.has(questionKey)) {
                    usedQuestions.add(questionKey);
                    state.quiz.questions.push(question);
                }
                attempts++;
            }
        }
    } else {
        // Use procedural generators for non-vocabulary topics
        const questionCount = mode === 'sprint' ? 5 : 10;
        const usedQuestions = new Set();
        const maxAttempts = questionCount * 10; // Prevent infinite loops
        let attempts = 0;
        
        while (state.quiz.questions.length < questionCount && attempts < maxAttempts) {
            // For sprint mode, randomly select difficulty for each question
            let questionDifficulty = difficulty;
            if (mode === 'sprint') {
                questionDifficulty = DIFFICULTY_LEVELS[Math.floor(Math.random() * DIFFICULTY_LEVELS.length)];
            }
            
            // Pass difficulty to question generator (will be ignored by generators that don't support it)
            const question = topic.generateQuestion(questionDifficulty);
            if (!question) continue; // Skip if generator returns null (practice tests)
            
            // Create a unique key for this question based on prompt and correct answer
            const questionKey = `${question.prompt}|${question.options[question.correctIndex]}`;
            
            if (!usedQuestions.has(questionKey)) {
                usedQuestions.add(questionKey);
                state.quiz.questions.push(question);
            }
            attempts++;
        }
    }
    
    state.quiz.currentIndex = 0;
    state.quiz.score = 0;
    state.quiz.selectedAnswer = null;
    state.quiz.questionTimes = [];
    state.quiz.userAnswers = [];
    state.quiz.questionStartTime = Date.now();
    
    state.screen = 'quiz';
    playSfx('start');
    render();
    startQuestionTimer();
}

function startQuestionTimer() {
    if (state.quiz.timerInterval) {
        clearInterval(state.quiz.timerInterval);
    }
    
    state.quiz.timerInterval = setInterval(() => {
        if (state.screen === 'quiz') {
            updateTimerDisplay();
        }
    }, 100);
}

function updateTimerDisplay() {
    const timerEl = document.querySelector('.timer');
    if (!timerEl) return;
    
    const elapsed = (Date.now() - state.quiz.questionStartTime) / 1000;
    const remaining = 60 - elapsed;
    
    timerEl.textContent = formatTime(remaining) + 's';
    
    if (remaining < 0) {
        timerEl.classList.add('negative');
    } else {
        timerEl.classList.remove('negative');
    }
}

function handleAnswer(optionIndex) {
    if (state.quiz.selectedAnswer !== null) return;
    
    const elapsed = (Date.now() - state.quiz.questionStartTime) / 1000;
    state.quiz.questionTimes.push(elapsed);
    state.quiz.selectedAnswer = optionIndex;
    
    const currentQuestion = state.quiz.questions[state.quiz.currentIndex];
    const isCorrect = optionIndex === currentQuestion.correctIndex;
    
    // Track the user's answer
    state.quiz.userAnswers.push({
        questionIndex: state.quiz.currentIndex,
        userAnswer: optionIndex,
        correctAnswer: currentQuestion.correctIndex,
        isCorrect: isCorrect,
        timeSpent: elapsed
    });
    
    // Record question attempt for spaced repetition (if question has ID and player exists)
    if (currentQuestion.id && state.currentPlayer && typeof afoqtDB !== 'undefined') {
        const questionRecord = {
            playerId: state.currentPlayer.id,
            questionId: currentQuestion.id,
            subtopicId: currentQuestion.subtopicId || state.currentTopic.id,
            difficulty: currentQuestion.difficulty || state.quiz.difficulty,
            correct: isCorrect,
            responseTime: elapsed
        };
        
        // Use atomic method to avoid race conditions
        afoqtDB.recordQuestionAttemptAtomic(questionRecord)
            .catch(err => {
                console.error(`Failed to record question attempt for question ${currentQuestion.id}:`, err);
            });
    }
    
    // Get button position for particle effect and anime.js feedback
    const buttons = document.querySelectorAll('.option-btn');
    const selectedButton = buttons[optionIndex];
    if (selectedButton) {
        const rect = selectedButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        if (isCorrect) {
            createParticles(x, y, '#00ffff', 30);
            // Add anime.js bounce/pulse for correct answer
            animateAnswerFeedback(selectedButton, true);
        } else {
            createParticles(x, y, '#ff0000', 20);
            // Add anime.js shake for wrong answer
            animateAnswerFeedback(selectedButton, false);
        }
    }
    
    if (isCorrect) {
        state.quiz.score++;
        playSfx('correct');
    } else {
        playSfx('wrong');
    }
    
    render();
}

function nextQuestion() {
    playSfx('nav');
    
    if (state.quiz.currentIndex < state.quiz.questions.length - 1) {
        state.quiz.currentIndex++;
        state.quiz.selectedAnswer = null;
        state.quiz.questionStartTime = Date.now();
        render();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    if (state.quiz.timerInterval) {
        clearInterval(state.quiz.timerInterval);
    }
    
    const avgTime = state.quiz.questionTimes.reduce((a, b) => a + b, 0) / state.quiz.questionTimes.length;
    
    if (state.currentPlayer) {
        const session = {
            topicId: state.currentTopic.id,
            topicName: state.currentTopic.name,
            score: state.quiz.score,
            total: state.quiz.questions.length,
            avgTime: avgTime,
            timestamp: Date.now(),
            difficulty: state.quiz.difficulty,
            playerId: state.currentPlayer.id // Add playerId for database
        };
        
        // Add to player's sessions array (in-memory)
        state.currentPlayer.sessions.push(session);
        
        // Save session to database
        afoqtDB.saveSession(session).catch(err => {
            console.error('Failed to save session to database:', err);
        });
        
        // Update RPG stats with difficulty multiplier
        updatePlayerStats(state.currentPlayer, state.currentTopic.id, state.quiz.score, state.quiz.difficulty);
        
        // Check for new achievements
        const newAchievements = checkAchievements(state.currentPlayer);
        if (newAchievements.length > 0) {
            // Show first achievement notification after a delay
            setTimeout(() => {
                newAchievements.forEach((achievement, index) => {
                    setTimeout(() => {
                        showAchievementNotification(achievement);
                    }, index * 500);
                });
            }, 1000);
        }
        
        // Update challenge progress
        updateChallengeProgress(state.currentPlayer, 'daily_quizzes', 1);
        updateChallengeProgress(state.currentPlayer, 'weekly_quizzes', 1);
        
        // Check for consecutive 80%+ scores
        const recentSessions = state.currentPlayer.sessions.slice(-5);
        if (recentSessions.every(s => (s.score / s.total) >= 0.8)) {
            updateChallengeProgress(state.currentPlayer, 'consecutive_80plus', recentSessions.length);
        }
        
        savePlayers(state.players);
    }
    
    // Play completion sound if no level up (level up sound already played)
    playSfx('complete');
    
    state.screen = 'results';
    render();
}

function retryTopic() {
    if (state.currentTopic) {
        startQuiz(state.currentTopic.id);
    }
}

// ============================================================================
// Navigation
// ============================================================================
function goHome() {
    if (state.quiz.timerInterval) {
        clearInterval(state.quiz.timerInterval);
    }
    playSfx('nav');
    state.screen = 'home';
    state.lastScreenBeforeBoot = 'home';
    render();
}

function goToSubject(subjectId) {
    playSfx('nav');
    state.currentSubject = subjects.find(s => s.id === subjectId);
    state.screen = 'subject';
    state.lastScreenBeforeBoot = `subject:${subjectId}`;
    render();
}

function goToStatus() {
    if (!state.currentPlayer) {
        return; // Can't view status without a player
    }
    playSfx('nav');
    state.screen = 'status';
    render();
}

function goToSettings() {
    playSfx('nav');
    state.screen = 'settings';
    render();
}

function goToEquipment() {
    if (!state.currentPlayer) {
        return; // Can't view equipment without a player
    }
    playSfx('nav');
    state.screen = 'equipment';
    render();
}

function goToAchievements() {
    if (!state.currentPlayer) {
        return; // Can't view achievements without a player
    }
    playSfx('nav');
    state.screen = 'achievements';
    render();
}

function goToAnalytics() {
    if (!state.currentPlayer) {
        return; // Can't view analytics without a player
    }
    playSfx('nav');
    state.screen = 'analytics';
    render();
}

function goToLogin() {
    playSfx('nav');
    state.screen = 'login';
    state.lastScreenBeforeBoot = 'login';
    render();
}

function goToCreateAccount() {
    playSfx('nav');
    state.screen = 'create-account';
    state.lastScreenBeforeBoot = 'create-account';
    render();
}

// Helper function to generate floating navigation buttons
function renderFloatingNav(options = {}) {
    const showBack = options.showBack !== false; // default true
    const showHome = options.showHome !== false; // default true
    const backAction = options.backAction || null;
    const backLabel = options.backLabel || '← Back';
    
    if (!showBack && !showHome) return '';
    
    let buttons = [];
    
    if (showBack && backAction) {
        buttons.push(`<button class="floating-nav-btn" id="floating-back-btn">${backLabel}</button>`);
    }
    
    if (showHome) {
        buttons.push(`<button class="floating-nav-btn" id="floating-home-btn">🏠 Home</button>`);
    }
    
    return `<div class="floating-nav">${buttons.join('')}</div>`;
}

// ============================================================================
// Render Functions
// ============================================================================
function render() {
    const root = document.getElementById('app-root');
    if (!root) return;
    
    switch (state.screen) {
        case 'login':
            root.innerHTML = renderLogin();
            break;
        case 'create-account':
            root.innerHTML = renderCreateAccount();
            break;
        case 'home':
            root.innerHTML = renderHome();
            break;
        case 'subject-list':
            root.innerHTML = renderSubjectList();
            break;
        case 'afoqt-practice':
            root.innerHTML = renderAFOQTDifficultySelect();
            break;
        case 'subject':
        case 'mode-select':
            root.innerHTML = renderModeSelect();
            break;
        case 'learn':
            root.innerHTML = renderLearn();
            break;
        case 'difficulty-select':
            root.innerHTML = renderDifficultySelect();
            break;
        case 'quiz':
            root.innerHTML = renderQuiz();
            break;
        case 'results':
            root.innerHTML = renderResults();
            break;
        case 'analytics':
            root.innerHTML = renderAnalytics();
            break;
        case 'status':
            root.innerHTML = renderStatus();
            break;
        case 'equipment':
            root.innerHTML = renderEquipment();
            break;
        case 'achievements':
            root.innerHTML = renderAchievements();
            break;
        case 'settings':
            root.innerHTML = renderSettings();
            break;
    }
    
    attachEventListeners();
    
    // Apply panel style to all newly rendered panels
    applyPanelStyle(state.settings.panelStyle || 'default');
    
    // Initialize anime.js button animations (ripple effects, hover)
    initButtonAnimations();
    
    // Animate panel entrances
    animatePanelEntrance();
}

function renderLogin() {
    return `
        <div class="panel">
            <h1 class="panel-header">CHARACTER SELECT</h1>
            
            <div class="login-section">
                <h2 style="text-align: center; margin-bottom: 20px;">Select Your Character</h2>
                
                <div class="player-list-login">
                    ${state.players.length === 0 ? '<p style="text-align: center; opacity: 0.7; margin: 30px 0;">No characters yet. Create one below!</p>' : ''}
                    ${state.players.map(p => {
                        const playerInfo = computePlayerTotals(p);
                        // Initialize equipment if needed
                        initializePlayerEquipment(p);
                        return `
                            <div class="player-item-login" data-player-id="${p.id}">
                                <div class="player-sprite-preview">
                                    ${renderCharacterSprite(p)}
                                </div>
                                <div class="player-info-login">
                                    <div class="player-name-login">${p.name}</div>
                                    <div class="player-level-login">Level ${playerInfo.level}</div>
                                    <div class="player-stats-login">Total SP: ${playerInfo.totalStatPoints}</div>
                                </div>
                                <div class="player-action">
                                    <button class="btn btn-small select-player-btn" data-player-id="${p.id}">
                                        SELECT →
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                
                <div class="new-character-section">
                    <h3 style="text-align: center; margin: 30px 0 20px 0;">Create New Player</h3>
                    <div class="new-player-form-login">
                        <input type="text" id="new-player-name-login" placeholder="Enter player name" maxlength="20" />
                        <button class="btn" id="create-player-btn-login">Create Player</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHome() {
    const playerInfo = state.currentPlayer ? computePlayerTotals(state.currentPlayer) : null;
    const testResults = state.currentPlayer && state.currentPlayer.testResults ? state.currentPlayer.testResults : [];
    
    return `
        <div class="panel">
            <h1 class="panel-header">AFOQT QUEST</h1>
            
            <div class="home-controls-box">
                <div class="header-controls">
                    <button class="btn btn-small" id="change-character-btn">
                        👤 ${state.currentPlayer ? state.currentPlayer.name : 'Player'}
                    </button>
                    ${state.currentPlayer ? `
                        <button class="btn btn-small" id="status-btn">
                            📊 Stats
                        </button>
                        <button class="btn btn-small" id="equipment-btn">
                            🎖 Loadout
                        </button>
                        <button class="btn btn-small" id="achievements-btn">
                            🏆 Awards
                        </button>
                    ` : ''}
                    <button class="btn btn-small" id="settings-btn">
                        ⚙ Settings
                    </button>
                </div>
            </div>
            
            <div class="home-main-grid">
                <div class="home-primary-tile" id="practice-test-selector">
                    <div class="home-tile-icon">🧠</div>
                    <div class="home-tile-title">AFOQT PRACTICE</div>
                    <div class="home-tile-subtitle">Full-Length Timed Test</div>
                    <div class="home-tile-description">Complete official AFOQT sections with realistic timing and scoring</div>
                </div>
                
                <div class="home-primary-tile" id="subjects-selector">
                    <div class="home-tile-icon">📚</div>
                    <div class="home-tile-title">SUBJECTS</div>
                    <div class="home-tile-subtitle">Topic Practice</div>
                    <div class="home-tile-description">Master individual topics with targeted drills by difficulty</div>
                </div>
            </div>
            
            ${testResults.length > 0 ? `
            <div class="home-secondary-section">
                <h2 class="home-section-title">Test Results & Analytics</h2>
                <div class="home-results-grid">
                    ${testResults.slice().reverse().map((result, idx) => `
                        <div class="home-result-card">
                            <div class="home-result-label">Attempt ${testResults.length - idx}</div>
                            <div class="home-result-score">${Math.round(result.compositeScore || 0)}</div>
                            <div class="home-result-detail">Composite</div>
                            <div class="home-result-detail" style="margin-top: 0.5rem;">Difficulty: ${(result.difficulty || 'unknown').toUpperCase()}</div>
                            <div class="home-result-detail">Date: ${new Date(result.timestamp || Date.now()).toLocaleDateString()}</div>
                            <div class="home-result-detail" style="margin-top: 0.5rem; color: #ffaa00;">Blanks: ${result.blanksPerSection ? Object.values(result.blanksPerSection).reduce((a, b) => a + b, 0) : 0}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            ` : ``}
        </div>
        ${renderFloatingNav({ showBack: false })}
        
        ${renderPlayerModal()}
    `;
}

function renderPlayerModal() {
    return `
        <div id="player-modal" class="modal" style="display: none;">
            <div class="modal-content player-auth-modal">
                <div class="auth-header">
                    <div class="auth-header-bracket left"></div>
                    <h2 class="auth-title">PLEASE IDENTIFY YOURSELF</h2>
                    <div class="auth-header-bracket right"></div>
                </div>
                <div class="modal-body">
                    ${state.players.length > 0 ? `
                        <div class="auth-section">
                            <div class="auth-section-label">EXISTING PLAYERS</div>
                            <div class="player-auth-list">
                                ${state.players.map(p => {
                                    initializePlayerEquipment(p);
                                    return `
                                    <div class="player-auth-item ${state.currentPlayer?.id === p.id ? 'selected' : ''}" data-player-id="${p.id}">
                                        <div class="player-auth-sprite">
                                            ${renderCharacterSprite(p)}
                                        </div>
                                        <div class="player-auth-info">
                                            <span class="player-auth-name">${p.name}</span>
                                            <span class="player-auth-level">Lv. ${computePlayerTotals(p).level}</span>
                                        </div>
                                        <button class="btn-auth-play" data-player-id="${p.id}">
                                            <span class="auth-play-icon">▶</span> DEPLOY
                                        </button>
                                    </div>
                                `}).join('')}
                            </div>
                        </div>
                    ` : ''}
                    <div class="auth-section">
                        <div class="auth-section-label">NEW PLAYER REGISTRATION</div>
                        <div class="auth-input-container">
                            <input type="text" id="new-player-name" class="auth-input" placeholder="ENTER CALLSIGN" maxlength="20" />
                            <div class="auth-input-corner tl"></div>
                            <div class="auth-input-corner tr"></div>
                            <div class="auth-input-corner bl"></div>
                            <div class="auth-input-corner br"></div>
                        </div>
                        <button class="btn-auth-create" id="add-player-btn">
                            <span class="auth-create-icon">+</span> CREATE PLAYER
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Render Subject List - Shows all available subjects for practice
 */
function renderSubjectList() {
    return `
        <div class="panel">
            <h1 class="panel-header">SUBJECTS</h1>
            
            <div class="action-buttons quiz-action-buttons" style="margin-bottom: 20px;">
                <button class="btn" id="home-btn">🏠 Home</button>
            </div>
            
            <div class="grid grid-3">
                ${subjects.map(subject => `
                    <div class="tile" data-subject-id="${subject.id}" style="cursor: pointer;">
                        <div class="tile-title">${subject.name}</div>
                        <div class="tile-description">${subject.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        ${renderFloatingNav({ showBack: true })}
        ${renderPlayerModal()}
    `;
}

/**
 * Render AFOQT Practice Difficulty Select - Choose difficulty for official AFOQT practice test
 */
function renderAFOQTDifficultySelect() {
    return `
        <div class="panel">
            <h1 class="panel-header">AFOQT PRACTICE</h1>
            
            <div style="margin: 40px 0; text-align: center;">
                <p style="margin-bottom: 30px; color: rgba(0, 255, 255, 0.8);">Select Difficulty Level</p>
                
                <div class="grid grid-3" style="max-width: 900px; margin: 0 auto;">
                    <div class="tile mode-tile" id="afoqt-beginner-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">🟢 BEGINNER</div>
                        <div class="tile-description">
                            • Fundamental concepts<br>
                            • 40 questions<br>
                            • No time pressure<br>
                            • Great for learning
                        </div>
                    </div>
                    
                    <div class="tile mode-tile" id="afoqt-advanced-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">🟡 ADVANCED</div>
                        <div class="tile-description">
                            • Realistic difficulty<br>
                            • 40 questions<br>
                            • Timed sections<br>
                            • Official format
                        </div>
                    </div>
                    
                    <div class="tile mode-tile" id="afoqt-expert-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">🔴 EXPERT</div>
                        <div class="tile-description">
                            • Advanced concepts<br>
                            • 40 questions<br>
                            • Strict timing<br>
                            • Maximum challenge
                        </div>
                    </div>
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: true })}
        ${renderPlayerModal()}
    `;
}

function renderSubject() {
    if (!state.currentSubject) return '';
    
    // Filter topics for current subject
    const subjectTopics = topics.filter(t => t.subjectId === state.currentSubject.id);
    
    return `
        <div class="panel">
            <h1 class="panel-header">${state.currentSubject.name}</h1>
            
            <div class="action-buttons quiz-action-buttons" style="margin-bottom: 20px;">
                <button class="btn" id="home-btn">🏠 Home</button>
            </div>
            
            <div class="grid grid-3">
                ${subjectTopics.map(topic => `
                    <div class="tile" data-topic-id="${topic.id}">
                        <div class="tile-title">${topic.name}</div>
                        <div class="tile-description">${topic.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderModeSelect() {
    if (!state.currentTopic) return '';
    
    return `
        <div class="panel">
            <h1 class="panel-header">${state.currentTopic.name}</h1>
            
            <div style="margin: 40px 0;">
                <h2 style="text-align: center; margin-bottom: 30px;">Select Mode</h2>
                
                <div class="grid grid-4" style="max-width: 1100px; margin: 0 auto;">
                    <div class="tile mode-tile" id="learn-mode-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">📚 Learn</div>
                        <div class="tile-description">
                            • Concept overview<br>
                            • Step-by-step guide<br>
                            • Quick strategies<br>
                            • Master the basics
                        </div>
                    </div>
                    
                    <div class="tile mode-tile" id="practice-mode-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">⚔ Practice</div>
                        <div class="tile-description">
                            • Instant feedback<br>
                            • See explanations<br>
                            • No time pressure<br>
                            • 10 questions
                        </div>
                    </div>
                    
                    <div class="tile mode-tile" id="test-mode-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">🛡 Test</div>
                        <div class="tile-description">
                            • No feedback until end<br>
                            • 60-second timer<br>
                            • Test conditions<br>
                            • 10 questions
                        </div>
                    </div>
                    
                    <div class="tile mode-tile" id="sprint-mode-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title mode-icon" style="font-size: 1.5rem; margin-bottom: 15px;">⚡ Sprint</div>
                        <div class="tile-description">
                            • Quick practice<br>
                            • Instant feedback<br>
                            • Fast-paced<br>
                            • 5 questions only
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons quiz-action-buttons">
                <button class="btn" id="back-to-subject-btn">← Return to Topics</button>
                <button class="btn" id="home-btn">🏠 Home</button>
            </div>
        </div>
    `;
}

function renderDifficultySelect() {
    if (!state.currentTopic) return '';
    
    return `
        <div class="panel">
            <h1 class="panel-header">Select Difficulty</h1>
            
            <div style="margin: 40px 0;">
                <h2 style="text-align: center; margin-bottom: 30px;">${state.currentTopic.name} - Practice Mode</h2>
                
                <div class="grid grid-3" style="max-width: 900px; margin: 0 auto;">
                    <div class="tile difficulty-tile" id="beginner-diff-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title" style="font-size: 1.5rem; margin-bottom: 15px;">⭐ Beginner</div>
                        <div class="tile-description">
                            • Simpler questions<br>
                            • More time to think<br>
                            • 1x XP multiplier<br>
                            • Perfect for learning
                        </div>
                    </div>
                    
                    <div class="tile difficulty-tile" id="advanced-diff-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title" style="font-size: 1.5rem; margin-bottom: 15px;">⭐⭐ Advanced</div>
                        <div class="tile-description">
                            • Standard difficulty<br>
                            • Balanced challenge<br>
                            • 1.5x XP multiplier<br>
                            • Recommended
                        </div>
                    </div>
                    
                    <div class="tile difficulty-tile" id="expert-diff-btn" style="cursor: pointer; padding: 30px;">
                        <div class="tile-title" style="font-size: 1.5rem; margin-bottom: 15px;">⭐⭐⭐ Expert</div>
                        <div class="tile-description">
                            • Complex problems<br>
                            • True mastery<br>
                            • 2x XP multiplier<br>
                            • Maximum rewards!
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons quiz-action-buttons">
                <button class="btn" id="back-to-mode-btn">← Back to Modes</button>
                <button class="btn" id="home-btn">🏠 Home</button>
            </div>
        </div>
    `;
}

// ============================================================================
// Topic Learning Content (C1 Tutoring Method)
// ============================================================================
const topicLearningContent = {
    // Math Topics
    'evaluate_expressions': {
        concept: 'Substituting values into algebraic expressions and computing the result using order of operations (PEMDAS).',
        steps: [
            '1. Write down the expression.',
            '2. Replace each variable with its given value.',
            '3. Follow order of operations (PEMDAS) to simplify.',
            '4. Double-check your arithmetic.'
        ],
        fastStrategy: 'Substitute the given values carefully, then follow order of operations (PEMDAS).',
        examples: ['If x = 3 and y = 2, evaluate 2x + 3y → 2(3) + 3(2) = 6 + 6 = 12']
    },
    'distributive_foil': {
        concept: 'Expanding expressions by distributing a single term or using FOIL (First, Outer, Inner, Last) for binomials.',
        steps: [
            '1. Identify if you\'re distributing a single term or multiplying binomials.',
            '2. For distribution: multiply the outside term by each inside term.',
            '3. For FOIL: First, Outer, Inner, Last.',
            '4. Combine like terms.'
        ],
        fastStrategy: 'FOIL = First, Outer, Inner, Last. Distribute each term to every other term.',
        examples: ['3(x + 4) = 3x + 12', '(x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6']
    },
    'linear_equations': {
        concept: 'Solving equations to find the value of an unknown variable by isolating it on one side.',
        steps: [
            '1. Simplify each side if needed (distribute, combine like terms).',
            '2. Get all variable terms on one side, constants on the other.',
            '3. Isolate the variable using inverse operations.',
            '4. Check your answer by substituting back.'
        ],
        fastStrategy: 'Isolate the variable: undo operations in reverse order (addition/subtraction first, then multiplication/division).',
        examples: ['Solve 3x + 5 = 14 → 3x = 9 → x = 3']
    },
    'inequalities': {
        concept: 'Solving inequalities like equations, but remembering to flip the inequality sign when multiplying or dividing by a negative.',
        steps: [
            '1. Solve the inequality like you would an equation.',
            '2. IMPORTANT: Flip the inequality sign when multiplying/dividing by a negative.',
            '3. Express the solution as an inequality or interval.',
            '4. If graphing, use open circle for < or >, closed for ≤ or ≥.'
        ],
        fastStrategy: 'Solve like equations, but flip the inequality sign when multiplying/dividing by a negative.',
        examples: ['Solve -2x > 6 → x < -3 (flipped because of negative)']
    },
    'systems_linear': {
        concept: 'Finding values that satisfy two equations simultaneously using substitution or elimination methods.',
        steps: [
            '1. Choose method: substitution (if one variable is isolated) or elimination.',
            '2. For substitution: solve one equation for a variable, plug into the other.',
            '3. For elimination: multiply to get opposite coefficients, add equations.',
            '4. Solve for one variable, then substitute back to find the other.'
        ],
        fastStrategy: 'Substitution or elimination. Pick the method that avoids fractions.',
        examples: ['x + y = 5 and x - y = 1 → Add equations: 2x = 6 → x = 3, y = 2']
    },
    'factoring': {
        concept: 'Breaking down expressions into products of simpler factors to simplify or solve equations.',
        steps: [
            '1. Look for a greatest common factor (GCF) first.',
            '2. Check for special patterns: difference of squares, perfect square trinomials.',
            '3. For ax² + bx + c, find two numbers that multiply to ac and add to b.',
            '4. Factor completely and verify by multiplying back.'
        ],
        fastStrategy: 'Look for common factors first, then try factoring patterns (difference of squares, trinomials).',
        examples: ['x² + 5x + 6 = (x + 2)(x + 3)', 'x² - 9 = (x + 3)(x - 3)']
    },
    'quadratic_equations': {
        concept: 'Solving equations of the form ax² + bx + c = 0 by factoring or using the quadratic formula.',
        steps: [
            '1. Write the equation in standard form: ax² + bx + c = 0.',
            '2. Try factoring first (fastest if it works).',
            '3. If factoring fails, use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a.',
            '4. Check both solutions in the original equation.'
        ],
        fastStrategy: 'Try factoring first; if stuck, use quadratic formula: x = (-b ± √(b²-4ac)) / 2a.',
        examples: ['x² - 5x + 6 = 0 → (x - 2)(x - 3) = 0 → x = 2 or x = 3']
    },
    'exponents_roots': {
        concept: 'Laws of exponents help simplify expressions with powers. Remember: when multiplying same bases, add exponents.',
        steps: [
            '1. Identify which exponent rule applies to the expression.',
            '2. Apply the rule: product rule, power rule, quotient rule, etc.',
            '3. Simplify the base and exponent.',
            '4. Convert to a number if possible.'
        ],
        fastStrategy: 'Memorize: xᵃ · xᵇ = xᵃ⁺ᵇ; (xᵃ)ᵇ = xᵃᵇ; x⁰ = 1; √x = x^(1/2).',
        examples: ['2³ × 2² = 2⁵ = 32', '(3²)³ = 3⁶ = 729']
    },
    'radicals': {
        concept: 'Simplifying square roots by finding perfect square factors and moving them outside the radical.',
        steps: [
            '1. Factor the number under the radical.',
            '2. Look for perfect square factors.',
            '3. Take the square root of perfect squares and move outside.',
            '4. Multiply any numbers outside; leave non-perfect squares inside.'
        ],
        fastStrategy: 'Simplify by finding perfect square factors: √50 = √25·√2 = 5√2.',
        examples: ['√72 = √36·√2 = 6√2', '√48 = √16·√3 = 4√3']
    },
    'scientific-notation': {
        concept: 'A way to write very large or very small numbers using powers of 10.',
        steps: [
            '1. For standard to scientific: move decimal to get a number between 1 and 10.',
            '2. Count how many places you moved the decimal.',
            '3. For large numbers, exponent is positive; for small numbers, negative.',
            '4. Write as: (number between 1-10) × 10^(exponent).'
        ],
        fastStrategy: 'Count decimal places moved. Large numbers → positive exponent. Small numbers → negative exponent.',
        examples: ['5,400,000 = 5.4 × 10⁶', '0.00032 = 3.2 × 10⁻⁴']
    },
    'absolute_value': {
        concept: 'The absolute value is the distance from zero on a number line—always non-negative.',
        steps: [
            '1. Identify the expression inside the absolute value bars.',
            '2. If it\'s a simple number, the absolute value is its distance from 0.',
            '3. If it\'s an equation |x - a| = b, split into two cases: x - a = b OR x - a = -b.',
            '4. Solve each case and check both answers.'
        ],
        fastStrategy: 'For |x - a| = b, split into two cases: x - a = b or x - a = -b.',
        examples: ['|x - 5| = 3 → x - 5 = 3 OR x - 5 = -3 → x = 8 or x = 2']
    },
    'rational_expressions': {
        concept: 'Algebraic fractions that can be simplified by factoring and canceling common factors.',
        steps: [
            '1. Factor the numerator completely.',
            '2. Factor the denominator completely.',
            '3. Cancel any common factors.',
            '4. Write the simplified expression.'
        ],
        fastStrategy: 'Factor numerator and denominator, then cancel common factors.',
        examples: ['(x² - 4)/(x + 2) = (x+2)(x-2)/(x+2) = x - 2']
    },
    'functions': {
        concept: 'A function takes an input and produces an output. f(x) means "plug x into the function."',
        steps: [
            '1. Identify the input value to substitute.',
            '2. Replace every x in f(x) with that value.',
            '3. Simplify using order of operations.',
            '4. The result is your output, f(input).'
        ],
        fastStrategy: 'f(a) means plug a into the function wherever you see x.',
        examples: ['If f(x) = 2x + 1, then f(3) = 2(3) + 1 = 7']
    },
    'angles': {
        concept: 'Complementary angles sum to 90°. Supplementary angles sum to 180°.',
        steps: [
            '1. Identify whether angles are complementary (90°) or supplementary (180°).',
            '2. Set up an equation: angle1 + angle2 = target sum.',
            '3. Solve for the unknown angle.',
            '4. Verify your answer adds to the correct total.'
        ],
        fastStrategy: 'Complementary = 90° total. Supplementary = 180° total.',
        examples: ['Find complement of 35° → 90° - 35° = 55°']
    },
    'triangles': {
        concept: 'The three interior angles of any triangle always sum to exactly 180°.',
        steps: [
            '1. Write down the known angles.',
            '2. Add the known angles together.',
            '3. Subtract from 180° to find the missing angle.',
            '4. Verify all three angles sum to 180°.'
        ],
        fastStrategy: 'Triangle angles always sum to 180°. Subtract known angles from 180.',
        examples: ['If two angles are 60° and 70°, third angle = 180° - 60° - 70° = 50°']
    },
    'quadrilaterals': {
        concept: 'The four interior angles of any quadrilateral sum to 360°.',
        steps: [
            '1. Write down the known angles.',
            '2. Add the known angles together.',
            '3. Subtract from 360° to find the missing angle.',
            '4. Verify all four angles sum to 360°.'
        ],
        fastStrategy: 'Quadrilateral angles always sum to 360°. Rectangles have four 90° angles.',
        examples: ['If three angles are 90°, 90°, and 100°, fourth = 360° - 280° = 80°']
    },
    'circles': {
        concept: 'Key formulas: Area = πr², Circumference = 2πr (or πd).',
        steps: [
            '1. Identify what\'s being asked (area or circumference).',
            '2. Identify the radius (r) or diameter (d). Remember: r = d/2.',
            '3. Plug into the appropriate formula.',
            '4. Simplify and include π in your answer or use π ≈ 3.14.'
        ],
        fastStrategy: 'Area = πr². Circumference = 2πr. Diameter = 2r.',
        examples: ['Circle with r = 5: Area = π(5)² = 25π ≈ 78.5']
    },
    'area-volume': {
        concept: 'Area is 2D (square units). Volume is 3D (cubic units).',
        steps: [
            '1. Identify the shape (rectangle, triangle, box, etc.).',
            '2. Recall the formula: Rectangle Area = l×w, Box Volume = l×w×h.',
            '3. Substitute the given values.',
            '4. Include correct units (square for area, cubic for volume).'
        ],
        fastStrategy: 'Rectangle: A = l×w. Triangle: A = ½bh. Box: V = l×w×h.',
        examples: ['Box 3×4×5: Volume = 3×4×5 = 60 cubic units']
    },
    'pythagorean': {
        concept: 'In right triangles: a² + b² = c², where c is the hypotenuse (longest side).',
        steps: [
            '1. Identify the right triangle and label the sides.',
            '2. Identify which side you\'re solving for.',
            '3. Plug into a² + b² = c² and solve.',
            '4. Remember: c is always the longest side (hypotenuse).'
        ],
        fastStrategy: 'a² + b² = c². Common Pythagorean triples: 3-4-5, 5-12-13, 8-15-17.',
        examples: ['Legs 3 and 4: c² = 9 + 16 = 25, so c = 5']
    },
    'coordinate_geometry': {
        concept: 'Working with points on the coordinate plane using distance, midpoint, and slope formulas.',
        steps: [
            '1. Identify the coordinates of the given points.',
            '2. Choose the correct formula (distance, midpoint, or slope).',
            '3. Substitute the coordinates into the formula.',
            '4. Simplify carefully, especially under square roots.'
        ],
        fastStrategy: 'Distance = √[(x₂-x₁)² + (y₂-y₁)²]; Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2).',
        examples: ['Distance from (1,2) to (4,6) = √[(3)² + (4)²] = √25 = 5']
    },
    'slope': {
        concept: 'Slope measures steepness: rise over run, or the change in y divided by the change in x.',
        steps: [
            '1. Identify the two points: (x₁, y₁) and (x₂, y₂).',
            '2. Apply the slope formula: m = (y₂ - y₁) / (x₂ - x₁).',
            '3. Simplify the fraction.',
            '4. Positive = uphill; Negative = downhill; Zero = horizontal; Undefined = vertical.'
        ],
        fastStrategy: 'Slope = rise/run = (y₂-y₁)/(x₂-x₁). Positive = uphill, Negative = downhill.',
        examples: ['Points (1,2) and (3,6): slope = (6-2)/(3-1) = 4/2 = 2']
    },
    'graphing_linear': {
        concept: 'Linear equations in slope-intercept form y = mx + b graph as straight lines.',
        steps: [
            '1. Identify the equation form (slope-intercept: y = mx + b).',
            '2. Find the slope (m) and y-intercept (b).',
            '3. Plot the y-intercept on the y-axis.',
            '4. Use the slope to find another point, then draw the line.'
        ],
        fastStrategy: 'y = mx + b: m is slope (rise/run), b is y-intercept (where line crosses y-axis).',
        examples: ['y = 2x + 3: slope = 2, y-intercept = 3']
    },
    'ratio_proportion': {
        concept: 'A proportion is an equation stating two ratios are equal. Cross-multiply to solve.',
        steps: [
            '1. Set up the proportion with equal ratios: a/b = c/d.',
            '2. Cross-multiply: a × d = b × c.',
            '3. Solve the resulting equation for the unknown.',
            '4. Check by substituting back into the original proportion.'
        ],
        fastStrategy: 'Cross-multiply to solve proportions: if a/b = c/d, then ad = bc.',
        examples: ['If 3/4 = x/12, then 3×12 = 4×x → 36 = 4x → x = 9']
    },
    'percent': {
        concept: 'Percent means "per hundred." Convert between percent, decimal, and fraction forms.',
        steps: [
            '1. Identify what\'s being asked (find percent, find part, or find whole).',
            '2. Use the formula: part = percent × whole.',
            '3. Convert percent to decimal by dividing by 100.',
            '4. Solve and convert back to percent if needed.'
        ],
        fastStrategy: 'Part = percent × whole. To find percent: (part/whole) × 100.',
        examples: ['30% of 80 = 0.30 × 80 = 24']
    },
    'statistics': {
        concept: 'Mean is average, median is middle value, mode is most frequent, range is max minus min.',
        steps: [
            '1. Arrange data in order if finding median.',
            '2. Mean = sum of all values ÷ count of values.',
            '3. Median = middle value (or average of two middle values).',
            '4. Range = maximum - minimum.'
        ],
        fastStrategy: 'Mean = sum ÷ count; Median = middle value; Range = max - min.',
        examples: ['Data: 2, 4, 4, 6, 8 → Mean = 24/5 = 4.8, Median = 4, Mode = 4, Range = 6']
    },
    'probability': {
        concept: 'Probability measures how likely an event is to occur, expressed as favorable outcomes over total outcomes.',
        steps: [
            '1. Count the number of favorable outcomes.',
            '2. Count the total number of possible outcomes.',
            '3. Divide: P = favorable ÷ total.',
            '4. Express as a fraction, decimal, or percentage as needed.'
        ],
        fastStrategy: 'Probability = favorable outcomes ÷ total outcomes. Always between 0 and 1.',
        examples: ['Drawing a red card from a deck: 26/52 = 1/2 = 50%']
    },
    // Vocabulary Topics
    'synonyms': {
        concept: 'Synonyms are words with similar meanings. Finding synonyms tests your vocabulary breadth.',
        steps: [
            '1. Read the target word carefully.',
            '2. Think of words with similar meanings.',
            '3. Eliminate options that are opposites or unrelated.',
            '4. Choose the word closest in meaning.'
        ],
        fastStrategy: 'Look for the word that could replace the given word in a sentence.',
        examples: ['HAPPY → joyful, glad, pleased (all synonyms)']
    },
    'antonyms': {
        concept: 'Antonyms are words with opposite meanings. This tests your understanding of word relationships.',
        steps: [
            '1. Read the target word and understand its meaning.',
            '2. Think of words with the opposite meaning.',
            '3. Eliminate synonyms and unrelated words.',
            '4. Choose the true opposite.'
        ],
        fastStrategy: 'Find the word that means the exact opposite. Watch for tricky near-opposites.',
        examples: ['HOT → cold (antonym), NOT warm or heat (those are related, not opposite)']
    },
    'verbal_analogies': {
        concept: 'Analogies show relationships between word pairs. Identify the relationship first.',
        steps: [
            '1. Determine the relationship between the first pair of words.',
            '2. Express it as "A is to B as..." (e.g., adult to young, part to whole).',
            '3. Apply the same relationship to find the missing word.',
            '4. Verify the relationship holds for both pairs.'
        ],
        fastStrategy: 'Name the relationship (synonym, antonym, part-whole, cause-effect) then match it.',
        examples: ['CAT : KITTEN :: DOG : ? → Adult to young relationship → PUPPY']
    },
    'vocabulary_in_context': {
        concept: 'Understanding word meaning from surrounding context clues in a sentence.',
        steps: [
            '1. Read the entire sentence, not just the target word.',
            '2. Look for context clues (synonyms, antonyms, examples nearby).',
            '3. Try substituting each answer choice into the sentence.',
            '4. Choose the word that makes the sentence make sense.'
        ],
        fastStrategy: 'Use the surrounding words as clues. Which option makes the sentence logical?',
        examples: ['The COGENT argument convinced everyone. → Cogent means convincing/persuasive']
    },
    'confusing_word_pairs': {
        concept: 'Words that sound similar or are often confused (affect/effect, their/there/they\'re).',
        steps: [
            '1. Identify which confusing pair is being tested.',
            '2. Recall the specific difference between the words.',
            '3. Determine which meaning fits the context.',
            '4. Double-check by substituting the definition.'
        ],
        fastStrategy: 'Memorize common pairs: affect (verb) vs effect (noun), their (possession) vs there (place).',
        examples: ['The rain will AFFECT the game. (affect = verb, to influence)']
    },
    'highfreq_vocab': {
        concept: 'High-frequency vocabulary words that commonly appear on standardized tests.',
        steps: [
            '1. If you know the word, use your knowledge.',
            '2. If unsure, look for word roots, prefixes, or suffixes.',
            '3. Eliminate obviously wrong answers.',
            '4. Make an educated guess based on word parts.'
        ],
        fastStrategy: 'Learn common roots: bene = good, mal = bad, vert = turn, dict = say.',
        examples: ['BENEVOLENT = bene (good) + vol (wish) = wishing good = kind']
    },
    'sentence_completion': {
        concept: 'Fill in the blank with the word that best completes the sentence\'s meaning.',
        steps: [
            '1. Read the sentence and predict what word fits.',
            '2. Look for signal words (however, therefore, although).',
            '3. Determine if the blank needs a positive or negative word.',
            '4. Choose the option that matches your prediction.'
        ],
        fastStrategy: 'Predict the answer before looking at choices. Signal words show contrast or continuation.',
        examples: ['Although tired, she was ___ to finish. → Need positive word → "determined"']
    },
    'word_roots_affixes': {
        concept: 'Breaking words into roots, prefixes, and suffixes to understand meaning.',
        steps: [
            '1. Identify any prefixes (beginning) or suffixes (ending).',
            '2. Isolate the root word.',
            '3. Combine the meanings: prefix + root + suffix.',
            '4. Match to the best definition.'
        ],
        fastStrategy: 'Common prefixes: un/dis = not, pre = before, re = again. Suffixes: -tion = noun, -ly = adverb.',
        examples: ['UNHAPPINESS = un (not) + happy + ness (state of) = state of not being happy']
    },
    // Reading Comprehension Topics
    'reading-comprehension': {
        concept: 'Reading comprehension tests your ability to understand, analyze, and draw conclusions from written passages. Focus on main ideas, supporting details, and implied meanings.',
        steps: [
            '1. Skim the passage first to get the main idea and structure.',
            '2. Read each question carefully before re-reading relevant parts.',
            '3. Look for keywords in the question that point to specific sections.',
            '4. Eliminate obviously wrong answers, then choose the best remaining option.',
            '5. Base answers ONLY on what the passage states—not outside knowledge.'
        ],
        fastStrategy: 'Read questions first, then hunt for answers in the passage. Main idea = first/last paragraph.',
        examples: ['If a passage discusses the Wright Brothers\' first flight, questions may ask about dates, distances, or the significance of the event.']
    },
    // Physical Science Topics
    'physics-basics': {
        concept: 'Physics basics cover the fundamental forces and laws of motion. Key concepts: Force = Mass × Acceleration (F=ma), Newton\'s Three Laws, and types of energy (kinetic, potential).',
        steps: [
            '1. Identify what physical concept is being tested (force, motion, energy).',
            '2. Recall the relevant formula or law.',
            '3. Identify the given values and what you need to find.',
            '4. Substitute values and solve, paying attention to units.'
        ],
        fastStrategy: 'Memorize: F=ma, Speed=Distance/Time, Four forces of flight: Lift, Weight, Thrust, Drag.',
        examples: ['Newton\'s First Law: Object at rest stays at rest unless acted on by a force.', 'Kinetic energy = energy of motion.']
    },
    'chemistry-basics': {
        concept: 'Chemistry basics cover atomic structure, periodic table trends, chemical reactions, and states of matter. Know element symbols and basic reaction types.',
        steps: [
            '1. Identify the chemistry concept (atoms, reactions, states of matter).',
            '2. Recall periodic table trends (metals left, nonmetals right).',
            '3. For reactions: balance equations and identify products.',
            '4. Use elimination to narrow down answer choices.'
        ],
        fastStrategy: 'Metals = left side of periodic table, conduct electricity. Water = H₂O. Salt = NaCl.',
        examples: ['Protons determine element identity.', 'pH < 7 = acid, pH > 7 = base, pH 7 = neutral.']
    },
    // Situational Judgement Topics
    'situational-judgement': {
        concept: 'Situational Judgement tests your ability to handle workplace scenarios using sound judgment, leadership, and ethical decision-making. Focus on professionalism, communication, and solving problems constructively.',
        steps: [
            '1. Read the scenario carefully and identify the core problem.',
            '2. Consider all stakeholders affected by the decision.',
            '3. Eliminate extreme responses (ignoring issues or overreacting).',
            '4. Choose the response that shows leadership, communication, and professionalism.',
            '5. Prefer collaborative solutions over unilateral actions.'
        ],
        fastStrategy: 'Best answers: communicate openly, involve stakeholders, address issues constructively. Avoid: ignoring problems, blame, or extreme reactions.',
        examples: ['Team conflict → facilitate open communication.', 'Policy not working → acknowledge, gather feedback, adjust.']
    },
    // Aviation Knowledge Topics
    'aviation-knowledge': {
        concept: 'Aviation Knowledge covers the four forces of flight (Lift, Weight, Thrust, Drag), aircraft controls (ailerons, elevator, rudder), and flight instruments. Understanding how aircraft fly is essential.',
        steps: [
            '1. Memorize the four forces: Lift (up), Weight (down), Thrust (forward), Drag (backward).',
            '2. Know the three axes of rotation: Pitch (around lateral axis), Roll (around longitudinal axis), Yaw (around vertical axis).',
            '3. Learn which control affects which axis: Elevator=Pitch, Ailerons=Roll, Rudder=Yaw.',
            '4. Understand basic instruments: Altimeter, Airspeed Indicator, Attitude Indicator.'
        ],
        fastStrategy: 'Elevator=Pitch, Ailerons=Roll, Rudder=Yaw. Four forces: LWTD (Lift, Weight, Thrust, Drag).',
        examples: ['Flaps increase lift and drag for landing.', 'Stall = exceeding critical angle of attack.']
    },
    // Instrument Comprehension Topics
    'attitude-indicator-basic': {
        concept: 'The Attitude Indicator (artificial horizon) shows the aircraft\'s orientation relative to the horizon. Bank angle is shown by wing position; pitch is shown by the miniature aircraft\'s position relative to the horizon line.',
        steps: [
            '1. Look at the miniature aircraft wings to determine bank direction and angle.',
            '2. Look at the horizon bar position to determine climb or descent.',
            '3. Combine bank and pitch to describe the attitude (e.g., "banking left, climbing").',
            '4. Match your assessment to the answer choices.'
        ],
        fastStrategy: 'Wings tilted = bank direction. Nose above horizon = climbing. Nose below = descending.',
        examples: ['Horizon below miniature aircraft = nose up = climbing.', 'Left wing down = banking left.']
    },
    'heading-indicator-basic': {
        concept: 'The Heading Indicator shows which direction the aircraft is pointing using a compass rose (N, E, S, W). It\'s more stable than a magnetic compass during turns.',
        steps: [
            '1. Read the heading from the top of the indicator (where the aircraft is pointing).',
            '2. Convert if needed: N=0°/360°, E=90°, S=180°, W=270°.',
            '3. Combine with attitude indicator to fully describe aircraft state.',
            '4. Remember: heading shows direction of nose, not direction of travel.'
        ],
        fastStrategy: 'Read heading from top of dial. Cardinal directions: N=0°, E=90°, S=180°, W=270°.',
        examples: ['Heading 045° = Northeast', 'Heading 270° = West']
    },
    'combined-instruments': {
        concept: 'Combined instrument reading requires analyzing both the attitude indicator and heading indicator together to determine the complete flight attitude of an aircraft.',
        steps: [
            '1. First read the attitude indicator for bank and pitch.',
            '2. Then read the heading indicator for direction.',
            '3. Combine into a complete description: "Banking [direction], [climbing/descending/level], heading [direction]".',
            '4. Match your complete assessment to the answer choices.'
        ],
        fastStrategy: 'Attitude first (bank + pitch), then heading. Practice combining them quickly.',
        examples: ['Wings level, nose up, heading North = Climbing straight ahead toward North.']
    },
    // Table Reading Topics
    'table-reading': {
        concept: 'Table Reading tests your ability to quickly and accurately extract data from tables using X and Y coordinates. Speed and accuracy are both critical—practice finding intersections fast.',
        steps: [
            '1. Identify the X-value (usually columns) and Y-value (usually rows).',
            '2. Use your finger or eyes to trace from X to the intersection.',
            '3. Verify by tracing from Y to the same intersection.',
            '4. Read the value at the intersection carefully.',
            '5. Work quickly—this section is time-sensitive.'
        ],
        fastStrategy: 'Trace X horizontally, Y vertically until they meet. Practice speed with accuracy.',
        examples: ['X = 5, Y = 3 → Find column 5, row 3, read the value at intersection.']
    },
    // Block Counting Topics
    'block-counting': {
        concept: 'Block Counting tests spatial reasoning by asking you to count blocks in 3D figures, including hidden blocks. Systematic counting and visualization of hidden blocks is key.',
        steps: [
            '1. Start by counting visible blocks layer by layer, from bottom to top.',
            '2. Identify "support" blocks—hidden blocks needed to hold visible blocks up.',
            '3. Count each layer systematically (e.g., bottom layer first).',
            '4. Add visible + hidden blocks for total.',
            '5. Double-check by counting from a different angle or direction.'
        ],
        fastStrategy: 'If a block is floating, there must be blocks underneath. Count bottom-up, layer by layer.',
        examples: ['A block on top of the pile requires a block beneath it for support.']
    },
    'stacked_cubes': {
        concept: 'Isometric block stacks show each floor cell as a vertical column. Translate the figure into stack heights, then apply the question rule (total blocks, ground-contact blocks, above-ground blocks, or row/column totals).',
        steps: [
            '1. Write down each stack height by column/row to turn the picture into numbers.',
            '2. For total blocks, sum all heights. For ground-contact blocks, count non-empty stacks. For above-ground blocks, sum (height − 1) for stacks with height ≥ 1.',
            '3. Sum by row or column to reduce mistakes, especially on 3×3 grids.',
            '4. Recheck tall stacks and empty cells so you do not over- or under-count.',
            '5. If blocks are added/removed, adjust only that stack/row instead of recalculating everything.'
        ],
        fastStrategy: 'Convert the isometric view into a height table. Add heights by row; use (height − 1) for above-ground counts and “non-empty stacks” for ground-contact counts.',
        examples: ['Stacks with heights 2,1,0,3 → total = 6 blocks.', 'Back row heights 3,1,2 → row total = 6; above-ground blocks = (2 + 0 + 1) = 3.']
    },
    // Additional Arithmetic Reasoning Topics
    'arithmetic-word-problems': {
        concept: 'Arithmetic word problems require translating written scenarios into mathematical operations. Identify what\'s being asked, extract numbers, and choose the right operation.',
        steps: [
            '1. Read the problem completely before doing any math.',
            '2. Identify what the question is asking for (total, difference, rate, etc.).',
            '3. Extract the relevant numbers from the problem.',
            '4. Choose the operation: add (combining totals), subtract (finding difference), multiply (repeated addition), divide (splitting equally or finding unit rate).',
            '5. Solve and verify the answer makes sense in context.'
        ],
        fastStrategy: 'Keywords: "total" = add, "difference" = subtract, "each" = multiply/divide, "per" = rate.',
        examples: ['If 3 items cost $12, how much for 5 items? → $12/3 = $4 each → 5 × $4 = $20']
    }
};

// Get learning content for a topic (with fallback)
function getTopicLearningContent(topicId) {
    if (topicLearningContent[topicId]) {
        return topicLearningContent[topicId];
    }
    
    // Fallback for topics without specific content
    return {
        concept: 'This topic covers important concepts that will help you succeed on the AFOQT.',
        steps: [
            '1. Review the basic concept and understand what\'s being asked.',
            '2. Practice with example problems to build familiarity.',
            '3. Focus on recognizing patterns and common question types.',
            '4. Review your mistakes to learn from them.'
        ],
        fastStrategy: 'Practice regularly and review explanations for problems you miss.',
        examples: ['Check the Practice mode for example questions on this topic.']
    };
}

function renderLearn() {
    if (!state.currentTopic) return '';
    
    const content = getTopicLearningContent(state.currentTopic.id);
    
    return `
        <div class="panel">
            <h1 class="panel-header">📚 ${state.currentTopic.name}</h1>
            
            <div style="margin: 30px 0;">
                <div class="learn-section" style="background: var(--color-bg-panel); border: 2px solid var(--color-primary); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                    <h2 style="color: var(--color-primary); margin-bottom: 15px; font-size: 1.3rem;">💡 Core Concept</h2>
                    <p style="font-size: 1.1rem; line-height: 1.6; color: var(--color-text);">${content.concept}</p>
                </div>
                
                <div class="learn-section" style="background: var(--color-bg-panel); border: 2px solid var(--color-secondary); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                    <h2 style="color: var(--color-secondary); margin-bottom: 15px; font-size: 1.3rem;">📝 Step-by-Step Guide</h2>
                    <div style="font-size: 1rem; line-height: 1.8;">
                        ${content.steps.map(step => `<div style="margin-bottom: 10px; padding-left: 10px; border-left: 3px solid var(--color-primary-dim);">${step}</div>`).join('')}
                    </div>
                </div>
                
                <div class="learn-section" style="background: linear-gradient(135deg, var(--color-warning, rgba(255, 215, 0, 0.1)) 0%, var(--color-primary-dim) 100%); border: 2px solid var(--color-warning); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                    <h2 style="color: var(--color-warning); margin-bottom: 15px; font-size: 1.3rem;">⚡ Fast Strategy</h2>
                    <p style="font-size: 1.1rem; font-weight: bold; color: var(--color-text);">${content.fastStrategy}</p>
                </div>
                
                ${content.examples && content.examples.length > 0 ? `
                <div class="learn-section" style="background: var(--color-bg-panel); border: 2px solid var(--color-accent); border-radius: 8px; padding: 25px; margin-bottom: 25px;">
                    <h2 style="color: var(--color-accent); margin-bottom: 15px; font-size: 1.3rem;">📌 Examples</h2>
                    <div style="font-size: 1rem; line-height: 1.8;">
                        ${content.examples.map(ex => `<div style="margin-bottom: 10px; padding: 10px; background: var(--color-primary-dim); border-radius: 4px; font-family: monospace;">${ex}</div>`).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div style="text-align: center; margin-top: 30px;">
                    <p style="opacity: 0.8; margin-bottom: 20px;">Ready to practice what you learned?</p>
                    <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                        <button class="btn" id="learn-to-practice-btn">⚔ Start Practice</button>
                    </div>
                </div>
            </div>
            
            <div class="action-buttons quiz-action-buttons">
                <button class="btn" id="back-to-mode-btn">← Back to Modes</button>
                <button class="btn" id="home-btn">🏠 Home</button>
            </div>
        </div>
    `;
}

// ============================================================================
// Math UI Rendering Functions
// ============================================================================

/**
 * Render math UI visualizations based on uiSpec in question JSON
 */
function renderMathUI(uiSpec) {
    if (!uiSpec || !uiSpec.type) return '';
    switch (uiSpec.type) {
        case 'slope_graph':
        case 'coordinate_slope':
            return renderCoordinateGraphCss(uiSpec);
        case 'coordinate_grid_points':
        case 'point_reflection':
        case 'point_reflection_origin':
            return renderCoordinatePointsCss(uiSpec);
        case 'coordinate_segment':
            return renderCoordinateSegmentCss(uiSpec);
        case 'coordinate_triangle':
        case 'triangle_translation':
            return renderCoordinateTriangleCss(uiSpec);
        case 'translation':
            return renderTranslationCss(uiSpec);
        case 'rotation_90':
        case 'rotation_90_clockwise':
        case 'rotation_180':
            return renderRotationCss(uiSpec);
        case 'reflection_vertical_line':
        case 'reflection_horizontal_line':
            return renderReflectionCss(uiSpec);
        case 'function_table':
            return renderFunctionTable(uiSpec);
        case 'function_rule':
            return renderFunctionRule(uiSpec);
        case 'geometry_triangle_diagram':
            return renderGeometryTriangleDiagram(uiSpec);
        case 'geometry_angle_diagram':
            return renderGeometryAngleDiagram(uiSpec);
        case 'geometry_quadrilateral_diagram':
            return renderGeometryQuadrilateralDiagram(uiSpec);
        case 'polygon_basic':
            return renderPolygonBasic(uiSpec);
        case 'geometry_angle_pair_diagram':
            return renderGeometryAnglePairDiagram(uiSpec);
        case 'geometry_coordinate_segment':
            return renderCoordinateSegmentCss(uiSpec);
        case 'function_graph_point_lookup':
            return renderCoordinateGraphCss(uiSpec);
        case 'rc_passage_block':
            return renderRCPassageBlock(uiSpec);
        case 'rc_question_block':
            return renderRCQuestionBlock(uiSpec);
        case 'instrument_panel':
            return renderInstrumentPanel(uiSpec);
        case 'data_table':
            return renderDataTable(uiSpec);
        case 'block_stack_iso':
            return renderBlockStackIso(uiSpec);
        default:
            console.warn('Unknown uiSpec type:', uiSpec.type);
            return '';
    }
}

// Reading Comprehension renderers (Patch 20)
function renderRCPassageBlock(uiSpec) {
    if (!uiSpec || !uiSpec.passage) return '';
    return `
        <div class="rc-passage-block" style="background: rgba(0, 0, 0, 0.4); border: 1px solid rgba(0,255,255,0.2); padding: 16px; margin: 10px 0 18px; border-radius: 6px; max-height: 240px; overflow: auto; line-height: 1.6; color: #e8f6ff;">
            <div style="font-weight: 700; letter-spacing: 0.5px; color: #00ffff; margin-bottom: 8px;">Reading Passage</div>
            <div style="color: #e8f6ff;">${uiSpec.passage}</div>
        </div>
    `;
}

function renderRCQuestionBlock(uiSpec) {
    if (!uiSpec || !uiSpec.question || !uiSpec.choices) return '';
    const { choices } = uiSpec;
    const optionOrder = ['A','B','C','D'];
    return `
        <div class="rc-question-block" style="margin: 12px 0; padding: 12px; border: 1px dashed rgba(0,255,255,0.2); border-radius: 6px;">
            <div style="margin-bottom: 10px;">${uiSpec.question}</div>
            <ul style="list-style: none; padding: 0; margin: 0; display: grid; gap: 8px;">
                ${optionOrder.map(k => choices[k] ? `<li style="padding: 10px; background: rgba(0,255,255,0.05); border-radius: 4px;">${k}. ${choices[k]}</li>` : '').join('')}
            </ul>
        </div>
    `;
}

// Instrument Comprehension renderer (Patch 21)
function renderInstrumentPanel(uiSpec) {
    if (!uiSpec) return '';
    const { artificialHorizon, compass, choiceSprites } = uiSpec;
    
    // Render artificial horizon (attitude indicator)
    let horizonHtml = '';
    if (artificialHorizon) {
        const { bankDegrees = 0, pitchDegrees = 0 } = artificialHorizon;
        horizonHtml = `
            <div class="instrument-horizon" style="width: 200px; height: 200px; margin: 0 auto 20px; position: relative; border: 3px solid rgba(0,255,255,0.6); border-radius: 50%; background: linear-gradient(to bottom, #1a4d6d 0%, #1a4d6d 50%, #4a2c1a 50%, #4a2c1a 100%); overflow: hidden;">
                <div class="horizon-line" style="position: absolute; width: 100%; height: 2px; background: #00ffff; top: 50%; left: 0; transform: rotate(${-bankDegrees}deg) translateY(${-pitchDegrees * 2}px); transform-origin: center;"></div>
                <div class="bank-indicator" style="position: absolute; top: 10px; left: 50%; width: 2px; height: 20px; background: #00ffff; transform: translateX(-50%) rotate(${-bankDegrees}deg); transform-origin: center bottom;"></div>
                <div class="instrument-label" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); font-size: 11px; color: #00ffff;">Attitude</div>
            </div>
        `;
    }
    
    // Render compass (heading indicator)
    let compassHtml = '';
    if (compass) {
        const { headingDegrees = 0 } = compass;
        compassHtml = `
            <div class="instrument-compass" style="width: 200px; height: 200px; margin: 0 auto 20px; position: relative; border: 3px solid rgba(0,255,255,0.6); border-radius: 50%; background: radial-gradient(circle, rgba(0,30,50,0.9) 0%, rgba(0,20,40,0.95) 100%);">
                <div class="compass-rose" style="position: absolute; width: 100%; height: 100%; transform: rotate(${-headingDegrees}deg);">
                    <div style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); color: #ff4444; font-weight: 700; font-size: 16px;">N</div>
                    <div style="position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); color: #00ffff; font-weight: 700; font-size: 14px;">S</div>
                    <div style="position: absolute; left: 10px; top: 50%; transform: translateY(-50%); color: #00ffff; font-weight: 700; font-size: 14px;">W</div>
                    <div style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); color: #00ffff; font-weight: 700; font-size: 14px;">E</div>
                </div>
                <div class="heading-marker" style="position: absolute; top: 5px; left: 50%; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 12px solid #ffff00; transform: translateX(-50%);"></div>
                <div class="instrument-label" style="position: absolute; bottom: 5px; left: 50%; transform: translateX(-50%); font-size: 11px; color: #00ffff;">Heading ${headingDegrees}°</div>
            </div>
        `;
    }
    
    return `
        <div class="instrument-panel-container" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.2); padding: 20px; margin: 10px 0; border-radius: 6px;">
            <div style="text-align: center; color: #00ffff; font-weight: 700; margin-bottom: 15px; letter-spacing: 0.5px;">AIRCRAFT INSTRUMENTS</div>
            <div style="display: flex; justify-content: center; gap: 30px; margin-bottom: 20px;">
                ${horizonHtml}
                ${compassHtml}
            </div>
        </div>
    `;
}

// Render instrument choice sprite (Patch 21)
function renderInstrumentChoiceSprite(spriteData) {
    if (!spriteData) return '';
    const { view = 'side', bankDegrees = 0, pitchDegrees = 0, headingDegrees = 0 } = spriteData;
    
    const width = 160;
    const height = 120;
    
    if (view === 'side') {
        // Side view: realistic aircraft silhouette showing pitch and heading
        // In side view, bank is shown by tilting the wings perspective (top wing visible/hidden)
        const pitchRotation = pitchDegrees * 0.6; // Nose up/down rotation
        const flipHorizontal = (headingDegrees > 90 && headingDegrees < 270); // Flip if heading west
        
        // Bank affects wing visibility in side view - when banking, one wing appears more visible
        const wingSkew = bankDegrees * 0.3; // Positive bank = right wing more visible (ellipse ry increases)
        const topWingRy = 32 + wingSkew;
        const bottomWingRy = 32 - wingSkew;
        
        return `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block; margin: 0 auto; transform: scaleX(${flipHorizontal ? -1 : 1});">
                <g transform="translate(${width/2}, ${height/2}) rotate(${pitchRotation})">
                    <!-- Fuselage -->
                    <ellipse cx="0" cy="0" rx="55" ry="8" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.5"/>
                    <!-- Cockpit -->
                    <ellipse cx="35" cy="-2" rx="12" ry="6" fill="#3a3a3a" stroke="#1a1a1a" stroke-width="1"/>
                    <path d="M 35,-6 L 45,-6 L 48,-2 L 45,2 L 35,2 Z" fill="#4a4a4a" stroke="#1a1a1a" stroke-width="0.8"/>
                    <!-- Main wings - size varies with bank angle -->
                    <ellipse cx="-5" cy="${-Math.abs(wingSkew) * 0.2}" rx="12" ry="${topWingRy}" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.5" opacity="${bankDegrees > 0 ? 1 : 0.7}"/>
                    ${bankDegrees !== 0 ? `<ellipse cx="-5" cy="${Math.abs(wingSkew) * 0.2}" rx="12" ry="${bottomWingRy}" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.5" opacity="${bankDegrees < 0 ? 1 : 0.7}"/>` : ''}
                    <!-- Tail -->
                    <path d="M -50,-2 L -60,-2 L -60,-12 L -52,-8 Z" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.2"/>
                    <path d="M -50,2 L -60,2 L -60,6 L -52,4 Z" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.2"/>
                    <!-- Horizontal stabilizer -->
                    <rect x="-58" y="-1" width="10" height="2" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1"/>
                    <!-- Engine details -->
                    <ellipse cx="8" cy="-20" rx="4" ry="5" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="0.8"/>
                    <ellipse cx="8" cy="20" rx="4" ry="5" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="0.8"/>
                </g>
            </svg>
        `;
    } else {
        // Front view: realistic aircraft silhouette showing bank angle
        const bankAngle = -bankDegrees; // Negative for correct visual rotation
        
        return `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" style="display: block; margin: 0 auto;">
                <g transform="translate(${width/2}, ${height/2}) rotate(${bankAngle})">
                    <!-- Fuselage (vertical in front view) -->
                    <rect x="-6" y="-25" width="12" height="50" rx="4" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.5"/>
                    <!-- Cockpit -->
                    <ellipse cx="0" cy="-18" rx="8" ry="6" fill="#3a3a3a" stroke="#1a1a1a" stroke-width="1"/>
                    <circle cx="0" cy="-18" r="3" fill="#4a4a4a" opacity="0.6"/>
                    <!-- Main wings (horizontal span) -->
                    <rect x="-60" y="-3" width="120" height="6" rx="2" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.5"/>
                    <!-- Wing tips angled up slightly -->
                    <path d="M -60,-3 L -70,-8 L -70,-5 L -60,0 Z" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1"/>
                    <path d="M 60,-3 L 70,-8 L 70,-5 L 60,0 Z" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1"/>
                    <!-- Engines under wings -->
                    <ellipse cx="-25" cy="4" rx="6" ry="10" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="1.2"/>
                    <ellipse cx="25" cy="4" rx="6" ry="10" fill="#1a1a1a" stroke="#0a0a0a" stroke-width="1.2"/>
                    <!-- Engine intakes -->
                    <ellipse cx="-25" cy="2" rx="4" ry="6" fill="#0a0a0a"/>
                    <ellipse cx="25" cy="2" rx="4" ry="6" fill="#0a0a0a"/>
                    <!-- Vertical stabilizer (tail) -->
                    <path d="M -2,25 L -2,38 L -8,42 L 0,40 L 8,42 L 2,38 L 2,25 Z" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1.2"/>
                    <!-- Horizontal stabilizer -->
                    <rect x="-18" y="30" width="36" height="3" rx="1" fill="#2a2a2a" stroke="#1a1a1a" stroke-width="1"/>
                </g>
            </svg>
        `;
    }
}

// Render data table (Patch 22)
function renderDataTable(uiSpec) {
    if (!uiSpec) return '';
    
    // Get table data from uiSpec or from question's tableSpec
    const tableSpec = uiSpec.tableSpec || state.quiz.questions[state.quiz.currentIndex].tableSpec;
    if (!tableSpec) {
        console.warn('No tableSpec found for data_table');
        return '';
    }
    
    const { xHeader = [], yHeader = [], cellValues = [] } = tableSpec;
    
    // Build table HTML
    let tableHtml = `
        <div class="data-table-container" style="background: rgba(0,0,0,0.4); border: 1px solid rgba(0,255,255,0.2); padding: 20px; margin: 10px 0; border-radius: 6px; overflow-x: auto;">
            <div style="text-align: center; margin-bottom: 12px; font-size: 13px; color: #00ffff; opacity: 0.9;">
                <div style="margin-bottom: 4px;"><strong>Columns (X):</strong> values across the top → (X = ${xHeader.join(', ')})</div>
                <div><strong>Rows (Y):</strong> values down the left ↓ (Y = ${yHeader.join(', ')})</div>
            </div>
            <table style="margin: 0 auto; border-collapse: collapse; background: rgba(0,20,40,0.6);">
                <thead>
                    <tr>
                        <th style="padding: 10px; border: 1px solid rgba(0,255,255,0.3); background: rgba(0,255,255,0.1); color: #00ffff; font-weight: 700;">Y (rows ↓) / X (columns →)</th>
                        ${xHeader.map(x => `<th style="padding: 10px; border: 1px solid rgba(0,255,255,0.3); background: rgba(0,255,255,0.1); color: #00ffff; font-weight: 700;">X = ${x}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${yHeader.map((y, rowIdx) => `
                        <tr>
                            <th style="padding: 10px; border: 1px solid rgba(0,255,255,0.3); background: rgba(0,255,255,0.1); color: #00ffff; font-weight: 700;">Y = ${y}</th>
                            ${xHeader.map((x, colIdx) => {
                                const value = cellValues[rowIdx] && cellValues[rowIdx][colIdx] !== undefined ? cellValues[rowIdx][colIdx] : '—';
                                return `<td style="padding: 10px; border: 1px solid rgba(0,255,255,0.3); background: rgba(0,40,60,0.3); color: #e8f6ff; text-align: center; font-size: 16px;">${value}</td>`;
                            }).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    
    return tableHtml;
}

// Block Counting isometric renderer
function renderBlockStackIso(uiSpec) {
    if (!uiSpec || !Array.isArray(uiSpec.stacks)) return '';

    const width = uiSpec.width || 360;
    const height = uiSpec.height || 360;
    const grid = uiSpec.grid || { cols: 3, rows: 3 };
    const logicalCols = Math.max(1, grid.cols || 3);
    const logicalRows = Math.max(1, grid.rows || 3);
    
    // Better cube sizing for isometric view
    const maxStacks = Math.max(logicalCols, logicalRows);
    const cubeBase = Math.max(28, Math.min(50, width / (maxStacks * 1.8)));
    const cubeW = cubeBase;
    const cubeH = Math.round(cubeBase * 0.58);

    // Center the grid and provide better spacing
    const baseLeft = (width / 2) - ((logicalCols - 1) * cubeW * 0.5) - ((logicalRows - 1) * cubeW * 0.25);
    const baseBottom = Math.max(cubeH * 2, height * 0.15);
    const colStep = cubeW * 0.866; // √3/2 for proper isometric spacing
    const rowStepX = -cubeW * 0.433; // -√3/4 for isometric depth
    const rowStepY = cubeH * 1.0;

    const sortedStacks = [...uiSpec.stacks].sort((a, b) => {
        if (a.row !== b.row) return a.row - b.row; // front to back
        return a.col - b.col; // left to right
    });

    const columnsHtml = sortedStacks.map((stack) => {
        const { col = 0, row = 0, height: stackHeight = 0 } = stack;
        const left = baseLeft + (col * colStep) + (row * rowStepX);
        const bottom = baseBottom + (row * rowStepY);
        const safeHeight = Math.max(0, stackHeight);
        const cubes = Array.from({ length: safeHeight }).map((_, level) => {
            const yOffset = -level * (cubeH * 0.95);
            const zIndex = (row * 100) + (col * 10) + level;
            return `<div class="bc-cube" style=\"transform: translateY(${yOffset}px) skewY(-30deg) skewX(-45deg); z-index:${zIndex}; width:${cubeW}px; height:${cubeH}px;\"></div>`;
        }).join('');
        const columnZ = (row * 100) + (col * 10);
        return `<div class="bc-column" style="left:${left}px; bottom:${bottom}px; z-index:${columnZ};">${cubes}</div>`;
    }).join('');

    const gridHeight = Math.max(height - 120, cubeH * (logicalRows + 3));

    return `
        <div class="bc-scene" style="width:${width}px; height:${height}px;">
            <div class="bc-legend">
                <div class="bc-legend-line">Each column is a stack of cubes.</div>
                <div class="bc-legend-line">Rows farther back sit higher in view.</div>
            </div>
            <div class="bc-grid" style="height:${gridHeight}px;">
                ${columnsHtml}
            </div>
        </div>
    `;
}

/**
 * Render a coordinate graph with grid, axes, and a line
 */
function renderCoordinateGraphCss(uiSpec) {
    const { width = 300, height = 300, xRange = [-5, 5], yRange = [-5, 5], line, showGrid = true, showAxes = true, showTicks = true } = uiSpec;
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    
    // Map logical coords to pixels
    const toPx = (x, y) => {
        const px = ((x - xMin) / (xMax - xMin)) * width;
        const py = height - ((y - yMin) / (yMax - yMin)) * height;
        return { x: px, y: py };
    };
    
    // Axes positions
    const origin = toPx(0, 0);
    
    // Line positions
    let lineHtml = '';
    if (line && line.point1 && line.point2) {
        const p1 = toPx(line.point1.x, line.point1.y);
        const p2 = toPx(line.point2.x, line.point2.y);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx) * (180/Math.PI);
        lineHtml = `
          <div class="graphLine" style="left:${p1.x}px; top:${p1.y}px; width:${length}px; transform: rotate(${angle}deg);"></div>
          <div class="graphPoint" style="left:${p1.x-4}px; top:${p1.y-4}px;"></div>
          <div class="graphPoint" style="left:${p2.x-4}px; top:${p2.y-4}px;"></div>
        `;
    }
    
        // Ticks and numeric labels
        let ticksHtml = '';
        if (showTicks) {
                for (let xi = Math.ceil(xMin); xi <= Math.floor(xMax); xi++) {
                        const px = ((xi - xMin) / (xMax - xMin)) * width;
                        ticksHtml += `<div class="graphTick x" style="left:${px}px; top:${origin.y - 3}px;"></div>`;
                        if (xi !== 0) ticksHtml += `<div class="graphTickLabel" style="left:${px + 2}px; top:${origin.y + 6}px;">${xi}</div>`;
                }
                for (let yi = Math.ceil(yMin); yi <= Math.floor(yMax); yi++) {
                        const py = height - ((yi - yMin) / (yMax - yMin)) * height;
                        ticksHtml += `<div class="graphTick y" style="left:${origin.x - 3}px; top:${py}px;"></div>`;
                        if (yi !== 0) ticksHtml += `<div class="graphTickLabel" style="left:${origin.x + 6}px; top:${py - 10}px;">${yi}</div>`;
                }
        }
        return `
            <div class="graphContainer" style="width:${width}px; height:${height}px;">
                ${showGrid ? '<div class="graphGrid"></div>' : ''}
                ${showAxes ? `<div class="graphAxis x" style="top:${origin.y}px;"></div><div class="graphAxis y" style="left:${origin.x}px;"></div>` : ''}
                ${showAxes && showTicks ? ticksHtml : ''}
                ${lineHtml}
            </div>
        `;
}

/**
 * Render coordinate plane with labeled points
 */
function renderCoordinatePointsCss(uiSpec) {
    const { width = 300, height = 300, xRange = [-5, 5], yRange = [-5, 5], points = [], showGrid = true, line, showTicks = true } = uiSpec;
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const toPx = (x, y) => ({
        x: ((x - xMin) / (xMax - xMin)) * width,
        y: height - ((y - yMin) / (yMax - yMin)) * height
    });
    const origin = toPx(0, 0);
    let elements = '';
    points.forEach(p => {
        const m = toPx(p.x, p.y);
        elements += `<div class="graphPoint" style="left:${m.x-4}px; top:${m.y-4}px;"></div>`;
        if (p.name) elements += `<div class="graphLabel" style="left:${m.x}px; top:${m.y}px;">${p.name}</div>`;
    });
    // optional line between two points if provided
    if (line && line.point1 && line.point2) {
        const p1 = toPx(line.point1.x, line.point1.y);
        const p2 = toPx(line.point2.x, line.point2.y);
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx*dx + dy*dy);
        const angle = Math.atan2(dy, dx) * (180/Math.PI);
        elements += `<div class="graphLine" style="left:${p1.x}px; top:${p1.y}px; width:${length}px; transform: rotate(${angle}deg);"></div>`;
    }
        // Ticks and numeric labels
        let ticksHtml = '';
        if (showTicks) {
                for (let xi = Math.ceil(xMin); xi <= Math.floor(xMax); xi++) {
                        const px = ((xi - xMin) / (xMax - xMin)) * width;
                        ticksHtml += `<div class="graphTick x" style="left:${px}px; top:${origin.y - 3}px;"></div>`;
                        if (xi !== 0) ticksHtml += `<div class="graphTickLabel" style="left:${px + 2}px; top:${origin.y + 6}px;">${xi}</div>`;
                }
                for (let yi = Math.ceil(yMin); yi <= Math.floor(yMax); yi++) {
                        const py = height - ((yi - yMin) / (yMax - yMin)) * height;
                        ticksHtml += `<div class="graphTick y" style="left:${origin.x - 3}px; top:${py}px;"></div>`;
                        if (yi !== 0) ticksHtml += `<div class="graphTickLabel" style="left:${origin.x + 6}px; top:${py - 10}px;">${yi}</div>`;
                }
        }
        return `
            <div class="graphContainer" style="width:${width}px; height:${height}px;">
                ${showGrid ? '<div class="graphGrid"></div>' : ''}
                <div class="graphAxis x" style="top:${origin.y}px;"></div>
                <div class="graphAxis y" style="left:${origin.x}px;"></div>
                ${showTicks ? ticksHtml : ''}
                ${elements}
            </div>
        `;
}

/**
 * Render coordinate segment
 */
function renderCoordinateSegmentCss(uiSpec) {
    const { width = 300, height = 300, xRange = [-5, 5], yRange = [-5, 5], point1, point2, showGrid = true } = uiSpec;
    if (!point1 || !point2) return '';
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const toPx = (x, y) => ({
        x: ((x - xMin) / (xMax - xMin)) * width,
        y: height - ((y - yMin) / (yMax - yMin)) * height
    });
    const origin = toPx(0, 0);
    const p1 = toPx(point1.x, point1.y);
    const p2 = toPx(point2.x, point2.y);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * (180/Math.PI);
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${showGrid ? '<div class="graphGrid"></div>' : ''}
        <div class="graphAxis x" style="top:${origin.y}px;"></div>
        <div class="graphAxis y" style="left:${origin.x}px;"></div>
        <div class="graphLine" style="left:${p1.x}px; top:${p1.y}px; width:${length}px; transform: rotate(${angle}deg);"></div>
        <div class="graphPoint" style="left:${p1.x-4}px; top:${p1.y-4}px;"></div>
        <div class="graphPoint" style="left:${p2.x-4}px; top:${p2.y-4}px;"></div>
        ${point1.name ? `<div class="graphLabel" style="left:${p1.x}px; top:${p1.y}px;">${point1.name}</div>` : ''}
        ${point2.name ? `<div class="graphLabel" style="left:${p2.x}px; top:${p2.y}px;">${point2.name}</div>` : ''}
      </div>
    `;
}

/**
 * Render coordinate triangle
 */
function renderCoordinateTriangleCss(uiSpec) {
    const { width = 300, height = 300, xRange = [-5, 5], yRange = [-5, 5], points = [], showGrid = true } = uiSpec;
    if (points.length < 3) return '';
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
    const toPx = (x, y) => ({
        x: ((x - xMin) / (xMax - xMin)) * width,
        y: height - ((y - yMin) / (yMax - yMin)) * height
    });
    const origin = toPx(0, 0);
    const p1 = toPx(points[0].x, points[0].y);
    const p2 = toPx(points[1].x, points[1].y);
    const p3 = toPx(points[2].x, points[2].y);
    const seg = (a, b) => {
        const dx = b.x - a.x; const dy = b.y - a.y; const len = Math.sqrt(dx*dx+dy*dy); const ang = Math.atan2(dy, dx)*(180/Math.PI);
        return `<div class="graphLine" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"></div>`;
    };
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${showGrid ? '<div class="graphGrid"></div>' : ''}
        <div class="graphAxis x" style="top:${origin.y}px;"></div>
        <div class="graphAxis y" style="left:${origin.x}px;"></div>
        ${seg(p1,p2)}${seg(p2,p3)}${seg(p3,p1)}
        <div class="graphPoint" style="left:${p1.x-4}px; top:${p1.y-4}px;"></div>
        <div class="graphPoint" style="left:${p2.x-4}px; top:${p2.y-4}px;"></div>
        <div class="graphPoint" style="left:${p3.x-4}px; top:${p3.y-4}px;"></div>
        ${points[0].name ? `<div class="graphLabel" style="left:${p1.x}px; top:${p1.y}px;">${points[0].name}</div>` : ''}
        ${points[1].name ? `<div class="graphLabel" style="left:${p2.x}px; top:${p2.y}px;">${points[1].name}</div>` : ''}
        ${points[2].name ? `<div class="graphLabel" style="left:${p3.x}px; top:${p3.y}px;">${points[2].name}</div>` : ''}
      </div>
    `;
}

function renderTranslationCss(uiSpec) {
    const { width = 300, height = 300, xRange = [-5,5], yRange = [-5,5], points = [], vector, showGrid = true } = uiSpec;
    if (!points || points.length === 0) return '';
    const [xMin, xMax] = xRange; const [yMin, yMax] = yRange;
    const toPx = (x,y) => ({ x: ((x-xMin)/(xMax-xMin))*width, y: height - ((y-yMin)/(yMax-yMin))*height });
    const origin = toPx(0,0);
    const translated = points.map(p => ({ name: p.name, x: p.x + (vector?.dx||0), y: p.y + (vector?.dy||0) }));
    const seg = (a,b, cls='graphLine') => {
        const dx=b.x-a.x, dy=b.y-a.y; const len=Math.hypot(dx,dy); const ang=Math.atan2(dy,dx)*180/Math.PI;
        return `<div class="${cls}" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"></div>`;
    };
    const pt = (p, cls='graphPoint') => `<div class="${cls}" style="left:${p.x-4}px; top:${p.y-4}px;"></div>`;
    const lbl = (p, name) => name ? `<div class="graphLabel" style="left:${p.x}px; top:${p.y}px;">${name}</div>` : '';
    const arr = (a,b) => { const dx=b.x-a.x, dy=b.y-a.y; const len=Math.hypot(dx,dy); const ang=Math.atan2(dy,dx)*180/Math.PI; return `<div class="graphArrow" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"><div class="graphArrowHead"></div></div>`; };
    const mp = pts => pts.map(p => toPx(p.x,p.y));
    const origPx = mp(points);
    const transPx = mp(translated);
    let edgesOrig = '', edgesGhost = '';
    if (origPx.length >= 2) {
        for (let i=0;i<origPx.length;i++) {
            const a=origPx[i], b=origPx[(i+1)%origPx.length];
            edgesOrig += seg(a,b,'graphLine');
            edgesGhost += seg(transPx[i], transPx[(i+1)%transPx.length], 'graphLineGhost');
        }
    }
    let ptsHtml = '', ptsGhostHtml = '', labelsHtml = '', arrowsHtml = '';
    for (let i=0;i<origPx.length;i++) {
        ptsHtml += pt(origPx[i], 'graphPoint');
        ptsGhostHtml += pt(transPx[i], 'graphPointGhost');
        labelsHtml += lbl(origPx[i], points[i].name || '');
        arrowsHtml += arr(origPx[i], transPx[i]);
    }
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${showGrid ? '<div class="graphGrid"></div>' : ''}
        <div class="graphAxis x" style="top:${origin.y}px;"></div>
        <div class="graphAxis y" style="left:${origin.x}px;"></div>
        ${edgesGhost}${ptsGhostHtml}
        ${edgesOrig}${ptsHtml}${labelsHtml}
        ${arrowsHtml}
      </div>
    `;
}

function renderRotationCss(uiSpec) {
    const { width = 300, height = 300, xRange=[-5,5], yRange=[-5,5], points = [], center = {x:0,y:0}, showGrid = true, type, angle } = uiSpec;
    if (!points || points.length === 0) return '';
    let deg = 0;
    if (typeof angle === 'number') deg = angle;
    else if (type === 'rotation_90' ) deg = 90;
    else if (type === 'rotation_90_clockwise') deg = -90;
    else if (type === 'rotation_180') deg = 180;
    const rad = deg * Math.PI/180;
    const [xMin,xMax]=xRange,[yMin,yMax]=yRange;
    const toPx=(x,y)=>({x:((x-xMin)/(xMax-xMin))*width,y:height-((y-yMin)/(yMax-yMin))*height});
    const origin=toPx(0,0);
    const rot = p => {
        const cx=center.x||0, cy=center.y||0;
        const dx=p.x-cx, dy=p.y-cy;
        const rx = cx + (dx*Math.cos(rad) - dy*Math.sin(rad));
        const ry = cy + (dx*Math.sin(rad) + dy*Math.cos(rad));
        return { name:p.name, x:rx, y:ry };
    };
    const rotated = points.map(rot);
    const seg=(a,b,cls='graphLine')=>{const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;return `<div class="${cls}" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"></div>`};
    const pt=(p,cls='graphPoint')=>`<div class="${cls}" style="left:${p.x-4}px; top:${p.y-4}px;"></div>`;
    const lbl=(p,name)=>name?`<div class="graphLabel" style="left:${p.x}px; top:${p.y}px;">${name}</div>`:'';
    const arr=(a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;return `<div class="graphArrow" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"><div class="graphArrowHead"></div></div>`};
    const mp=pts=>pts.map(p=>toPx(p.x,p.y));
    const origPx=mp(points), rotPx=mp(rotated);
    let edgesOrig='', edgesGhost='';
    if (origPx.length>=2) {
        for (let i=0;i<origPx.length;i++) {
            edgesOrig += seg(origPx[i], origPx[(i+1)%origPx.length], 'graphLine');
            edgesGhost += seg(rotPx[i], rotPx[(i+1)%rotPx.length], 'graphLineGhost');
        }
    }
    let ptsHtml='', ptsGhostHtml='', labelsHtml='', arrowsHtml='';
    for (let i=0;i<origPx.length;i++) {
        ptsHtml += pt(origPx[i],'graphPoint');
        ptsGhostHtml += pt(rotPx[i],'graphPointGhost');
        labelsHtml += lbl(origPx[i], points[i].name||'');
        arrowsHtml += arr(origPx[i], rotPx[i]);
    }
    // Optional center marker
    const cpx = toPx(center.x||0, center.y||0);
    const centerMark = `<div class="graphPoint" style="left:${cpx.x-2}px; top:${cpx.y-2}px; width:4px; height:4px;"></div>`;
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${showGrid?'<div class="graphGrid"></div>':''}
        <div class="graphAxis x" style="top:${origin.y}px;"></div>
        <div class="graphAxis y" style="left:${origin.x}px;"></div>
        ${edgesGhost}${ptsGhostHtml}
        ${edgesOrig}${ptsHtml}${labelsHtml}
        ${arrowsHtml}
        ${centerMark}
      </div>
    `;
}

function renderReflectionCss(uiSpec) {
    const { width=300, height=300, xRange=[-5,5], yRange=[-5,5], points=[], showGrid=true, type, lineValue } = uiSpec;
    if (!points || points.length===0) return '';
    const [xMin,xMax]=xRange,[yMin,yMax]=yRange; const toPx=(x,y)=>({x:((x-xMin)/(xMax-xMin))*width,y:height-((y-yMin)/(yMax-yMin))*height});
    const origin=toPx(0,0);
    let mirrorCss='';
    let reflect;
    if (type==='reflection_vertical_line') {
        const k = typeof lineValue==='number' ? lineValue : 0;
        const mx = toPx(k,0).x;
        mirrorCss = `<div class="graphMirror" style="left:${mx}px; top:0; width:2px; height:100%;"></div>`;
        reflect = p => ({ name:p.name, x: 2*k - p.x, y: p.y });
    } else {
        const k = typeof lineValue==='number' ? lineValue : 0;
        const my = toPx(0,k).y;
        mirrorCss = `<div class="graphMirror" style="left:0; top:${my}px; width:100%; height:2px;"></div>`;
        reflect = p => ({ name:p.name, x: p.x, y: 2*k - p.y });
    }
    const reflected = points.map(reflect);
    const seg=(a,b,cls='graphLine')=>{const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;return `<div class="${cls}" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"></div>`};
    const pt=(p,cls='graphPoint')=>`<div class="${cls}" style="left:${p.x-4}px; top:${p.y-4}px;"></div>`;
    const lbl=(p,name)=>name?`<div class="graphLabel" style="left:${p.x}px; top:${p.y}px;">${name}</div>`:'';
    const arr=(a,b)=>{const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)*180/Math.PI;return `<div class="graphArrow" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"><div class="graphArrowHead"></div></div>`};
    const mp=pts=>pts.map(p=>toPx(p.x,p.y));
    const origPx=mp(points), refPx=mp(reflected);
    let edgesOrig='',edgesGhost='';
    if (origPx.length>=2){
        for (let i=0;i<origPx.length;i++){
            edgesOrig += seg(origPx[i], origPx[(i+1)%origPx.length], 'graphLine');
            edgesGhost += seg(refPx[i], refPx[(i+1)%refPx.length], 'graphLineGhost');
        }
    }
    let ptsHtml='',ptsGhostHtml='',labelsHtml='',arrowsHtml='';
    for (let i=0;i<origPx.length;i++){
        ptsHtml += pt(origPx[i],'graphPoint');
        ptsGhostHtml += pt(refPx[i],'graphPointGhost');
        labelsHtml += lbl(origPx[i], points[i].name||'');
        arrowsHtml += arr(origPx[i], refPx[i]);
    }
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${showGrid?'<div class="graphGrid"></div>':''}
        <div class="graphAxis x" style="top:${origin.y}px;"></div>
        <div class="graphAxis y" style="left:${origin.x}px;"></div>
        ${mirrorCss}
        ${edgesGhost}${ptsGhostHtml}
        ${edgesOrig}${ptsHtml}${labelsHtml}
        ${arrowsHtml}
      </div>
    `;
}

/**
 * Render function table
 */
function renderFunctionTable(uiSpec) {
    const { columns = [], rows = [] } = uiSpec;
    
    if (columns.length === 0 || rows.length === 0) return '';
    
    return `
        <div class="math-ui-container" style="text-align: center; margin: 20px 0;">
            <table style="margin: 0 auto; border-collapse: collapse; border: 2px solid #00ffff;">
                <thead>
                    <tr>
                        ${columns.map(col => `<th style="border: 1px solid #00ffff; padding: 10px; background: #001a1a; color: #00ffff;">${col}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(row => `
                        <tr>
                            ${row.map(cell => `<td style="border: 1px solid #00ffff; padding: 10px; color: #fff;">${cell}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/**
 * Render function rule
 */
function renderFunctionRule(uiSpec) {
    const { functionText = '' } = uiSpec;
    
    if (!functionText) return '';
    
    return `
        <div class="math-ui-container" style="text-align: center; margin: 20px 0; padding: 15px; border: 2px solid #00ffff; border-radius: 8px; background: #001a1a;">
            <div style="font-family: monospace; font-size: 1.2rem; color: #00ffff;">
                ${functionText}
            </div>
        </div>
    `;
}

/**
 * Render a simple geometry triangle diagram with pixel-space points
 * uiSpec shape:
 * { type: 'geometry_triangle_diagram', width, height, points: [{name,x,y},...], angleLabels: [{vertex,label,highlight}], styleHints }
 */
function renderGeometryTriangleDiagram(uiSpec) {
    const { width = 300, height = 300, points = [], angleLabels = [], styleHints = {} } = uiSpec;
    if (!points || points.length < 3) return '';
    const p1 = points[0], p2 = points[1], p3 = points[2];
    const seg = (a, b) => {
        const dx = b.x - a.x; const dy = b.y - a.y; const len = Math.hypot(dx, dy); const ang = Math.atan2(dy, dx) * 180/Math.PI;
        return `<div class="graphLine" style="left:${a.x}px; top:${a.y}px; width:${len}px; transform: rotate(${ang}deg);"></div>`;
    };
    const pt = a => `<div class="graphPoint" style="left:${a.x-4}px; top:${a.y-4}px;"></div>`;
    const lblFor = (vertex) => angleLabels.find(al => al.vertex === vertex);
    const angleLbl = (a) => {
        const meta = lblFor(a.name);
        if (!meta) return '';
        const color = meta.highlight ? (styleHints.highlightAngleColor || '#ff3366') : (styleHints.labelColor || '#00ffff');
        return `<div class="angleLabel" style="left:${a.x + 10}px; top:${a.y - 18}px; color:${color};">${meta.label}</div>`;
    };
    const nameLbl = (a) => `<div class="graphLabel" style="left:${a.x}px; top:${a.y}px;">${a.name || ''}</div>`;
    return `
      <div class="graphContainer" style="width:${width}px; height:${height}px;">
        ${seg(p1, p2)}${seg(p2, p3)}${seg(p3, p1)}
        ${pt(p1)}${pt(p2)}${pt(p3)}
        ${nameLbl(p1)}${nameLbl(p2)}${nameLbl(p3)}
        ${angleLbl(p1)}${angleLbl(p2)}${angleLbl(p3)}
      </div>
    `;
}

/**
 * Render geometry angle diagram with rays and angle arc
 * uiSpec shape:
 * { type: 'geometry_angle_diagram', width, height, lines: [{from:{x,y}, to:{x,y}, label}], angleArc: {center, radius, label, measureDegrees}, styleHints }
 */
function renderGeometryAngleDiagram(uiSpec) {
    const { width = 300, height = 300, lines = [], angleArc = null, styleHints = {} } = uiSpec;
    const baseColor = styleHints.baseLineColor || '#00ffff';
    const arcColor = styleHints.highlightAngleColor || '#ff6666';
    const labelColor = styleHints.labelsColor || '#00ffff';
    
    // Render lines/rays
    const renderLine = (line, idx) => {
        const { from, to, label } = line;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const len = Math.hypot(dx, dy);
        const ang = Math.atan2(dy, dx) * 180 / Math.PI;
        
        return `
            <div class="graphLine" style="
                left: ${from.x}px;
                top: ${from.y}px;
                width: ${len}px;
                transform: rotate(${ang}deg);
                background: ${baseColor};
            "></div>
            ${label ? `<div class="graphLabel" style="left: ${to.x}px; top: ${to.y - 15}px; color: ${labelColor};">${label}</div>` : ''}
        `;
    };
    
    // Render angle arc (as a curved border segment)
    const renderArc = () => {
        if (!angleArc) return '';
        const { center, radius = 35, label, measureDegrees = 0 } = angleArc;
        
        // Calculate arc position - use SVG for smooth arc
        const arcSvg = `
            <svg class="angleSvg" style="position: absolute; left: 0; top: 0; width: ${width}px; height: ${height}px; pointer-events: none;">
                <circle 
                    cx="${center.x}" 
                    cy="${center.y}" 
                    r="${radius}" 
                    stroke="${arcColor}" 
                    stroke-width="2" 
                    fill="none"
                    stroke-dasharray="${Math.PI * radius * measureDegrees / 180} ${Math.PI * 2 * radius}"
                    transform="rotate(-90 ${center.x} ${center.y})"
                />
            </svg>
        `;
        
        // Label near the arc
        const labelX = center.x + (radius + 15) * Math.cos((-90 + measureDegrees / 2) * Math.PI / 180);
        const labelY = center.y + (radius + 15) * Math.sin((-90 + measureDegrees / 2) * Math.PI / 180);
        const labelHtml = label ? `<div class="angleLabel" style="left: ${labelX}px; top: ${labelY}px; color: ${arcColor};">${label} = ${measureDegrees}°</div>` : '';
        
        return arcSvg + labelHtml;
    };
    
    // Render center point
    const renderCenter = () => {
        if (!angleArc || !angleArc.center) return '';
        const { center } = angleArc;
        return `<div class="graphPoint" style="left: ${center.x - 4}px; top: ${center.y - 4}px;"></div>`;
    };
    
    return `
        <div class="graphContainer" style="width: ${width}px; height: ${height}px; position: relative;">
            ${lines.map(renderLine).join('')}
            ${renderArc()}
            ${renderCenter()}
        </div>
    `;
}

/**
 * Render geometry quadrilateral diagram (rectangle, square, parallelogram, etc.)
 * uiSpec shape:
 * { type: 'geometry_quadrilateral_diagram', width, height, vertices: [{x,y},...], labels: {length, width, etc.}, styleHints }
 */
function renderGeometryQuadrilateralDiagram(uiSpec) {
    const { width = 300, height = 300, vertices = [], labels = {}, styleHints = {} } = uiSpec;
    const baseColor = styleHints.lineColor || '#00ffff';
    const labelColor = styleHints.labelsColor || '#00ffff';
    
    // If no vertices provided, render a default rectangle
    if (vertices.length < 4) {
        // Default rectangle centered in the container
        const rectWidth = labels.length || 100;
        const rectHeight = labels.width || 60;
        const x = (width - rectWidth) / 2;
        const y = (height - rectHeight) / 2;
        
        return `
            <div class="graphContainer" style="width: ${width}px; height: ${height}px; position: relative;">
                <div style="
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: ${rectWidth}px;
                    height: ${rectHeight}px;
                    border: 2px solid ${baseColor};
                    box-shadow: 0 0 5px ${baseColor};
                "></div>
                ${labels.length ? `<div class="graphLabel" style="left: ${x + rectWidth/2}px; top: ${y + rectHeight + 10}px; color: ${labelColor};">${labels.length}</div>` : ''}
                ${labels.width ? `<div class="graphLabel" style="left: ${x + rectWidth + 10}px; top: ${y + rectHeight/2}px; color: ${labelColor};">${labels.width}</div>` : ''}
            </div>
        `;
    }
    
    // Render custom vertices
    const renderEdges = () => {
        let html = '';
        for (let i = 0; i < vertices.length; i++) {
            const from = vertices[i];
            const to = vertices[(i + 1) % vertices.length];
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.hypot(dx, dy);
            const ang = Math.atan2(dy, dx) * 180 / Math.PI;
            
            html += `<div class="graphLine" style="
                left: ${from.x}px;
                top: ${from.y}px;
                width: ${len}px;
                transform: rotate(${ang}deg);
                background: ${baseColor};
            "></div>`;
        }
        return html;
    };
    
    const renderVertices = () => {
        return vertices.map(v => `<div class="graphPoint" style="left: ${v.x - 4}px; top: ${v.y - 4}px;"></div>`).join('');
    };
    
    return `
        <div class="graphContainer" style="width: ${width}px; height: ${height}px; position: relative;">
            ${renderEdges()}
            ${renderVertices()}
        </div>
    `;
}

/**
 * Render a basic polygon (pentagon, hexagon, etc.)
 * uiSpec: { type: 'polygon_basic', width, height, points: [{x, y, label}], labels, styleHints }
 */
function renderPolygonBasic(uiSpec) {
    const { width = 300, height = 300, points = [], labels = true, styleHints = {} } = uiSpec;
    const lineColor = styleHints.lineColor || '#00ffff';
    const labelColor = styleHints.labelsColor || styleHints.labelColor || '#00ffff';
    
    if (points.length < 3) return '';
    
    // Render edges
    const renderEdges = () => {
        let html = '';
        for (let i = 0; i < points.length; i++) {
            const from = points[i];
            const to = points[(i + 1) % points.length];
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.hypot(dx, dy);
            const ang = Math.atan2(dy, dx) * 180 / Math.PI;
            
            html += `<div class="graphLine" style="
                left: ${from.x}px;
                top: ${from.y}px;
                width: ${len}px;
                transform: rotate(${ang}deg);
                background: ${lineColor};
            "></div>`;
        }
        return html;
    };
    
    // Render vertices with labels
    const renderVertices = () => {
        return points.map(p => {
            const pointHtml = `<div class="graphPoint" style="left: ${p.x - 4}px; top: ${p.y - 4}px;"></div>`;
            const labelHtml = labels && p.label ? `<div class="graphLabel" style="left: ${p.x}px; top: ${p.y - 20}px; color: ${labelColor};">${p.label}</div>` : '';
            return pointHtml + labelHtml;
        }).join('');
    };
    
    return `
        <div class="graphContainer" style="width: ${width}px; height: ${height}px; position: relative;">
            ${renderEdges()}
            ${renderVertices()}
        </div>
    `;
}

/**
 * Render angle pair diagram (vertical angles, linear pairs, etc.)
 * uiSpec: { type: 'geometry_angle_pair_diagram', width, height, lines: [{from, to}], angleLabels: [{position, label, highlight}], styleHints }
 */
function renderGeometryAnglePairDiagram(uiSpec) {
    const { width = 300, height = 300, lines = [], angleLabels = [], styleHints = {} } = uiSpec;
    const baseColor = styleHints.baseLineColor || '#00ffff';
    const highlightColor = styleHints.highlightAngleColor || '#ff6666';
    
    // Render lines
    const renderLines = () => {
        return lines.map(line => {
            const { from, to } = line;
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const len = Math.hypot(dx, dy);
            const ang = Math.atan2(dy, dx) * 180 / Math.PI;
            
            return `<div class="graphLine" style="
                left: ${from.x}px;
                top: ${from.y}px;
                width: ${len}px;
                transform: rotate(${ang}deg);
                background: ${baseColor};
            "></div>`;
        }).join('');
    };
    
    // Render angle labels at specified positions
    const renderAngleLabels = () => {
        // Find intersection point (center)
        const centerX = width / 2;
        const centerY = height / 2;
        
        const positionOffsets = {
            'topRight': { x: centerX + 30, y: centerY - 30 },
            'topLeft': { x: centerX - 50, y: centerY - 30 },
            'bottomRight': { x: centerX + 30, y: centerY + 15 },
            'bottomLeft': { x: centerX - 50, y: centerY + 15 },
            'right': { x: centerX + 40, y: centerY - 10 },
            'left': { x: centerX - 60, y: centerY - 10 },
            'top': { x: centerX - 15, y: centerY - 45 },
            'bottom': { x: centerX - 15, y: centerY + 30 }
        };
        
        return angleLabels.map(al => {
            const pos = positionOffsets[al.position] || { x: centerX, y: centerY };
            const color = al.highlight ? highlightColor : baseColor;
            return `<div class="angleLabel" style="left: ${pos.x}px; top: ${pos.y}px; color: ${color};">${al.label}</div>`;
        }).join('');
    };
    
    return `
        <div class="graphContainer" style="width: ${width}px; height: ${height}px; position: relative;">
            ${renderLines()}
            ${renderAngleLabels()}
        </div>
    `;
}

function renderQuiz() {
    const currentQuestion = state.quiz.questions[state.quiz.currentIndex];
    const answered = state.quiz.selectedAnswer !== null;
    const isCorrect = answered && state.quiz.selectedAnswer === currentQuestion.correctIndex;
    const isTestMode = state.quiz.mode === 'test';
    const isPracticeTestMode = state.quiz.mode === 'practiceTestMode';
    const isSprintMode = state.quiz.mode === 'sprint';
    const showFeedback = state.quiz.showFeedback; // Patch 18: use flag
    const progressPercent = ((state.quiz.currentIndex + 1) / state.quiz.questions.length) * 100;
    
    // Determine mode label with difficulty
    let modeLabel = '';
    const difficultyLabels = {
        'beginner': '⭐',
        'advanced': '⭐⭐',
        'expert': '⭐⭐⭐'
    };
    const xpMultipliers = {
        'beginner': '1x',
        'advanced': '1.5x',
        'expert': '2x'
    };
    
    if (isPracticeTestMode) {
        modeLabel = ' <span style="color: #ff9900;">• AFOQT PRACTICE TEST</span>';
    } else if (isTestMode) {
        modeLabel = ' <span style="color: #ff6666;">• TEST MODE (1.5x XP)</span>';
    } else if (isSprintMode) {
        modeLabel = ' <span style="color: #ffff00;">• SPRINT MODE</span>';
    } else {
        // Practice mode - show difficulty
        const diffLabel = difficultyLabels[state.quiz.difficulty] || '⭐';
        const xpLabel = xpMultipliers[state.quiz.difficulty] || '1x';
        modeLabel = ` <span style="color: #00ff00;">• ${diffLabel} ${xpLabel} XP</span>`;
    }
    
    return `
        <div class="panel">
            <div class="quiz-progress-bar">
                <div class="quiz-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            
            <div class="quiz-header">
                <div class="quiz-info">
                    <strong>${state.quiz.isPracticeTest ? 'AFOQT Practice Test' : (state.currentTopic ? state.currentTopic.name : 'Quiz')}</strong><br>
                    Question ${state.quiz.currentIndex + 1} / ${state.quiz.questions.length}
                    ${modeLabel}
                </div>
                <div class="timer">60.0s</div>
            </div>
            
            ${currentQuestion.image ? `
                <div class="question-image">
                    <img src="${currentQuestion.image}" alt="Question diagram" style="max-width: 100%; height: auto; margin: 20px auto; display: block; border: 2px solid #00ffff; border-radius: 8px; background: #000;">
                </div>
            ` : ''}
            
            ${currentQuestion.uiSpec ? renderMathUI(currentQuestion.uiSpec) : ''}
            
            <div class="question-prompt">
                ${currentQuestion.prompt}
            </div>
            
            <div class="options-grid">
                ${currentQuestion.options.map((option, idx) => {
                    const isSelected = idx === state.quiz.selectedAnswer;
                    const isCorrectOption = idx === currentQuestion.correctIndex;
                    let classes = 'option-btn';
                    
                    // Patch 18: Only show highlighting if showFeedback is true
                    if (answered && showFeedback) {
                        if (isCorrectOption) classes += ' correct';
                        if (isSelected && !isCorrect) classes += ' incorrect';
                    } else if (answered && !showFeedback && isSelected) {
                        classes += ' selected';
                    }
                    
                    // Patch 21: Handle IMAGE choices with choiceSprites
                    let optionContent = option;
                    if (option === 'IMAGE' && currentQuestion.uiSpec && currentQuestion.uiSpec.choiceSprites) {
                        const optionLetter = String.fromCharCode(65 + idx);
                        const spriteData = currentQuestion.uiSpec.choiceSprites[optionLetter];
                        if (spriteData) {
                            optionContent = renderInstrumentChoiceSprite(spriteData);
                        }
                    }
                    
                    return `
                        <button 
                            class="${classes}" 
                            data-option-index="${idx}"
                            ${answered ? 'disabled' : ''}
                        >
                            <span class="option-label">${String.fromCharCode(65 + idx)}.</span>
                            ${optionContent}
                        </button>
                    `;
                }).join('')}
            </div>
            
            ${answered && showFeedback ? `
                <div class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
                    <div class="feedback-status">
                        ${isCorrect ? '✓ CORRECT' : '✗ INCORRECT'}
                    </div>
                    <div class="feedback-answer">
                        Correct answer: ${String.fromCharCode(65 + currentQuestion.correctIndex)}. ${currentQuestion.options[currentQuestion.correctIndex]}
                    </div>
                    <div class="feedback-explanation">
                        ${currentQuestion.explanation}
                    </div>
                    ${currentQuestion.fastStrategy ? `
                    <div class="feedback-fast-strategy">
                        <strong>⚡ Fast Strategy:</strong> ${currentQuestion.fastStrategy}
                    </div>
                    ` : ''}
                    ${currentQuestion.steps && currentQuestion.steps.length > 0 ? `
                    <div class="feedback-steps">
                        <strong>📋 Steps:</strong>
                        <ol>
                            ${currentQuestion.steps.map(step => `<li>${step.replace(/^\d+\.\s*/, '')}</li>`).join('')}
                        </ol>
                    </div>
                    ` : ''}
                </div>
            ` : ''}
            
            ${answered && !showFeedback ? `
                <div class="feedback feedback-success">
                    <div class="feedback-status">
                        Answer Recorded
                    </div>
                    <div style="opacity: 0.8;">
                        ${isPracticeTestMode ? 'Feedback will be shown in the summary report' : 'Feedback will be shown at the end of the test'}
                    </div>
                </div>
            ` : ''}
            
            <div class="action-buttons quiz-action-buttons">
                <button class="btn" id="home-btn">← Return to Topics</button>
                ${answered ? `
                    <button class="btn" id="next-btn">
                        ${state.quiz.currentIndex < state.quiz.questions.length - 1 ? 'Next →' : 'Finish'}
                    </button>
                ` : ''}
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

function renderResults() {
    const percentage = (state.quiz.score / state.quiz.questions.length * 100).toFixed(1);
    const avgTime = state.quiz.questionTimes.reduce((a, b) => a + b, 0) / state.quiz.questionTimes.length;
    
    return `
        <div class="panel">
            <h1 class="panel-header">Results</h1>
            
            <div class="results-summary">
                <div class="score-display">
                    ${state.quiz.score} / ${state.quiz.questions.length}
                </div>
                <div class="stat-line">
                    ${percentage}% Correct
                </div>
                <div class="stat-line">
                    Average Time: ${formatTime(avgTime)}s per question
                </div>
                <div class="stat-line">
                    Topic: ${state.currentTopic.name}
                </div>
            </div>
            
            <!-- Question Review Section -->
            <div class="question-review-section">
                <h2 class="review-title">📝 Question Review</h2>
                
                ${state.quiz.questions.map((question, idx) => {
                    const userAnswer = state.quiz.userAnswers.find(a => a.questionIndex === idx);
                    const isCorrect = userAnswer ? userAnswer.isCorrect : false;
                    const userAnswerIndex = userAnswer ? userAnswer.userAnswer : null;
                    const timeSpent = userAnswer ? userAnswer.timeSpent : 0;
                    
                    return `
                        <div class="review-question ${isCorrect ? 'review-correct' : 'review-incorrect'}">
                            <div class="review-header">
                                <div class="review-number">Question ${idx + 1}</div>
                                <div class="review-status ${isCorrect ? 'status-correct' : 'status-incorrect'}">
                                    ${isCorrect ? '✓ Correct' : '✗ Incorrect'}
                                </div>
                                <div class="review-time">⏱ ${formatTime(timeSpent)}s</div>
                            </div>
                            
                            <div class="review-prompt">${question.prompt}</div>
                            
                            <div class="review-options">
                                ${question.options.map((option, optIdx) => {
                                    const isUserAnswer = optIdx === userAnswerIndex;
                                    const isCorrectAnswer = optIdx === question.correctIndex;
                                    let optionClass = 'review-option';
                                    
                                    if (isCorrectAnswer) {
                                        optionClass += ' review-option-correct';
                                    }
                                    if (isUserAnswer && !isCorrect) {
                                        optionClass += ' review-option-wrong';
                                    }
                                    
                                    return `
                                        <div class="${optionClass}">
                                            <span class="review-option-label">${String.fromCharCode(65 + optIdx)}.</span>
                                            <span class="review-option-text">${option}</span>
                                            ${isUserAnswer ? '<span class="review-badge-user">Your Answer</span>' : ''}
                                            ${isCorrectAnswer ? '<span class="review-badge-correct">Correct Answer</span>' : ''}
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                            
                            <div class="review-explanation">
                                <strong>Explanation:</strong> ${question.explanation}
                            </div>
                            ${question.fastStrategy ? `
                            <div class="feedback-fast-strategy" style="margin-top: 10px;">
                                <strong>⚡ Fast Strategy:</strong> ${question.fastStrategy}
                            </div>
                            ` : ''}
                            ${question.steps && question.steps.length > 0 ? `
                            <div class="feedback-steps" style="margin-top: 10px;">
                                <strong>📋 Steps:</strong>
                                <ol>
                                    ${question.steps.map(step => `<li>${step.replace(/^\d+\.\s*/, '')}</li>`).join('')}
                                </ol>
                            </div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            
            ${state.currentPlayer ? `
                <div class="history-section">
                    <div class="history-title">Recent Sessions - ${state.currentPlayer.name}</div>
                    <div class="history-list">
                        ${state.currentPlayer.sessions
                            .sort((a, b) => b.timestamp - a.timestamp)
                            .slice(0, 5)
                            .map(session => {
                                const percent = (session.score / session.total * 100).toFixed(1);
                                return `
                                    <div class="history-item">
                                        <div class="history-date">${formatDate(session.timestamp)}</div>
                                        <div class="history-topic">${session.topicName}</div>
                                        <div class="history-stats">
                                            Score: ${session.score}/${session.total} (${percent}%) · 
                                            Avg Time: ${formatTime(session.avgTime)}s
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                    </div>
                </div>
            ` : ''}
            
            <div class="action-buttons quiz-action-buttons">
                <button class="btn" id="home-btn">🏠 Home</button>
                <button class="btn" id="retry-btn">↻ Retry Topic</button>
            </div>
        </div>
    `;
}

function renderStatus() {
    if (!state.currentPlayer) {
        return '<div class="panel"><h1>No player selected</h1></div>';
    }
    
    const { totalStatPoints, level, pointsIntoLevel, pointsToNextLevel } = computePlayerTotals(state.currentPlayer);
    const stats = state.currentPlayer.stats || {};
    const sessions = state.currentPlayer.sessions || [];
    
    // Aggregate stats by subject
    const subjectStats = subjects.map(subject => {
        const subjectTopics = topics.filter(t => t.subjectId === subject.id);
        let totalCorrectAnswers = 0;
        let totalStatPoints = 0;
        
        subjectTopics.forEach(topic => {
            const topicStat = stats[topic.id] || { correctAnswers: 0, statPoints: 0 };
            totalCorrectAnswers += topicStat.correctAnswers;
            totalStatPoints += topicStat.statPoints;
        });
        
        return {
            subjectId: subject.id,
            subjectName: subject.name,
            correctAnswers: totalCorrectAnswers,
            statPoints: totalStatPoints
        };
    });
    
    // Initialize equipment if not present
    initializePlayerEquipment(state.currentPlayer);
    
    // Get equipped items
    const equippedHelmet = EQUIPMENT_ITEMS[state.currentPlayer.equipment.helmet];
    const equippedArmor = EQUIPMENT_ITEMS[state.currentPlayer.equipment.armor];
    const equippedWeapon = EQUIPMENT_ITEMS[state.currentPlayer.equipment.weapon];
    const equippedAccessory = EQUIPMENT_ITEMS[state.currentPlayer.equipment.accessory];
    
    return `
        <div class="panel">
            <h1 class="panel-header">Player Status</h1>
            
            <div class="status-layout">
                <!-- Left side: Character Display -->
                <div class="status-character-section">
                    <div class="status-player-info">
                        <div class="status-name">${state.currentPlayer.name}</div>
                        <div class="status-level">Level ${level}</div>
                        <div class="status-total-stats">Total SP: ${totalStatPoints}</div>
                    </div>
                    
                    <!-- Character Sprite -->
                    <div class="status-sprite-container">
                        ${renderCharacterSprite(state.currentPlayer)}
                    </div>
                    
                    <!-- Equipped Items Preview -->
                    <div class="status-equipped-items">
                        <div class="equipped-item-row">
                            <span class="equipped-icon">🎓</span>
                            <span class="equipped-name">${equippedHelmet ? equippedHelmet.name : 'None'}</span>
                        </div>
                        <div class="equipped-item-row">
                            <span class="equipped-icon">🛡</span>
                            <span class="equipped-name">${equippedArmor ? equippedArmor.name : 'None'}</span>
                        </div>
                        <div class="equipped-item-row">
                            <span class="equipped-icon">⚔</span>
                            <span class="equipped-name">${equippedWeapon ? equippedWeapon.name : 'None'}</span>
                        </div>
                        <div class="equipped-item-row">
                            <span class="equipped-icon">💎</span>
                            <span class="equipped-name">${equippedAccessory ? equippedAccessory.name : 'None'}</span>
                        </div>
                    </div>
                    
                    <div class="status-progress">
                        <div class="status-progress-label">Progress to Level ${level + 1}</div>
                        <div class="status-progress-bar">
                            <div class="status-progress-fill" style="width: ${(pointsIntoLevel / 5) * 100}%"></div>
                        </div>
                        <div class="status-progress-text">${pointsIntoLevel} / 5 points</div>
                    </div>
                </div>
                
                <!-- Right side: Stats and Achievements -->
                <div class="status-stats-section">
                    <h2 style="margin: 0 0 20px 0; text-align: center;">Subject Stats</h2>
                    
                    <div class="stats-grid">
                        ${subjectStats.map(stat => {
                            const maxBarWidth = 50;
                            const barPercentage = Math.min((stat.statPoints / maxBarWidth) * 100, 100);
                            
                            return `
                                <div class="stat-item">
                                    <div class="stat-header">
                                        <div class="stat-topic-name">${stat.subjectName}</div>
                                        <div class="stat-points">SP: ${stat.statPoints}</div>
                                    </div>
                                    <div class="stat-bar">
                                        <div class="stat-bar-fill" style="width: ${barPercentage}%"></div>
                                    </div>
                                    <div class="stat-details">
                                        Correct Answers: ${stat.correctAnswers}
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <!-- Titles, Awards, and Milestones -->
                    <h2 style="margin: 30px 0 20px 0; text-align: center;">🏆 Titles & Achievements</h2>
                    <div class="achievements-container">
                        ${renderPlayerAchievements(state.currentPlayer, level, totalStatPoints)}
                    </div>
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

function renderEquipment() {
    if (!state.currentPlayer) {
        return '<div class="panel"><h1>No player selected</h1></div>';
    }
    
    initializePlayerEquipment(state.currentPlayer);
    
    const { totalStatPoints, level } = computePlayerTotals(state.currentPlayer);
    const stats = state.currentPlayer.stats || {};
    const equipmentBonus = calculateEquipmentBonus(state.currentPlayer);
    const unlockedItems = getUnlockedItems(state.currentPlayer);
    
    // Calculate subject levels
    const subjectLevels = {};
    subjects.forEach(subject => {
        const subjectTopics = topics.filter(t => t.subjectId === subject.id);
        let totalStatPoints = 0;
        
        subjectTopics.forEach(topic => {
            const topicStat = stats[topic.id] || { correctAnswers: 0, statPoints: 0 };
            totalStatPoints += topicStat.statPoints;
        });
        
        subjectLevels[subject.id] = {
            name: subject.name,
            level: 1 + Math.floor(totalStatPoints / 5),
            statPoints: totalStatPoints
        };
    });
    
    // Get equipped items
    const equippedHelmet = EQUIPMENT_ITEMS[state.currentPlayer.equipment.helmet];
    const equippedArmor = EQUIPMENT_ITEMS[state.currentPlayer.equipment.armor];
    const equippedWeapon = EQUIPMENT_ITEMS[state.currentPlayer.equipment.weapon];
    const equippedAccessory = EQUIPMENT_ITEMS[state.currentPlayer.equipment.accessory];
    
    return `
        <div class="panel">
            <h1 class="panel-header">🎖 Player Loadout 🎖</h1>
            
            <div class="loadout-container">
                <!-- Left Side: Character Display & Equipment Slots -->
                <div class="character-display-section">
                    <div class="character-info-box">
                        <div class="character-name">${state.currentPlayer.name}</div>
                        <div class="character-level">Level ${level} Scholar</div>
                        <div class="character-sp">Total SP: ${totalStatPoints}</div>
                    </div>
                    
                    <!-- Pixel Art Character Sprite -->
                    <div class="character-sprite-container">
                        ${renderCharacterSprite(state.currentPlayer)}
                    </div>
                    
                    <!-- Equipment Slots -->
                    <div class="equipment-slots">
                        <div class="equipment-slot ${equippedHelmet ? 'equipped' : 'empty'}" data-slot="helmet">
                            <div class="slot-icon">🎓</div>
                            <div class="slot-label">Helmet</div>
                            ${equippedHelmet ? `
                                <div class="equipped-item">
                                    <div class="item-name">${equippedHelmet.name}</div>
                                    <button class="btn-tiny unequip-btn" data-slot="helmet">✕</button>
                                </div>
                            ` : '<div class="slot-empty-text">Empty</div>'}
                        </div>
                        
                        <div class="equipment-slot ${equippedArmor ? 'equipped' : 'empty'}" data-slot="armor">
                            <div class="slot-icon">🛡</div>
                            <div class="slot-label">Armor</div>
                            ${equippedArmor ? `
                                <div class="equipped-item">
                                    <div class="item-name">${equippedArmor.name}</div>
                                    <button class="btn-tiny unequip-btn" data-slot="armor">✕</button>
                                </div>
                            ` : '<div class="slot-empty-text">Empty</div>'}
                        </div>
                        
                        <div class="equipment-slot ${equippedWeapon ? 'equipped' : 'empty'}" data-slot="weapon">
                            <div class="slot-icon">⚔</div>
                            <div class="slot-label">Weapon</div>
                            ${equippedWeapon ? `
                                <div class="equipped-item">
                                    <div class="item-name">${equippedWeapon.name}</div>
                                    <button class="btn-tiny unequip-btn" data-slot="weapon">✕</button>
                                </div>
                            ` : '<div class="slot-empty-text">Empty</div>'}
                        </div>
                        
                        <div class="equipment-slot ${equippedAccessory ? 'equipped' : 'empty'}" data-slot="accessory">
                            <div class="slot-icon">💎</div>
                            <div class="slot-label">Accessory</div>
                            ${equippedAccessory ? `
                                <div class="equipped-item">
                                    <div class="item-name">${equippedAccessory.name}</div>
                                    <button class="btn-tiny unequip-btn" data-slot="accessory">✕</button>
                                </div>
                            ` : '<div class="slot-empty-text">Empty</div>'}
                        </div>
                    </div>
                    
                    <!-- Equipment Stats Bonus -->
                    <div class="equipment-bonus-box">
                        <div class="bonus-title">Equipment Bonus:</div>
                        <div class="bonus-stats">
                            ${equipmentBonus.intelligence > 0 ? `<span class="bonus-stat">+${equipmentBonus.intelligence} INT</span>` : ''}
                            ${equipmentBonus.charisma > 0 ? `<span class="bonus-stat">+${equipmentBonus.charisma} CHA</span>` : ''}
                            ${equipmentBonus.attack > 0 ? `<span class="bonus-stat">+${equipmentBonus.attack} ATK</span>` : ''}
                            ${equipmentBonus.defense > 0 ? `<span class="bonus-stat">+${equipmentBonus.defense} DEF</span>` : ''}
                            ${equipmentBonus.wisdom > 0 ? `<span class="bonus-stat">+${equipmentBonus.wisdom} WIS</span>` : ''}
                            ${Object.values(equipmentBonus).every(v => v === 0) ? '<span class="bonus-stat-none">No bonuses</span>' : ''}
                        </div>
                    </div>
                </div>
                
                <!-- Right Side: Item Inventory -->
                <div class="inventory-section">
                    <h2 class="inventory-title">⚡ Available Items ⚡</h2>
                    
                    <div class="inventory-grid">
                        ${Object.values(EQUIPMENT_ITEMS).map(item => {
                            const isUnlocked = unlockedItems.includes(item.id);
                            const isEquipped = state.currentPlayer.equipment[item.type] === item.id;
                            const unlockReq = item.unlockSubject ? 
                                `${subjects.find(s => s.id === item.unlockSubject)?.name || item.unlockSubject} Lv.${item.unlockLevel}` : 
                                `Level ${item.unlockLevel}`;
                            
                            return `
                                <div class="inventory-item ${isUnlocked ? 'unlocked' : 'locked'} ${isEquipped ? 'equipped-item-highlight' : ''}" 
                                     data-item-id="${item.id}">
                                    <div class="item-header">
                                        <div class="item-icon">${getItemIcon(item.type)}</div>
                                        <div class="item-name-inv">${item.name}</div>
                                    </div>
                                    <div class="item-description">${item.description}</div>
                                    <div class="item-stats">
                                        ${Object.entries(item.statBonus).map(([stat, value]) => 
                                            `<span class="item-stat-bonus">+${value} ${stat.substring(0, 3).toUpperCase()}</span>`
                                        ).join(' ')}
                                    </div>
                                    ${isUnlocked ? `
                                        ${isEquipped ? 
                                            `<div class="item-equipped-badge">✓ EQUIPPED</div>` :
                                            `<button class="btn btn-small equip-item-btn" data-item-id="${item.id}">Equip</button>`
                                        }
                                    ` : `
                                        <div class="item-locked-overlay">
                                            <div class="lock-icon">🔒</div>
                                            <div class="unlock-req">${unlockReq}</div>
                                        </div>
                                    `}
                                </div>
                            `;
                        }).join('')}
                    </div>
                    
                    <h3 style="margin-top: 30px; color: #00ffff;">📚 Subject Levels</h3>
                    <div class="subject-levels-list">
                        ${Object.values(subjectLevels).filter(s => s.statPoints > 0).map(subject => `
                            <div class="subject-level-item">
                                <span class="subject-level-name">${subject.name}</span>
                                <span class="subject-level-value">Level ${subject.level}</span>
                            </div>
                        `).join('')}
                        ${Object.values(subjectLevels).every(s => s.statPoints === 0) ? '<p style="opacity: 0.7; text-align: center;">Complete quizzes to level up subjects!</p>' : ''}
                    </div>
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

function getItemIcon(type) {
    const icons = {
        helmet: '🎓',
        armor: '🛡',
        weapon: '⚔',
        accessory: '💎'
    };
    return icons[type] || '📦';
}

function renderPlayerAchievements(player, level, totalStatPoints) {
    const stats = player.stats || {};
    const sessions = player.sessions || [];
    
    // Calculate achievements
    const achievements = [];
    
    // Level-based titles
    if (level >= 30) {
        achievements.push({ type: 'title', icon: '👑', name: 'Grand Master', description: 'Reached Level 30' });
    } else if (level >= 20) {
        achievements.push({ type: 'title', icon: '🎖️', name: 'Expert Scholar', description: 'Reached Level 20' });
    } else if (level >= 10) {
        achievements.push({ type: 'title', icon: '🏅', name: 'Advanced Student', description: 'Reached Level 10' });
    } else if (level >= 5) {
        achievements.push({ type: 'title', icon: '⭐', name: 'Dedicated Learner', description: 'Reached Level 5' });
    } else {
        achievements.push({ type: 'title', icon: '🌟', name: 'Novice', description: 'Beginning the journey' });
    }
    
    // Stat point milestones
    if (totalStatPoints >= 100) {
        achievements.push({ type: 'milestone', icon: '💯', name: 'Century Club', description: '100+ Total Stat Points' });
    }
    if (totalStatPoints >= 50) {
        achievements.push({ type: 'milestone', icon: '✨', name: 'Half Century', description: '50+ Total Stat Points' });
    }
    
    // Session-based achievements
    const totalSessions = sessions.length;
    if (totalSessions >= 100) {
        achievements.push({ type: 'award', icon: '🎯', name: 'Persistent', description: '100+ Quiz Sessions' });
    } else if (totalSessions >= 50) {
        achievements.push({ type: 'award', icon: '🔥', name: 'Dedicated', description: '50+ Quiz Sessions' });
    } else if (totalSessions >= 25) {
        achievements.push({ type: 'award', icon: '💪', name: 'Committed', description: '25+ Quiz Sessions' });
    }
    
    // Perfect score achievements
    const perfectScores = sessions.filter(s => s.score === s.total).length;
    if (perfectScores >= 10) {
        achievements.push({ type: 'award', icon: '🌟', name: 'Perfectionist', description: '10+ Perfect Scores' });
    } else if (perfectScores >= 5) {
        achievements.push({ type: 'award', icon: '⚡', name: 'Sharpshooter', description: '5+ Perfect Scores' });
    }
    
    // Subject mastery (check if any subject has high stat points)
    const subjectMastery = [];
    subjects.forEach(subject => {
        const subjectTopics = topics.filter(t => t.subjectId === subject.id);
        let subjectStatPoints = 0;
        subjectTopics.forEach(topic => {
            const topicStat = stats[topic.id] || { statPoints: 0 };
            subjectStatPoints += topicStat.statPoints;
        });
        
        if (subjectStatPoints >= 30) {
            subjectMastery.push({ type: 'mastery', icon: '📚', name: `${subject.name} Master`, description: `30+ SP in ${subject.name}` });
        }
    });
    
    achievements.push(...subjectMastery.slice(0, 3)); // Limit to top 3
    
    // If no achievements yet
    if (achievements.length === 1) {
        achievements.push({ type: 'milestone', icon: '🎯', name: 'First Steps', description: 'Complete quizzes to earn more!' });
    }
    
    return `
        <div class="achievement-list">
            ${achievements.map(achievement => `
                <div class="achievement-item ${achievement.type}">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-info">
                        <div class="achievement-name">${achievement.name}</div>
                        <div class="achievement-description">${achievement.description}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}


function renderCharacterSprite(player) {
    const equipment = player.equipment || {};
    const helmetId = equipment.helmet;
    const armorId = equipment.armor;
    const weaponId = equipment.weapon;
    const accessoryId = equipment.accessory;
    
    // Determine visual styles based on equipment
    const helmetClass = helmetId ? `helmet-${EQUIPMENT_ITEMS[helmetId]?.sprite || 'cap'}` : '';
    const armorClass = armorId ? `armor-${EQUIPMENT_ITEMS[armorId]?.sprite || 'robes'}` : '';
    const weaponClass = weaponId ? `weapon-${EQUIPMENT_ITEMS[weaponId]?.sprite || 'stylus'}` : '';
    const accessoryClass = accessoryId ? `accessory-${EQUIPMENT_ITEMS[accessoryId]?.sprite || 'amulet'}` : '';
    
    return `
        <div class="pixel-character ${armorClass}">
            <!-- Head -->
            <div class="pixel-head ${helmetId ? 'has-helmet' : ''}"></div>
            ${helmetId ? `<div class="pixel-helmet ${helmetClass}"></div>` : ''}
            
            <!-- Body -->
            <div class="pixel-body ${armorId ? 'has-armor' : ''} ${armorClass}"></div>
            
            <!-- Arms -->
            <div class="pixel-arm-left"></div>
            <div class="pixel-arm-right ${weaponId ? 'has-weapon' : ''}"></div>
            ${weaponId ? `<div class="pixel-weapon ${weaponClass}"></div>` : ''}
            
            <!-- Legs -->
            <div class="pixel-leg-left"></div>
            <div class="pixel-leg-right"></div>
            
            ${accessoryId ? `<div class="pixel-accessory ${accessoryClass}"></div>` : ''}
        </div>
    `;
}

function renderAchievements() {
    if (!state.currentPlayer) {
        return '<div class="panel"><h1>No player selected</h1></div>';
    }
    
    if (!state.currentPlayer.achievements) {
        state.currentPlayer.achievements = [];
    }
    
    const { level } = computePlayerTotals(state.currentPlayer);
    const unlockedAchievements = achievements.filter(a => 
        state.currentPlayer.achievements.includes(a.id)
    );
    const lockedAchievements = achievements.filter(a => 
        !state.currentPlayer.achievements.includes(a.id)
    );
    
    return `
        <div class="panel">
            <h1 class="panel-header">🏆 Awards & Achievements 🏆</h1>
            
            <div class="achievements-container">
                <div class="achievements-header">
                    <div class="achievement-stats">
                        <span class="achievement-count">${unlockedAchievements.length} / ${achievements.length}</span>
                        <span class="achievement-label">Achievements Unlocked</span>
                    </div>
                </div>
                
                ${unlockedAchievements.length > 0 ? `
                    <h2 style="margin-top: 30px; color: var(--color-accent);">✓ Unlocked</h2>
                    <div class="achievements-grid">
                        ${unlockedAchievements.map(achievement => `
                            <div class="achievement-card unlocked">
                                <div class="achievement-card-icon">${achievement.icon}</div>
                                <div class="achievement-card-name">${achievement.name}</div>
                                <div class="achievement-card-desc">${achievement.description}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                ${lockedAchievements.length > 0 ? `
                    <h2 style="margin-top: 30px; color: var(--color-text-dim);">🔒 Locked</h2>
                    <div class="achievements-grid">
                        ${lockedAchievements.map(achievement => `
                            <div class="achievement-card locked">
                                <div class="achievement-card-icon">🔒</div>
                                <div class="achievement-card-name">???</div>
                                <div class="achievement-card-desc">${achievement.description}</div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <h2 style="margin-top: 40px; color: var(--color-secondary);">📋 Active Challenges</h2>
                <div class="challenges-list">
                    ${challenges.map(challenge => {
                        const progress = state.currentPlayer.challengeProgress?.[challenge.progressType] || 0;
                        const percentage = Math.min(100, (progress / challenge.target) * 100);
                        const isComplete = progress >= challenge.target;
                        
                        return `
                            <div class="challenge-card ${isComplete ? 'complete' : ''}">
                                <div class="challenge-icon">${challenge.icon}</div>
                                <div class="challenge-content">
                                    <div class="challenge-name">${challenge.name}</div>
                                    <div class="challenge-desc">${challenge.description}</div>
                                    <div class="challenge-progress-bar">
                                        <div class="challenge-progress-fill" style="width: ${percentage}%"></div>
                                    </div>
                                    <div class="challenge-progress-text">${progress} / ${challenge.target}</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

function renderSettings() {
    const volumes = state.settings.volumes;
    const currentTheme = state.settings.theme || 'default';
    
    return `
        <div class="panel">
            <h1 class="panel-header">Settings</h1>
            
            <div style="max-width: 600px; margin: 0 auto;">
                <h2 style="margin: 30px 0 20px 0;">Appearance</h2>
                
                <div class="settings-section">
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Color Theme</span>
                            <span class="setting-description">21 themes based on mecha & terminal aesthetics</span>
                        </label>
                        <div class="theme-selector" style="grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 8px;">
                            <button class="theme-btn ${currentTheme === 'default' ? 'active' : ''}" data-theme="default">
                                <span class="theme-preview theme-preview-default"></span>
                                <span>Cyan Tron</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'eva01' ? 'active' : ''}" data-theme="eva01">
                                <span class="theme-preview theme-preview-eva01"></span>
                                <span>EVA-01</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'eva02' ? 'active' : ''}" data-theme="eva02">
                                <span class="theme-preview theme-preview-eva02"></span>
                                <span>EVA-02</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'rx0' ? 'active' : ''}" data-theme="rx0">
                                <span class="theme-preview theme-preview-rx0"></span>
                                <span>RX-0</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'eva03' ? 'active' : ''}" data-theme="eva03">
                                <span class="theme-preview theme-preview-eva03"></span>
                                <span>EVA-03</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'purple-gundam' ? 'active' : ''}" data-theme="purple-gundam">
                                <span class="theme-preview theme-preview-purple-gundam"></span>
                                <span>Purple Gundam</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'gray-gundam' ? 'active' : ''}" data-theme="gray-gundam">
                                <span class="theme-preview theme-preview-gray-gundam"></span>
                                <span>Gray Gundam</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'celestial-pink' ? 'active' : ''}" data-theme="celestial-pink">
                                <span class="theme-preview theme-preview-celestial-pink"></span>
                                <span>Celestial Pink</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'blue-terminal' ? 'active' : ''}" data-theme="blue-terminal">
                                <span class="theme-preview theme-preview-blue-terminal"></span>
                                <span>Blue Terminal</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'green-terminal' ? 'active' : ''}" data-theme="green-terminal">
                                <span class="theme-preview theme-preview-green-terminal"></span>
                                <span>Green Terminal</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'orange-terminal' ? 'active' : ''}" data-theme="orange-terminal">
                                <span class="theme-preview theme-preview-orange-terminal"></span>
                                <span>Orange Terminal</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'red-terminal' ? 'active' : ''}" data-theme="red-terminal">
                                <span class="theme-preview theme-preview-red-terminal"></span>
                                <span>Red Terminal</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'solo-leveling' ? 'active' : ''}" data-theme="solo-leveling">
                                <span class="theme-preview theme-preview-solo-leveling"></span>
                                <span>Solo Leveling</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'nova-kit' ? 'active' : ''}" data-theme="nova-kit">
                                <span class="theme-preview theme-preview-nova-kit"></span>
                                <span>Nova Kit</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'hydra-kit' ? 'active' : ''}" data-theme="hydra-kit">
                                <span class="theme-preview theme-preview-hydra-kit"></span>
                                <span>Hydra Kit</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'cyberpunk-purple' ? 'active' : ''}" data-theme="cyberpunk-purple">
                                <span class="theme-preview theme-preview-cyberpunk-purple"></span>
                                <span>Cyberpunk</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'red-yellow-mech' ? 'active' : ''}" data-theme="red-yellow-mech">
                                <span class="theme-preview theme-preview-red-yellow-mech"></span>
                                <span>Red/Yellow</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'gray-white-gundam' ? 'active' : ''}" data-theme="gray-white-gundam">
                                <span class="theme-preview theme-preview-gray-white-gundam"></span>
                                <span>Gray/White</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'purple-white-gundam' ? 'active' : ''}" data-theme="purple-white-gundam">
                                <span class="theme-preview theme-preview-purple-white-gundam"></span>
                                <span>Purple/White</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'wb-mecha' ? 'active' : ''}" data-theme="wb-mecha">
                                <span class="theme-preview theme-preview-wb-mecha"></span>
                                <span>WB Mecha</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'yellow-terminal' ? 'active' : ''}" data-theme="yellow-terminal">
                                <span class="theme-preview theme-preview-yellow-terminal"></span>
                                <span>Yellow Terminal</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Panel Styles</h2>
                
                <div class="settings-section">
                    <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
                        <label class="setting-label" style="width: 100%; margin-bottom: 12px;">
                            <span class="setting-name">Choose Panel Design</span>
                            <span class="setting-description">14 mecha-inspired panel geometries with unique shapes & lines</span>
                        </label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; width: 100%;">
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'default' ? 'active' : ''}" data-panel-style="default">
                                Default
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'blue-mech' ? 'active' : ''}" data-panel-style="blue-mech">
                                Blue Mech
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'cyberpunk01' ? 'active' : ''}" data-panel-style="cyberpunk01">
                                Cyberpunk 01
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'cyberpunk02' ? 'active' : ''}" data-panel-style="cyberpunk02">
                                Cyberpunk 02
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'gungale' ? 'active' : ''}" data-panel-style="gungale">
                                Gungale
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'pink-mech' ? 'active' : ''}" data-panel-style="pink-mech">
                                Pink Mech
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'purple-mech' ? 'active' : ''}" data-panel-style="purple-mech">
                                Purple Mech
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'unicorn' ? 'active' : ''}" data-panel-style="unicorn">
                                Unicorn RX-0
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'wb-mecha' ? 'active' : ''}" data-panel-style="wb-mecha">
                                WB Mecha
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'white-scifi01' ? 'active' : ''}" data-panel-style="white-scifi01">
                                White SciFi 01
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'white-scifi02' ? 'active' : ''}" data-panel-style="white-scifi02">
                                White SciFi 02
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'white-scifi03' ? 'active' : ''}" data-panel-style="white-scifi03">
                                White SciFi 03
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'word-boxes' ? 'active' : ''}" data-panel-style="word-boxes">
                                Word Boxes
                            </button>
                            <button class="btn panel-style-btn ${state.settings.panelStyle === 'yellow-mech' ? 'active' : ''}" data-panel-style="yellow-mech">
                                Yellow Mech
                            </button>
                        </div>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">UI Layout Systems</h2>
                
                <div class="settings-section">
                    <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
                        <label class="setting-label" style="width: 100%; margin-bottom: 12px;">
                            <span class="setting-name">Choose UI Layout</span>
                            <span class="setting-description">14 complete GUI restructuring options - changes nav, HUD, and data readouts</span>
                        </label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; width: 100%;">
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'default' ? 'active' : ''}" data-ui-layout="default">Default</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'aida' ? 'active' : ''}" data-ui-layout="aida">Aida Tactical</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'blue-mech' ? 'active' : ''}" data-ui-layout="blue-mech">Blue Mech HUD</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'blue-terminal' ? 'active' : ''}" data-ui-layout="blue-terminal">Blue Terminal</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'celestial-pink' ? 'active' : ''}" data-ui-layout="celestial-pink">Celestial Pink</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'covert-ops' ? 'active' : ''}" data-ui-layout="covert-ops">Covert Ops</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'green-terminal' ? 'active' : ''}" data-ui-layout="green-terminal">Green Terminal</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'nova-kit' ? 'active' : ''}" data-ui-layout="nova-kit">Nova Kit</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'orange-scifi' ? 'active' : ''}" data-ui-layout="orange-scifi">Orange SciFi</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'orange-terminal' ? 'active' : ''}" data-ui-layout="orange-terminal">Orange Terminal</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'pink-mech' ? 'active' : ''}" data-ui-layout="pink-mech">Pink Mech</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'purple-mech' ? 'active' : ''}" data-ui-layout="purple-mech">Purple Mech</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'yellow-mech' ? 'active' : ''}" data-ui-layout="yellow-mech">Yellow Mech</button>
                            <button class="btn ui-layout-btn ${state.settings.uiLayout === 'yellow-terminal' ? 'active' : ''}" data-ui-layout="yellow-terminal">Yellow Terminal</button>
                        </div>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Boot Animation</h2>
                
                <div class="settings-section">
                    <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
                        <label class="setting-label" style="width: 100%; margin-bottom: 12px;">
                            <span class="setting-name">Startup Sequence Style</span>
                            <span class="setting-description">Choose your preferred boot animation from 5 variants - click Preview to test</span>
                        </label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; width: 100%;">
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button class="btn boot-anim-btn ${state.settings.bootAnimation === 'classic' ? 'active' : ''}" data-boot-anim="classic">Classic Matrix</button>
                                <button class="btn btn-small preview-boot-btn" data-preview-boot="classic" style="font-size: 11px; padding: 6px 12px;">▶ Preview</button>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button class="btn boot-anim-btn ${state.settings.bootAnimation === 'inspiration1' ? 'active' : ''}" data-boot-anim="inspiration1">Fast Tech</button>
                                <button class="btn btn-small preview-boot-btn" data-preview-boot="inspiration1" style="font-size: 11px; padding: 6px 12px;">▶ Preview</button>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button class="btn boot-anim-btn ${state.settings.bootAnimation === 'inspiration2' ? 'active' : ''}" data-boot-anim="inspiration2">Minimalist</button>
                                <button class="btn btn-small preview-boot-btn" data-preview-boot="inspiration2" style="font-size: 11px; padding: 6px 12px;">▶ Preview</button>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button class="btn boot-anim-btn ${state.settings.bootAnimation === 'inspiration3' ? 'active' : ''}" data-boot-anim="inspiration3">System Check</button>
                                <button class="btn btn-small preview-boot-btn" data-preview-boot="inspiration3" style="font-size: 11px; padding: 6px 12px;">▶ Preview</button>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 5px;">
                                <button class="btn boot-anim-btn ${state.settings.bootAnimation === 'retro-tech' ? 'active' : ''}" data-boot-anim="retro-tech">Retro CRT</button>
                                <button class="btn btn-small preview-boot-btn" data-preview-boot="retro-tech" style="font-size: 11px; padding: 6px 12px;">▶ Preview</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Character Screen</h2>
                
                <div class="settings-section">
                    <div class="setting-item" style="flex-direction: column; align-items: flex-start;">
                        <label class="setting-label" style="width: 100%; margin-bottom: 12px;">
                            <span class="setting-name">Status Screen Layout</span>
                            <span class="setting-description">Choose how your character stats and equipment are displayed</span>
                        </label>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; width: 100%;">
                            <button class="btn char-layout-btn ${state.settings.characterLayout === 'default' ? 'active' : ''}" data-char-layout="default">Default</button>
                            <button class="btn char-layout-btn ${state.settings.characterLayout === 'equipment-loadout' ? 'active' : ''}" data-char-layout="equipment-loadout">Equipment Loadout</button>
                            <button class="btn char-layout-btn ${state.settings.characterLayout === 'gundam-loadout' ? 'active' : ''}" data-char-layout="gundam-loadout">Gundam Loadout</button>
                            <button class="btn char-layout-btn ${state.settings.characterLayout === 'primary-stats' ? 'active' : ''}" data-char-layout="primary-stats">Primary Stats</button>
                        </div>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Visual Effects</h2>
                
                <div class="settings-section">
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Glassmorphism Panels</span>
                            <span class="setting-description">Frosted glass effect with blur</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="effect-glassmorphism" ${state.settings.visualEffects.glassmorphism ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Neon Borders</span>
                            <span class="setting-description">Glowing animated borders</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="effect-neon" ${state.settings.visualEffects.neonBorders ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Floating Animations</span>
                            <span class="setting-description">Gentle hover effects on cards</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="effect-floating" ${state.settings.visualEffects.floatingAnimations ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <!-- Gradient Effects and Premium Buttons removed for cleaner UI -->
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Volume Controls</h2>
                
                <div class="settings-section">
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Master Volume</span>
                            <span class="setting-value">${Math.round(volumes.master * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-master" 
                            min="0" max="100" value="${volumes.master * 100}" 
                            data-volume-type="master">
                        <button class="btn btn-small test-sound-btn" data-sound-type="nav">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Navigation Sounds</span>
                            <span class="setting-value">${Math.round(volumes.nav * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-nav" 
                            min="0" max="100" value="${volumes.nav * 100}" 
                            data-volume-type="nav">
                        <button class="btn btn-small test-sound-btn" data-sound-type="nav">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Correct Answer</span>
                            <span class="setting-value">${Math.round(volumes.correct * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-correct" 
                            min="0" max="100" value="${volumes.correct * 100}" 
                            data-volume-type="correct">
                        <button class="btn btn-small test-sound-btn" data-sound-type="correct">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Wrong Answer</span>
                            <span class="setting-value">${Math.round(volumes.wrong * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-wrong" 
                            min="0" max="100" value="${volumes.wrong * 100}" 
                            data-volume-type="wrong">
                        <button class="btn btn-small test-sound-btn" data-sound-type="wrong">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Level Up</span>
                            <span class="setting-value">${Math.round(volumes.levelup * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-levelup" 
                            min="0" max="100" value="${volumes.levelup * 100}" 
                            data-volume-type="levelup">
                        <button class="btn btn-small test-sound-btn" data-sound-type="levelup">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Boot & Start</span>
                            <span class="setting-value">${Math.round(volumes.boot * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-boot" 
                            min="0" max="100" value="${volumes.boot * 100}" 
                            data-volume-type="boot">
                        <button class="btn btn-small test-sound-btn" data-sound-type="start">Test</button>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Modals & Menus</span>
                            <span class="setting-value">${Math.round(volumes.modal * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-modal" 
                            min="0" max="100" value="${volumes.modal * 100}" 
                            data-volume-type="modal">
                        <button class="btn btn-small test-sound-btn" data-sound-type="modal">Test</button>
                    </div>
                </div>
                
                <h2 style="margin: 30px 0 20px 0;">Audio</h2>
                
                <div class="settings-section">
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Background Music</span>
                            <span class="setting-description">Ambient atmospheric music</span>
                        </label>
                        <label class="toggle-switch">
                            <input type="checkbox" id="bgmusic-toggle" ${state.settings.bgMusicEnabled ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    
                    <div class="setting-item">
                        <label class="setting-label">
                            <span class="setting-name">Music Volume</span>
                            <span class="setting-value">${Math.round(volumes.bgMusic * 100)}%</span>
                        </label>
                        <input type="range" class="volume-slider" id="volume-bgmusic" 
                            min="0" max="100" value="${volumes.bgMusic * 100}" 
                            data-volume-type="bgMusic">
                    </div>
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

function renderAnalytics() {
    if (!state.currentPlayer || !state.currentPlayer.sessions) {
        return `
            <div class="panel">
                <h1 class="panel-header">Results & Analytics</h1>
                <p style="text-align: center; margin: 40px 0; opacity: 0.7;">No session data available. Complete some quizzes to see your analytics!</p>
            </div>
            ${renderFloatingNav({ showBack: false })}
        `;
    }
    
    const sessions = state.currentPlayer.sessions;
    
    // Calculate overall statistics
    const totalSessions = sessions.length;
    const totalQuestions = sessions.reduce((sum, s) => sum + s.total, 0);
    const totalCorrect = sessions.reduce((sum, s) => sum + s.score, 0);
    const overallAccuracy = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(1) : 0;
    const avgTimePerQuestion = totalQuestions > 0 ? 
        (sessions.reduce((sum, s) => sum + (s.avgTime || 0) * s.total, 0) / totalQuestions).toFixed(1) : 0;
    
    // Group sessions by topic
    const sessionsByTopic = {};
    sessions.forEach(session => {
        if (!sessionsByTopic[session.topicId]) {
            sessionsByTopic[session.topicId] = {
                topicName: session.topicName,
                sessions: [],
                totalCorrect: 0,
                totalQuestions: 0
            };
        }
        sessionsByTopic[session.topicId].sessions.push(session);
        sessionsByTopic[session.topicId].totalCorrect += session.score;
        sessionsByTopic[session.topicId].totalQuestions += session.total;
    });
    
    // Calculate topic statistics and identify weak/strong areas
    const topicStats = Object.keys(sessionsByTopic).map(topicId => {
        const data = sessionsByTopic[topicId];
        const accuracy = (data.totalCorrect / data.totalQuestions * 100).toFixed(1);
        const recentSessions = data.sessions.slice(-3); // Last 3 sessions
        const recentAccuracy = recentSessions.length > 0 ?
            (recentSessions.reduce((sum, s) => sum + s.score, 0) / 
             recentSessions.reduce((sum, s) => sum + s.total, 0) * 100).toFixed(1) : 0;
        
        return {
            topicId,
            topicName: data.topicName,
            accuracy: parseFloat(accuracy),
            recentAccuracy: parseFloat(recentAccuracy),
            sessionCount: data.sessions.length,
            totalCorrect: data.totalCorrect,
            totalQuestions: data.totalQuestions,
            trend: parseFloat(recentAccuracy) - parseFloat(accuracy) // Positive = improving
        };
    });
    
    // Sort topics by accuracy (weakest first for focus suggestions)
    topicStats.sort((a, b) => a.accuracy - b.accuracy);
    
    const weakestTopics = topicStats.slice(0, 3);
    const strongestTopics = topicStats.slice(-3).reverse();
    
    // Calculate improvement trend (last 5 sessions vs previous 5)
    const recentSessions = sessions.slice(-5);
    const previousSessions = sessions.slice(-10, -5);
    const recentAvgAccuracy = recentSessions.length > 0 ?
        (recentSessions.reduce((sum, s) => sum + (s.score / s.total), 0) / recentSessions.length * 100).toFixed(1) : 0;
    const previousAvgAccuracy = previousSessions.length > 0 ?
        (previousSessions.reduce((sum, s) => sum + (s.score / s.total), 0) / previousSessions.length * 100).toFixed(1) : 0;
    const improvementTrend = (parseFloat(recentAvgAccuracy) - parseFloat(previousAvgAccuracy)).toFixed(1);
    
    return `
        <div class="panel">
            <h1 class="panel-header">Results & Analytics</h1>
            
            <div class="analytics-section">
                <h2 style="margin-top: 0; color: #00ffff; text-shadow: 0 0 10px #00ffff;">Overall Performance</h2>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
                    <div class="stat-box">
                        <div class="stat-label">Total Sessions</div>
                        <div class="stat-value">${totalSessions}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Overall Accuracy</div>
                        <div class="stat-value" style="color: ${overallAccuracy >= 70 ? '#00ff00' : overallAccuracy >= 50 ? '#ffff00' : '#ff6666'}">${overallAccuracy}%</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Questions Answered</div>
                        <div class="stat-value">${totalCorrect} / ${totalQuestions}</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-label">Avg Time/Question</div>
                        <div class="stat-value">${avgTimePerQuestion}s</div>
                    </div>
                </div>
                
                ${sessions.length >= 10 ? `
                    <div class="improvement-box">
                        <div style="font-size: 0.9rem; opacity: 0.8;">Improvement Trend (Last 5 vs Previous 5 sessions)</div>
                        <div style="font-size: 1.5rem; font-weight: bold; margin-top: 5px; color: ${improvementTrend >= 0 ? '#00ff00' : '#ff6666'}">
                            ${improvementTrend >= 0 ? '↗' : '↘'} ${Math.abs(improvementTrend)}% ${improvementTrend >= 0 ? 'improvement' : 'decline'}
                        </div>
                    </div>
                ` : ''}
            </div>
            
            <div class="analytics-weak-section">
                <h2 style="margin-top: 0; color: #ff6666; text-shadow: 0 0 10px #ff6666;">📚 Focus Areas (Weakest Topics)</h2>
                ${weakestTopics.length > 0 ? `
                    <div style="margin-top: 15px;">
                        ${weakestTopics.map((topic, idx) => `
                            <div style="padding: 12px; margin-bottom: 10px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid ${topic.accuracy < 50 ? '#ff0000' : topic.accuracy < 70 ? '#ffaa00' : '#ffff00'}; border-radius: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: bold; font-size: 1.1rem;">${idx + 1}. ${topic.topicName}</div>
                                        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                            ${topic.sessionCount} sessions • ${topic.totalCorrect}/${topic.totalQuestions} correct
                                            ${topic.trend !== 0 ? ` • <span style="color: ${topic.trend > 0 ? '#00ff00' : '#ff6666'}">${topic.trend > 0 ? '↗' : '↘'} ${Math.abs(topic.trend).toFixed(1)}%</span>` : ''}
                                        </div>
                                    </div>
                                    <div style="font-size: 1.8rem; font-weight: bold; color: ${topic.accuracy < 50 ? '#ff0000' : topic.accuracy < 70 ? '#ffaa00' : '#ffff00'}">
                                        ${topic.accuracy}%
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 15px; padding: 12px; background: rgba(0, 255, 255, 0.1); border-radius: 4px; border-left: 4px solid #00ffff;">
                        <strong>💡 Recommendation:</strong> Focus on practice sessions in ${weakestTopics[0].topicName} to improve your weak areas. Consistent practice will boost your overall performance!
                    </div>
                ` : '<p style="opacity: 0.7;">Not enough data to determine weak areas yet.</p>'}
            </div>
            
            <div class="analytics-strong-section">
                <h2 style="margin-top: 0; color: #00ff00; text-shadow: 0 0 10px #00ff00;">⭐ Strongest Topics</h2>
                ${strongestTopics.length > 0 ? `
                    <div style="margin-top: 15px;">
                        ${strongestTopics.map((topic, idx) => `
                            <div style="padding: 12px; margin-bottom: 10px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid #00ff00; border-radius: 4px;">
                                <div style="display: flex; justify-content: space-between; align-items: center;">
                                    <div>
                                        <div style="font-weight: bold; font-size: 1.1rem;">${idx + 1}. ${topic.topicName}</div>
                                        <div style="font-size: 0.9rem; opacity: 0.8; margin-top: 5px;">
                                            ${topic.sessionCount} sessions • ${topic.totalCorrect}/${topic.totalQuestions} correct
                                        </div>
                                    </div>
                                    <div style="font-size: 1.8rem; font-weight: bold; color: #00ff00">
                                        ${topic.accuracy}%
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : '<p style="opacity: 0.7;">Keep practicing to establish your strong areas!</p>'}
            </div>
            
            <div class="analytics-all-section">
                <h2 style="margin-top: 0; color: #00aaff; text-shadow: 0 0 10px #00aaff;">📊 All Topics Performance</h2>
                <div style="margin-top: 15px;">
                    ${topicStats.sort((a, b) => b.accuracy - a.accuracy).map(topic => `
                        <div style="padding: 10px; margin-bottom: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                <span>${topic.topicName}</span>
                                <span style="color: ${topic.accuracy >= 70 ? '#00ff00' : topic.accuracy >= 50 ? '#ffff00' : '#ff6666'}">${topic.accuracy}%</span>
                            </div>
                            <div style="height: 8px; background: rgba(0, 0, 0, 0.5); border-radius: 4px; overflow: hidden;">
                                <div style="height: 100%; width: ${topic.accuracy}%; background: ${topic.accuracy >= 70 ? '#00ff00' : topic.accuracy >= 50 ? '#ffff00' : '#ff6666'}; transition: width 0.3s;"></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div id="struggle-score-section" class="analytics-section">
                <h2 style="margin-top: 0; color: #ff6600; text-shadow: 0 0 10px #ff6600;">📊 Struggle Analysis (Mathematical Model)</h2>
                <div style="margin-top: 15px;">
                    <button class="btn" id="load-struggle-scores-btn" style="width: 100%;">
                        Calculate Subject Struggle Scores
                    </button>
                    <div id="struggle-scores-content" style="margin-top: 15px; display: none;">
                        <p style="text-align: center; opacity: 0.7;">Loading...</p>
                    </div>
                </div>
            </div>
            
            <div id="detailed-analytics-section" class="analytics-section">
                <h2 style="margin-top: 0; color: #ff00ff; text-shadow: 0 0 10px #ff00ff;">🔍 Detailed Subtopic Analytics</h2>
                <div style="margin-top: 15px;">
                    <button class="btn" id="load-detailed-analytics-btn" style="width: 100%;">
                        Load Detailed Question Analytics
                    </button>
                    <div id="detailed-analytics-content" style="margin-top: 15px; display: none;">
                        <p style="text-align: center; opacity: 0.7;">Loading...</p>
                    </div>
                </div>
            </div>
        </div>
        ${renderFloatingNav({ showBack: false })}
    `;
}

// ============================================================================
// Struggle Score Analytics
// ============================================================================
async function loadStruggleScores() {
    const contentDiv = document.getElementById('struggle-scores-content');
    if (!contentDiv) return;
    
    contentDiv.style.display = 'block';
    contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">Calculating struggle scores...</p>';
    
    try {
        if (!state.currentPlayer || typeof afoqtDB === 'undefined') {
            contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">Struggle analysis not available.</p>';
            return;
        }
        
        const struggleScores = await afoqtDB.calculateStruggleScores(state.currentPlayer.id);
        const subjects = Object.keys(struggleScores);
        
        if (subjects.length === 0) {
            contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">No struggle data yet. Complete some quizzes to see analysis!</p>';
            return;
        }
        
        // Sort by struggle score (highest struggle first)
        const sortedSubjects = subjects.sort((a, b) => 
            struggleScores[b].score - struggleScores[a].score
        );
        
        let html = `
            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 102, 0, 0.1); border-left: 4px solid #ff6600; border-radius: 4px;">
                <div style="font-weight: bold; margin-bottom: 10px;">📐 Mathematical Struggle Score Formula:</div>
                <div style="font-size: 0.85rem; font-family: 'Courier New', monospace; opacity: 0.9;">
                    <strong>S</strong> = (0.35 × Accuracy⁻¹) + (0.25 × Recent Trend⁻¹) + (0.15 × Time Pressure) + (0.15 × Consistency) + (0.10 × Difficulty Weight)
                </div>
                <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.7;">
                    • Higher scores (0-100) indicate more struggle<br>
                    • Multi-factor analysis: accuracy, trends, speed, consistency, difficulty<br>
                    • Weighted average of 5 key performance indicators
                </div>
            </div>
        `;
        
        sortedSubjects.forEach((subject, index) => {
            const data = struggleScores[subject];
            const score = data.score;
            
            // Color coding based on score
            let color, bgColor;
            if (score < 20) {
                color = '#00ff00'; // Green - Mastered
                bgColor = 'rgba(0, 255, 0, 0.1)';
            } else if (score < 40) {
                color = '#88ff00'; // Yellow-green - Comfortable
                bgColor = 'rgba(136, 255, 0, 0.1)';
            } else if (score < 60) {
                color = '#ffff00'; // Yellow - Developing
                bgColor = 'rgba(255, 255, 0, 0.1)';
            } else if (score < 80) {
                color = '#ff8800'; // Orange - Struggling
                bgColor = 'rgba(255, 136, 0, 0.1)';
            } else {
                color = '#ff0000'; // Red - Critical
                bgColor = 'rgba(255, 0, 0, 0.1)';
            }
            
            html += `
                <div style="padding: 15px; margin-bottom: 15px; background: ${bgColor}; border-left: 4px solid ${color}; border-radius: 4px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <div>
                            <div style="font-weight: bold; font-size: 1.2rem; text-transform: capitalize;">
                                ${index + 1}. ${subject}
                            </div>
                            <div style="font-size: 0.9rem; margin-top: 5px;">
                                <span style="color: ${color}; font-weight: bold;">${data.interpretation}</span>
                                • ${data.stats.totalAttempts} attempts
                                • ${data.stats.accuracy}% accuracy
                            </div>
                        </div>
                        <div style="text-align: center;">
                            <div style="font-size: 2.5rem; font-weight: bold; color: ${color};">
                                ${score.toFixed(0)}
                            </div>
                            <div style="font-size: 0.7rem; opacity: 0.7;">struggle score</div>
                        </div>
                    </div>
                    
                    <!-- Progress bar for overall score -->
                    <div style="height: 12px; background: rgba(0, 0, 0, 0.3); border-radius: 6px; overflow: hidden; margin-bottom: 15px;">
                        <div style="height: 100%; width: ${score}%; background: ${color}; transition: width 0.5s ease;"></div>
                    </div>
                    
                    <!-- Component breakdown -->
                    <details style="margin-top: 10px;">
                        <summary style="cursor: pointer; opacity: 0.8; font-size: 0.9rem;">
                            📊 View Component Breakdown
                        </summary>
                        <div style="margin-top: 10px; padding: 10px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
                            <div style="font-size: 0.85rem; margin-bottom: 8px;">
                                <strong>Component Contributions (0-100 scale):</strong>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem;">
                                <div>
                                    <div style="opacity: 0.7;">Accuracy Impact:</div>
                                    <div style="font-weight: bold;">${data.components.accuracy.toFixed(1)} / 35</div>
                                </div>
                                <div>
                                    <div style="opacity: 0.7;">Recent Trend:</div>
                                    <div style="font-weight: bold;">${data.components.recentTrend.toFixed(1)} / 25</div>
                                </div>
                                <div>
                                    <div style="opacity: 0.7;">Time Pressure:</div>
                                    <div style="font-weight: bold;">${data.components.timePressure.toFixed(1)} / 15</div>
                                </div>
                                <div>
                                    <div style="opacity: 0.7;">Consistency:</div>
                                    <div style="font-weight: bold;">${data.components.consistency.toFixed(1)} / 15</div>
                                </div>
                                <div>
                                    <div style="opacity: 0.7;">Difficulty Weight:</div>
                                    <div style="font-weight: bold;">${data.components.difficultyWeight.toFixed(1)} / 10</div>
                                </div>
                            </div>
                            
                            <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255, 255, 255, 0.2); font-size: 0.8rem;">
                                <div><strong>Performance Metrics:</strong></div>
                                <div style="margin-top: 5px;">
                                    • Overall: ${data.stats.accuracy}% | Recent: ${data.stats.recentAccuracy}%<br>
                                    • Avg Time: ${data.stats.avgTime}s | Variance: ${data.stats.variance.toFixed(3)}
                                </div>
                            </div>
                        </div>
                    </details>
                </div>
            `;
        });
        
        // Add recommendation based on highest struggle (if any subjects exist)
        if (sortedSubjects.length > 0) {
            const highestStruggle = sortedSubjects[0];
            const highestScore = struggleScores[highestStruggle];
            
            html += `
                <div style="margin-top: 20px; padding: 15px; background: rgba(0, 255, 255, 0.1); border-left: 4px solid #00ffff; border-radius: 4px;">
                    <div style="font-weight: bold; margin-bottom: 8px;">💡 AI Recommendation:</div>
                    <div style="font-size: 0.9rem;">
                        ${highestScore.score >= 60 ? 
                            `Focus heavily on <strong>${highestStruggle}</strong> (${highestScore.score.toFixed(0)} struggle score). 
                            With ${highestScore.stats.accuracy}% accuracy and ${highestScore.stats.recentAccuracy}% recent performance, 
                            concentrated practice in this area will yield the greatest improvement.` :
                        highestScore.score >= 40 ?
                            `Continue practicing <strong>${highestStruggle}</strong> to build confidence. 
                            Your ${highestScore.stats.accuracy}% accuracy shows understanding, but consistency can improve.` :
                            `Excellent work across all subjects! Maintain practice in <strong>${highestStruggle}</strong> 
                            to prevent skill decay, but all areas show strong performance.`
                        }
                    </div>
                </div>
            `;
        }
        
        contentDiv.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading struggle scores:', error);
        contentDiv.innerHTML = '<p style="text-align: center; color: #ff6666;">Error calculating struggle scores.</p>';
    }
}

// ============================================================================
// Enhanced Analytics with Database
// ============================================================================
async function loadDetailedAnalytics() {
    const contentDiv = document.getElementById('detailed-analytics-content');
    if (!contentDiv) return;
    
    contentDiv.style.display = 'block';
    contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">Loading detailed analytics...</p>';
    
    try {
        if (!state.currentPlayer || typeof afoqtDB === 'undefined') {
            contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">Detailed analytics not available.</p>';
            return;
        }
        
        const subtopicAnalytics = await afoqtDB.getSubtopicAnalytics(state.currentPlayer.id);
        const analyticsArray = Object.values(subtopicAnalytics);
        
        if (analyticsArray.length === 0) {
            contentDiv.innerHTML = '<p style="text-align: center; opacity: 0.7;">No detailed question data yet. Complete some vocabulary quizzes to see subtopic analytics!</p>';
            return;
        }
        
        // Group by subtopic
        const bySubtopic = {};
        analyticsArray.forEach(item => {
            if (!bySubtopic[item.subtopicId]) {
                bySubtopic[item.subtopicId] = [];
            }
            bySubtopic[item.subtopicId].push(item);
        });
        
        let html = '<div style="margin-top: 20px;">';
        
        Object.keys(bySubtopic).forEach(subtopicId => {
            const items = bySubtopic[subtopicId];
            const subtopicName = subtopicId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            
            // Calculate overall subtopic stats
            const totalAttempts = items.reduce((sum, i) => sum + parseInt(i.totalAttempts), 0);
            const totalCorrect = items.reduce((sum, i) => sum + parseInt(i.correctAttempts), 0);
            const overallAccuracy = totalAttempts > 0 ? (totalCorrect / totalAttempts * 100).toFixed(1) : 0;
            const uniqueTotal = items.reduce((sum, i) => sum + parseInt(i.uniqueQuestionsCount), 0);
            
            html += `
                <div style="padding: 15px; margin-bottom: 15px; background: rgba(0, 0, 0, 0.3); border-left: 4px solid #ff00ff; border-radius: 4px;">
                    <div style="font-weight: bold; font-size: 1.2rem; margin-bottom: 10px; color: #ff00ff;">
                        ${subtopicName}
                    </div>
                    <div style="font-size: 0.9rem; opacity: 0.8; margin-bottom: 10px;">
                        ${uniqueTotal} unique questions • ${totalAttempts} total attempts • ${overallAccuracy}% accuracy
                    </div>
                    
                    <div style="margin-top: 10px;">
                        ${items.sort((a, b) => {
                            const diffOrder = { 'beginner': 0, 'advanced': 1, 'expert': 2 };
                            return diffOrder[a.difficulty] - diffOrder[b.difficulty];
                        }).map(item => {
                            const diffColor = item.difficulty === 'beginner' ? '#00ff00' : 
                                            item.difficulty === 'advanced' ? '#ffaa00' : '#ff0000';
                            return `
                                <div style="padding: 8px; margin-bottom: 8px; background: rgba(0, 0, 0, 0.2); border-radius: 4px;">
                                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                        <span style="color: ${diffColor}; font-weight: bold; text-transform: uppercase;">
                                            ${item.difficulty}
                                        </span>
                                        <span style="font-size: 1.1rem; font-weight: bold; color: ${parseFloat(item.accuracy) >= 70 ? '#00ff00' : parseFloat(item.accuracy) >= 50 ? '#ffff00' : '#ff6666'}">
                                            ${item.accuracy}%
                                        </span>
                                    </div>
                                    <div style="font-size: 0.85rem; opacity: 0.7;">
                                        ${item.uniqueQuestionsCount} questions • ${item.correctAttempts}/${item.totalAttempts} correct • ${item.avgTime}s avg
                                    </div>
                                    <div style="height: 6px; background: rgba(0, 0, 0, 0.5); border-radius: 3px; overflow: hidden; margin-top: 5px;">
                                        <div style="height: 100%; width: ${item.accuracy}%; background: ${parseFloat(item.accuracy) >= 70 ? '#00ff00' : parseFloat(item.accuracy) >= 50 ? '#ffff00' : '#ff6666'}; transition: width 0.3s;"></div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        contentDiv.innerHTML = html;
        
    } catch (error) {
        console.error('Error loading detailed analytics:', error);
        contentDiv.innerHTML = '<p style="text-align: center; color: #ff6666;">Error loading detailed analytics.</p>';
    }
}

// ============================================================================
// Event Listeners
// ============================================================================
function attachEventListeners() {
    console.log('attachEventListeners called');
    
    // Login screen - Character selection
    const selectPlayerBtns = document.querySelectorAll('.select-player-btn');
    selectPlayerBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            selectPlayer(btn.dataset.playerId);
            state.screen = 'home';
            playSfx('select');
            render();
        });
    });
    
    // Login screen - Create character
    const createPlayerBtnLogin = document.getElementById('create-player-btn-login');
    if (createPlayerBtnLogin) {
        createPlayerBtnLogin.addEventListener('click', () => {
            const input = document.getElementById('new-player-name-login');
            const name = input.value.trim();
            if (name) {
                createPlayer(name);
                // Auto-select the newly created player
                const newPlayer = state.players[state.players.length - 1];
                if (newPlayer) {
                    selectPlayer(newPlayer.id);
                    state.screen = 'home';
                }
                input.value = '';
                playSfx('player');
                render();
            }
        });
    }
    
    // Login screen - Enter key support
    const newPlayerNameLogin = document.getElementById('new-player-name-login');
    if (newPlayerNameLogin) {
        newPlayerNameLogin.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const createBtn = document.getElementById('create-player-btn-login');
                if (createBtn) createBtn.click();
            }
        });
    }
    
    // Change character button (replaces player-manager-btn)
    const changeCharacterBtn = document.getElementById('change-character-btn');
    if (changeCharacterBtn) {
        changeCharacterBtn.addEventListener('click', () => {
            state.screen = 'login';
            playSfx('nav');
            render();
        });
    }
    
    // Player modal (keeping for backward compatibility, but not used in login flow)
    const playerManagerBtn = document.getElementById('player-manager-btn');
    if (playerManagerBtn) {
        playerManagerBtn.addEventListener('click', () => {
            const modal = document.getElementById('player-modal');
            if (modal) {
                modal.style.display = 'flex';
                playSfx('modal-open');
            }
        });
    }
    
    const closePlayerModal = document.getElementById('close-player-modal');
    if (closePlayerModal) {
        closePlayerModal.addEventListener('click', () => {
            const modal = document.getElementById('player-modal');
            if (modal) {
                modal.style.display = 'none';
                playSfx('modal-close');
            }
        });
    }
    
    // Click outside modal to close
    const modal = document.getElementById('player-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                playSfx('modal-close');
            }
        });
    }
    
    // Player selection in modal - NEW: DEPLOY buttons trigger access granted animation
    const deployButtons = document.querySelectorAll('.btn-auth-play');
    deployButtons.forEach(btn => {
        btn.addEventListener('click', async () => {
            const playerId = btn.dataset.playerId;
            selectPlayer(playerId);
            const modal = document.getElementById('player-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            playSfx('select');
            
            // Show ACCESS GRANTED animation before going to main menu
            await showAccessGranted();
            render();
        });
    });
    
    // Legacy player-item selection (for backward compatibility)
    const playerItems = document.querySelectorAll('.player-item');
    playerItems.forEach(item => {
        item.addEventListener('click', async () => {
            selectPlayer(item.dataset.playerId);
            const modal = document.getElementById('player-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            playSfx('select');
            
            // Show ACCESS GRANTED animation before going to main menu
            await showAccessGranted();
            render();
        });
    });
    
    // Home screen - Create new player
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', async () => {
            const input = document.getElementById('new-player-name');
            const name = input.value.trim();
            if (name) {
                createPlayer(name);
                input.value = '';
                const modal = document.getElementById('player-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
                
                // Show ACCESS GRANTED animation before going to main menu
                await showAccessGranted();
                render();
            }
        });
    }
    
    // Enter key support for auth input
    const authInput = document.getElementById('new-player-name');
    if (authInput) {
        authInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const createBtn = document.getElementById('add-player-btn');
                if (createBtn) createBtn.click();
            }
        });
    }
    
    // Status button
    const statusBtn = document.getElementById('status-btn');
    if (statusBtn) {
        statusBtn.addEventListener('click', goToStatus);
    }
    
    // Equipment button
    const equipmentBtn = document.getElementById('equipment-btn');
    if (equipmentBtn) {
        equipmentBtn.addEventListener('click', goToEquipment);
    }
    
    // Achievements button
    const achievementsBtn = document.getElementById('achievements-btn');
    if (achievementsBtn) {
        achievementsBtn.addEventListener('click', goToAchievements);
    }
    
    // Results button
    const resultsBtn = document.getElementById('results-btn');
    if (resultsBtn) {
        resultsBtn.addEventListener('click', goToAnalytics);
    }
    
    // Settings button
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', goToSettings);
    }
    
    // Equipment: Equip item buttons
    const equipBtns = document.querySelectorAll('.equip-item-btn');
    equipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const itemId = btn.dataset.itemId;
            if (equipItem(state.currentPlayer, itemId)) {
                render();
            }
        });
    });
    
    // Equipment: Unequip item buttons
    const unequipBtns = document.querySelectorAll('.unequip-btn');
    unequipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const slot = btn.dataset.slot;
            unequipItem(state.currentPlayer, slot);
            render();
        });
    });
    
    // Volume sliders
    const volumeSliders = document.querySelectorAll('.volume-slider');
    volumeSliders.forEach(slider => {
        slider.addEventListener('input', (e) => {
            const volumeType = e.target.dataset.volumeType;
            const value = parseFloat(e.target.value) / 100;
            state.settings.volumes[volumeType] = value;
            
            // Update display
            const settingItem = e.target.closest('.setting-item');
            const valueDisplay = settingItem.querySelector('.setting-value');
            if (valueDisplay) {
                valueDisplay.textContent = `${Math.round(value * 100)}%`;
            }
            
            // Save to localStorage
            saveSettings();
        });
    });
    
    // Test sound buttons
    const testSoundBtns = document.querySelectorAll('.test-sound-btn');
    testSoundBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const soundType = btn.dataset.soundType;
            playSfx(soundType);
        });
    });
    
    // Theme selector buttons
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const themeName = btn.dataset.theme;
            applyTheme(themeName);
            saveSettings();
            playSfx('nav');
            render(); // Re-render to update active state
        });
    });
    
    // Panel style selector buttons
    const panelStyleBtns = document.querySelectorAll('.panel-style-btn');
    panelStyleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const panelStyle = btn.dataset.panelStyle;
            applyPanelStyle(panelStyle);
            saveSettings();
            playSfx('nav');
            render(); // Re-render to update active state
        });
    });
    
    // UI Layout selector buttons
    const uiLayoutBtns = document.querySelectorAll('.ui-layout-btn');
    uiLayoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const uiLayout = btn.dataset.uiLayout;
            applyUILayout(uiLayout);
            saveSettings();
            playSfx('nav');
            render(); // Re-render to update active state
        });
    });
    
    // Boot Animation selector buttons
    const bootAnimBtns = document.querySelectorAll('.boot-anim-btn');
    bootAnimBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const bootAnim = btn.dataset.bootAnim;
            applyBootAnimation(bootAnim);
            saveSettings();
            playSfx('nav');
            render(); // Re-render to update active state
        });
    });
    
    // Boot Animation preview buttons
    const previewBootBtns = document.querySelectorAll('.preview-boot-btn');
    previewBootBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent parent button click
            const bootAnim = btn.dataset.previewBoot;
            playSfx('modal');
            previewBootAnimation(bootAnim);
        });
    });
    
    // Character Layout selector buttons
    const charLayoutBtns = document.querySelectorAll('.char-layout-btn');
    charLayoutBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const charLayout = btn.dataset.charLayout;
            applyCharacterLayout(charLayout);
            saveSettings();
            playSfx('nav');
            render(); // Re-render to update active state
        });
    });
    
    // Visual effect toggles
    const effectToggles = {
        'effect-glassmorphism': 'glassmorphism',
        'effect-neon': 'neonBorders',
        'effect-floating': 'floatingAnimations',
        'effect-gradients': 'gradientEffects',
        'effect-premium': 'premiumButtons'
    };
    
    Object.entries(effectToggles).forEach(([id, key]) => {
        const toggle = document.getElementById(id);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                state.settings.visualEffects[key] = e.target.checked;
                applyVisualEffects();
                saveSettings();
                playSfx('nav');
            });
        }
    });
    
    // Background music toggle
    const bgMusicToggle = document.getElementById('bgmusic-toggle');
    if (bgMusicToggle) {
        bgMusicToggle.addEventListener('change', (e) => {
            toggleBackgroundMusic(e.target.checked);
            playSfx('nav');
        });
    }
    
    // Settings home button
    const settingsHomeBtn = document.getElementById('home-btn');
    if (settingsHomeBtn) {
        settingsHomeBtn.addEventListener('click', () => {
            state.screen = 'home';
            playSfx('nav');
            render();
        });
    }
    
    // Subject tiles
    const subjectTiles = document.querySelectorAll('[data-subject-id]');
    console.log('Found subject tiles:', subjectTiles.length);
    subjectTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            goToSubject(tile.dataset.subjectId);
        });
    });
    
    // NEW: Home page primary selectors - AFOQT Practice
    const practiceTestSelector = document.getElementById('practice-test-selector');
    console.log('Found practice test selector:', !!practiceTestSelector);
    if (practiceTestSelector) {
        practiceTestSelector.addEventListener('click', () => {
            console.log('Practice test selector clicked');
            state.screen = 'afoqt-practice';
            playSfx('select');
            render();
        });
    }
    
    // NEW: Home page primary selectors - Subjects
    const subjectsSelector = document.getElementById('subjects-selector');
    console.log('Found subjects selector:', !!subjectsSelector);
    if (subjectsSelector) {
        subjectsSelector.addEventListener('click', () => {
            console.log('Subjects selector clicked');
            state.screen = 'subject-list';
            playSfx('select');
            render();
        });
    }
    
    // Topic tiles
    const topicTiles = document.querySelectorAll('[data-topic-id]');
    topicTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const topicId = tile.dataset.topicId;
            const topic = topics.find(t => t.id === topicId);
            if (topic) {
                state.currentTopic = topic;
                state.screen = 'mode-select';
                playSfx('nav');
                render();
            }
        });
    });
    
    // Mode selection buttons
    const learnModeBtn = document.getElementById('learn-mode-btn');
    if (learnModeBtn) {
        learnModeBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                state.screen = 'learn';
                playSfx('select');
                render();
            }
        });
    }
    
    const practiceModeBtn = document.getElementById('practice-mode-btn');
    if (practiceModeBtn) {
        practiceModeBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                state.screen = 'difficulty-select';
                playSfx('select');
                render();
            }
        });
    }
    
    const testModeBtn = document.getElementById('test-mode-btn');
    if (testModeBtn) {
        testModeBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                startQuiz(state.currentTopic.id, 'test', 'advanced'); // Test mode always uses advanced difficulty
            }
        });
    }
    
    const sprintModeBtn = document.getElementById('sprint-mode-btn');
    if (sprintModeBtn) {
        sprintModeBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                startQuiz(state.currentTopic.id, 'sprint', 'beginner'); // Sprint mode uses beginner for quick practice
            }
        });
    }
    
    // Difficulty selection buttons
    const beginnerDiffBtn = document.getElementById('beginner-diff-btn');
    if (beginnerDiffBtn) {
        beginnerDiffBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                startQuiz(state.currentTopic.id, 'practice', 'beginner');
            }
        });
    }
    
    const advancedDiffBtn = document.getElementById('advanced-diff-btn');
    if (advancedDiffBtn) {
        advancedDiffBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                startQuiz(state.currentTopic.id, 'practice', 'advanced');
            }
        });
    }
    
    const expertDiffBtn = document.getElementById('expert-diff-btn');
    if (expertDiffBtn) {
        expertDiffBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                startQuiz(state.currentTopic.id, 'practice', 'expert');
            }
        });
    }
    
    // AFOQT Practice difficulty buttons
    const afoqtBeginnerBtn = document.getElementById('afoqt-beginner-btn');
    if (afoqtBeginnerBtn) {
        afoqtBeginnerBtn.addEventListener('click', () => {
            console.log('AFOQT Beginner button clicked');
            _startAFOQTPracticeTestAsync('beginner').catch(err => {
                console.error('Error starting AFOQT test:', err);
                playSfx('wrong');
            });
        });
    }
    
    const afoqtAdvancedBtn = document.getElementById('afoqt-advanced-btn');
    if (afoqtAdvancedBtn) {
        afoqtAdvancedBtn.addEventListener('click', () => {
            console.log('AFOQT Advanced button clicked');
            _startAFOQTPracticeTestAsync('advanced').catch(err => {
                console.error('Error starting AFOQT test:', err);
                playSfx('wrong');
            });
        });
    }
    
    const afoqtExpertBtn = document.getElementById('afoqt-expert-btn');
    if (afoqtExpertBtn) {
        afoqtExpertBtn.addEventListener('click', () => {
            console.log('AFOQT Expert button clicked');
            _startAFOQTPracticeTestAsync('expert').catch(err => {
                console.error('Error starting AFOQT test:', err);
                playSfx('wrong');
            });
        });
    }
    
    const backToModeBtn = document.getElementById('back-to-mode-btn');
    if (backToModeBtn) {
        backToModeBtn.addEventListener('click', () => {
            state.screen = 'mode-select';
            playSfx('nav');
            render();
        });
    }
    
    const backToSubjectBtn = document.getElementById('back-to-subject-btn');
    if (backToSubjectBtn) {
        backToSubjectBtn.addEventListener('click', () => {
            state.screen = 'subject';
            playSfx('nav');
            render();
        });
    }
    
    // Learn screen - Start Practice button
    const learnToPracticeBtn = document.getElementById('learn-to-practice-btn');
    if (learnToPracticeBtn) {
        learnToPracticeBtn.addEventListener('click', () => {
            if (state.currentTopic) {
                state.screen = 'difficulty-select';
                playSfx('select');
                render();
            }
        });
    }
    
    // Quiz options
    const optionBtns = document.querySelectorAll('[data-option-index]');
    optionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            handleAnswer(parseInt(btn.dataset.optionIndex));
        });
    });
    
    // Navigation buttons
    const homeBtn = document.getElementById('home-btn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            // If in quiz screen, go back to subject (topics) instead of home
            if (state.screen === 'quiz') {
                if (state.quiz.timerInterval) {
                    clearInterval(state.quiz.timerInterval);
                }
                playSfx('nav');
                state.screen = 'subject';
                render();
            } else {
                goHome();
            }
        });
    }
    
    // Floating navigation buttons
    const floatingHomeBtn = document.getElementById('floating-home-btn');
    if (floatingHomeBtn) {
        floatingHomeBtn.addEventListener('click', goHome);
    }
    
    const floatingBackBtn = document.getElementById('floating-back-btn');
    if (floatingBackBtn) {
        floatingBackBtn.addEventListener('click', () => {
            playSfx('nav');
            // Determine which screen to go back to based on current screen
            if (state.screen === 'mode-select') {
                state.screen = 'subject';
            } else if (state.screen === 'learn') {
                state.screen = 'mode-select';
            } else if (state.screen === 'difficulty-select') {
                state.screen = 'mode-select';
            } else {
                goHome();
            }
            render();
        });
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', retryTopic);
    }
    
    // Detailed analytics button
    const loadDetailedAnalyticsBtn = document.getElementById('load-detailed-analytics-btn');
    if (loadDetailedAnalyticsBtn) {
        loadDetailedAnalyticsBtn.addEventListener('click', () => {
            loadDetailedAnalytics();
            loadDetailedAnalyticsBtn.disabled = true;
            loadDetailedAnalyticsBtn.textContent = 'Loading...';
        });
    }
    
    // Struggle scores button
    const loadStruggleScoresBtn = document.getElementById('load-struggle-scores-btn');
    if (loadStruggleScoresBtn) {
        loadStruggleScoresBtn.addEventListener('click', () => {
            loadStruggleScores();
            loadStruggleScoresBtn.disabled = true;
            loadStruggleScoresBtn.textContent = 'Calculating...';
        });
    }
    
    // Create Account screen - Navigate to create account
    const goToCreateAccountBtn = document.getElementById('go-to-create-account-btn');
    if (goToCreateAccountBtn) {
        goToCreateAccountBtn.addEventListener('click', goToCreateAccount);
    }
    
    // Create Account screen - Form submission
    const createAccountForm = document.getElementById('create-account-form');
    if (createAccountForm) {
        createAccountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('new-player-name-input');
            const errorDiv = document.getElementById('create-account-error');
            
            if (!nameInput || nameInput.value.trim().length === 0) {
                if (errorDiv) {
                    errorDiv.textContent = 'Please enter a pilot name';
                    errorDiv.style.display = 'block';
                }
                return;
            }
            
            if (nameInput.value.trim().length < 2) {
                if (errorDiv) {
                    errorDiv.textContent = 'Pilot name must be at least 2 characters';
                    errorDiv.style.display = 'block';
                }
                return;
            }
            
            // Create the player and auto-select
            const playerName = nameInput.value.trim();
            createPlayer(playerName);
            const newPlayer = state.players[state.players.length - 1];
            if (newPlayer) {
                state.currentPlayer = newPlayer;
                playSfx('player');
            }
            nameInput.value = '';
            if (errorDiv) errorDiv.style.display = 'none';
            
            // Redirect to home screen
            state.screen = 'home';
            state.lastScreenBeforeBoot = 'home';
            playSfx('select');
            render();
        });
    }
    
    // Create Account screen - Cancel button
    const cancelCreateAccountBtn = document.getElementById('cancel-create-account-btn');
    if (cancelCreateAccountBtn) {
        cancelCreateAccountBtn.addEventListener('click', () => {
            state.screen = 'login';
            state.lastScreenBeforeBoot = 'login';
            playSfx('nav');
            render();
        });
    }
    
    // Create Account screen - Enter key support
    const newPlayerNameInput = document.getElementById('new-player-name-input');
    if (newPlayerNameInput) {
        newPlayerNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const form = document.getElementById('create-account-form');
                if (form) form.dispatchEvent(new Event('submit'));
            }
        });
    }
    
    // Scroll-aware FAB behavior for quiz action buttons
    initScrollAwareFAB();
}

// Scroll-aware floating action button configuration
const SCROLL_FAB_CONFIG = {
    SCROLL_THRESHOLD: 50,     // Pixels to scroll before hiding
    AUTO_SHOW_DELAY: 1000     // Milliseconds before auto-showing buttons
};

// Initialize scroll-aware floating action button behavior
let scrollAwareFABInitialized = false;
let lastScrollY = 0;
let scrollTimeout = null;

function initScrollAwareFAB() {
    const quizButtons = document.querySelector('.quiz-action-buttons');
    if (!quizButtons) {
        // Clean up listener if not on quiz screen
        // This runs automatically on every render when navigating away from quiz
        if (scrollAwareFABInitialized) {
            window.removeEventListener('scroll', handleScrollForFAB);
            scrollAwareFABInitialized = false;
            // Reset to current position to avoid incorrect direction detection
            lastScrollY = window.scrollY || window.pageYOffset;
        }
        return;
    }
    
    // Initialize only once per quiz session
    if (!scrollAwareFABInitialized) {
        lastScrollY = window.scrollY || window.pageYOffset; // Initialize to current position
        window.addEventListener('scroll', handleScrollForFAB, { passive: true });
        scrollAwareFABInitialized = true;
    }
}

function handleScrollForFAB() {
    const quizButtons = document.querySelector('.quiz-action-buttons');
    if (!quizButtons) return;
    
    const currentScrollY = window.scrollY || window.pageYOffset;
    
    // Clear existing timeout
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    
    // Always show buttons at the top of the page
    if (currentScrollY < SCROLL_FAB_CONFIG.SCROLL_THRESHOLD) {
        quizButtons.classList.remove('fab-hidden');
    }
    // Scrolling down - hide buttons (reduce opacity)
    else if (currentScrollY > lastScrollY && currentScrollY > SCROLL_FAB_CONFIG.SCROLL_THRESHOLD) {
        quizButtons.classList.add('fab-hidden');
    } 
    // Scrolling up - show buttons
    else if (currentScrollY < lastScrollY) {
        quizButtons.classList.remove('fab-hidden');
    }
    
    // Auto-show after scroll stops
    scrollTimeout = setTimeout(() => {
        quizButtons.classList.remove('fab-hidden');
    }, SCROLL_FAB_CONFIG.AUTO_SHOW_DELAY);
    
    lastScrollY = currentScrollY;
}

// ============================================================================
// Initialization
// ============================================================================
async function init() {
    // ====================================================================
    // VERSION CHECK - Automatic cache invalidation on app update
    // ====================================================================
    // This check ensures users get fresh content when the app is updated
    // on GitHub, without requiring manual cache clearing
    try {
        const res = await fetch('./version-manifest.json', { cache: 'no-store' });
        if (res.ok) {
            const manifest = await res.json();
            const storedVersion = localStorage.getItem('appCacheVersion');
            const currentVersion = manifest.cacheVersion;
            
            console.log(`📡 Version Check: Current=${currentVersion}, Stored=${storedVersion}`);
            
            // If version changed, unregister all SWs and perform hard reload
            if (currentVersion > (parseInt(storedVersion) || 0)) {
                console.log('📡 New version detected! Refreshing app...');
                localStorage.setItem('appCacheVersion', currentVersion.toString());
                
                // Unregister all service workers to clear cache
                if ('serviceWorker' in navigator) {
                    try {
                        const registrations = await navigator.serviceWorker.getRegistrations();
                        for (let reg of registrations) {
                            await reg.unregister();
                            console.log('🔄 Unregistered Service Worker');
                        }
                    } catch (e) {
                        console.warn('Could not unregister SWs:', e);
                    }
                }
                
                // Force hard reload to get fresh content
                window.location.reload(true);
                return; // Stop initialization
            } else {
                // Version is current
                localStorage.setItem('appCacheVersion', currentVersion.toString());
            }
        }
    } catch (error) {
        // Version check failed (offline is OK, use current version)
        console.log('📡 Version check failed (offline OK):', error.message);
        // Continue with init - offline operation is supported
    }
    
    // Initialize database
    await afoqtDB.init();
    
    // Check if we need to migrate from localStorage
    if (!afoqtDB.hasMigrationCompleted()) {
        console.log('Migrating data from localStorage to IndexedDB...');
        const migrationResults = await afoqtDB.migrateFromLocalStorage();
        console.log('Migration complete:', migrationResults);
    }
    
    // Show Evangelion-style boot sequence on first load
    const hasBooted = sessionStorage.getItem('afoqt-booted');
    if (!hasBooted) {
        await showBootSequence();
        sessionStorage.setItem('afoqt-booted', 'true');
    }
    
    state.players = await loadPlayers();
    await loadSettings(); // Load settings from database
    if (state.players.length > 0) {
        state.currentPlayer = state.players[0];
        // Restore session state after boot (user should see their last screen)
        await restoreSessionState();
    } else {
        // No players, show login
        state.screen = 'login';
    }
    
    // Patch 18: Initialize content-based question system
    if (typeof initializePatch18 === 'function') {
        try {
            const success = await initializePatch18();
            if (success) {
                state.patch18Loaded = true;
                console.log('✓ Patch 18 active');
                
                // Replace old math topics with content-based ones
                const mathContentTopics = createMathTopicsFromRegistry();
                // Remove old math topics and add new ones
                topics = topics.filter(t => t.subjectId !== 'math_knowledge');
                topics.push(...mathContentTopics);
                console.log(`✓ Loaded ${mathContentTopics.length} math topics from content`);

                // Add Arithmetic Reasoning topics from Patch 19 content
                const arTopics = createArithmeticTopicsFromRegistry();
                if (arTopics.length > 0) {
                    // Remove any procedural AR topics if existed (none by default)
                    topics = topics.filter(t => t.subjectId !== 'arithmetic_reasoning');
                    topics.push(...arTopics);
                    console.log(`✓ Loaded ${arTopics.length} arithmetic topics from content`);
                }

                // Add Reading Comprehension topics from Patch 20 content
                const rcTopics = createReadingTopicsFromRegistry();
                if (rcTopics.length > 0) {
                    topics = topics.filter(t => t.subjectId !== 'reading_comprehension');
                    topics.push(...rcTopics);
                    console.log(`✓ Loaded ${rcTopics.length} reading comprehension topics from content`);
                }

                // Add Instrument Comprehension topics from Patch 21 content
                const icTopics = createInstrumentTopicsFromRegistry();
                if (icTopics.length > 0) {
                    topics = topics.filter(t => t.subjectId !== 'instrument_comprehension');
                    topics.push(...icTopics);
                    console.log(`✓ Loaded ${icTopics.length} instrument comprehension topics from content`);
                }

                // Add Table Reading topics from Patch 22 content
                const trTopics = createTableReadingTopicsFromRegistry();
                if (trTopics.length > 0) {
                    topics = topics.filter(t => t.subjectId !== 'table_reading');
                    topics.push(...trTopics);
                    console.log(`✓ Loaded ${trTopics.length} table reading topics from content`);
                }

                // Add Block Counting topics from content
                const bcTopics = createBlockCountingTopicsFromRegistry();
                if (bcTopics.length > 0) {
                    topics = topics.filter(t => t.subjectId !== 'block_counting');
                    topics.push(...bcTopics);
                    console.log(`✓ Loaded ${bcTopics.length} block counting topics from content`);
                }
                
                // Add Vocabulary topics from Patch 18 content (word_knowledge & verbal_analogies)
                const vocabTopics = createVocabularyTopicsFromRegistry();
                if (vocabTopics.length > 0) {
                    // Remove old vocabulary procedural topics
                    topics = topics.filter(t => t.subjectId !== 'word_knowledge' && t.subjectId !== 'verbal_analogies' && t.subjectId !== 'vocabulary');
                    topics.push(...vocabTopics);
                    console.log(`✓ Loaded ${vocabTopics.length} vocabulary topics from content`);
                }
                
                // Add Physical Science topics from content
                const psTopics = createPhysicalScienceTopicsFromRegistry();
                if (psTopics.length > 0) {
                    topics = topics.filter(t => t.subjectId !== 'physical_science');
                    topics.push(...psTopics);
                    console.log(`✓ Loaded ${psTopics.length} physical science topics from content`);
                }
                
                // Add AFOQT practice test topics if available
                if (typeof createAfoqtPracticeTestTopics === 'function') {
                    const practiceTests = createAfoqtPracticeTestTopics();
                    if (practiceTests.length > 0) {
                        topics.push(...practiceTests);
                        console.log(`✓ Added ${practiceTests.length} AFOQT practice tests`);
                    }
                }
            }
        } catch (error) {
            console.warn('Patch 18 initialization failed:', error);
        }
    }
    
    render();
    registerServiceWorker();
}

// Register Service Worker for PWA functionality
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then((registration) => {
                    console.log('Service Worker registered:', registration.scope);
                    
                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60000); // Check every minute
                })
                .catch((error) => {
                    console.warn('Service Worker registration failed:', error);
                });
        });
    }
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================================================
// SESSION PERSISTENCE - Added below main app flow
// ============================================================================

/**
 * Save current screen state to database for session persistence
 */
function saveSessionState() {
    const sessionState = {
        screen: state.screen,
        lastScreenBeforeBoot: state.lastScreenBeforeBoot,
        currentPlayerId: state.currentPlayer?.id || null,
        currentSubjectId: state.currentSubject?.id || null,
        currentTopicId: state.currentTopic?.id || null,
        timestamp: Date.now()
    };
    
    if (typeof afoqtDB !== 'undefined' && afoqtDB) {
        afoqtDB.saveSettings({ id: 'session-state', ...sessionState }).catch(err => {
            console.warn('Failed to save session state:', err);
            // Fallback to localStorage
            localStorage.setItem('afoqt-session-state', JSON.stringify(sessionState));
        });
    } else {
        localStorage.setItem('afoqt-session-state', JSON.stringify(sessionState));
    }
}

/**
 * Restore previous session state after boot
 */
async function restoreSessionState() {
    let sessionState = null;
    
    // Try to load from database first
    if (typeof afoqtDB !== 'undefined' && afoqtDB) {
        try {
            sessionState = await afoqtDB.getSettings('session-state');
        } catch (err) {
            console.warn('Failed to restore session state from database:', err);
        }
    }
    
    // Fallback to localStorage
    if (!sessionState) {
        const saved = localStorage.getItem('afoqt-session-state');
        if (saved) {
            try {
                sessionState = JSON.parse(saved);
            } catch (err) {
                console.warn('Failed to parse session state from localStorage:', err);
            }
        }
    }
    
    if (!sessionState || !state.currentPlayer) {
        // No session to restore or no player, go to login
        state.screen = 'login';
        return;
    }
    
    // Check if session is recent (within 7 days)
    const sessionAge = Date.now() - sessionState.timestamp;
    const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
    if (sessionAge > SEVEN_DAYS) {
        // Session too old, start fresh
        state.screen = 'login';
        return;
    }
    
    // Restore screen state
    if (sessionState.currentSubjectId && sessionState.screen === 'subject') {
        state.currentSubject = subjects.find(s => s.id === sessionState.currentSubjectId);
        state.screen = 'subject';
    } else if (sessionState.currentTopicId && ['mode-select', 'difficulty-select', 'quiz', 'results'].includes(sessionState.screen)) {
        state.currentTopic = topics.find(t => t.id === sessionState.currentTopicId);
        // Only restore quiz states if we have questions (avoid loading incomplete quizzes)
        if (sessionState.screen !== 'quiz' || state.quiz.questions.length > 0) {
            state.screen = sessionState.screen;
        } else {
            state.screen = 'home'; // Quiz questions lost, go home
        }
    } else if (sessionState.screen === 'home' || sessionState.screen === 'settings' || sessionState.screen === 'status' || sessionState.screen === 'equipment' || sessionState.screen === 'achievements' || sessionState.screen === 'analytics') {
        state.screen = sessionState.screen;
    } else {
        // Unknown or invalid state, go home
        state.screen = 'home';
    }
    
    state.lastScreenBeforeBoot = sessionState.lastScreenBeforeBoot;
    console.log(`✓ Session restored to screen: ${state.screen}`);
}

/**
 * Navigate to create account screen
 */
function goToCreateAccount() {
    playSfx('nav');
    state.screen = 'create-account';
    state.lastScreenBeforeBoot = 'create-account';
    render();
}

/**
 * Navigate to login screen
 */
function goToLogin() {
    playSfx('nav');
    state.screen = 'login';
    state.lastScreenBeforeBoot = 'login';
    render();
}

/**
 * Render create account screen
 */
function renderCreateAccount() {
    return `
        <div class="panel">
            <h1 class="panel-header">CREATE CHARACTER</h1>
            
            <div class="login-section" style="max-width: 500px; margin: 0 auto;">
                <h2 style="text-align: center; margin-bottom: 40px;">New Pilot Registration</h2>
                
                <form id="create-account-form" style="display: flex; flex-direction: column; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <label for="new-player-name-input" style="font-size: 1rem; font-weight: bold; color: var(--color-primary); text-transform: uppercase; letter-spacing: 1px;">
                            Callsign (Name)
                        </label>
                        <input 
                            type="text" 
                            id="new-player-name-input" 
                            placeholder="Enter your pilot name"
                            maxlength="20"
                            required
                            style="
                                background: var(--color-bg-input, rgba(0, 255, 255, 0.05));
                                border: 2px solid var(--color-primary);
                                border-radius: 4px;
                                padding: 12px 15px;
                                color: var(--color-primary);
                                font-family: 'Courier New', monospace;
                                font-size: 1em;
                                outline: none;
                                transition: all 0.3s;
                            "
                        />
                        <small style="opacity: 0.7; font-size: 0.9rem;">Your unique pilot identifier (2-20 characters)</small>
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-top: 20px;">
                        <button type="submit" class="btn" id="confirm-create-account-btn" style="flex: 1;">
                            ✓ CREATE PILOT
                        </button>
                        <button type="button" class="btn btn-secondary" id="cancel-create-account-btn" style="flex: 1;">
                            ✗ BACK
                        </button>
                    </div>
                </form>
                
                <div id="create-account-error" style="margin-top: 20px; display: none; color: #ff6666; text-align: center; border: 1px solid #ff6666; padding: 10px; border-radius: 4px;"></div>
            </div>
        </div>
    `;
}
