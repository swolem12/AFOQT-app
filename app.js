// ============================================================================
// AFOQT Study Console - Main Application
// Offline single-page app with localStorage persistence
// ============================================================================

// ============================================================================
// Particle Effects
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
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        const angle = (Math.PI * 2 * i) / count;
        const velocity = 100 + Math.random() * 100;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: ${color};
            border-radius: 50%;
            box-shadow: 0 0 10px ${color};
            animation: particleFloat 1s ease-out forwards;
            --vx: ${vx}px;
            --vy: ${vy}px;
        `;
        
        container.appendChild(particle);
    }
    
    setTimeout(() => container.remove(), 1000);
}

// Add CSS for particle animation
const particleStyle = document.createElement('style');
particleStyle.textContent = `
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
`;
document.head.appendChild(particleStyle);

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
    
    const asciiLogo = `
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
    
    const bootMessages = [
        '',
        '>> SYSTEM INITIALIZATION SEQUENCE...',
        '>> Establishing neural link...',
        '',
        '[████████████████████████████████████████] 100%',
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
        padding: 20px;
        z-index: 10000;
        overflow: auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    `;
    
    // Create matrix rain background effect
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.15;
        z-index: 1;
    `;
    bootScreen.appendChild(matrixCanvas);
    
    const bootContent = document.createElement('div');
    bootContent.style.cssText = `
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 900px;
    `;
    bootScreen.appendChild(bootContent);
    
    const logoText = document.createElement('pre');
    logoText.style.cssText = `
        font-size: 10px;
        line-height: 1.2;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
        text-align: center;
        margin-bottom: 20px;
        opacity: 0;
        animation: logoFadeIn 1s ease-out forwards;
    `;
    logoText.textContent = asciiLogo;
    bootContent.appendChild(logoText);
    
    const bootText = document.createElement('pre');
    bootText.style.cssText = `
        font-size: 13px;
        line-height: 1.6;
        text-shadow: 0 0 5px #00ffff;
        margin-top: 20px;
    `;
    bootContent.appendChild(bootText);
    
    // Add CSS for logo animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes logoFadeIn {
            from { 
                opacity: 0; 
                transform: scale(0.9);
                filter: blur(5px);
            }
            to { 
                opacity: 1; 
                transform: scale(1);
                filter: blur(0);
            }
        }
        @keyframes textGlitch {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-2px); }
            50% { transform: translateX(2px); }
            75% { transform: translateX(-1px); }
        }
        @media (max-width: 768px) {
            #boot-screen pre {
                font-size: 8px !important;
            }
            #boot-screen pre:last-child {
                font-size: 10px !important;
            }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bootScreen);
    
    // Matrix rain effect
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const columns = Math.floor(matrixCanvas.width / MATRIX_COLUMN_WIDTH);
    const drops = Array(columns).fill(1);
    
    // Matrix characters: binary digits + Japanese katakana for cyberpunk aesthetic
    const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00ffff';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            ctx.fillText(text, i * MATRIX_COLUMN_WIDTH, drops[i] * MATRIX_COLUMN_WIDTH);
            
            if (drops[i] * MATRIX_COLUMN_WIDTH > matrixCanvas.height && Math.random() > MATRIX_RESET_PROBABILITY) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const matrixInterval = setInterval(drawMatrix, 50);
    
    // Play boot sound at start
    playSfx('boot');
    
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
            } else if (line.includes('100%')) {
                playSfx('correct');
            } else if (line.includes('OPERATIONAL') || line.includes('ESTABLISHED')) {
                playSfx('complete');
            }
        } else {
            clearInterval(typeInterval);
            
            // Allow click or key to skip
            const finishBoot = () => {
                clearInterval(matrixInterval);
                bootScreen.style.transition = `opacity ${FADE_DURATION_MS / 1000}s`;
                bootScreen.style.opacity = '0';
                setTimeout(() => {
                    bootScreen.remove();
                    style.remove();
                }, FADE_DURATION_MS);
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
    screen: 'login', // 'login' | 'home' | 'subject' | 'mode-select' | 'difficulty-select' | 'quiz' | 'results' | 'status' | 'equipment' | 'settings'
    players: [],
    currentPlayer: null,
    currentSubject: null,
    currentTopic: null,
    quizMode: 'practice', // 'practice' | 'test' | 'sprint'
    difficulty: 'beginner', // 'beginner' | 'advanced' | 'expert'
    settings: {
        theme: 'default', // 'default' | 'eva01' | 'eva02'
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
            modal: 0.5
        }
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
        id: 'math',
        name: 'Math',
        description: 'AFOQT quantitative reasoning'
    },
    {
        id: 'vocabulary',
        name: 'Vocabulary',
        description: 'Word knowledge and analogies',
        isAfoqtOfficialSubject: true,
        mappedGameSubtopics: ['synonyms', 'antonyms', 'verbal_analogies', 'vocabulary_in_context', 'confusing_word_pairs', 'highfreq_vocab', 'sentence_completion', 'word_roots_affixes']
    },
    {
        id: 'reading',
        name: 'Reading',
        description: 'Comprehension and analysis'
    },
    {
        id: 'science',
        name: 'Physical Science',
        description: 'Physics and chemistry basics'
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
        id: 'instrument',
        name: 'Instrument Comprehension',
        description: 'Aircraft attitude and heading'
    },
    {
        id: 'table',
        name: 'Table Reading',
        description: 'Data extraction and speed'
    },
    {
        id: 'blocks',
        name: 'Block Counting',
        description: 'Spatial reasoning'
    }
];

// ============================================================================
// Topics with Question Generators - MATH
// ============================================================================
const mathTopics = [
    {
        id: 'evaluate-expressions',
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
        id: 'distributive-foil',
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
        id: 'linear-equations',
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
        id: 'systems',
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
        id: 'quadratic-equations',
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
        id: 'exponents',
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
        id: 'absolute-value',
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
        id: 'rational-expressions',
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
        id: 'coordinate-geometry',
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
        subjectId: 'reading',
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
        id: 'physics-basics',
        name: 'Physics Basics',
        description: 'Forces, motion, and energy',
        subjectId: 'science',
        generateQuestion: () => {
            const questions = [
                { q: "What is the formula for speed?", a: "Distance ÷ Time", opts: ["Time ÷ Distance", "Distance × Time", "Force × Mass"], exp: "Speed = Distance / Time" },
                { q: "What is Newton's First Law?", a: "Object at rest stays at rest", opts: ["Force equals mass times acceleration", "Every action has a reaction", "Energy cannot be created"], exp: "Law of Inertia" },
                { q: "What type of energy does a moving object have?", a: "Kinetic", opts: ["Potential", "Thermal", "Chemical"], exp: "Kinetic energy is energy of motion" },
                { q: "What force pulls objects toward Earth?", a: "Gravity", opts: ["Friction", "Magnetism", "Tension"], exp: "Gravity is the attractive force between masses" },
                { q: "What is the SI unit of force?", a: "Newton", opts: ["Joule", "Watt", "Pascal"], exp: "Force is measured in Newtons (N)" },
                { q: "Light travels fastest through:", a: "Vacuum", opts: ["Water", "Glass", "Air"], exp: "Light speed is maximum in a vacuum" }
            ];
            
            const item = questions[Math.floor(Math.random() * questions.length)];
            const allOptions = [item.a, ...item.opts];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: item.q,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.a),
                explanation: item.exp
            };
        }
    },
    {
        id: 'chemistry-basics',
        name: 'Chemistry Basics',
        description: 'Matter and reactions',
        subjectId: 'science',
        generateQuestion: () => {
            const questions = [
                { q: "What is the chemical symbol for water?", a: "H₂O", opts: ["HO", "H₂O₂", "OH"], exp: "Water is two hydrogen atoms and one oxygen" },
                { q: "What is the smallest unit of an element?", a: "Atom", opts: ["Molecule", "Cell", "Electron"], exp: "Atoms are the basic building blocks" },
                { q: "What type of bond involves sharing electrons?", a: "Covalent", opts: ["Ionic", "Metallic", "Hydrogen"], exp: "Covalent bonds share electron pairs" },
                { q: "What is the pH of a neutral solution?", a: "7", opts: ["0", "14", "10"], exp: "pH 7 is neutral; <7 is acid, >7 is base" },
                { q: "What are the three states of matter?", a: "Solid, Liquid, Gas", opts: ["Hot, Cold, Warm", "Big, Medium, Small", "Fast, Slow, Still"], exp: "The three common states of matter" },
                { q: "What is the process of a solid turning to gas?", a: "Sublimation", opts: ["Evaporation", "Condensation", "Melting"], exp: "Sublimation skips the liquid phase" }
            ];
            
            const item = questions[Math.floor(Math.random() * questions.length)];
            const allOptions = [item.a, ...item.opts];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: item.q,
                options: shuffled,
                correctIndex: shuffled.indexOf(item.a),
                explanation: item.exp
            };
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
                    { q: "What are the four forces of flight?", a: "Lift, Weight, Thrust, Drag", opts: ["Lift, Gravity, Speed, Wind", "Up, Down, Forward, Backward", "Pitch, Roll, Yaw, Speed"], exp: "The four forces are Lift (up), Weight (down), Thrust (forward), and Drag (backward)", img: "images/aircraft-forces.svg" },
                    { q: "What does the rudder control?", a: "Yaw", opts: ["Pitch", "Roll", "Altitude"], exp: "The rudder controls yaw, which is rotation around the vertical axis", img: "images/aircraft-controls.svg" },
                    { q: "What does the elevator control?", a: "Pitch", opts: ["Yaw", "Roll", "Speed"], exp: "The elevator controls pitch, which is rotation around the lateral axis", img: "images/aircraft-controls.svg" },
                    { q: "What does the aileron control?", a: "Roll", opts: ["Pitch", "Yaw", "Altitude"], exp: "Ailerons control roll, which is rotation around the longitudinal axis", img: "images/aircraft-controls.svg" },
                    { q: "What is the purpose of flaps?", a: "Increase lift and drag at lower speeds", opts: ["Increase speed", "Control direction", "Reduce weight"], exp: "Flaps increase wing camber to generate more lift and drag for takeoff and landing", img: "images/aircraft-controls.svg" },
                    { q: "What instrument shows rate of climb or descent?", a: "Vertical Speed Indicator", opts: ["Altimeter", "Airspeed Indicator", "Attitude Indicator"], exp: "The VSI (Vertical Speed Indicator) shows rate of climb or descent", img: "images/flight-instruments.svg" },
                    { q: "Which direction does a propeller rotate (viewed from cockpit) in most single-engine aircraft?", a: "Clockwise", opts: ["Counterclockwise", "Either direction", "Depends on altitude"], exp: "Most single-engine aircraft have propellers that rotate clockwise when viewed from the cockpit", img: "images/aircraft-controls.svg" },
                    { q: "What is the altimeter used for?", a: "Measuring altitude", opts: ["Measuring speed", "Measuring direction", "Measuring fuel"], exp: "The altimeter measures the aircraft's altitude above sea level or ground level", img: "images/flight-instruments.svg" },
                    { q: "What does AGL stand for?", a: "Above Ground Level", opts: ["Above Glide Level", "Air Ground Limit", "Altitude Gain Level"], exp: "AGL means Above Ground Level, measuring height above the terrain", img: "images/attitude-level.svg" },
                    { q: "What is the airspeed indicator used for?", a: "Measuring speed through the air", opts: ["Measuring altitude", "Measuring fuel", "Measuring direction"], exp: "The airspeed indicator shows how fast the aircraft is moving through the air", img: "images/flight-instruments.svg" },
                    { q: "What does MSL stand for?", a: "Mean Sea Level", opts: ["Maximum Speed Limit", "Minimum Safe Level", "Medium Service Level"], exp: "MSL stands for Mean Sea Level, a standard reference for altitude measurements", img: "images/attitude-level.svg" },
                    { q: "What is the heading indicator used for?", a: "Showing aircraft direction", opts: ["Showing altitude", "Showing speed", "Showing fuel level"], exp: "The heading indicator displays the direction the aircraft is pointing", img: "images/flight-instruments.svg" },
                    { q: "What does the turn coordinator show?", a: "Rate of turn and bank angle", opts: ["Only altitude", "Only speed", "Only direction"], exp: "The turn coordinator displays the rate of turn and the bank angle of the aircraft", img: "images/flight-instruments.svg" },
                ],
                advanced: [
                    { q: "What is the standard sea level atmospheric pressure?", a: "29.92 inches Hg", opts: ["30.00 inches Hg", "14.7 psi only", "1013 mb only"], exp: "Standard sea level pressure is 29.92 inches of mercury (or 1013.25 mb)", img: "images/flight-instruments.svg" },
                    { q: "What is V1 speed?", a: "Decision speed for takeoff", opts: ["Landing speed", "Cruise speed", "Stall speed"], exp: "V1 is the critical engine failure recognition speed during takeoff", img: "images/attitude-climbing.svg" },
                    { q: "What does 'angle of attack' mean?", a: "Angle between chord line and relative wind", opts: ["Angle of the aircraft to ground", "Angle of climb", "Bank angle"], exp: "Angle of attack is the angle between the wing's chord line and the oncoming airflow", img: "images/aircraft-forces.svg" },
                    { q: "What is the minimum safe altitude over congested areas?", a: "1,000 feet above highest obstacle within 2,000 feet", opts: ["500 feet AGL", "1,500 feet MSL", "Any altitude"], exp: "FAA regulations require 1,000 feet above the highest obstacle within a 2,000-foot radius", img: "images/attitude-level.svg" },
                    { q: "What is VR speed?", a: "Rotation speed for takeoff", opts: ["Refusal speed", "Range speed", "Reduced speed"], exp: "VR is the speed at which the pilot rotates the aircraft nose up during takeoff", img: "images/attitude-climbing.svg" },
                    { q: "What is the purpose of trim tabs?", a: "Reduce control pressure", opts: ["Increase speed", "Control temperature", "Measure altitude"], exp: "Trim tabs help reduce the control pressure needed to maintain a desired flight attitude", img: "images/aircraft-controls.svg" },
                    { q: "What does the compass deviation card show?", a: "Magnetic compass errors", opts: ["Altitude errors", "Speed errors", "Fuel errors"], exp: "The compass deviation card shows corrections for magnetic compass errors in the aircraft", img: "images/flight-instruments.svg" },
                    { q: "What is ground effect?", a: "Increased lift near the ground", opts: ["Decreased lift near ground", "No change in lift", "Only affects helicopters"], exp: "Ground effect provides increased lift and reduced drag when flying close to the ground", img: "images/aircraft-forces.svg" },
                    { q: "What does METAR stand for?", a: "Aviation Routine Weather Report", opts: ["Meteorological Terminal Report", "Measure Temperature And Range", "Medium Altitude Reading"], exp: "METAR is the format for reporting aviation routine weather observations", img: "images/flight-instruments.svg" },
                    { q: "What is the purpose of the pitot tube?", a: "Measure dynamic air pressure", opts: ["Measure temperature", "Measure altitude", "Measure fuel"], exp: "The pitot tube measures dynamic air pressure to determine airspeed", img: "images/flight-instruments.svg" },
                    { q: "What is carburetor ice?", a: "Ice formation in the carburetor", opts: ["Ice on the wings", "Ice on the windshield", "Ice in the fuel"], exp: "Carburetor ice forms when moisture freezes in the carburetor, reducing engine power", img: "images/aircraft-controls.svg" },
                ],
                expert: [
                    { q: "What causes an aircraft to stall?", a: "Exceeding critical angle of attack", opts: ["Flying too fast", "Running out of fuel", "Engine failure"], exp: "A stall occurs when the wing exceeds its critical angle of attack, disrupting airflow", img: "images/aircraft-forces.svg" },
                    { q: "What is P-factor?", a: "Asymmetric propeller thrust", opts: ["Power factor", "Pressure factor", "Pitch factor"], exp: "P-factor is the asymmetric thrust produced by a propeller at high angles of attack", img: "images/aircraft-forces.svg" },
                    { q: "What is the purpose of a mixture control?", a: "Adjust fuel-to-air ratio", opts: ["Control speed", "Control altitude", "Control direction"], exp: "The mixture control adjusts the fuel-to-air ratio for optimal engine performance at different altitudes", img: "images/aircraft-controls.svg" },
                    { q: "What is adverse yaw?", a: "Yaw opposite to turn direction", opts: ["Yaw in turn direction", "No yaw during turn", "Vertical yaw only"], exp: "Adverse yaw is the tendency of an aircraft to yaw in the opposite direction of a turn due to differential drag", img: "images/aircraft-controls.svg" },
                    { q: "What is Dutch roll?", a: "Combined yaw and roll oscillation", opts: ["Only pitch oscillation", "Only yaw oscillation", "Controlled maneuver"], exp: "Dutch roll is an oscillatory instability involving coupled rolling and yawing motions", img: "images/aircraft-controls.svg" },
                    { q: "What is the coffin corner?", a: "Where stall speed meets max speed", opts: ["Landing pattern corner", "Fuel tank corner", "Cockpit corner"], exp: "Coffin corner is the altitude where stall speed and maximum speed converge, limiting flight envelope", img: "images/aircraft-forces.svg" },
                    { q: "What causes a spin?", a: "Stalled condition with yaw", opts: ["High speed turn", "Engine failure", "Low fuel"], exp: "A spin occurs when one wing is more stalled than the other, combined with yaw", img: "images/aircraft-forces.svg" },
                    { q: "What is load factor in a 60° bank?", a: "2G", opts: ["1G", "1.5G", "3G"], exp: "In a 60-degree coordinated turn, the load factor is 2G, doubling the aircraft's weight", img: "images/aircraft-forces.svg" },
                    { q: "What is Mach tuck?", a: "Nose-down pitch at high Mach", opts: ["Nose-up pitch", "Wing flutter", "Engine surge"], exp: "Mach tuck is a nose-down pitching moment that occurs at high Mach numbers due to shock wave formation", img: "images/aircraft-forces.svg" },
                    { q: "What is the critical Mach number?", a: "Speed where supersonic flow first appears", opts: ["Speed of sound", "Stall speed", "Maximum speed"], exp: "Critical Mach number is the speed at which airflow over some part of the aircraft first reaches Mach 1", img: "images/aircraft-forces.svg" },
                    { q: "What is the area rule?", a: "Design to reduce transonic drag", opts: ["Fuel capacity rule", "Weight limit rule", "Speed limit rule"], exp: "The area rule is a design principle that reduces drag at transonic speeds by maintaining constant cross-sectional area", img: "images/aircraft-forces.svg" },
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
        id: 'instrument-comprehension',
        name: 'Instrument Comprehension',
        description: 'Aircraft attitude and heading interpretation',
        subjectId: 'instrument',
        generateQuestion: (difficulty = 'beginner') => {
            const attitudes = [
                { heading: "North", bank: "Level", pitch: "Level", desc: "Straight and level flight heading North", img: "images/attitude-level.svg" },
                { heading: "East", bank: "Right 30°", pitch: "Level", desc: "Banking right 30 degrees while heading East", img: "images/attitude-right-30.svg" },
                { heading: "South", bank: "Level", pitch: "Climbing", desc: "Climbing while heading South", img: "images/attitude-climbing.svg" },
                { heading: "West", bank: "Left 20°", pitch: "Descending", desc: "Banking left and descending while heading West", img: "images/attitude-left-20.svg" },
                { heading: "Northeast", bank: "Level", pitch: "Level", desc: "Straight and level heading Northeast (045°)", img: "images/attitude-level.svg" },
                { heading: "Southeast", bank: "Right 15°", pitch: "Climbing", desc: "Banking right and climbing heading Southeast", img: "images/attitude-right-15.svg" },
                { heading: "Southwest", bank: "Left 25°", pitch: "Level", desc: "Banking left heading Southwest", img: "images/attitude-left-25.svg" },
                { heading: "Northwest", bank: "Level", pitch: "Descending", desc: "Descending heading Northwest", img: "images/attitude-descending.svg" }
            ];
            
            const correct = attitudes[Math.floor(Math.random() * attitudes.length)];
            
            // Generate distractors
            const otherAttitudes = attitudes.filter(a => a !== correct);
            const shuffledOthers = shuffleArray(otherAttitudes);
            const distractors = shuffledOthers.slice(0, 3);
            
            const allOptions = [correct, ...distractors];
            const shuffled = shuffleArray(allOptions);
            
            return {
                prompt: `Based on the instrument panel shown, the aircraft is:\nHeading: ${correct.heading}\nBank: ${correct.bank}\nPitch: ${correct.pitch}\n\nWhat is the aircraft attitude?`,
                options: shuffled.map(a => a.desc),
                correctIndex: shuffled.indexOf(correct),
                explanation: `The correct interpretation is: ${correct.desc}`,
                image: correct.img
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
                image: "images/table-sample.svg"
            };
        }
    }
];

// ============================================================================
// Topics with Question Generators - BLOCK COUNTING
// ============================================================================
const blockTopics = [
    {
        id: 'block-counting',
        name: 'Block Counting',
        description: 'Spatial reasoning with block configurations',
        subjectId: 'blocks',
        generateQuestion: (difficulty = 'beginner') => {
            const scenarios = [
                {
                    desc: "A 3×3×3 cube with all blocks visible",
                    blocks: 27,
                    hidden: 1,
                    touching: 6,
                    img: "images/blocks-3x3x3.svg"
                },
                {
                    desc: "A 4×4×4 cube",
                    blocks: 64,
                    hidden: 8,
                    touching: 24,
                    img: "images/blocks-4x4x4.svg"
                },
                {
                    desc: "A 2×3×4 rectangular configuration",
                    blocks: 24,
                    hidden: 0,
                    touching: 11,
                    img: "images/blocks-2x3x4.svg"
                },
                {
                    desc: "A pyramid with a 4×4 base, 3 layers",
                    blocks: 30,
                    hidden: 1,
                    touching: 13,
                    img: "images/blocks-pyramid.svg"
                },
                {
                    desc: "An L-shaped configuration: 5 blocks on bottom row, 3 on second layer",
                    blocks: 8,
                    hidden: 0,
                    touching: 4,
                    img: "images/blocks-l-shape.svg"
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

// Combine all topics and add subject IDs
const topics = [
    ...mathTopics.map(t => ({ ...t, subjectId: 'math' })),
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
// LocalStorage Functions
// ============================================================================
function loadPlayers() {
    try {
        const data = localStorage.getItem('afoqt-math-players');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        console.warn('Could not load players:', e);
        return [];
    }
}

function savePlayers(players) {
    try {
        localStorage.setItem('afoqt-math-players', JSON.stringify(players));
    } catch (e) {
        console.warn('Could not save players:', e);
    }
}

function loadSettings() {
    try {
        const data = localStorage.getItem('afoqt-settings');
        if (data) {
            const loaded = JSON.parse(data);
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
                }
            };
            // Apply the theme immediately
            applyTheme(state.settings.theme);
            // Apply visual effects
            applyVisualEffects();
        }
    } catch (e) {
        console.warn('Could not load settings:', e);
    }
}

function saveSettings() {
    try {
        localStorage.setItem('afoqt-settings', JSON.stringify(state.settings));
    } catch (e) {
        console.warn('Could not save settings:', e);
    }
}

// Apply theme to document
function applyTheme(themeName) {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-default', 'theme-eva01', 'theme-eva02');
    
    // Add new theme class
    root.classList.add(`theme-${themeName}`);
    
    // Store current theme
    state.settings.theme = themeName;
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

// ============================================================================
// Boot Initialization Sequence
// ============================================================================

function showBootSequence() {
    return new Promise((resolve) => {
        const bootHTML = `
            <div id="boot-sequence">
                <!-- Phase 1: Frameshift Entry (0-3s) -->
                <div class="boot-phase boot-phase-1">
                    <div class="boot-frameshift">
                        <div class="frameshift-corners">
                            <div class="corner corner-tl"></div>
                            <div class="corner corner-tr"></div>
                            <div class="corner corner-bl"></div>
                            <div class="corner corner-br"></div>
                        </div>
                        <div class="frameshift-text">FRAMESHIFT</div>
                        <div class="frameshift-subtext">INITIATING NEURAL DIVE PROTOCOL</div>
                        <div class="frameshift-dots">
                            <span>●</span><span>●</span><span>●</span>
                        </div>
                    </div>
                </div>

                <!-- Phase 2: Emergency Warning (3-5s) -->
                <div class="boot-phase boot-phase-2">
                    <div class="boot-emergency">
                        <div class="emergency-stripe-top"></div>
                        <div class="emergency-hexagons">
                            <div class="emergency-hex"></div>
                            <div class="emergency-hex"></div>
                            <div class="emergency-hex"></div>
                            <div class="emergency-hex"></div>
                            <div class="emergency-hex"></div>
                            <div class="emergency-hex"></div>
                        </div>
                        <div class="emergency-header">警報 ALERT 警報</div>
                        <div class="emergency-condition">CONDITION: STANDBY</div>
                        <div class="emergency-message">SECURITY LEVEL: EEE</div>
                        <div class="emergency-status">SYSTEM INITIALIZATION IN PROGRESS</div>
                    </div>
                </div>

                <!-- Phase 3: Main Terminal Interface (5-15s) -->
                <div class="boot-phase boot-phase-3">
                    <div class="boot-warning-stripe"></div>
                    <div class="boot-hud-corners">
                        <div class="hud-corner hud-tl"></div>
                        <div class="hud-corner hud-tr"></div>
                        <div class="hud-corner hud-bl"></div>
                        <div class="hud-corner hud-br"></div>
                    </div>
                    
                    <div class="boot-container">
                        <div class="boot-timestamp">
                            <span class="timestamp-label">SYS.TIME:</span>
                            <span class="timestamp-value" id="boot-timestamp">00:00:00</span>
                        </div>

                        <div class="boot-ascii-art">
╔═══════════════════════════════════════════════════════════╗
║  ▄▄▄       ███████  ▒█████   █████   ▄▄▄█████▓           ║
║ ▒████▄    ▓██   ▒  ▒██▒  ██▒▒██▓  ██▒ ▓  ██▒ ▓▒           ║
║ ▒██  ▀█▄  ▒████ ░  ▒██░  ██▒▒██▒  ██░ ▒ ▓██░ ▒░           ║
║ ░██▄▄▄▄██ ░▓█▒  ░  ▒██   ██░░██  █▀ ░ ░ ▓██▓ ░            ║
║  ▓█   ▓██▒░▒█░     ░ ████▓▒░░▒███▒█▄    ▒██▒ ░            ║
║    QUEST :: TERMINAL OS v2.1.47 [NERV-SAO-ANAHEIM]        ║
╚═══════════════════════════════════════════════════════════╝</div>
                        
                        <div class="boot-header">
                            <span class="boot-header-glitch" data-text="LINK START">LINK START</span>
                        </div>
                        <div class="boot-subheader">
                            <span class="typing-text">── INITIALIZING VIRTUAL LEARNING INTERFACE ──</span>
                        </div>
                        
                        <div class="boot-grid-display">
                            <div class="grid-panel grid-left">
                                <div class="panel-title">CORE SYS</div>
                                <div class="panel-bars">
                                    <div class="stat-bar" style="--stat-value: 98%">
                                        <div class="stat-label">CPU</div>
                                        <div class="stat-fill"></div>
                                    </div>
                                    <div class="stat-bar" style="--stat-value: 87%">
                                        <div class="stat-label">MEM</div>
                                        <div class="stat-fill"></div>
                                    </div>
                                    <div class="stat-bar" style="--stat-value: 100%">
                                        <div class="stat-label">PWR</div>
                                        <div class="stat-fill"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid-panel grid-center">
                                <div class="radar-display">
                                    <div class="radar-ring radar-ring-1"></div>
                                    <div class="radar-ring radar-ring-2"></div>
                                    <div class="radar-ring radar-ring-3"></div>
                                    <div class="radar-sweep"></div>
                                    <div class="radar-blip"></div>
                                </div>
                            </div>
                            <div class="grid-panel grid-right">
                                <div class="panel-title">STATUS</div>
                                <div class="status-indicators">
                                    <div class="status-item">
                                        <span class="status-dot status-ok"></span>
                                        <span>ONLINE</span>
                                    </div>
                                    <div class="status-item">
                                        <span class="status-dot status-ok"></span>
                                        <span>SYNC</span>
                                    </div>
                                    <div class="status-item">
                                        <span class="status-dot status-warning"></span>
                                        <span>STANDBY</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="boot-system-check">
                            <div class="boot-section-header">
                                <span class="section-icon">▼</span> NERV-MAGI SYSTEM // SYNCHRONIZATION TEST
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ CASPER (Logic)....................</span>
                                <span class="boot-status">SYNC 99.8%</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ BALTHASAR (Strategy)..............</span>
                                <span class="boot-status">SYNC 99.9%</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>└─ MELCHIOR (Creativity)..............</span>
                                <span class="boot-status">SYNC 100%</span>
                            </div>
                            <div class="boot-line boot-spacer"></div>
                            
                            <div class="boot-section-header">
                                <span class="section-icon">▼</span> GUNDAM OS // MOBILE SUIT SYSTEMS
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Psycommu Neural Link..............</span>
                                <span class="boot-status">ACTIVE</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Combat Calculation Engine.........</span>
                                <span class="boot-status">STANDBY</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>└─ Pilot Interface Module............</span>
                                <span class="boot-status">READY</span>
                            </div>
                            <div class="boot-line boot-spacer"></div>
                            
                            <div class="boot-section-header">
                                <span class="section-icon">▼</span> SAO CARDINAL SYSTEM // CORE MODULES
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Math Combat Engine (27 Skills)....</span>
                                <span class="boot-status">LOADED</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Verbal Sword Arts.................</span>
                                <span class="boot-status">LOADED</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Reading Comprehension Quest........</span>
                                <span class="boot-status">LOADED</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Science Knowledge Database........</span>
                                <span class="boot-status">LOADED</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>└─ Audio Synthesis System............</span>
                                <span class="boot-status">LOADED</span>
                            </div>
                            <div class="boot-line boot-spacer"></div>
                            
                            <div class="boot-section-header">
                                <span class="section-icon">▼</span> PLAYER INTERFACE // STATUS CHECK
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Character Profile Registry........</span>
                                <span class="boot-status">ONLINE</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Experience Point System...........</span>
                                <span class="boot-status">ONLINE</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>├─ Quest Progress Tracker............</span>
                                <span class="boot-status">ONLINE</span>
                            </div>
                            <div class="boot-line boot-indent">
                                <span>└─ Local Data Persistence............</span>
                                <span class="boot-status">ONLINE</span>
                            </div>
                            <div class="boot-line boot-spacer"></div>
                            
                            <div class="boot-critical-status">
                                <div class="critical-line">
                                    <span class="critical-icon">◆</span>
                                    <span class="boot-status-highlight">A.T. FIELD STABLE // PATTERN BLUE</span>
                                </div>
                                <div class="critical-line">
                                    <span class="critical-icon">◆</span>
                                    <span class="boot-status-highlight">ALL SYSTEMS NOMINAL // READY FOR SORTIE</span>
                                </div>
                                <div class="critical-line">
                                    <span class="critical-icon">◆</span>
                                    <span class="boot-status-highlight">LINK ESTABLISHED // DIVE AUTHORIZED</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="boot-hexagon-grid">
                            <div class="boot-hexagon"><span class="hex-id">01</span></div>
                            <div class="boot-hexagon"><span class="hex-id">02</span></div>
                            <div class="boot-hexagon"><span class="hex-id">03</span></div>
                            <div class="boot-hexagon"><span class="hex-id">04</span></div>
                            <div class="boot-hexagon"><span class="hex-id">05</span></div>
                            <div class="boot-hexagon"><span class="hex-id">06</span></div>
                            <div class="boot-hexagon"><span class="hex-id">07</span></div>
                            <div class="boot-hexagon"><span class="hex-id">08</span></div>
                        </div>
                        
                        <div class="boot-progress">
                            <div class="boot-progress-label">[ SYNCHRONIZATION RATE ]</div>
                            <div class="boot-progress-bar">
                                <div class="boot-progress-fill"></div>
                                <div class="progress-scanline"></div>
                            </div>
                            <div class="boot-progress-percent">0%</div>
                        </div>
                        
                        <div class="boot-footer">
                            <div class="boot-footer-line">┌─────────────────────────────────────────────────┐</div>
                            <div class="boot-footer-line footer-welcome">│ WELCOME, PLAYER. THE QUEST BEGINS NOW.        │</div>
                            <div class="boot-footer-line footer-prompt">│ >> Press START to enter the virtual realm <<   │</div>
                            <div class="boot-footer-line">└─────────────────────────────────────────────────┘</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', bootHTML);
        
        // Animate timestamp
        const updateTimestamp = () => {
            const now = new Date();
            const timeStr = now.toTimeString().split(' ')[0];
            const tsElement = document.getElementById('boot-timestamp');
            if (tsElement) {
                tsElement.textContent = timeStr;
            }
        };
        updateTimestamp();
        const tsInterval = setInterval(updateTimestamp, 1000);
        
        // Animate progress percentage
        const progressPercent = document.querySelector('.boot-progress-percent');
        if (progressPercent) {
            let percent = 0;
            const percentInterval = setInterval(() => {
                percent += 1;
                if (percent <= 100) {
                    progressPercent.textContent = percent + '%';
                } else {
                    clearInterval(percentInterval);
                }
            }, 100);
        }
        
        // Remove boot sequence after 15 seconds
        setTimeout(() => {
            clearInterval(tsInterval);
            const bootSeq = document.getElementById('boot-sequence');
            if (bootSeq) {
                bootSeq.classList.add('boot-fade-out');
                setTimeout(() => {
                    bootSeq.remove();
                    resolve();
                }, 500);
            } else {
                resolve();
            }
        }, 15000);
    });
}

// ============================================================================
// Player Management
// ============================================================================
function createPlayer(name) {
    const player = {
        id: Date.now().toString(),
        name: name.trim(),
        sessions: []
    };
    state.players.push(player);
    savePlayers(state.players);
    state.currentPlayer = player;
    playSfx('player');
    return player;
}

function selectPlayer(playerId) {
    state.currentPlayer = state.players.find(p => p.id === playerId) || null;
}

// ============================================================================
// Quiz Management
// ============================================================================
function startQuiz(topicId, mode = 'practice', difficulty = 'beginner') {
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
    } else if (topic.subjectId === 'vocabulary' && typeof getQuestionsFromRegistry === 'function') {
        // Patch 18: Use content-based questions for vocabulary topics
        const questionCount = mode === 'sprint' ? 5 : 10;
        
        if (mode === 'sprint') {
            // For sprint mode, get questions from all difficulties
            const difficulties = ['beginner', 'advanced', 'expert'];
            const questionsPerDifficulty = Math.ceil(questionCount / 3);
            
            difficulties.forEach(diff => {
                const qs = getQuestionsFromRegistry(topic.subjectId, topic.id, diff, questionsPerDifficulty);
                state.quiz.questions.push(...qs);
            });
            
            // Shuffle and limit to exact count
            state.quiz.questions = state.quiz.questions.sort(() => Math.random() - 0.5).slice(0, questionCount);
        } else {
            // Regular practice/test mode - use specified difficulty
            state.quiz.questions = getQuestionsFromRegistry(topic.subjectId, topic.id, difficulty, questionCount);
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
    
    // Get button position for particle effect
    const buttons = document.querySelectorAll('.option-btn');
    const selectedButton = buttons[optionIndex];
    if (selectedButton) {
        const rect = selectedButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        if (isCorrect) {
            createParticles(x, y, '#00ffff', 30);
        } else {
            createParticles(x, y, '#ff0000', 20);
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
            timestamp: Date.now()
        };
        
        state.currentPlayer.sessions.push(session);
        
        // Update RPG stats with difficulty multiplier
        updatePlayerStats(state.currentPlayer, state.currentTopic.id, state.quiz.score, state.quiz.difficulty);
        
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
    render();
}

function goToSubject(subjectId) {
    playSfx('nav');
    state.currentSubject = subjects.find(s => s.id === subjectId);
    state.screen = 'subject';
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

function goToAnalytics() {
    if (!state.currentPlayer) {
        return; // Can't view analytics without a player
    }
    playSfx('nav');
    state.screen = 'analytics';
    render();
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
        case 'home':
            root.innerHTML = renderHome();
            break;
        case 'subject':
            root.innerHTML = renderSubject();
            break;
        case 'mode-select':
            root.innerHTML = renderModeSelect();
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
        case 'settings':
            root.innerHTML = renderSettings();
            break;
    }
    
    attachEventListeners();
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
                        return `
                            <div class="player-item-login" data-player-id="${p.id}">
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
                    <h3 style="text-align: center; margin: 30px 0 20px 0;">Create New Character</h3>
                    <div class="new-player-form-login">
                        <input type="text" id="new-player-name-login" placeholder="Enter character name" maxlength="20" />
                        <button class="btn" id="create-player-btn-login">Create Character</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderHome() {
    const playerInfo = state.currentPlayer ? computePlayerTotals(state.currentPlayer) : null;
    
    return `
        <div class="panel">
            <h1 class="panel-header" style="text-align: center; margin-bottom: 20px;">AFOQT QUEST</h1>
            
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
                            ⚔ Equipment
                        </button>
                        <button class="btn btn-small" id="results-btn">
                            📈 Results
                        </button>
                    ` : ''}
                    <button class="btn btn-small" id="settings-btn">
                        ⚙ Settings
                    </button>
                </div>
            </div>
            
            <h2>Subjects</h2>
            <div class="grid grid-2">
                ${subjects.map(subject => `
                    <div class="tile" data-subject-id="${subject.id}">
                        <div class="tile-title">${subject.name}</div>
                        <div class="tile-description">${subject.description}</div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        ${renderPlayerModal()}
    `;
}

function renderPlayerModal() {
    return `
        <div id="player-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Player Management</h2>
                    <button class="modal-close" id="close-player-modal">✕</button>
                </div>
                <div class="modal-body">
                    <div class="player-list">
                        ${state.players.length === 0 ? '<p style="text-align: center; opacity: 0.7;">No players yet. Create one below!</p>' : ''}
                        ${state.players.map(p => `
                            <div class="player-item ${state.currentPlayer?.id === p.id ? 'selected' : ''}" data-player-id="${p.id}">
                                <div class="player-name">${p.name}</div>
                                <div class="player-level">Lv. ${computePlayerTotals(p).level}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="new-player-form">
                        <input type="text" id="new-player-name" placeholder="New player name" />
                        <button class="btn btn-small" id="add-player-btn">Create Player</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderSubject() {
    if (!state.currentSubject) return '';
    
    // Filter topics for current subject
    const subjectTopics = topics.filter(t => t.subjectId === state.currentSubject.id);
    
    return `
        <div class="panel">
            <h1 class="panel-header">${state.currentSubject.name}</h1>
            
            <div class="grid grid-3">
                ${subjectTopics.map(topic => `
                    <div class="tile" data-topic-id="${topic.id}">
                        <div class="tile-title">${topic.name}</div>
                        <div class="tile-description">${topic.description}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
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
                <h2 style="text-align: center; margin-bottom: 30px;">Select Quiz Mode</h2>
                
                <div class="grid grid-3" style="max-width: 900px; margin: 0 auto;">
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
            
            <div class="action-buttons">
                <button class="btn" id="back-to-subject-btn">← Back to Topics</button>
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
            
            <div class="action-buttons">
                <button class="btn" id="back-to-mode-btn">← Back to Modes</button>
            </div>
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
                    <strong>${state.currentTopic.name}</strong><br>
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
                    
                    return `
                        <button 
                            class="${classes}" 
                            data-option-index="${idx}"
                            ${answered ? 'disabled' : ''}
                        >
                            <span class="option-label">${String.fromCharCode(65 + idx)}.</span>
                            ${option}
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
                <button class="btn" id="home-btn">← Home</button>
                ${answered ? `
                    <button class="btn" id="next-btn">
                        ${state.quiz.currentIndex < state.quiz.questions.length - 1 ? 'Next →' : 'Finish'}
                    </button>
                ` : ''}
            </div>
        </div>
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
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
    
    // Get equipped items
    const equippedHelmet = EQUIPMENT_ITEMS[state.currentPlayer.equipment.helmet];
    const equippedArmor = EQUIPMENT_ITEMS[state.currentPlayer.equipment.armor];
    const equippedWeapon = EQUIPMENT_ITEMS[state.currentPlayer.equipment.weapon];
    const equippedAccessory = EQUIPMENT_ITEMS[state.currentPlayer.equipment.accessory];
    
    return `
        <div class="panel">
            <h1 class="panel-header">Character Status</h1>
            
            <div class="status-header">
                <div class="status-player-info">
                    <div class="status-name">${state.currentPlayer.name}</div>
                    <div class="status-level">Level ${level}</div>
                    <div class="status-total-stats">Total Stat Points: ${totalStatPoints}</div>
                </div>
                
                <div class="status-progress">
                    <div class="status-progress-label">Progress to Level ${level + 1}</div>
                    <div class="status-progress-bar">
                        <div class="status-progress-fill" style="width: ${(pointsIntoLevel / 5) * 100}%"></div>
                    </div>
                    <div class="status-progress-text">${pointsIntoLevel} / 5 points</div>
                </div>
            </div>
            
            <h2 style="margin: 30px 0 20px 0; text-align: center;">Subject Stats</h2>
            
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
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
            <h1 class="panel-header">⚔ Character Equipment ⚔</h1>
            
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
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
                        </label>
                        <div class="theme-selector">
                            <button class="theme-btn ${currentTheme === 'default' ? 'active' : ''}" data-theme="default">
                                <span class="theme-preview theme-preview-default"></span>
                                <span>Default</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'eva01' ? 'active' : ''}" data-theme="eva01">
                                <span class="theme-preview theme-preview-eva01"></span>
                                <span>EVA-01</span>
                            </button>
                            <button class="theme-btn ${currentTheme === 'eva02' ? 'active' : ''}" data-theme="eva02">
                                <span class="theme-preview theme-preview-eva02"></span>
                                <span>EVA-02</span>
                            </button>
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
            </div>
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
    `;
}

function renderAnalytics() {
    if (!state.currentPlayer || !state.currentPlayer.sessions) {
        return `
            <div class="panel">
                <h1 class="panel-header">Results & Analytics</h1>
                <p style="text-align: center; margin: 40px 0; opacity: 0.7;">No session data available. Complete some quizzes to see your analytics!</p>
                <div class="action-buttons">
                    <button class="btn" id="home-btn">← Home</button>
                </div>
            </div>
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
    `;
}

// ============================================================================
// Event Listeners
// ============================================================================
function attachEventListeners() {
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
    
    // Player selection in modal
    const playerItems = document.querySelectorAll('.player-item');
    playerItems.forEach(item => {
        item.addEventListener('click', () => {
            selectPlayer(item.dataset.playerId);
            const modal = document.getElementById('player-modal');
            if (modal) {
                modal.style.display = 'none';
            }
            playSfx('select');
            render();
        });
    });
    
    // Home screen
    const addPlayerBtn = document.getElementById('add-player-btn');
    if (addPlayerBtn) {
        addPlayerBtn.addEventListener('click', () => {
            const input = document.getElementById('new-player-name');
            const name = input.value.trim();
            if (name) {
                createPlayer(name);
                input.value = '';
                const modal = document.getElementById('player-modal');
                if (modal) {
                    modal.style.display = 'none';
                }
                render();
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
    
    // Subject tiles
    const subjectTiles = document.querySelectorAll('[data-subject-id]');
    subjectTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            goToSubject(tile.dataset.subjectId);
        });
    });
    
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
        homeBtn.addEventListener('click', goHome);
    }
    
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.addEventListener('click', nextQuestion);
    }
    
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) {
        retryBtn.addEventListener('click', retryTopic);
    }
}

// ============================================================================
// Initialization
// ============================================================================
async function init() {
    // Show Evangelion-style boot sequence on first load
    const hasBooted = sessionStorage.getItem('afoqt-booted');
    if (!hasBooted) {
        await showBootSequence();
        sessionStorage.setItem('afoqt-booted', 'true');
    }
    
    state.players = loadPlayers();
    loadSettings(); // Load settings from localStorage
    if (state.players.length > 0) {
        state.currentPlayer = state.players[0];
    }
    
    // Patch 18: Initialize content-based question system
    if (typeof initializePatch18 === 'function') {
        try {
            const success = await initializePatch18();
            if (success) {
                state.patch18Loaded = true;
                console.log('✓ Patch 18 active');
                
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
