// Globe-based boot sequence for AFOQT Quest
// Replaces both showBootSequence() and runAnimeBootSequence() with simpler encom-globe loader
function showBootSequence() {
    return new Promise((resolve) => {
        const bootHTML = `
            <div id="boot-sequence" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, #02030a, #040812 50%, #080f1a); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 10000; opacity: 1; transition: opacity 600ms ease;">
                <div class="boot-sequence-inner" style="display: flex; flex-direction: column; align-items: center; gap: 32px;">
                    <h1 class="boot-logo" style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(32px, 5vw, 56px); font-weight: 700; letter-spacing: 0.3em; text-transform: uppercase; color: #9ef4ff; text-shadow: 0 0 40px rgba(158, 244, 255, 0.8), 0 0 80px rgba(158, 244, 255, 0.4); margin: 0; opacity: 0;">AFOQT QUEST</h1>
                    <div class="boot-subtitle" style="font-family: 'IBM Plex Mono', monospace; font-size: clamp(11px, 1.2vw, 14px); letter-spacing: 0.2em; color: #9fb6c6; text-transform: uppercase; margin-top: -24px; opacity: 0;">// OFFICER TRAINING SIMULATION</div>
                    <div class="globe-wrap" style="position: relative; width: min(480px, 75vw); aspect-ratio: 1 / 1; opacity: 0;">
                        <div id="globeHost" style="width: 100%; height: 100%;"></div>
                    </div>
                    <div class="init-progress" style="width: min(480px, 75vw); opacity: 0;">
                        <div class="progress-label" style="font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.15em; color: #9ef4ff; margin-bottom: 8px; text-align: center; text-transform: uppercase;">System Initialization</div>
                        <div class="progress-track" style="width: 100%; height: 8px; background: rgba(158, 244, 255, 0.1); border: 1px solid rgba(158, 244, 255, 0.3); border-radius: 999px; overflow: hidden; position: relative;">
                            <div class="progress-fill" id="progressFill" style="height: 100%; width: 0%; background: linear-gradient(90deg, #00ff88, #00d4ff); box-shadow: 0 0 16px rgba(0, 255, 136, 0.6); transition: width 100ms linear;"></div>
                        </div>
                        <div class="progress-percent" id="progressPercent" style="font-family: 'IBM Plex Mono', monospace; font-size: 14px; color: #9ef4ff; margin-top: 8px; text-align: center; letter-spacing: 0.1em;">0%</div>
                    </div>
                </div>
            </div>
            
            <div id="boot-complete" class="boot-complete" style="position: fixed; inset: 0; background: linear-gradient(135deg, #02030a, #040812 50%, #080f1a); display: none; flex-direction: column; align-items: center; justify-content: center; gap: 16px; z-index: 10000; opacity: 0; transition: opacity 600ms ease;">
                <div class="boot-complete-title" style="font-family: 'Space Grotesk', sans-serif; font-size: clamp(24px, 4vw, 36px); font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: #00ff88; text-shadow: 0 0 20px rgba(0, 255, 136, 0.8);">BOOT UP COMPLETE</div>
                <div class="boot-complete-subtitle" style="font-family: 'IBM Plex Mono', monospace; font-size: clamp(14px, 2vw, 18px); letter-spacing: 0.15em; color: #9ef4ff; text-shadow: 0 0 12px rgba(158, 244, 255, 0.6);">WELCOME TO AFOQT QUEST</div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', bootHTML);
        
        const bootLoader = document.getElementById('boot-sequence');
        const bootComplete = document.getElementById('boot-complete');
        const globeHost = document.getElementById('globeHost');
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        
        // Enable audio on first interaction
        const enableAudio = createAudioEnabler();
        if (bootLoader) {
            bootLoader.addEventListener('click', enableAudio, { once: true });
            document.addEventListener('keydown', enableAudio, { once: true });
        }
        
        // Globe initialization
        let loopRunning = false;
        let animationId = null;
        let globe = null;
        
        const startLoop = () => {
            if (loopRunning) return;
            loopRunning = true;
            const step = () => {
                animationId = requestAnimationFrame(step);
                if (globe && globe.tick) globe.tick();
            };
            step();
        };
        
        const stopLoop = () => {
            if (animationId) cancelAnimationFrame(animationId);
            animationId = null;
            loopRunning = false;
        };
        
        const buildGlobe = () => {
            if (!window.ENCOM || !window.ENCOM.Globe) {
                console.warn('ENCOM.Globe not available');
                return false;
            }
            if (globe && globe.destroy) globe.destroy();
            
            const w = globeHost.clientWidth || 400;
            const h = globeHost.clientHeight || 400;
            globe = new ENCOM.Globe(w, h, {
                font: 'Inconsolata',
                data: window.data ? window.data.slice() : [],
                tiles: window.grid ? window.grid.tiles : [],
                baseColor: '#8ce7ff',
                markerColor: '#b8ffcf',
                pinColor: '#ffdf8b',
                satelliteColor: '#ffae5f',
                scale: 1.05,
                dayLength: 12000,
                introLinesDuration: 2000,
                maxPins: 10,
                maxMarkers: 15,
                viewAngle: 0.3
            });
            
            globeHost.innerHTML = '';
            globeHost.appendChild(globe.domElement);
            
            if (globe.renderer) {
                globe.renderer.setClearColor(0x000000, 0);
                const canvas = globe.renderer.domElement;
                canvas.style.background = 'none';
                canvas.style.backgroundColor = 'transparent';
            }
            
            globe.init(() => {
                startLoop();
            });
            
            return true;
        };
        
        // Animate progress bar
        const animateProgress = () => {
            if (typeof gsap !== 'undefined') {
                gsap.to(progressFill, {
                    width: '100%',
                    duration: 8,
                    ease: 'linear',
                    onUpdate: function() {
                        const progress = Math.floor(this.progress() * 100);
                        progressPercent.textContent = progress + '%';
                    },
                    onComplete: showBootComplete
                });
            } else {
                let progress = 0;
                const interval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress > 100) progress = 100;
                    progressFill.style.width = progress + '%';
                    progressPercent.textContent = Math.floor(progress) + '%';
                    if (progress >= 100) {
                        clearInterval(interval);
                        setTimeout(showBootComplete, 200);
                    }
                }, 100);
            }
        };
        
        // Show boot complete
        const showBootComplete = () => {
            stopLoop();
            if (!bootLoader) return;
            
            if (typeof gsap !== 'undefined') {
                gsap.to(bootLoader, {
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.inOut',
                    onComplete: () => {
                        bootLoader.style.display = 'none';
                        bootComplete.style.display = 'flex';
                        bootComplete.style.opacity = '0';
                        
                        gsap.to(bootComplete, {
                            opacity: 1,
                            duration: 0.5,
                            ease: 'power2.out'
                        });
                        
                        gsap.fromTo('.boot-complete-title', 
                            { opacity: 0, y: -20 },
                            { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' }
                        );
                        
                        gsap.fromTo('.boot-complete-subtitle', 
                            { opacity: 0, y: 10 },
                            { opacity: 0.8, y: 0, duration: 0.6, delay: 0.4, ease: 'power3.out' }
                        );
                        
                        setTimeout(() => {
                            gsap.to(bootComplete, {
                                opacity: 0,
                                duration: 0.8,
                                ease: 'power2.inOut',
                                onComplete: () => {
                                    bootComplete.style.display = 'none';
                                    bootLoader.remove();
                                    resolve();
                                }
                            });
                        }, 3000);
                    }
                });
            } else {
                setTimeout(() => {
                    bootLoader.remove();
                    resolve();
                }, 2000);
            }
        };
        
        // Start boot sequence
        setTimeout(() => {
            if (typeof gsap !== 'undefined') {
                const tl = gsap.timeline();
                tl.fromTo('.boot-logo', 
                    { opacity: 0, y: -30, scaleX: 0.8 },
                    { opacity: 1, y: 0, scaleX: 1, duration: 0.8, ease: 'power4.out' }
                )
                .fromTo('.boot-subtitle',
                    { opacity: 0, letterSpacing: '0.5em' },
                    { opacity: 0.7, letterSpacing: '0.2em', duration: 0.6, ease: 'power2.out' },
                    '-=0.3'
                )
                .fromTo('.globe-wrap',
                    { opacity: 0, scale: 0.85 },
                    { opacity: 1, scale: 1, duration: 1, ease: 'power3.out' },
                    '-=0.2'
                )
                .fromTo('.init-progress',
                    { opacity: 0, translateY: 20 },
                    { opacity: 1, translateY: 0, duration: 0.6, ease: 'power2.out' },
                    '-=0.4'
                );
            }
            
            if (buildGlobe()) {
                setTimeout(animateProgress, 800);
            } else {
                setTimeout(animateProgress, 200);
            }
        }, 100);
    });
}
