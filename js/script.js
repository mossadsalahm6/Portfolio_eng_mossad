// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Visitor Counter System
class VisitorCounter {
    constructor() {
        this.storageKey = 'mossad_portfolio_visitors';
        this.sessionKey = 'mossad_portfolio_session';
        this.init();
    }

    init() {
        if (!this.hasVisitedThisSession()) {
            this.incrementCounter();
            this.markSessionVisit();
        }
        this.displayCount();
        this.animateCounter();
    }

    hasVisitedThisSession() {
        return sessionStorage.getItem(this.sessionKey) === 'true';
    }

    markSessionVisit() {
        sessionStorage.setItem(this.sessionKey, 'true');
    }

    incrementCounter() {
        let count = this.getCount();
        count++;
        localStorage.setItem(this.storageKey, count.toString());
    }

    getCount() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? parseInt(stored) : 0;
    }

    displayCount() {
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            counterElement.textContent = this.getCount().toLocaleString('ar-EG');
        }
    }

    animateCounter() {
        const counterElement = document.getElementById('visitor-count');
        if (counterElement) {
            const finalCount = this.getCount();
            let currentCount = 0;
            const increment = Math.ceil(finalCount / 50);
            
            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= finalCount) {
                    currentCount = finalCount;
                    clearInterval(timer);
                }
                counterElement.textContent = currentCount.toLocaleString('ar-EG');
                counterElement.style.color = '#00d4ff';
                counterElement.style.textShadow = '0 0 10px #00d4ff';
            }, 50);
        }
    }
}

// Statistics Animation System
class StatsAnimator {
    constructor() {
        this.stats = [
            { id: 'projects-count', target: 15, suffix: '+' },
            { id: 'experience-years', target: 3, suffix: '+' },
            { id: 'courses-taught', target: 50, suffix: '+' },
            { id: 'students-trained', target: 200, suffix: '+' }
        ];
        this.init();
    }

    init() {
        this.createStatsSection();
        this.observeStats();
    }

    createStatsSection() {
        const aboutSection = document.getElementById('about');
        if (aboutSection && !document.getElementById('stats-section')) {
            const statsHTML = `
                <div id="stats-section" class="stats-section">
                    <div class="container">
                        <div class="stats-grid">
                            <div class="stat-item">
                                <div class="stat-number" id="projects-count">0</div>
                                <div class="stat-label">مشروع مكتمل</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="experience-years">0</div>
                                <div class="stat-label">سنوات خبرة</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="courses-taught">0</div>
                                <div class="stat-label">كورس تدريبي</div>
                            </div>
                            <div class="stat-item">
                                <div class="stat-number" id="students-trained">0</div>
                                <div class="stat-label">طالب مدرب</div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            aboutSection.insertAdjacentHTML('afterend', statsHTML);
            this.addStatsCSS();
        }
    }

    addStatsCSS() {
        const statsCSS = `
            .stats-section {
                padding: 5rem 0;
                background: linear-gradient(135deg, var(--bg-darker) 0%, var(--bg-dark) 100%);
                position: relative;
                overflow: hidden;
            }

            .stats-section::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: 
                    radial-gradient(circle at 25% 25%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(108, 92, 231, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 3rem;
                max-width: 1000px;
                margin: 0 auto;
            }

            .stat-item {
                text-align: center;
                padding: 2rem;
                background: var(--bg-card);
                border-radius: 20px;
                border: 1px solid var(--border-color);
                transition: var(--transition);
                position: relative;
                overflow: hidden;
            }

            .stat-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
                transition: left 0.6s ease;
            }

            .stat-item:hover::before {
                left: 100%;
            }

            .stat-item:hover {
                transform: translateY(-10px);
                box-shadow: var(--soft-glow);
                border-color: var(--primary-color);
            }

            .stat-number {
                font-size: 3rem;
                font-weight: 900;
                background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                margin-bottom: 0.5rem;
                text-shadow: 0 0 30px var(--primary-color);
            }

            .stat-label {
                font-size: 1.1rem;
                color: var(--text-gray);
                font-weight: 600;
            }

            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                    gap: 1.5rem;
                }
                
                .stat-number {
                    font-size: 2.5rem;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = statsCSS;
        document.head.appendChild(styleSheet);
    }

    observeStats() {
        const statsSection = document.getElementById('stats-section');
        if (statsSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateStats();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(statsSection);
        }
    }

    animateStats() {
        this.stats.forEach((stat, index) => {
            setTimeout(() => {
                this.animateNumber(stat.id, stat.target, stat.suffix);
            }, index * 200);
        });
    }

    animateNumber(elementId, target, suffix = '') {
        const element = document.getElementById(elementId);
        if (!element) return;

        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 40);
    }
}

// Enhanced Particle System
class EnhancedParticleSystem {
    constructor(container) {
        this.container = container;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    createParticles() {
        const particleCount = window.innerWidth > 768 ? 80 : 40;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'enhanced-particle';
            
            const size = Math.random() * 4 + 1;
            const colors = ['#00d4ff', '#6c5ce7', '#fdcb6e', '#00b894'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                opacity: 0.7;
                box-shadow: 0 0 ${size * 3}px ${color};
                transition: all 0.3s ease;
            `;

            this.container.appendChild(particle);
            
            this.particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: size,
                color: color,
                life: Math.random() * 200 + 100
            });
        }
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    animate() {
        this.particles.forEach(particle => {
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.5;
                particle.vy += (dy / distance) * force * 0.5;
                particle.element.style.opacity = '1';
                particle.element.style.transform = `scale(${1 + force})`;
            } else {
                particle.element.style.opacity = '0.7';
                particle.element.style.transform = 'scale(1)';
            }

            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Boundary check and reset
            if (particle.x < 0 || particle.x > window.innerWidth ||
                particle.y < 0 || particle.y > window.innerHeight) {
                particle.x = Math.random() * window.innerWidth;
                particle.y = Math.random() * window.innerHeight;
                particle.vx = (Math.random() - 0.5) * 2;
                particle.vy = (Math.random() - 0.5) * 2;
            }

            // Apply friction
            particle.vx *= 0.99;
            particle.vy *= 0.99;

            // Update DOM
            particle.element.style.left = particle.x + 'px';
            particle.element.style.top = particle.y + 'px';
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Loading Screen Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
        
        // Initialize systems after loading
        new VisitorCounter();
        new StatsAnimator();
        
        // Initialize enhanced particle system
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            new EnhancedParticleSystem(heroBackground);
        }
    }, 500);
});

// Enhanced Navbar with scroll effects
window.addEventListener('scroll', throttle(() => {
    const scrollY = window.scrollY;
    
    if (scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Parallax effect for hero elements
    const heroElements = document.querySelectorAll('.floating-particles, .circuit-pattern');
    heroElements.forEach(element => {
        const speed = element.classList.contains('floating-particles') ? 0.3 : 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
}, 16));

// Mobile Menu Toggle with enhanced animations
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
    
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        document.body.style.overflow = 'hidden';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Enhanced smooth scrolling
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu
            hamburger?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

// Enhanced intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            
            // Special animations for different elements
            if (entry.target.classList.contains('skill-category')) {
                animateSkillTags(entry.target);
            }
            
            if (entry.target.classList.contains('project-card')) {
                animateProjectCard(entry.target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.skill-category, .timeline-item, .experience-card, .project-card, .course-card, .contact-item, .rating-card, .payment-method-card'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Skill tags animation
function animateSkillTags(container) {
    const skillTags = container.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'scale(1.1)';
            tag.style.boxShadow = '0 0 20px var(--primary-color)';
            
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
                tag.style.boxShadow = '0 0 10px var(--primary-color)';
            }, 200);
        }, index * 100);
    });
}

// Project card animation
function animateProjectCard(card) {
    const techTags = card.querySelectorAll('.tech-tag');
    const features = card.querySelectorAll('.feature');
    
    setTimeout(() => {
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'translateY(0) scale(1.05)';
                tag.style.opacity = '1';
            }, index * 100);
        });
        
        features.forEach((feature, index) => {
            setTimeout(() => {
                feature.style.transform = 'translateX(0)';
                feature.style.opacity = '1';
            }, index * 50);
        });
    }, 300);
}

// Enhanced form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.btn');
        const originalText = submitBtn.innerHTML;
        
        // Validate form
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                showInputError(input);
            } else {
                clearInputError(input);
            }
        });
        
        if (isValid) {
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
            submitBtn.disabled = true;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success state
            submitBtn.innerHTML = '<i class="fas fa-check"></i> تم الإرسال بنجاح!';
            submitBtn.style.background = 'linear-gradient(45deg, var(--success-color), #00a085)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
            }, 3000);
        }
    });
}

function showInputError(input) {
    input.style.borderColor = 'var(--warning-color)';
    input.style.boxShadow = '0 0 15px rgba(225, 112, 85, 0.3)';
    
    setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }, 3000);
}

function clearInputError(input) {
    input.style.borderColor = 'var(--primary-color)';
    input.style.boxShadow = '0 0 15px rgba(0, 212, 255, 0.2)';
    
    setTimeout(() => {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }, 1000);
}

// Scroll progress indicator
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
        z-index: 10001;
        transition: width 0.1s ease;
        box-shadow: 0 0 15px var(--primary-color);
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        progressBar.style.width = scrollPercent + '%';
    }, 16));
}

// Button ripple effect
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    `;
    
    // Add ripple animation keyframes if not exists
    if (!document.querySelector('#ripple-keyframes')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframes';
        style.textContent = `
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Utility function for throttling
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

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create scroll progress indicator
    createScrollProgress();
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.addEventListener('click', createRipple);
    });
    
    // Add animation CSS
    const animationCSS = `
        .animate-in {
            animation: slideInUp 0.8s ease forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .skill-category,
        .timeline-item,
        .experience-card,
        .project-card,
        .course-card,
        .contact-item,
        .rating-card,
        .payment-method-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        .tech-tag,
        .feature {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.4s ease;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animationCSS;
    document.head.appendChild(styleSheet);
});

console.log('🚀 Mossad Salah Portfolio - Enhanced Version Loaded!');
console.log('✨ New features: Visitor counter, Statistics, Enhanced animations');
console.log('💫 Created with modern web technologies by Eng Mossad Salah');




