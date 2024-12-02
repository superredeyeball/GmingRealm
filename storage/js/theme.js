function applyStoredTheme() {
    const storedTheme = localStorage.getItem('selectedTheme');
    if (storedTheme) {
        document.documentElement.className = `theme-${storedTheme}`;

        if (storedTheme === 'custom') {
            applyCustomThemeStyles();
        } else if (storedTheme === 'particlesjs') {
            applyParticleJsTheme();
        }
    }
}

function applyCustomThemeStyles() {
    const customTheme = JSON.parse(localStorage.getItem('customTheme')) || {};
    const root = document.documentElement;

    const customStyleTag = document.getElementById('custom-theme-style');
    if (!customStyleTag) {
        const styleTag = document.createElement('style');
        styleTag.id = 'custom-theme-style';
        styleTag.textContent = `
            :root {
                --background-image: url('${customTheme['background-image'] || ''}');
                --font-family: '${customTheme['font-family'] || ''}', sans-serif;
                --text-color: ${customTheme['text-color'] || '#fff'};
                --background-color: ${customTheme['background-color'] || 'black'};
                --border-color1: ${customTheme['border-color1'] || '#aaaaaa'};
                --border-color2: ${customTheme['border-color2'] || '#ffffff'};
                --hover-color: ${customTheme['hover-color'] || '#1a1818'};
                --text-glow: ${customTheme['text-glow'] || '#000000'};
            }
        `;
        document.head.appendChild(styleTag);
    }
}

window.addEventListener('load', applyStoredTheme);

function applyParticleJsTheme() {
    // Remove any existing particle.js elements
    const particlesCanvas = document.querySelector('.particles-js-canvas-el');
    if (particlesCanvas) {
        particlesCanvas.remove();
    }

    // Create particles.js container
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles-js';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100vw';
    particlesContainer.style.height = '100vh';
    particlesContainer.style.zIndex = '-1';
    document.body.appendChild(particlesContainer);

    // Load particles.js script
    const particlesScript = document.createElement('script');
    particlesScript.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    particlesScript.onload = () => {
        // Initialize particles.js
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 64,
                    "density": {
                        "enable": true,
                        "value_area": 630
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    },
                    "image": {
                        "src": "",
                        "width": 100,
                        "height": 100
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.5,
                    "width": 0
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "repulse"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 400,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    };
    document.head.appendChild(particlesScript);
}