document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');

    if (mobileMenuBtn && sidebar) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            mobileMenuBtn.innerHTML = sidebar.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // Scroll to element
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // In a real application, you would send this to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Animate skill bars on scroll
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-level');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }

    // Initialize animations when skills section is in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Update active navigation link on scroll
    function updateActiveNav() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('bg-accent-blue', 'text-white');
            if (link.getAttribute('href') === currentSection) {
                link.classList.add('bg-accent-blue', 'text-white');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Initial call
});

// Global functions that need to be accessible from HTML attributes (onclick)
function downloadCV() {
    // Create a simple PDF download (in real implementation, this would link to an actual PDF)
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'Amir_Shemsu_CV.pdf';
    link.click();
    
    // Show message
    const originalText = event.target.innerHTML;
    event.target.innerHTML = '<i class="fas fa-check mr-2"></i> CV Downloaded!';
    event.target.classList.add('bg-green-600');
    
    setTimeout(() => {
        event.target.innerHTML = originalText;
        event.target.classList.remove('bg-green-600');
    }, 2000);
}

function copyEmail() {
    navigator.clipboard.writeText('amishashems@gmail.com').then(() => {
        alert('Email copied to clipboard!');
    });
}

function toggleContactInfo() {
    const contactList = document.getElementById('contact-list');
    const toggleButton = document.getElementById('contact-toggle-btn');
    
    if (contactList && toggleButton) {
        if (contactList.style.display === 'none') {
            contactList.style.display = 'block';
            toggleButton.textContent = 'Hide Contact';
        } else {
            contactList.style.display = 'none';
            toggleButton.textContent = 'Show Contact';
        }
    }
}
