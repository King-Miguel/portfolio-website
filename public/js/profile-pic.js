// ============================================
// PROFILE PICTURE CLICK MODAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('profilePicModal');
    const closeBtn = document.getElementById('profilePicClose');
    
    // Find ALL knight portraits across the site
    // These use knightC.png as background-image
    const knightPortraits = document.querySelectorAll(`
        .logo,
        .character-portrait,
        .proj-member-portrait,
        .scholar-portrait,
        .character-sprite
    `);
    
    console.log(`🖼️ Found ${knightPortraits.length} clickable knight portraits`);
    
    // Make them all clickable
    knightPortraits.forEach(portrait => {
        portrait.style.cursor = 'pointer';
        portrait.title = 'Click to view full portrait';
        
        portrait.addEventListener('click', function(e) {
            e.stopPropagation();
            modal.classList.add('active');
        });
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    console.log('✅ Profile picture modal ready!');
});