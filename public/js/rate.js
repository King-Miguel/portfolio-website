// ============================================
// PORTFOLIO RATING SYSTEM
// ============================================

const FORMSPREE_URL = 'https://formspree.io/f/maqronqj';
let selectedRating = 0;

// DOM Elements
const rateBtn = document.getElementById('ratePortfolioBtn');
const modalOverlay = document.getElementById('rateModalOverlay');
const modalClose = document.getElementById('rateModalClose');
const stars = document.querySelectorAll('.rate-star');
const rateLabel = document.getElementById('rateLabel');
const submitBtn = document.getElementById('rateSubmitBtn');
const feedbackInput = document.getElementById('rateFeedback');
const charCount = document.getElementById('rateCharCount');
const rateStatus = document.getElementById('rateStatus');
const thankyouOverlay = document.getElementById('rateThankyouOverlay');
const thankyouClose = document.getElementById('rateThankyouClose');

// Check if already rated
function hasAlreadyRated() {
    return localStorage.getItem('portfolio_rated') === 'true';
}

// Open modal
rateBtn.addEventListener('click', function() {
    if (hasAlreadyRated()) {
        // Show thank you directly
        document.getElementById('thankyouTitle').textContent = 'ALREADY RATED!';
        document.getElementById('thankyouMessage').textContent = 'The guild has already received thy rating, noble traveler.';
        thankyouOverlay.classList.add('active');
        return;
    }
    modalOverlay.classList.add('active');
    resetModal();
});

// Close modal
modalClose.addEventListener('click', function() {
    modalOverlay.classList.remove('active');
});

// Close on overlay click
modalOverlay.addEventListener('click', function(e) {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
    }
});

// Star hover/click
stars.forEach(star => {
    star.addEventListener('mouseenter', function() {
        const value = parseInt(this.dataset.value);
        highlightStars(value);
        updateLabel(value);
    });
    
    star.addEventListener('mouseleave', function() {
        highlightStars(selectedRating);
        if (selectedRating === 0) {
            rateLabel.textContent = 'Select thy rating...';
        } else {
            updateLabel(selectedRating);
        }
    });
    
    star.addEventListener('click', function() {
        selectedRating = parseInt(this.dataset.value);
        highlightStars(selectedRating);
        updateLabel(selectedRating);
        submitBtn.disabled = false;
    });
});

function highlightStars(count) {
    stars.forEach(star => {
        if (parseInt(star.dataset.value) <= count) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function updateLabel(value) {
    const labels = {
        1: 'Needs more training...',
        2: 'A promising squire',
        3: 'A worthy adventurer!',
        4: 'Nearly legendary!',
        5: 'TRULY LEGENDARY! 🏆'
    };
    rateLabel.textContent = labels[value] || 'Select thy rating...';
}

// Character counter
feedbackInput.addEventListener('input', function() {
    const length = this.value.length;
    charCount.textContent = `${length}/300`;
    if (length >= 280) {
        charCount.style.color = '#e53e3e';
    } else {
        charCount.style.color = '#888';
    }
});

// Submit rating
submitBtn.addEventListener('click', async function() {
    if (selectedRating === 0) return;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="material-symbols-outlined">hourglass</span> SENDING...';
    rateStatus.textContent = 'Dispatching carrier pigeon...';
    rateStatus.className = 'rate-status sending';
    
    const data = {
        rating: selectedRating,
        feedback: feedbackInput.value.trim() || 'No message left',
        timestamp: new Date().toISOString(),
        page: window.location.href
    };
    
    try {
        const response = await fetch(FORMSPREE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Success!
            localStorage.setItem('portfolio_rated', 'true');
            modalOverlay.classList.remove('active');
            
            document.getElementById('thankyouTitle').textContent = 'THE GUILD THANKS YOU!';
            
            const messages = {
                1: 'Thy honesty is noted. The knight shall train harder!',
                2: 'The squire appreciates thy feedback!',
                3: 'A worthy rating! The adventure continues!',
                4: 'High praise indeed! The knight is honored!',
                5: 'LEGENDARY! Thy words shall echo through the kingdom! 🏆'
            };
            document.getElementById('thankyouMessage').textContent = messages[selectedRating];
            
            thankyouOverlay.classList.add('active');
        } else {
            throw new Error('Formspree error');
        }
    } catch (error) {
        console.error('Rating submission failed:', error);
        rateStatus.textContent = '⚠️ Carrier pigeon lost! Try again.';
        rateStatus.className = 'rate-status error';
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined">send</span> SEAL & SEND RATING';
    }
});

// Close thank you
thankyouClose.addEventListener('click', function() {
    thankyouOverlay.classList.remove('active');
});

thankyouOverlay.addEventListener('click', function(e) {
    if (e.target === thankyouOverlay) {
        thankyouOverlay.classList.remove('active');
    }
});

// Reset modal
function resetModal() {
    selectedRating = 0;
    highlightStars(0);
    rateLabel.textContent = 'Select thy rating...';
    feedbackInput.value = '';
    charCount.textContent = '0/300';
    charCount.style.color = '#888';
    submitBtn.disabled = true;
    rateStatus.textContent = '';
    rateStatus.className = 'rate-status';
}

// Keyboard support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        modalOverlay.classList.remove('active');
        thankyouOverlay.classList.remove('active');
    }
});

console.log('⭐ Portfolio rating system ready!');