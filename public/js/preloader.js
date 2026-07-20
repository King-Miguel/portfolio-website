// preloader.js - FIXED VERSION WITH PROPER FALLBACKS
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎮 PRELOADER LOADED - CHECKING FIRST VISIT');
    
    const preloader = document.getElementById('preloader');
    const welcomeScreen = document.getElementById('welcomeScreen');
    const loadingScreen = document.getElementById('loadingScreen');
    const startButton = document.getElementById('startButton');
    const loadingBar = document.getElementById('loadingBar');
    const forgeStatus = document.querySelector('.forge-status');
    const appContainer = document.querySelector('.app-container');
    
    // IMPORTANT FIX: Make sure preloader is visible on first visit
    if (preloader) {
        preloader.style.display = 'flex'; // Ensure it's visible
        preloader.style.opacity = '1';
        preloader.style.visibility = 'visible';
        preloader.style.zIndex = '9999'; // Ensure it's on top
    }
    
    // Safety check - if elements missing, show portfolio immediately
    if (!preloader || !startButton) {
        console.error('Preloader elements missing! Showing portfolio directly.');
        if (appContainer) {
            appContainer.style.display = 'block';
            appContainer.style.opacity = '1';
        }
        return;
    }
    
    // Check if user has visited before
    const hasVisitedBefore = localStorage.getItem('portfolioVisited');
    
    // Debug: Log what localStorage contains
    console.log('LocalStorage portfolioVisited:', hasVisitedBefore);
    
    // If user has visited before, SKIP PRELOADER entirely
    if (hasVisitedBefore === 'true') {
        console.log('👋 Welcome back! Skipping preloader...');
        preloader.style.display = 'none';
        if (appContainer) {
            appContainer.style.display = 'block';
            appContainer.style.opacity = '1';
        }
        return; // Exit early, no preloader shown
    }
    
    console.log('🎉 First time visitor! Showing epic preloader...');
    
    // Initial state for first-time visitors
    if (welcomeScreen) {
        welcomeScreen.style.display = 'flex';
        welcomeScreen.style.opacity = '1';
    }
    if (loadingScreen) loadingScreen.style.display = 'none';
    if (appContainer) {
        appContainer.style.display = 'none';
        appContainer.style.opacity = '0';
    }
    

 // Hide button initially, reveal after text animation completes (3.8s)
if (startButton) {
    console.log('✅ Start button found — will reveal after text animation');
    startButton.style.visibility = 'hidden';
    startButton.style.opacity = '0';
    startButton.disabled = false;
    
    // Reveal button after text animation finishes
    setTimeout(() => {
        startButton.style.visibility = 'visible';
        startButton.style.opacity = '1';
        startButton.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        console.log('✨ Start button revealed!');
    }, 3800);
}
    // Global knight flag with safety timeout
    window.isKnightLoaded = false;
    
    // Start loading when button is clicked
    if (startButton) {
        startButton.addEventListener('click', function(e) {
            console.log('✅ Start button clicked! Manual start initiated.');
            e.preventDefault();
            e.stopPropagation();
            
            // Disable button to prevent multiple clicks
            startButton.disabled = true;
            startButton.style.opacity = '0.7';
            startButton.style.cursor = 'not-allowed';
            startButton.style.pointerEvents = 'none';
            
            if (welcomeScreen) {
                welcomeScreen.style.display = 'none';
                welcomeScreen.style.opacity = '0';
            }
            if (loadingScreen) {
                loadingScreen.style.display = 'flex';
                loadingScreen.style.opacity = '1';
            }
            
            startLoading();
        });
        
        // Also add mousedown and touchstart for mobile support
        startButton.addEventListener('mousedown', function(e) {
            console.log('Mouse down on button');
        });
        
        startButton.addEventListener('touchstart', function(e) {
            console.log('Touch start on button');
            e.preventDefault(); // Prevent double-tap zoom on mobile
        });
    } else {
        console.error('❌ Start button not found for event listener!');
    }
    
    function startLoading() {
        let progress = 0;
        let knightCheckStarted = false;
        let knightLoaded = false;
        
        function updateStatus(message, currentProgress) {
            if (forgeStatus) {
                forgeStatus.textContent = message;
            }
            if (loadingBar) {
                loadingBar.style.width = `${currentProgress}%`;
            }
            console.log(`Loading: ${message} (${currentProgress}%)`);
        }
        
        const loadingInterval = setInterval(() => {
            // Smooth progress increase
            progress += Math.random() * 8 + 2; // 2-10% per interval
            if (progress > 100) progress = 100;
            
            // Update status messages
            if (progress < 25) {
                updateStatus('Initializing portfolio realm...', progress);
            } else if (progress < 50) {
                updateStatus('Loading adventure components...', progress);
            } else if (progress < 75) {
                updateStatus('Preparing knight model...', progress);
                
                // Start checking for knight when we reach 60%
                if (progress >= 60 && !knightCheckStarted) {
                    knightCheckStarted = true;
                    checkKnightLoaded();
                }
            } else if (progress < 90) {
                updateStatus('Finalizing quest data...', progress);
            } else if (progress < 100) {
                updateStatus('Almost ready for adventure...', progress);
            }
            
            // Complete at 100% regardless of knight status
            if (progress >= 100) {
                clearInterval(loadingInterval);
                updateStatus('Adventure awaits! Entering realm...', 100);
                
                // Force knight as loaded if it's taking too long
                if (!knightLoaded) {
                    console.log('⚡ Knight not loaded, forcing completion');
                    knightLoaded = true;
                    window.isKnightLoaded = true;
                }
                
                setTimeout(completeLoading, 800);
            }
        }, 150);
        
        function checkKnightLoaded() {
            console.log('🔄 Checking knight status...');
            
            // If knight.js already set the flag, we're good
            if (window.isKnightLoaded) {
                console.log('✅ Knight already loaded!');
                knightLoaded = true;
                return;
            }
            
            const knightCheck = setInterval(() => {
                if (window.isKnightLoaded) {
                    console.log('✅ Knight loaded successfully!');
                    knightLoaded = true;
                    clearInterval(knightCheck);
                }
            }, 300);
            
            // Safety timeout - don't wait forever for the knight
            setTimeout(() => {
                if (!window.isKnightLoaded) {
                    console.log('⏰ Knight timeout - proceeding without 3D model');
                    clearInterval(knightCheck);
                    knightLoaded = true; // Mark as loaded anyway
                    window.isKnightLoaded = true; // Set global flag
                }
            }, 4000); // 4 second timeout
        }
        
        function completeLoading() {
            console.log('✅ Loading complete! Activating epic glow...');
            
            // Add the epic glow effect to loading bar
            if (loadingBar) {
                loadingBar.classList.add('preloader-complete');
                if (loadingBar.parentElement) {
                    loadingBar.parentElement.classList.add('preloader-complete');
                }
            }
            
            // Update status with celebration message
            if (forgeStatus) {
                forgeStatus.textContent = 'REALM READY! ENTERING NOW...';
                forgeStatus.style.color = '#FFD700';
                forgeStatus.style.textShadow = '0 0 10px #FFD700';
            }
            
            // MARK USER AS HAVING VISITED
            localStorage.setItem('portfolioVisited', 'true');
            console.log('📝 User marked as returning visitor');
            
            // Wait a moment to let the user enjoy the glow, then proceed
            setTimeout(() => {
                if (preloader) {
                    preloader.style.opacity = '0';
                    preloader.style.transition = 'opacity 0.8s ease';
                }
                
                setTimeout(() => {
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                    
                    // Show main content
                    if (appContainer) {
                        appContainer.style.display = 'block';
                        appContainer.style.opacity = '1';
                        console.log('🎉 Portfolio realm fully loaded!');
                    }
                }, 800);
            }, 1500);
        }
    }
    
    // DEBUG: Add a test click handler to see if button works
    console.log('Adding debug click handler');
    startButton.addEventListener('click', function() {
        console.log('DEBUG: Button clicked successfully!');
    }, { once: true });
});

// Add this safety function to handle any errors
window.addEventListener('error', function(e) {
    console.error('Global error caught:', e.error);
    
    // If there's an error and preloader is stuck, try to show portfolio
    const preloader = document.getElementById('preloader');
    const appContainer = document.querySelector('.app-container');
    
    if (preloader && preloader.style.display !== 'none' && appContainer) {
        console.log('🚨 Error detected, forcing portfolio display');
        setTimeout(() => {
            preloader.style.display = 'none';
            appContainer.style.display = 'block';
            localStorage.setItem('portfolioVisited', 'true');
        }, 1000);
    }
});



// Secret command to reset preloader
window.resetPreloader = function() {
    localStorage.removeItem('portfolioVisited');
    console.log('🏰 Preloader reset! Refreshing...');
    location.reload();
};

console.log('💡 Dev tip: Type resetPreloader() in console to replay the intro!');