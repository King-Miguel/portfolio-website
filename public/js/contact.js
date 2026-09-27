// Contact Section - Formspree delivery + references modal
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact section loaded');

    // Same Formspree endpoint as the rating system (delivers to your inbox)
    const FORMSPREE_CONTACT_URL = 'https://formspree.io/f/maqronqj';

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const statusElement = document.getElementById('formStatus');
            const submitBtn = contactForm.querySelector('.send-scroll-btn');
            const name = (document.getElementById('contactName') || {}).value || '';
            const email = (document.getElementById('contactEmail') || {}).value || '';
            const message = (document.getElementById('contactMessage') || {}).value || '';

            if (!name.trim() || !email.trim() || !message.trim()) {
                if (statusElement) {
                    statusElement.style.display = 'block';
                    statusElement.textContent = 'Fill every field on the scroll first.';
                    statusElement.className = 'status-message status-error';
                }
                return;
            }

            if (statusElement) {
                statusElement.style.display = 'block';
                statusElement.textContent = 'Dispatching messenger with your scroll...';
                statusElement.className = 'status-message';
            }
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
            }

            try {
                const response = await fetch(FORMSPREE_CONTACT_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        email: email.trim(),
                        message: message.trim(),
                        _subject: 'Portfolio message scroll from ' + name.trim(),
                        source: 'portfolio-contact',
                        page: window.location.href
                    })
                });

                if (!response.ok) throw new Error('Formspree error');

                if (statusElement) {
                    statusElement.textContent = 'Message delivered! The knight will respond soon.';
                    statusElement.className = 'status-message status-success';
                }
                contactForm.reset();
            } catch (err) {
                console.error('Contact submit failed:', err);
                if (statusElement) {
                    statusElement.textContent = 'Carrier pigeon lost. Email iggytesoro123@gmail.com directly.';
                    statusElement.className = 'status-message status-error';
                }
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
                if (statusElement) {
                    setTimeout(function() {
                        statusElement.style.display = 'none';
                    }, 6000);
                }
            }
        });
    }

    // Notice cards (email / location still use simple modal)
    const noticeCards = document.querySelectorAll('.notice-card');
    const noticeModal = document.getElementById('noticeModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    const noticeDetails = {
        email: {
            title: 'PIGEON POST',
            content: 'Direct message delivery via electronic pigeon. Your message will be received promptly at: iggytesoro123@gmail.com'
        },
        location: {
            title: 'KINGDOM REALM',
            content: 'The knight resides in the digital realm, with physical coordinates in Sariaya, Quezon Province. Available for quests throughout the Philippines and beyond.'
        }
    };

    noticeCards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            const noticeType = this.getAttribute('data-notice');

            // References open dedicated modal
            if (noticeType === 'references') {
                e.preventDefault();
                const refs = document.getElementById('refsModal');
                if (refs) {
                    refs.classList.add('active');
                    refs.setAttribute('aria-hidden', 'false');
                }
                return;
            }

            if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
                return;
            }

            e.preventDefault();
            const details = noticeDetails[noticeType];
            if (details && modalTitle && modalContent) {
                modalTitle.textContent = details.title;
                modalContent.textContent = details.content;
                if (noticeModal) noticeModal.style.display = 'flex';
            }
        });
    });

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            if (noticeModal) noticeModal.style.display = 'none';
        });
    }

    if (noticeModal) {
        noticeModal.addEventListener('click', function(e) {
            if (e.target === noticeModal) noticeModal.style.display = 'none';
        });
    }

    // References modal close
    const refsModal = document.getElementById('refsModal');
    const refsClose = document.getElementById('refsModalClose');
    function closeRefs() {
        if (!refsModal) return;
        refsModal.classList.remove('active');
        refsModal.setAttribute('aria-hidden', 'true');
    }
    if (refsClose) refsClose.addEventListener('click', closeRefs);
    if (refsModal) {
        refsModal.addEventListener('click', function(e) {
            if (e.target === refsModal) closeRefs();
        });
    }
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeRefs();
            if (noticeModal) noticeModal.style.display = 'none';
        }
    });

    // Pause knight when contact visible
    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (!window.knightAnimation) return;
            if (entry.isIntersecting) window.knightAnimation.pause();
            else window.knightAnimation.resume();
        });
    }, { threshold: 0.3 });

    const contactSection = document.getElementById('contact');
    if (contactSection) contactObserver.observe(contactSection);
});
