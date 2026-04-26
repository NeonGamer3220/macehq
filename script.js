// MaceHQ Network - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initSmoothScroll();
    initCopyToClipboard();
    initScrollAnimations();
    initParallaxEffects();
    initParticleSystem();
});

// Navbar scroll effects
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    let lastScrollY = window.scrollY;

    // Change navbar style on scroll
    function updateNavbar() {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollY = currentScrollY;
    }

    // Update active nav link based on scroll position
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateNavbar();
        updateActiveLink();
    });

    updateNavbar(); // Initial check
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Copy IP address to clipboard
function initCopyToClipboard() {
    const copyButtons = document.querySelectorAll('.btn-connect, .btn-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const ipAddress = 'macehq.mcplay.hu';

            if (navigator.clipboard && window.isSecureContext) {
                // Use modern clipboard API
                navigator.clipboard.writeText(ipAddress).then(() => {
                    showToast('Server address copied to clipboard!');
                }).catch(() => {
                    fallbackCopyTextToClipboard(ipAddress);
                });
            } else {
                // Fallback for older browsers
                fallbackCopyTextToClipboard(ipAddress);
            }
        });
    });
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('Server address copied to clipboard!');
    } catch (err) {
        showToast('Failed to copy address. Please copy manually.');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Toast notification system
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastText = toast.querySelector('span');

    if (message === 'Server address copied to clipboard!') {
        toastText.textContent = 'A szerver cím másolva a vágólapra!';
    } else if (message === 'Failed to copy address. Please copy manually.') {
        toastText.textContent = 'Nem sikerült másolni. Másold be kézzel!';
    } else {
        toastText.textContent = message;
    }
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Scroll animations for elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Elements to animate on scroll
    const animateElements = document.querySelectorAll('.info-card, .feature-card, .staff-card, .rule-item, .discord-card');

    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Parallax effects for floating blocks
function initParallaxEffects() {
    const blocks = document.querySelectorAll('.block');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.5;

        blocks.forEach((block, index) => {
            const speed = (index + 1) * 0.1;
            block.style.transform = `translateY(${rate * speed}px) rotate(${45 + (index * 15)}deg)`;
        });
    });
}

// Particle system for background effects
function initParticleSystem() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';

    document.querySelector('.hero').prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    const particleCount = 50;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.alpha = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 3 + 1;
            this.color = Math.random() > 0.5 ? '#4ade80' : '#22c55e';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Wrap around edges
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;

            // Fade based on distance from center
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const distance = Math.sqrt((this.x - centerX) ** 2 + (this.y - centerY) ** 2);
            this.alpha = Math.max(0.1, 1 - (distance / (canvas.width / 2)) * 0.8);
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;
        }
    }

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Draw connections between nearby particles
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(74, 222, 128, ${(150 - distance) / 150 * 0.1})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// Add CSS for scroll animations
const style = document.createElement('style');
style.textContent = `
    .info-card, .feature-card, .staff-card, .rule-item, .discord-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }

    .info-card.animate-in, .feature-card.animate-in, .staff-card.animate-in, .rule-item.animate-in, .discord-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }

    .info-card:nth-child(odd), .feature-card:nth-child(odd), .staff-card:nth-child(odd), .rule-item:nth-child(odd) {
        animation-delay: 0.1s;
    }

    .info-card:nth-child(even), .feature-card:nth-child(even), .staff-card:nth-child(even), .rule-item:nth-child(even) {
        animation-delay: 0.2s;
    }
`;

document.head.appendChild(style);

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll-heavy functions
window.addEventListener('scroll', throttle(() => {
    // Any additional scroll handlers can be added here
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Easter egg - Konami code
let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Trigger easter egg
            showToast('🎮 Cheat activated! You found the secret code!');
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = 'none';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Add some interactive hover effects
document.querySelectorAll('.feature-card, .staff-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const emoji = card.querySelector('.feature-icon span, .staff-avatar');
        if (emoji) {
            emoji.style.transform = 'scale(1.2) rotate(10deg)';
            emoji.style.transition = 'transform 0.3s ease';
        }
    });

    card.addEventListener('mouseleave', () => {
        const emoji = card.querySelector('.feature-icon span, .staff-avatar');
        if (emoji) {
            emoji.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});