document.addEventListener('DOMContentLoaded', () => {
    // AI Assistant functionality
    const aiAssistantBtn = document.getElementById('aiAssistantBtn');
    const aiAssistant = document.getElementById('aiAssistant');
    const aiClose = document.querySelector('.ai-close');
    const aiInput = document.querySelector('.ai-input input');
    const aiSend = document.querySelector('.ai-send');
    const aiMessages = document.querySelector('.ai-messages');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'ai-overlay';
    document.body.appendChild(overlay);

    // Toggle AI assistant visibility
    function toggleAI() {
        aiAssistant.classList.toggle('active');
        overlay.classList.toggle('active');
        if (aiAssistant.classList.contains('active')) {
            aiInput.focus();
        }
    }

    aiAssistantBtn.addEventListener('click', toggleAI);
    aiClose.addEventListener('click', toggleAI);
    overlay.addEventListener('click', toggleAI);

    // Handle AI message sending
    function sendMessage() {
        const message = aiInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            aiInput.value = '';

            // Simulate AI response (replace with actual AI integration)
            setTimeout(() => {
                const responses = [
                    "I understand your concern. Let me help you with that.",
                    "Based on the symptoms you've described, I recommend consulting a healthcare provider.",
                    "I can help you find the nearest healthcare facility. Would you like me to do that?",
                    "For emergency situations, please call the emergency hotline immediately.",
                    "I can provide general health information, but for specific medical advice, please consult a healthcare professional."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1000);
        }
    }

    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${sender}-message`;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <img src="images/sentry-logo.svg" alt="Sentry" class="sentry-logo">
                <div class="message-content">
                    <p>${text}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content user-message">
                    <p>${text}</p>
                </div>
            `;
        }
        
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    // Event listeners for sending messages
    aiSend.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Close AI assistant when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiAssistant.classList.contains('active')) {
            toggleAI();
        }
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        authButtons.classList.toggle('active');
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                authButtons.classList.remove('active');
            }
        });
    });

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const facility = document.getElementById('facility').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (!name || !email || !facility || !message) {
                showAlert('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Your message has been sent! We will contact you soon.', 'success');
            contactForm.reset();
        });
    }

    // Newsletter form
    const newsletterForm = document.querySelector('.footer-newsletter form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value.trim();
            
            if (!email || !isValidEmail(email)) {
                showAlert('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showAlert('Thank you for subscribing to our newsletter!', 'success');
            newsletterForm.reset();
        });
    }

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentSlide = 0;
        const slides = testimonialSlider.querySelectorAll('.testimonial-card');
        const totalSlides = slides.length;
        
        // Create navigation dots
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'slider-dots';
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.className = i === 0 ? 'dot active' : 'dot';
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        testimonialSlider.parentNode.appendChild(dotsContainer);
        
        // Auto slide
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlider();
        }
        
        function updateSlider() {
            // Update slides
            slides.forEach((slide, index) => {
                slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
            });
            
            // Update dots
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        // Initialize slider
        updateSlider();
    }

    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showAlert(message, type) {
        // Create alert element
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        
        // Add to DOM
        document.body.appendChild(alert);
        
        // Show alert
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        // Remove alert after 3 seconds
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    // Add CSS for alerts
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            z-index: 9999;
        }
        
        .alert.show {
            transform: translateX(0);
        }
        
        .alert-success {
            background-color: var(--success-color);
        }
        
        .alert-error {
            background-color: var(--danger-color);
        }
        
        .slider-dots {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        
        .dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--gray-300);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .dot.active {
            background-color: var(--primary-color);
        }
        
        .testimonial-slider {
            position: relative;
            overflow: hidden;
        }
        
        .testimonial-card {
            transition: transform 0.5s ease;
        }
    `;
    document.head.appendChild(style);

    // Settings modal functionality
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const settingsClose = document.getElementById('settingsClose');
    const settingsOverlay = document.getElementById('settingsOverlay');

    function openSettings() {
        settingsModal.classList.add('active');
    }
    function closeSettings() {
        settingsModal.classList.remove('active');
    }

    settingsBtn.addEventListener('click', openSettings);
    settingsClose.addEventListener('click', closeSettings);
    settingsOverlay.addEventListener('click', closeSettings);

    // Optional: Close settings with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && settingsModal.classList.contains('active')) {
            closeSettings();
        }
    });

    // Language switching logic
    const langBtns = document.querySelectorAll('.lang-btn');
    function setLanguage(lang) {
        document.body.classList.remove('lang-en', 'lang-hi');
        document.body.classList.add('lang-' + lang);
        langBtns.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    langBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            setLanguage(this.getAttribute('data-lang'));
        });
    });
    // Default to English on load
    setLanguage('en');
}); 