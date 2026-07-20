// Contact Section - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('📧 Contact section loaded');
    
    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const statusElement = document.getElementById('formStatus');
            if (statusElement) {
                statusElement.style.display = 'block';
                statusElement.textContent = 'Dispatching messenger with your scroll...';
                statusElement.className = 'status-message';
                
                // Simulate form submission
                setTimeout(() => {
                    statusElement.textContent = 'Message delivered successfully! The knight will respond soon.';
                    statusElement.className = 'status-message status-success';
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Hide status after 5 seconds
                    setTimeout(() => {
                        statusElement.style.display = 'none';
                    }, 5000);
                }, 2000);
            }
        });
    }

    // Notice card interactions
    const noticeCards = document.querySelectorAll('.notice-card');
    const noticeModal = document.getElementById('noticeModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    const noticeDetails = {
        email: {
            title: "PIGEON POST",
            content: "Direct message delivery via electronic pigeon. Your message will be received promptly at: iggytesoro28@gmail.com"
        },
        location: {
            title: "KINGDOM REALM", 
            content: "The knight resides in the digital realm, with physical coordinates in Sariaya, Quezon Province. Available for quests throughout the Philippines and beyond."
        },
        social: {
            title: "GUILD TIES",
            content: "Allied with various coding guilds and digital realms. Connect through these channels for collaborations, quests, or technical discussions."
        }
    };

    noticeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                return;
            }
            
            e.preventDefault();
            const noticeType = this.getAttribute('data-notice');
            const details = noticeDetails[noticeType];
            
            if (details && modalTitle && modalContent) {
                modalTitle.textContent = details.title;
                modalContent.textContent = details.content;
                if (noticeModal) noticeModal.style.display = 'flex';
            }
        });
    });

    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (noticeModal) noticeModal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    if (noticeModal) {
        noticeModal.addEventListener('click', function(e) {
            if (e.target === noticeModal) {
                noticeModal.style.display = 'none';
            }
        });
    }

    // FIXED: Only pause knight when contact section is visible
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Contact section is visible - pause knight
                if (window.knightAnimation) {
                    window.knightAnimation.pause();
                    console.log('📧 Contact section active - knight paused');
                }
            } else {
                // Contact section NOT visible - resume knight
                if (window.knightAnimation) {
                    window.knightAnimation.resume();
                    console.log('📧 Left contact section - knight resumed');
                }
            }
        });
    }, { threshold: 0.3 });

    const contactSection = document.getElementById('contact');
    if (contactSection) {
        contactObserver.observe(contactSection);
    }
});