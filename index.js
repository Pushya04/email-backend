// Portfolio JavaScript - Enhanced Interactive Features
// Author: Pushyamithra
// Version: 2.0

document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== INITIALIZATION ====================
    console.log('🚀 Portfolio loaded successfully!');
    
    // Initialize all features
    initSmoothScrolling();
    initTypingAnimation();
    initCounterAnimation();
    initSkillsPositioning();
    initSkillTooltip();
    initProjectFiltering();
    initScrollAnimations();
    initScrollSpy();
    initContactForm();
    initFloatingParticles();
    initHeaderScrollEffect();
    initPreloader();


    // ==================== SMOOTH SCROLLING ====================
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link, .footer-link, .btn[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Check if it's an internal link
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Update active nav link
                        updateActiveNavLink(href);
                    }
                }
            });
        });
    }

    // ==================== ACTIVE NAV LINK UPDATE ====================
    function updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });
    }

    // ==================== SCROLL SPY ====================
    function initScrollSpy() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ==================== TYPING ANIMATION ====================
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (!typingElement) return;
    
        const text = 'Pushyamithra';
    
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTyping();
                }
            });
        }, {
            threshold: 0.5,
        });
    
        observer.observe(document.querySelector('.hero-section'));
    
        function startTyping() {
            let index = 0;
            typingElement.classList.remove('typing-complete');
            typingElement.textContent = '';
    
            function typeWriter() {
                if (index < text.length) {
                    typingElement.textContent += text.charAt(index);
                    index++;
                    setTimeout(typeWriter, 120);
                } else {
                    setTimeout(() => {
                        typingElement.classList.add('typing-complete');
                    }, 500);
                }
            }
    
            typeWriter();
        }
    }    

    // ==================== COUNTER ANIMATION ====================
    function initCounterAnimation() {
        const counters = document.querySelectorAll('.stat-number[data-target]');
        
        const observerOptions = {
            threshold: 0.7,
            rootMargin: '0px 0px -50px 0px'
        };

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    counter.textContent = '0';
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ==================== SKILLS RING POSITIONING ====================
    // In index.js, replace the existing initSkillsPositioning function
function initSkillsPositioning() {
    const ring = document.querySelector('.skills-ring');
    if (!ring) return;
    const skillIcons = ring.querySelectorAll('.skill-icon');
    if (skillIcons.length === 0) return;

    function positionIcons() {
        const ringRect = ring.getBoundingClientRect();
        const ringWidth = ringRect.width;
        const ringHeight = ringRect.height;
        const centerX = ringWidth / 2;
        const centerY = ringHeight / 2;

        // Get icon size from CSS variable --icon-size
        const iconSize = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--icon-size'));
        // Set radius to fit icons inside the ring, with a small margin
        const radius = Math.min(centerX, centerY) - (iconSize / 2) - 10;

        skillIcons.forEach((icon, index) => {
            const angle = (index / skillIcons.length) * 2 * Math.PI;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
            icon.style.transform = 'translate(-50%, -50%)'; // Center the icon at the calculated position
            icon.style.animationDelay = `${index * 0.1}s`; // Retain staggered animation
        });
    }

    // Initial positioning
    positionIcons();

    // Update positions on resize
    window.addEventListener('resize', debounce(positionIcons, 200));
}

    // ==================== SKILL TOOLTIP ====================
    function initSkillTooltip() {
        const skillIcons = document.querySelectorAll('.skill-icon');
        let tooltip = document.getElementById('skillTooltip');
        
        // Create tooltip if it doesn't exist
        if (!tooltip) {
            tooltip = document.createElement('div');
            tooltip.id = 'skillTooltip';
            tooltip.className = 'skill-tooltip';
            document.body.appendChild(tooltip);
        }

        skillIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function(e) {
                const skillName = this.getAttribute('data-skill');
                if (skillName) {
                    tooltip.textContent = skillName;
                    tooltip.style.opacity = '1';
                    tooltip.style.pointerEvents = 'none';
                }
            });
            
            icon.addEventListener('mousemove', function(e) {
                tooltip.style.left = `${e.clientX + 10}px`;
                tooltip.style.top = `${e.clientY - 30}px`;
            });
            
            icon.addEventListener('mouseleave', function() {
                tooltip.style.opacity = '0';
            });
        });
    }

    // ==================== PROJECT FILTERING ====================
    function initProjectFiltering() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const projectItems = document.querySelectorAll('.work-item');
        
        if (categoryBtns.length === 0 || projectItems.length === 0) return;
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Filter projects with staggered animation
                projectItems.forEach((item, index) => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    setTimeout(() => {
                        if (category === 'all' || itemCategory === category) {
                            item.style.display = 'block';
                            item.classList.remove('hide');
                            item.classList.add('show');
                        } else {
                            item.classList.remove('show');
                            item.classList.add('hide');
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    }, index * 50);
                });
            });
        });
    }

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.process-step, .contact-section, .about-section, .about-content, .work-item');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // About section animation
                if (entry.target.classList.contains('about-content')) {
                    const aboutText = entry.target.querySelector('.about-text');
                    const aboutImage = entry.target.querySelector('.about-image');
                    
                    aboutText.style.animation = 'fade-in-left 0.8s ease-out forwards';
                    aboutImage.style.animation = 'fade-in-right 0.8s ease-out forwards';
                }
                //
                if (entry.target.classList.contains('contact-section')) {
                    entry.target.style.animation = 'fade-scale-in 0.8s ease-out forwards';
                }
                // Featured Projects animation
                if (entry.target.classList.contains('work-item')) {
                    entry.target.style.animation = 'fade-in-up 0.8s ease-out forwards';
                }
                //
                if (entry.target.classList.contains('process-step')) {
                    entry.target.style.animation = 'slide-up-delay 0.7s ease-out forwards';
                    entry.target.style.animationDelay = '0.1s';
                }
                

                // ❌ REMOVE THIS LINE TO ALLOW RE-ANIMATION:
                // scrollObserver.unobserve(entry.target);
            } else {
                // Reset animation on scroll out
                entry.target.classList.remove('revealed');
                entry.target.style.animation = 'none';

                if (entry.target.classList.contains('about-content')) {
                    const aboutText = entry.target.querySelector('.about-text');
                    const aboutImage = entry.target.querySelector('.about-image');
                    aboutText.style.animation = 'none';
                    aboutImage.style.animation = 'none';
                }
                //
                if (entry.target.classList.contains('contact-section')) {
                    entry.target.style.animation = 'none';
                }

                if (entry.target.classList.contains('work-item')) {
                    entry.target.style.animation = 'none';
                }
                //
                if (entry.target.classList.contains('process-step')) {
                    entry.target.style.animation = 'none';
                }                
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

    // ==================== FLOATING PARTICLES ====================
    function initFloatingParticles() {
        const particlesContainer = document.querySelector('.particles');
        if (!particlesContainer) return;

        // Create additional particles dynamically
        for (let i = 5; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.width = `${Math.random() * 4 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.animationDelay = `${Math.random() * 20}s`;
            particle.style.animationDuration = `${Math.random() * 15 + 20}s`;
            particlesContainer.appendChild(particle);
        }
    }

    // ==================== HEADER SCROLL EFFECT ====================
    function initHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Hide/show header on scroll
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ==================== CONTACT FORM ====================
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        if (!contactForm) return;
      
        contactForm.addEventListener('submit', async function (e) {
          e.preventDefault();
      
          const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
          };
      
          const submitBtn = this.querySelector('.send-btn');
          const originalText = submitBtn.innerHTML;
          submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
          submitBtn.disabled = true;
      
          try {
            const response = await fetch("https://email-backend-b1q5.onrender.com/send-message", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(formData)
            });
      
            const result = await response.json();
      
            if (result.success) {
              showSuccessMessage();
              contactForm.reset();
            } else {
              alert("❌ Failed to send: " + result.message);
            }
      
          } catch (error) {
            alert("❌ An error occurred: " + error.message);
          } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
          }
        });
      
        const inputs = contactForm.querySelectorAll("input, textarea");
        inputs.forEach((input) => {
          input.addEventListener("blur", validateInput);
          input.addEventListener("input", clearValidation);
        });
      }
      
    // ==================== FORM VALIDATION ====================
    function validateInput(e) {
        const input = e.target;
        const value = input.value.trim();
        
        // Remove existing validation classes
        input.classList.remove('error', 'success');
        
        // Validate based on input type
        let isValid = false;
        
        switch(input.type) {
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                break;
            case 'text':
                isValid = value.length >= 2;
                break;
            default:
                isValid = value.length > 0;
        }
        
        if (!isValid) {
            input.classList.add('error');
        } else {
            input.classList.add('success');
        }    }

    function clearValidation(e) {
        e.target.classList.remove('error', 'success');
    }

    function showSuccessMessage() {
        // Create success message
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message show';
        successDiv.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! I\'ll get back to you soon.';
        
        const contactForm = document.getElementById('contactForm');
        contactForm.appendChild(successDiv);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }



    // ==================== PERFORMANCE OPTIMIZATIONS ====================
    
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
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

    lazyImages.forEach(img => imageObserver.observe(img));

    // ==================== SCROLL TO TOP BUTTON ====================
    function initScrollToTop() {
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (!scrollTopBtn) return;

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==================== EASTER EGG ====================
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', (e) => {
        konamiCode.push(e.keyCode);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Add some fun animation or message
        const body = document.body;
        body.style.animation = 'rainbow 2s infinite';
        
        setTimeout(() => {
            body.style.animation = '';
        }, 5000);
        
        console.log('🎉 Easter egg activated! You found the secret code!');
    }

    // ==================== INITIALIZATION COMPLETE ====================
    console.log('✅ All portfolio features initialized successfully!');
    
    // Initialize scroll spy
    initScrollSpy();
    initScrollToTop();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .typing-complete::after {
            animation: blink 1s infinite;
        }
        
        header.scrolled {
            background: rgba(10, 14, 19, 0.98);
            backdrop-filter: blur(20px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-link.active {
            color: var(--primary-color);
        }
        
        .nav-link.active::after {
            width: 100%;
        }
        
        input.error, textarea.error {
            border-color: #ff6b6b;
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
        }
        
        input.success, textarea.success {
            border-color: #51cf66;
            box-shadow: 0 0 0 3px rgba(81, 207, 102, 0.1);
        }
    `;
    document.head.appendChild(style);
    
});

// ==================== UTILITY FUNCTIONS ====================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("service-worker.js")
        .then(registration => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch(error => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
  