// map.js - Fantasy Map Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('🗺️ Fantasy Map loaded!');
    
    const mapModal = document.getElementById('mapModal');
    const viewMapBtn = document.getElementById('viewMapBtn');
    const closeMap = document.getElementById('closeMap');
    const mapLocations = document.querySelectorAll('.location-label');
    
    // Open map modal when "View Map" button is clicked
    if (viewMapBtn) {
        viewMapBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('🗺️ Opening fantasy map...');
            mapModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close map modal
    if (closeMap) {
        closeMap.addEventListener('click', function() {
            console.log('🗺️ Closing fantasy map...');
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Close modal when clicking outside the map container
    mapModal.addEventListener('click', function(e) {
        if (e.target === mapModal) {
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Location click functionality
    mapLocations.forEach(location => {
        location.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Close modal
                mapModal.classList.remove('active');
                document.body.style.overflow = '';
                
                // Smooth scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mapModal.classList.contains('active')) {
            console.log('🗺️ Closing map with Escape key');
            mapModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Simple hover effects for locations
    mapLocations.forEach(location => {
        location.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        location.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});