// ========================================
// Initialize AOS (Animate On Scroll)
// ========================================

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// ========================================
// Theme Toggle Functionality
// ========================================

const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-bs-theme', currentTheme);
updateThemeIcon(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    htmlElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

// Update theme icon
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('bi-moon-fill');
        themeIcon.classList.add('bi-sun-fill');
    } else {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-fill');
    }
}

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        }
    });
});

// ========================================
// Active Navigation Link on Scroll
// ========================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========================================
// Scroll Progress Indicator
// ========================================

// Create progress bar element
const progressContainer = document.createElement('div');
progressContainer.className = 'progress-container';
const progressBar = document.createElement('div');
progressBar.className = 'progress-bar-scroll';
progressContainer.appendChild(progressBar);
document.body.prepend(progressContainer);

// Update progress bar on scroll
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// ========================================
// Navbar Background on Scroll
// ========================================

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
    } else {
        navbar.classList.remove('shadow');
    }
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get the submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Disable button and show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';

    // Get form data
    const formData = new FormData(contactForm);

    try {
        // Send form data using fetch API to FormSubmit.co (free email forwarding service)
        const response = await fetch('https://formsubmit.co/ajax/abigaelwambui1@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Show success message
            showAlert('success', 'Message sent successfully! I\'ll get back to you soon.');
            // Reset form
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showAlert('danger', 'Failed to send message. Please try emailing me directly at abigaelwambui1@gmail.com');
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// Alert function
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(alertDiv);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ========================================
// Typing Effect for Hero Section
// ========================================

const typingText = document.querySelector('.hero-section h2');
if (typingText) {
    const originalText = typingText.textContent;
    typingText.textContent = '';

    let i = 0;
    const typeWriter = () => {
        if (i < originalText.length) {
            typingText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };

    // Start typing effect after page load
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// ========================================
// Skill Progress Bars (Optional Enhancement)
// ========================================

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = '0%';

        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 200);
    });
}

// Trigger skill bar animation when skills section is in view
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);
}

// ========================================
// Project Card Hover Effect
// ========================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    const loader = document.querySelector('.loading');
    if (loader) {
        loader.classList.add('fade-out');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }
});

// ========================================
// Lazy Loading for Images
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img.lazy');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ========================================
// Copy Email to Clipboard
// ========================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default email client to open
        // But also copy to clipboard for convenience
        const email = link.href.replace('mailto:', '');
        navigator.clipboard.writeText(email).then(() => {
            showAlert('info', 'Email address copied to clipboard!');
        });
    });
});

// ========================================
// Keyboard Navigation Enhancement
// ========================================

document.addEventListener('keydown', (e) => {
    // Press 'T' to toggle theme
    if (e.key.toLowerCase() === 't' && !e.ctrlKey && !e.metaKey) {
        const activeElement = document.activeElement;
        // Don't trigger if user is typing in an input
        if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
            themeToggle.click();
        }
    }
});

// ========================================
// Print Current Year in Footer
// ========================================

const yearElement = document.querySelector('footer p');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = yearElement.textContent.replace('2026', currentYear);
}

// ========================================
// Parallax Effect for Hero Section (Disabled to fix overlap issues)
// ========================================

// Commenting out parallax effect as it can cause section overlap
// window.addEventListener('scroll', () => {
//     const heroSection = document.querySelector('.hero-section');
//     if (heroSection) {
//         const scrolled = window.scrollY;
//         heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
//     }
// });

// ========================================
// Particle Animation System
// ========================================

function createParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // Check if particles container already exists
    if (heroSection.querySelector('.particles')) return;

    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';

    // Create 20 particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random positioning
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        // Random size
        const size = 2 + Math.random() * 4;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';

        particlesContainer.appendChild(particle);
    }

    heroSection.appendChild(particlesContainer);
}

// Initialize particles on load
window.addEventListener('load', createParticles);

// ========================================
// Smooth Scroll Reveal for Elements
// ========================================

function revealOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .project-card, .education-card, .info-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s ease-out';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => observer.observe(element));
}

// Initialize reveal on scroll
window.addEventListener('load', revealOnScroll);

// ========================================
// Console Message
// ========================================

console.log('%c👋 Welcome to Abigael\'s Portfolio!', 'color: #8b5cf6; font-size: 24px; font-weight: bold;');
console.log('%c💼 Looking for a Data Scientist? Let\'s connect!', 'color: #ec4899; font-size: 14px;');
console.log('%c🔗 GitHub: https://github.com/Prospeerous', 'color: #a78bfa; font-size: 12px;');
