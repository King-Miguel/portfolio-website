document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio animations loaded! 🎮');

    // Sidebar navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section');


    // FIXED: HIDE ALL CONTENT INITIALLY
    function hideAllContentInitially() {
        sections.forEach(section => {
            const elements = section.querySelectorAll('h1, h2, h3, p, .pixel-border, .skill-bar, .timeline-milestone, .quest-card, .stat-card, .character-stats, .adventure-log');
            
            elements.forEach(element => {
                // HIDE elements initially (not just opacity 0, but also prevent layout shift)
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.visibility = 'hidden'; // This prevents flicker
                element.style.transition = 'none'; // No transition initially
            });
        });
    }

    // Call this immediately on page load
    hideAllContentInitially();

    // FIXED: Initialize animations only when sections come into view
    function initAllAnimations() {
        sections.forEach(section => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateSection(entry.target);
                        observer.disconnect();
                    }
                });
            }, { 
                threshold: 0.3, // 30% visible
                rootMargin: '50px' // Add some margin to trigger slightly before
            });

            observer.observe(section);
        });
    }

    function animateSection(section) {
        const elements = section.querySelectorAll('h1, h2, h3, p, .pixel-border, .skill-bar, .timeline-milestone, .quest-card, .stat-card, .character-stats, .adventure-log');
        
        elements.forEach((element, index) => {
            // Make element visible but still transparent
            element.style.visibility = 'visible';
            
            // Staggered fade-in
            setTimeout(() => {
                element.style.transition = 'all 0.6s ease';
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                
                // Special animations for specific elements
                if (element.classList.contains('progress-bar-fill')) {
                    animateProgressBar(element);
                }
                if (element.classList.contains('skill-percent')) {
                    animatePercentage(element);
                }
            }, index * 100); // Stagger delay
        });
    }

    function animateProgressBar(bar) {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';
        bar.style.transition = 'width 1s ease-in-out, box-shadow 0.3s ease';
        
        setTimeout(() => {
            bar.style.width = targetWidth;
            
            // Add glow when complete
            setTimeout(() => {
                bar.style.boxShadow = '0 0 10px currentColor, 0 0 20px currentColor';
            }, 1000);
        }, 200);
    }

    function animatePercentage(element) {
        const targetText = element.textContent;
        const targetPercentage = parseInt(targetText);
        let current = 0;
        const duration = 1000;
        const steps = 20;
        const increment = targetPercentage / steps;
        const stepTime = duration / steps;
        
        element.textContent = '0%';
        element.style.opacity = '1';
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= targetPercentage) {
                current = targetPercentage;
                clearInterval(counter);
                element.textContent = targetText;
            } else {
                element.textContent = Math.round(current) + '%';
            }
        }, stepTime);
    }
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href;
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    // Add global animation styles
    const style = document.createElement('style');
    style.textContent = `
        /* FIXED: Ensure sections are properly hidden initially */
        section {
            opacity: 1 !important;
            position: relative;
        }
        
        /* FIXED: Hide all animated elements until triggered */
        .section-content {
            opacity: 1;
            transition: opacity 0.3s ease;
        }
        
        .progress-bar-fill {
            transition: width 1s ease-in-out, box-shadow 0.3s ease !important;
        }
        
        .progress-bar-fill[style*="width: 85%"] {
            background: #228B22 !important;
            box-shadow: 0 0 10px #228B22, 0 0 20px #32CD32 !important;
        }
        
        .progress-bar-fill[style*="width: 75%"] {
            background: #228B22 !important;
            box-shadow: 0 0 10px #228B22, 0 0 20px #32CD32 !important;
        }
        
        .progress-bar-fill[style*="width: 70%"] {
            background: #228B22 !important;
            box-shadow: 0 0 10px #228B22, 0 0 20px #32CD32 !important;
        }
        
        .progress-bar-fill[style*="width: 40%"] {
            background: linear-gradient(90deg, #FFD700, #FFA500) !important;
            box-shadow: 0 0 10px #FFD700, 0 0 20px #FFA500 !important;
        }
        
        /* Hover effects */
        .quest-card:hover,
        .timeline-milestone:hover,
        .stat-card:hover {
            transform: translateY(-5px) !important;
            transition: all 0.3s ease !important;
        }
        
        .nav-item:hover {
            background-color: rgba(105, 105, 105, 0.5) !important;
        }
        
        /* FIXED: Prevent visible flash before animation */
        [data-animated="false"] {
            visibility: hidden !important;
        }
    `;
    document.head.appendChild(style);

    // Initialize all animations AFTER page loads
    setTimeout(() => {
        initAllAnimations();
    }, 100); // Small delay to ensure DOM is ready

    // REST OF YOUR EXISTING FUNCTIONALITY (unchanged)
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }

    // Smooth scroll to section
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });



    // Pagination functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const pageIndicators = document.querySelectorAll('.page-indicator');
    const logPages = document.querySelectorAll('.log-page');
    let currentPage = 1;

    function showPage(pageNumber) {
        logPages.forEach(page => page.classList.remove('active'));
        const targetPage = document.getElementById(`page${pageNumber}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
        
        pageIndicators.forEach(indicator => indicator.classList.remove('active'));
        const activeIndicator = document.querySelector(`.page-indicator[data-page="${pageNumber}"]`);
        if (activeIndicator) activeIndicator.classList.add('active');
        
        currentPage = pageNumber;
        
        if (prevBtn) prevBtn.disabled = pageNumber === 1;
        if (nextBtn) nextBtn.disabled = pageNumber === logPages.length;
        
        if (pageNumber === 3) setTimeout(initRadarChart, 100);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentPage < logPages.length) showPage(currentPage + 1);
        });
    }

    if (pageIndicators.length > 0) {
        pageIndicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const pageNumber = parseInt(this.getAttribute('data-page'));
                showPage(pageNumber);
            });
        });
    }

    function initRadarChart() {
        const canvas = document.getElementById('statsRadar');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        drawPixelRadar(ctx);
    }

    function drawPixelRadar(ctx) {
        const centerX = 125, centerY = 125, radius = 80, numPoints = 7;
        const stats = {
            labels: ['CODING', 'FRONT-END', 'BACK-END', 'PROBLEM', 'DESIGN', 'LEARNING', 'DEBUG'],
            values: [71, 80, 65, 85, 72, 90, 80]
        };
        
        ctx.clearRect(0, 0, 250, 250);
        
        // Draw grid
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 2;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * i / 5, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw axes and labels
        ctx.lineWidth = 1;
        for (let i = 0; i < numPoints; i++) {
            const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            const labelX = centerX + Math.cos(angle) * (radius + 15);
            const labelY = centerY + Math.sin(angle) * (radius + 15);
            ctx.fillStyle = '#8B4513';
            ctx.font = '5px "Press Start 2P"';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(stats.labels[i], labelX, labelY);
        }
        
        // Draw data polygon
        ctx.fillStyle = 'rgba(107, 28, 156, 0.3)';
        ctx.strokeStyle = '#6b1c9c';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < numPoints; i++) {
            const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
            const value = stats.values[i] / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Draw points
        for (let i = 0; i < numPoints; i++) {
            const angle = (Math.PI * 2 * i) / numPoints - Math.PI / 2;
            const value = stats.values[i] / 100;
            const x = centerX + Math.cos(angle) * radius * value;
            const y = centerY + Math.sin(angle) * radius * value;
            ctx.fillStyle = '#FFD700';
            ctx.fillRect(x - 3, y - 3, 6, 6);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(x - 3, y - 3, 6, 6);
        }
    }

    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);

    // Initialize
    updateActiveNav();
    showPage(1);
});