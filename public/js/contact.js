// Contact Section - Formspree delivery + notice/reference modals
document.addEventListener('DOMContentLoaded', function() {
    console.log('Contact section loaded');

    // Same Formspree endpoint as the rating system (email notifications go to your inbox)
    const FORMSPREE_CONTACT_URL = 'https://formspree.io/f/maqronqj';
    const CONTACT_EMAIL = 'iggytesoro123@gmail.com';

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
                    statusElement.textContent = 'Message delivered! Check your email notifications (Formspree). The knight will respond soon.';
                    statusElement.className = 'status-message status-success';
                }
                contactForm.reset();
            } catch (err) {
                console.error('Contact submit failed:', err);
                if (statusElement) {
                    statusElement.textContent = 'Carrier pigeon lost. Email ' + CONTACT_EMAIL + ' directly.';
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
                    }, 7000);
                }
            }
        });
    }

    // Notice modal (scoped unique IDs - no clash with certificate modal)
    const noticeModal = document.getElementById('noticeModal');
    const noticeClose = document.getElementById('noticeModalClose');
    const noticeTitle = document.getElementById('noticeModalTitle');
    const noticeContent = document.getElementById('noticeModalContent');
    const noticeAction = document.getElementById('noticeModalAction');
    const noticeIcon = document.getElementById('noticeModalIcon');
    const noticeCards = document.querySelectorAll('.notice-card[data-notice]');

    const noticeDetails = {
        email: {
            title: 'PIGEON POST',
            icon: 'flutter_dash',
            content: 'Write me directly at ' + CONTACT_EMAIL + ' or call 0956 960 9285. You can also use the message scroll on the left (Formspree) or the LinkedIn scroll on the board.',
            actionHref: 'mailto:' + CONTACT_EMAIL + '?subject=Hello%20from%20your%20portfolio',
            actionLabel: 'OPEN MAIL APP'
        },
        location: {
            title: 'KINGDOM REALM',
            icon: 'map',
            content: 'Based in Sariaya, Quezon Province, Philippines. Open to local and remote quests (internships, freelance, and full-time roles).',
            actionHref: null,
            actionLabel: null
        }
    };

    function openNotice(type) {
        const details = noticeDetails[type];
        if (!details || !noticeModal) return;

        if (noticeTitle) noticeTitle.textContent = details.title;
        if (noticeContent) noticeContent.textContent = details.content;
        if (noticeIcon) noticeIcon.textContent = details.icon || 'info';

        if (noticeAction) {
            if (details.actionHref) {
                noticeAction.href = details.actionHref;
                noticeAction.textContent = details.actionLabel || 'OPEN LINK';
                noticeAction.style.display = 'inline-flex';
            } else {
                noticeAction.removeAttribute('href');
                noticeAction.style.display = 'none';
            }
        }

        noticeModal.classList.add('active');
        noticeModal.style.display = 'flex';
        noticeModal.setAttribute('aria-hidden', 'false');
    }

    function closeNotice() {
        if (!noticeModal) return;
        noticeModal.classList.remove('active');
        noticeModal.style.display = 'none';
        noticeModal.setAttribute('aria-hidden', 'true');
    }

    noticeCards.forEach(function(card) {
        function handleOpen(e) {
            const noticeType = card.getAttribute('data-notice');
            if (noticeType === 'references') {
                e.preventDefault();
                const refs = document.getElementById('refsModal');
                if (refs) {
                    refs.classList.add('active');
                    refs.setAttribute('aria-hidden', 'false');
                }
                return;
            }
            // Phone / LinkedIn use real hrefs - let the browser handle them
            if (noticeType === 'phone' || noticeType === 'linkedin') {
                return;
            }
            if (noticeType === 'email' || noticeType === 'location') {
                e.preventDefault();
                openNotice(noticeType);
            }
        }
        card.addEventListener('click', handleOpen);
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpen(e);
            }
        });
    });

    if (noticeClose) noticeClose.addEventListener('click', closeNotice);
    if (noticeModal) {
        noticeModal.addEventListener('click', function(e) {
            if (e.target === noticeModal) closeNotice();
        });
    }

    // References modal
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
        if (e.key !== 'Escape') return;
        closeNotice();
        closeRefs();
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
