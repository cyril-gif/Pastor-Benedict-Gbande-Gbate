// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Newsletter Form Submission
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // In a real application, you would send this to your server
                alert(Thank you for subscribing with: ${email});
                this.reset();
            }
        });
    }
    
    // Prayer Request Form
    const prayerForm = document.getElementById('prayerForm');
    if (prayerForm) {
        prayerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                request: this.querySelector('#request').value,
                privacy: this.querySelector('#privacy').checked
            };
            
            // Validate
            if (!formData.privacy) {
                alert('Please agree to the privacy policy');
                return;
            }
            
            // Show success message
            alert('Thank you for your prayer request. We will pray for you!');
            this.reset();
            
            // In a real app, you would send this to a server
            console.log('Prayer Request:', formData);
        });
    }
    
    // Event Countdown Timer
    function updateCountdown() {
        const countdownElement = document.querySelector('.countdown');
        if (!countdownElement) return;
        
        const eventDate = new Date('2024-12-25T10:00:00').getTime();
        const now = new Date().getTime();
        const timeLeft = eventDate - now;
        
        if (timeLeft < 0) {
            countdownElement.innerHTML = 'Event has started!';
            return;
        }
        
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `
            <div class="time-unit">
                <span class="number">${days}</span>
                <span class="label">Days</span>
            </div>
            <div class="time-unit">
                <span class="number">${hours}</span>
                <span class="label">Hours</span>
            </div>
            <div class="time-unit">
                <span class="number">${minutes}</span>
                <span class="label">Minutes</span>
            </div>
            <div class="time-unit">
                <span class="number">${seconds}</span>
                <span class="label">Seconds</span>
            </div>
        `;
    }
    
    // Update countdown every second
    setInterval(updateCountdown, 1000);
    updateCountdown();
    
    // Add active class to current page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksAll = document.querySelectorAll('.nav-menu a');
    
    navLinksAll.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage.includes(linkPage.replace('.html', '')) && linkPage !== '#')) {
            link.classList.add('active');
        }
    });
});

// Form validation for contact forms
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                input.style.borderColor = 'red';
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// Image lazy loading
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});