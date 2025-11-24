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
    logoText.style.cssText = `
        font-size: ${isMobile ? '7px' : '10px'};
        line-height: 1.2;
        text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
        text-align: center;
        margin-bottom: ${isMobile ? '10px' : '20px'};
        opacity: 0;
        animation: logoFadeIn 1s ease-out forwards;
        overflow-x: auto;
    `;
    logoText.textContent = asciiLogo;
    bootContent.appendChild(logoText);
    
    const bootText = document.createElement('pre');
    bootText.style.cssText = `
        font-size: ${isMobile ? '9px' : '13px'};
        line-height: 1.6;
        text-shadow: 0 0 5px #00ffff;
        margin-top: ${isMobile ? '10px' : '20px'};
        overflow-x: auto;
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
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(bootScreen);
    
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
        theme: 'default', // 'default' | 'eva01' | 'eva02' | 'rx0'
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
                    { q: "What is VR speed?", a: "Rotation speed for takeoff", opts: ["Refusal speed", "Range speed", "Reduced speed"], exp: "VR is the speed at which the player rotates the aircraft nose up during takeoff", img: "images/attitude-climbing.svg" },
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
        id: 'attitude-indicator-basic',
        name: 'Attitude Indicator - Basic',
        description: 'Basic aircraft attitude interpretation',
        subjectId: 'instrument',
        generateQuestion: (difficulty = 'beginner') => {
            // Beginner: Simple attitudes with clear descriptions (9 questions)
            const beginnerAttitudes = [
                { heading: "North", bank: "Level", pitch: "Level", desc: "Straight and level flight", img: "images/attitude-level.svg", details: "No bank, no climb or descent" },
                { heading: "East", bank: "Level", pitch: "Climbing", desc: "Climbing straight ahead", img: "images/attitude-climbing.svg", details: "Nose up, wings level" },
                { heading: "South", bank: "Level", pitch: "Descending", desc: "Descending straight ahead", img: "images/attitude-descending.svg", details: "Nose down, wings level" },
                { heading: "West", bank: "Right 30°", pitch: "Level", desc: "Banking right 30 degrees", img: "images/attitude-right-30.svg", details: "Right wing down, level pitch" },
                { heading: "North", bank: "Left 20°", pitch: "Level", desc: "Banking left 20 degrees", img: "images/attitude-left-20.svg", details: "Left wing down, level pitch" },
                { heading: "Southeast", bank: "Right 15°", pitch: "Level", desc: "Banking right 15 degrees", img: "images/attitude-right-15.svg", details: "Slight right bank, wings not level" },
                { heading: "Northwest", bank: "Left 25°", pitch: "Level", desc: "Banking left 25 degrees", img: "images/attitude-left-25.svg", details: "Moderate left bank, level pitch" },
                { heading: "Northeast", bank: "Level", pitch: "Climbing", desc: "Climbing with wings level", img: "images/attitude-climbing.svg", details: "Straight climb, no turn" },
                { heading: "Southwest", bank: "Level", pitch: "Descending", desc: "Descending with wings level", img: "images/attitude-descending.svg", details: "Straight descent, no turn" }
            ];
            
            // Advanced: Combined maneuvers (9 questions)
            const advancedAttitudes = [
                { heading: "Northeast", bank: "Right 15°", pitch: "Climbing", desc: "Climbing right turn", img: "images/attitude-right-15.svg", details: "Banking right 15° while climbing" },
                { heading: "Southeast", bank: "Left 25°", pitch: "Descending", desc: "Descending left turn", img: "images/attitude-left-25.svg", details: "Banking left 25° while descending" },
                { heading: "Southwest", bank: "Right 30°", pitch: "Descending", desc: "Steep descending right turn", img: "images/attitude-right-30.svg", details: "Banking right 30° with nose down" },
                { heading: "Northwest", bank: "Left 20°", pitch: "Climbing", desc: "Climbing left turn", img: "images/attitude-left-20.svg", details: "Banking left 20° while climbing" },
                { heading: "East", bank: "Right 30°", pitch: "Climbing", desc: "Steep climbing right turn", img: "images/attitude-right-30.svg", details: "Right 30° bank with climb" },
                { heading: "West", bank: "Left 25°", pitch: "Climbing", desc: "Moderate climbing left turn", img: "images/attitude-left-25.svg", details: "Left 25° bank while ascending" },
                { heading: "North", bank: "Right 15°", pitch: "Descending", desc: "Descending right turn", img: "images/attitude-right-15.svg", details: "Right 15° bank with descent" },
                { heading: "South", bank: "Left 20°", pitch: "Descending", desc: "Descending left turn", img: "images/attitude-left-20.svg", details: "Left 20° bank while descending" },
                { heading: "Northeast", bank: "Right 30°", pitch: "Level", desc: "Steep level right turn", img: "images/attitude-right-30.svg", details: "Sharp turn without altitude change" }
            ];
            
            // Expert: Precise identification with specific angles (9 questions)
            const expertAttitudes = [
                { heading: "045°", bank: "Right 15°", pitch: "5° climb", desc: "Right 15° bank, 5° nose up, heading 045°", img: "images/attitude-right-15.svg", details: "Shallow climbing right turn to northeast" },
                { heading: "135°", bank: "Left 25°", pitch: "10° descent", desc: "Left 25° bank, 10° nose down, heading 135°", img: "images/attitude-left-25.svg", details: "Medium descending left turn to southeast" },
                { heading: "225°", bank: "Right 30°", pitch: "Level", desc: "Right 30° bank, level pitch, heading 225°", img: "images/attitude-right-30.svg", details: "Steep right turn to southwest" },
                { heading: "315°", bank: "Left 20°", pitch: "8° climb", desc: "Left 20° bank, 8° nose up, heading 315°", img: "images/attitude-left-20.svg", details: "Moderate climbing left turn to northwest" },
                { heading: "090°", bank: "Right 30°", pitch: "12° descent", desc: "Right 30° bank, 12° nose down, heading 090°", img: "images/attitude-right-30.svg", details: "Steep descending right turn to east" },
                { heading: "180°", bank: "Left 25°", pitch: "6° climb", desc: "Left 25° bank, 6° nose up, heading 180°", img: "images/attitude-left-25.svg", details: "Medium climbing left turn to south" },
                { heading: "270°", bank: "Right 15°", pitch: "3° descent", desc: "Right 15° bank, 3° nose down, heading 270°", img: "images/attitude-right-15.svg", details: "Shallow descending right turn to west" },
                { heading: "000°", bank: "Left 20°", pitch: "Level", desc: "Left 20° bank, level pitch, heading 000°", img: "images/attitude-left-20.svg", details: "Moderate left turn to north" },
                { heading: "060°", bank: "Right 30°", pitch: "10° climb", desc: "Right 30° bank, 10° nose up, heading 060°", img: "images/attitude-right-30.svg", details: "Steep climbing right turn to ENE" }
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
        subjectId: 'instrument',
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
                image: "images/aircraft-controls.svg"
            };
        }
    },
    {
        id: 'aircraft-forces',
        name: 'Four Forces of Flight',
        description: 'Lift, Weight, Thrust, and Drag',
        subjectId: 'instrument',
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
                image: "images/aircraft-forces.svg"
            };
        }
    },
    {
        id: 'airspeed-indicator',
        name: 'Airspeed Indicator (ASI)',
        description: 'Reading and interpreting airspeed',
        subjectId: 'instrument',
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
                image: "images/instruments/asi/asi.svg"
            };
        }
    },
    {
        id: 'altimeter',
        name: 'Altimeter (ALT)',
        description: 'Reading altitude and pressure settings',
        subjectId: 'instrument',
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
                image: "images/instruments/alt/alt.svg"
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
    if (mathTopics.find(t => t.id === topicId)) return 'math';
    if (vocabularyTopics.find(t => t.id === topicId)) return 'verbal';
    if (readingTopics.find(t => t.id === topicId)) return 'reading';
    if (scienceTopics.find(t => t.id === topicId)) return 'science';
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
    
    // Remove existing theme classes
    root.classList.remove('theme-default', 'theme-eva01', 'theme-eva02', 'theme-rx0');
    
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
                <!-- Phase 1: System Boot (0-4s) -->
                <div class="boot-phase boot-phase-1">
                    <div class="boot-system-init">
                        <div class="sys-corners">
                            <div class="sys-corner sys-tl"></div>
                            <div class="sys-corner sys-tr"></div>
                            <div class="sys-corner sys-bl"></div>
                            <div class="sys-corner sys-br"></div>
                        </div>
                        <div class="sys-title">SYSTEM INITIALIZATION</div>
                        <div class="sys-processes">
                            <div class="sys-process" style="animation-delay: 0.3s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">CORE.01/SYNC</span>
                                <span class="process-status">ONLINE</span>
                            </div>
                            <div class="sys-process" style="animation-delay: 0.6s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">CORE.02/SYNC</span>
                                <span class="process-status">ONLINE</span>
                            </div>
                            <div class="sys-process" style="animation-delay: 0.9s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">CORE.03/SYNC</span>
                                <span class="process-status">ONLINE</span>
                            </div>
                            <div class="sys-process" style="animation-delay: 1.2s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">NEURAL.SYS</span>
                                <span class="process-status">ACTIVE</span>
                            </div>
                            <div class="sys-process" style="animation-delay: 1.5s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">PILOT.INTERFACE</span>
                                <span class="process-status">READY</span>
                            </div>
                            <div class="sys-process" style="animation-delay: 1.8s;">
                                <span class="process-icon">▶</span>
                                <span class="process-name">COMBAT.ENGINE</span>
                                <span class="process-status">STANDBY</span>
                            </div>
                        </div>
                        <div class="sys-loading-bar">
                            <div class="sys-bar-fill"></div>
                        </div>
                        <div class="sys-percentage">0%</div>
                    </div>
                </div>

                <!-- Phase 2: Welcome Message (4-7s) -->
                <div class="boot-phase boot-phase-2">
                    <div class="boot-welcome-screen">
                        <div class="welcome-shape-container">
                            <div class="welcome-shape welcome-hex-1">
                                <div class="shape-line"></div>
                            </div>
                            <div class="welcome-shape welcome-hex-2">
                                <div class="shape-line"></div>
                            </div>
                            <div class="welcome-shape welcome-hex-3">
                                <div class="shape-line"></div>
                            </div>
                        </div>
                        <div class="welcome-main-text">WELCOME TO</div>
                        <div class="welcome-title">AFOQT QUEST</div>
                        <div class="welcome-subtitle">NEURAL COMBAT TRAINING SYSTEM</div>
                        <div class="welcome-corners">
                            <div class="welcome-corner wc-tl"></div>
                            <div class="welcome-corner wc-tr"></div>
                            <div class="welcome-corner wc-bl"></div>
                            <div class="welcome-corner wc-br"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', bootHTML);
        
        // Update welcome message with player name
        const welcomeName = document.getElementById('welcome-player-name');
        if (welcomeName && state.currentPlayer) {
            welcomeName.textContent = `HELLO, ${state.currentPlayer.name.toUpperCase()}`;
        }
        
        // Enable audio on first user interaction (required by browser autoplay policy)
        // Note: Sound effects are scheduled throughout the boot animation. Those played before
        // user interaction will fail silently, those after will play normally.
        const enableAudio = createAudioEnabler();
        
        // Listen for any user interaction to enable audio
        const bootSequence = document.getElementById('boot-sequence');
        if (bootSequence) {
            bootSequence.addEventListener('click', enableAudio, { once: true });
            document.addEventListener('keydown', enableAudio, { once: true });
        }
        
        // Sound effects for boot sequence
        playSfx('boot'); // Phase 1: System boot
        setTimeout(() => playSfx('nav'), 1500); // Phase 1: Process loading
        setTimeout(() => playSfx('correct'), 3500); // Phase 1: Systems online
        setTimeout(() => playSfx('select'), 4000); // Phase 2: Welcome screen
        
        // Animate system boot percentage
        const sysPercent = document.querySelector('.sys-percentage');
        if (sysPercent) {
            let percent = 0;
            const percentInterval = setInterval(() => {
                percent += 2;
                if (percent <= 100) {
                    sysPercent.textContent = percent + '%';
                } else {
                    clearInterval(percentInterval);
                }
            }, 35); // Complete in ~1.75s
        }
        
        // Remove boot sequence after 7 seconds
        setTimeout(() => {
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
        }, 7000);
    });
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
                <div class="access-subtext">PLAYER AUTHENTICATION COMPLETE</div>
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
    } else if (topic.subjectId === 'vocabulary' && typeof getQuestionsWithSpacedRepetition === 'function') {
        // Patch 18: Use content-based questions with spaced repetition for vocabulary topics
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
        case 'achievements':
            root.innerHTML = renderAchievements();
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
                            🎖 Loadout
                        </button>
                        <button class="btn btn-small" id="achievements-btn">
                            🏆 Awards
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
        ${renderFloatingNav()}
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
        ${renderFloatingNav({ backAction: 'subject', backLabel: '← Topics' })}
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
        ${renderFloatingNav({ backAction: 'mode', backLabel: '← Modes' })}
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
                <button class="btn" id="home-btn">← Return to Topics</button>
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
        ${renderFloatingNav()}
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
        ${renderFloatingNav()}
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
        ${renderFloatingNav()}
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
        ${renderFloatingNav()}
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
                            <button class="theme-btn ${currentTheme === 'rx0' ? 'active' : ''}" data-theme="rx0">
                                <span class="theme-preview theme-preview-rx0"></span>
                                <span>RX-0</span>
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
        ${renderFloatingNav()}
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
            
            <div class="action-buttons">
                <button class="btn" id="home-btn">← Home</button>
            </div>
        </div>
        ${renderFloatingNav()}
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
