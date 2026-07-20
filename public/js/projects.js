const questsData = {
    // ============ S RANK (LEGENDARY) ============
    "nexus": {
        title: "Nexus — Project Management",
        rank: "S",
        rankText: "LEGENDARY",
        image: "/images/nexus-icon.jpg",
        brief: "Full-featured project management tool with Kanban boards, real-time analytics, financial tracking, command palette, and soft delete with undo.",
        requirements: ["Next.js 14", "TypeScript", "PostgreSQL", "Prisma", "Tailwind CSS", "NextAuth", "Recharts"],
        contract: { difficulty: "S Rank — Legendary", status: "Completed & Deployed", client: "Royal Guild" },
        rewards: { gold: "+5000 Gold", skills: "Full-Stack Mastery · Next.js · TypeScript · Database Design", badge: "🏆 Legendary Developer Badge" },
        client: "Royal Guild",
        liveLink: "https://nexus-alpha-ten-11.vercel.app",
        sourceLink: "https://github.com/King-Miguel"
    },
    "rentruck": {
        title: "Rentruck — Capstone",
        rank: "S",
        rankText: "LEGENDARY",
        image: "/images/rentruck-icon.jpg",
        brief: "Full-stack truck rental and inventory management platform built for VFL Builders & VFL Hardware. Features real-time availability, pricing algorithms, inventory tracking, and user management.",
        requirements: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Vercel", "Tailwind CSS"],
        contract: { difficulty: "S Rank — Legendary", status: "Completed & Deployed", client: "VFL Builders & VFL Hardware" },
        rewards: { gold: "+5000 Gold", skills: "Full-Stack Architecture · Inventory Systems · Client Delivery", badge: "🏆 Capstone Master Badge" },
        client: "VFL Builders & VFL Hardware",
        liveLink: "https://rentruck1.vercel.app/",
        sourceLink: "https://github.com/King-Miguel"
    },

    // ============ A RANK (ELITE) ============
    "flux": {
        title: "Flux — Client Feedback Portal",
        rank: "A",
        rankText: "ELITE",
        image: "/images/flux-icon.jpg",
        brief: "Agency-client feedback management system with Kanban board, threaded comments, role-based access, file attachments, and task conversion.",
        requirements: ["HTML5", "CSS3", "JavaScript", "Kanban", "LocalStorage", "UI/UX Design"],
        contract: { difficulty: "A Rank — Elite", status: "Completed & Deployed", client: "Agency Guild" },
        rewards: { gold: "+2500 Gold", skills: "Workflow Design · UX Architecture · Feedback Systems", badge: "🏅 Quest Master Badge" },
        client: "Agency Guild",
        liveLink: "https://kingmiguelito-golteb.github.io/flux/landing.html",
        sourceLink: "https://github.com/King-Miguel"
    },
    "thesis-quest": {
        title: "Thesis Quest — Progress Tracker",
        rank: "A",
        rankText: "ELITE",
        image: "/images/thesis-quest-icon.jpg",
        brief: "Thesis progress tracking system for students with milestone monitoring, deliverable management, and supervisor oversight.",
        requirements: ["React", "Next.js", "Vercel", "Database", "Authentication"],
        contract: { difficulty: "A Rank — Elite", status: "Completed & Deployed", client: "University Guild" },
        rewards: { gold: "+2500 Gold", skills: "Academic Systems · Progress Tracking · React", badge: "🏅 Scholar's Badge" },
        client: "University Guild",
        liveLink: "https://thesisquest.vercel.app",
        sourceLink: "https://github.com/King-Miguel"
    },
    "tower-defense": {
        title: "Tower Defense — Game",
        rank: "A",
        rankText: "ELITE",
        image: "/images/tower-defense-icon.jpg",
        brief: "Complete tower defense game with 6 unique towers (Basic, Sniper, Rapid, Cannon, Fire, Ice), 3 different maps (Forest, Desert, Ice), 13 enemy types including bosses, tower upgrades, targeting modes, prestige system, and achievements. Defend your base across 3 worlds!",
        requirements: ["JavaScript", "Game Design", "Canvas API", "AI Logic", "HTML5", "CSS3"],
        contract: { difficulty: "A Rank — Elite", status: "Completed & Deployed", client: "Arcade Guild" },
        rewards: { gold: "+2500 Gold", skills: "Game Development · AI Logic · Canvas API", badge: "🏅 Tactician's Badge" },
        client: "Arcade Guild",
        liveLink: "https://king-miguel.itch.io/tower-defense",
        sourceLink: "https://github.com/King-Miguel"
    },
    "arena-defender": {
        title: "Arena Defender — Game",
        rank: "A",
        rankText: "ELITE",
        image: "/images/arena-defender-icon.jpg",
        brief: "Wave-survival action game built with Phaser 3. Use WASD to move, auto-shoot at enemies, and protect your base from endless waves. Pick from 3 unique upgrades after each wave as enemies scale in difficulty. Features local high score tracking. How many waves can you survive?",
        requirements: ["JavaScript", "Game Design", "Canvas API", "AI Logic", "HTML5", "CSS3"],
        contract: { difficulty: "A Rank — Elite", status: "Completed & Deployed", client: "Arcade Guild" },
        rewards: { gold: "+2500 Gold", skills: "Game Mechanics · Real-time Combat · Leaderboards", badge: "🏅 Gladiator's Badge" },
        client: "Arcade Guild",
        liveLink: "https://king-miguel.itch.io/arena-defender",
        sourceLink: "https://github.com/King-Miguel"
    },

    // ============ B RANK (ADVENTURER) ============
    "booking": {
        title: "BooKING — E-Commerce",
        rank: "B",
        rankText: "ADVENTURER",
        image: "/images/booking-icon.jpg",
        brief: "Full e-commerce platform for book lovers with product catalog, shopping cart, user authentication, and localStorage persistence.",
        requirements: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "UI/UX Design"],
        contract: { difficulty: "B Rank — Adventurer", status: "Completed & Deployed", client: "Bookstore Guild" },
        rewards: { gold: "+1500 Gold", skills: "E-Commerce Architecture · LocalStorage · UI Design", badge: "📜 Merchant Guild Badge" },
        client: "Bookstore Guild",
        liveLink: "https://kingmiguelito-golteb.github.io/BooKING/",
        sourceLink: "https://github.com/King-Miguel"
    },
    "itindahan": {
        title: "iTINDAHAN — E-Commerce UI",
        rank: "B",
        rankText: "ADVENTURER",
        image: "/images/ecommerce.jpg",
        brief: "E-commerce platform UI with localStorage authentication, multi-vendor marketplace concept, and full shopping cart functionality.",
        requirements: ["HTML5", "CSS3", "JavaScript", "LocalStorage", "UI Design"],
        contract: { difficulty: "B Rank — Adventurer", status: "Completed & Deployed", client: "Marketplace Guild" },
        rewards: { gold: "+1500 Gold", skills: "Frontend Architecture · Multi-vendor UI · LocalStorage", badge: "📜 Vendor Guild Badge" },
        client: "Marketplace Guild",
        liveLink: "https://kingmiguelito-golteb.github.io/iTINDAHAN/",
        sourceLink: "https://github.com/King-Miguel"
    },
    "fourthfolio": {
        title: "Old Portfolio (3rd Year)",
        rank: "B",
        rankText: "ADVENTURER",
        image: "/images/fourthfolio-icon.jpg",
        brief: "My 3rd year portfolio showcasing early web development journey, foundational projects, and skill progression from beginner to intermediate.",
        requirements: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Responsive Design"],
        contract: { difficulty: "B Rank — Adventurer", status: "Completed & Deployed", client: "Personal Archive" },
        rewards: { gold: "+1500 Gold", skills: "Portfolio Design · Responsive Layout · Version History", badge: "📜 Archivist's Badge" },
        client: "Personal Archive",
        liveLink: "https://kingmiguelito-golteb.github.io/fourthfolio/",
        sourceLink: "https://github.com/King-Miguel"
    },
    "current-portfolio": {
        title: "Current Portfolio (This Site)",
        rank: "B",
        rankText: "ADVENTURER",
        image: "/images/current-portfolio.jpg",
        brief: "Complete RPG-themed responsive portfolio with 15 quests, 3D knight model, pixel art style, and interactive quest board. YOU ARE HERE!",
        requirements: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express", "Three.js"],
        contract: { difficulty: "B Rank — Adventurer", status: "Completed & Deployed", client: "Personal Brand" },
        rewards: { gold: "+1500 Gold", skills: "Portfolio Design Mastery · RPG Theme · 3D Integration", badge: "📜 Showcase Expert Badge" },
        client: "Personal Brand",
        liveLink: "/",
        sourceLink: "https://github.com/King-Miguel/portfolio-website"
    },
    "ecommerce": {
        title: "E-commerce Platform",
        rank: "B",
        rankText: "ADVENTURER",
        image: "/images/ecommerce.jpg",
        brief: "Full online store with product catalog, shopping cart, user authentication and payment integration.",
        requirements: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "Payment API"],
        contract: { difficulty: "B Rank — Adventurer", status: "Completed", client: "Merchant Guild" },
        rewards: { gold: "+1500 Gold", skills: "E-commerce Development · PHP · MySQL", badge: "📜 Merchant Guild Badge" },
        client: "Merchant Guild",
        liveLink: "#",
        sourceLink: "https://github.com/King-Miguel"
    },

    // ============ C RANK (APPRENTICE) — NOW USE "small-project" ============
    "calculator": {
        title: "Functional Calculator",
        rank: "C",
        rankText: "APPRENTICE",
        image: "/images/Calbolator.png",
        brief: "Fully functional calculator built with HTML, CSS and JavaScript as a learning challenge to understand DOM manipulation and event handling.",
        requirements: ["HTML5", "CSS3", "JavaScript", "DOM Manipulation"],
        contract: { difficulty: "C Rank — Apprentice", status: "Completed & Deployed", client: "Learning Challenge" },
        rewards: { gold: "+800 Gold", skills: "JavaScript Logic · DOM Manipulation · Event Handling", badge: "🧮 Math Wizard Badge" },
        client: "Learning Challenge",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    },
    "moving-clouds": {
        title: "Moving Clouds Animation",
        rank: "C",
        rankText: "APPRENTICE",
        image: "/images/MovingCloud.png",
        brief: "Complex JavaScript animation featuring moving cloud elements that demonstrate advanced CSS and JavaScript timing functions.",
        requirements: ["HTML5", "CSS3", "JavaScript", "Animations", "Timing Functions"],
        contract: { difficulty: "C Rank — Apprentice", status: "Completed & Deployed", client: "Personal Challenge" },
        rewards: { gold: "+800 Gold", skills: "Animation Expertise · Timing Functions · JavaScript", badge: "☁️ Sky Master Badge" },
        client: "Personal Challenge",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    },

    // ============ D RANK (BEGINNER) — NOW USE "small-project" ============
    "netflix-clone": {
        title: "Netflix Sign-In Clone",
        rank: "D",
        rankText: "BEGINNER",
        image: "/images/Alimani.jpg",
        brief: "Static replica of Netflix's sign-in page interface created as a learning exercise to practice form design and CSS layout.",
        requirements: ["HTML5", "CSS3", "Form Design", "UI Replication"],
        contract: { difficulty: "D Rank — Beginner", status: "Completed & Deployed", client: "Learning Exercise" },
        rewards: { gold: "+400 Gold", skills: "UI Design Basics · Form Styling · CSS Layout", badge: "🎬 Clone Master Badge" },
        client: "Learning Exercise",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    },
    "instagram-clone": {
        title: "Instagram Profile Clone",
        rank: "D",
        rankText: "BEGINNER",
        image: "/images/Ricardo.jpg",
        brief: "Static Instagram profile page replica with sample posts, created to practice CSS grid layouts and social media UI design.",
        requirements: ["HTML5", "CSS3", "Grid Layout", "UI Design"],
        contract: { difficulty: "D Rank — Beginner", status: "Completed & Deployed", client: "Learning Exercise" },
        rewards: { gold: "+400 Gold", skills: "Grid Layout · Social UI Design · CSS", badge: "📸 Profile Artist Badge" },
        client: "Learning Exercise",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    },
    "solar-eclipse": {
        title: "Solar Eclipse Animation",
        rank: "D",
        rankText: "BEGINNER",
        image: "/images/Krillin.png",
        brief: "CSS-only solar eclipse animation demonstrating pure CSS animations and transitions without JavaScript.",
        requirements: ["HTML5", "CSS3", "CSS Animations", "Keyframes"],
        contract: { difficulty: "D Rank — Beginner", status: "Completed & Deployed", client: "First Project" },
        rewards: { gold: "+400 Gold", skills: "CSS Animation Basics · Keyframes · Transitions", badge: "🌞 Celestial Animator Badge" },
        client: "First Project",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    },
    "search-filter": {
        title: "Filtering Search Bar",
        rank: "D",
        rankText: "BEGINNER",
        image: "/images/Golteb.png",
        brief: "Interactive search functionality with filtering capabilities and dark mode toggle feature for enhanced user experience.",
        requirements: ["HTML5", "CSS3", "JavaScript", "DOM Filtering", "Dark Mode"],
        contract: { difficulty: "D Rank — Beginner", status: "Completed & Deployed", client: "Personal Project" },
        rewards: { gold: "+400 Gold", skills: "Search Implementation · Filtering · Dark Mode", badge: "🔍 Filter Master Badge" },
        client: "Personal Project",
        liveLink: "small-project",  // ← TRIGGERS MODAL
        sourceLink: "https://github.com/King-Miguel"
    }
};

// =============================================
// MAIN FUNCTION TO DISPLAY QUEST DETAILS
// =============================================
function updateQuestDisplay(questId) {
    const quest = questsData[questId];
    if (!quest) {
        console.error('❌ Quest not found:', questId);
        return;
    }
    
    const placeholder = document.getElementById('questPlaceholder');
    const content = document.getElementById('questContent');
    
    if (placeholder) placeholder.style.display = 'none';
    if (content) content.style.display = 'flex';
    
    const titleEl = content.querySelector('.proj-quest-title');
    if (titleEl) titleEl.textContent = quest.title;
    
    const rankBadge = content.querySelector('.proj-quest-rank-badge');
    if (rankBadge) {
        rankBadge.textContent = `${quest.rankText} COMMISSION`;
        rankBadge.className = 'proj-quest-rank-badge proj-quest-' + quest.rank.toLowerCase();
    }
    
    const imageEl = content.querySelector('.proj-quest-image');
    if (imageEl && quest.image) {
        imageEl.style.backgroundImage = `url('${quest.image}')`;
        imageEl.style.backgroundSize = 'cover';
        imageEl.style.backgroundPosition = 'center';
    }
    
    const briefEl = content.querySelector('.proj-brief-description');
    if (briefEl) briefEl.textContent = quest.brief;
    
    const techContainer = content.querySelector('.proj-solution-tech');
    if (techContainer) {
        techContainer.innerHTML = '';
        quest.requirements.forEach(tech => {
            const span = document.createElement('span');
            span.className = 'proj-tech-item';
            span.textContent = tech;
            techContainer.appendChild(span);
        });
    }
    
    const contractEl = content.querySelector('.proj-contract-details');
    if (contractEl) {
        contractEl.innerHTML = `
            <p><strong>Difficulty:</strong> ${quest.contract.difficulty}</p>
            <p><strong>Status:</strong> ${quest.contract.status}</p>
            <p><strong>Client:</strong> ${quest.contract.client || quest.client}</p>
        `;
    }
    
    const rewardsEl = content.querySelector('.proj-rewards-details');
    if (rewardsEl) {
        rewardsEl.innerHTML = `
            <p><strong>${quest.rewards.gold}</strong></p>
            <p>${quest.rewards.skills}</p>
            <p><strong>Badge:</strong> ${quest.rewards.badge}</p>
        `;
    }
    
    // BUILD FRESH BUTTONS
    const actionsContainer = content.querySelector('.proj-quest-actions');
    if (!actionsContainer) return;
    
    actionsContainer.innerHTML = '';
    
    const liveBtn = document.createElement('button');
    liveBtn.type = 'button';
    liveBtn.className = 'proj-action-btn proj-btn-live';
    liveBtn.innerHTML = '<span class="material-symbols-outlined">play_arrow</span> LAUNCH QUEST';
    liveBtn.style.cssText = 'opacity: 1; pointer-events: auto; cursor: pointer;';
    
    const sourceBtn = document.createElement('button');
    sourceBtn.type = 'button';
    sourceBtn.className = 'proj-action-btn proj-btn-source';
    sourceBtn.innerHTML = '<span class="material-symbols-outlined">code</span> VIEW SOURCE';
    sourceBtn.style.cssText = 'opacity: 1; pointer-events: auto; cursor: pointer;';
    
    actionsContainer.appendChild(liveBtn);
    actionsContainer.appendChild(sourceBtn);
    
    // LAUNCH QUEST BUTTON LOGIC
    liveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if it's a small project → show modal
        if (quest.liveLink === 'small-project') {
            document.getElementById('smallProjectsModal').classList.add('active');
        }
        // Normal live link
        else if (quest.liveLink && quest.liveLink !== '#' && quest.liveLink !== '/') {
            window.open(quest.liveLink, '_blank', 'noopener,noreferrer');
        }
        // Current portfolio
        else if (quest.liveLink === '/') {
            alert('🏰 You are already here, adventurer! This is the current portfolio site.');
        }
        // No link
        else {
            alert('⚔️ This quest has no live demo available yet!');
        }
    });
    
    // VIEW SOURCE BUTTON
    sourceBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.open(quest.sourceLink, '_blank', 'noopener,noreferrer');
    });
}

// =============================================
// SMALL PROJECTS MODAL LOGIC
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('smallProjectsModal');
    const closeBtn = document.getElementById('smallProjectsClose');
    const stayBtn = document.getElementById('smallProjectsStay');
    const goBtn = document.getElementById('smallProjectsGo');
    
    // Close modal
    function closeModal() {
        modal.classList.remove('active');
    }
    
    closeBtn.addEventListener('click', closeModal);
    stayBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // Go to 3rd year portfolio
    goBtn.addEventListener('click', function() {
        window.open('https://kingmiguelito-golteb.github.io/fourthfolio/', '_blank', 'noopener,noreferrer');
        closeModal();
    });
    
    // Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

// =============================================
// FILTER FUNCTION
// =============================================
function filterQuests() {
    const searchTerm = document.getElementById('proj-quest-search').value.toLowerCase().trim();
    const difficultyFilter = document.getElementById('proj-difficulty-filter').value;
    
    const cards = document.querySelectorAll('.proj-quest-card');
    let visibleCount = 0;
    
    cards.forEach(card => {
        const questId = card.getAttribute('data-quest-id');
        const quest = questsData[questId];
        if (!quest) { card.style.display = 'none'; return; }
        
        const titleMatch = quest.title.toLowerCase().includes(searchTerm);
        const descMatch = quest.brief.toLowerCase().includes(searchTerm);
        const techMatch = quest.requirements.some(tech => tech.toLowerCase().includes(searchTerm));
        const matchesSearch = searchTerm === '' || titleMatch || descMatch || techMatch;
        const matchesDifficulty = difficultyFilter === 'all' || difficultyFilter === quest.rank.toLowerCase();
        
        card.style.display = (matchesSearch && matchesDifficulty) ? '' : 'none';
        if (matchesSearch && matchesDifficulty) visibleCount++;
    });
    
    const existingMsg = document.querySelector('.proj-no-results');
    if (visibleCount === 0 && !existingMsg) {
        const container = document.querySelector('.proj-quests-grid');
        const msg = document.createElement('p');
        msg.className = 'proj-no-results';
        msg.textContent = '🔍 No quests match your search. Try a different keyword.';
        msg.style.cssText = 'grid-column: 1 / -1; text-align: center; padding: 40px; color: #F5DEB3; font-family: "Press Start 2P", cursive; font-size: 0.8rem;';
        container.appendChild(msg);
    } else if (visibleCount > 0 && existingMsg) {
        existingMsg.remove();
    }
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏰 Guild Hall initializing...');
    
    const questCards = document.querySelectorAll('.proj-quest-card');
    console.log(`📜 Found ${questCards.length} quest cards`);
    
    questCards.forEach((card) => {
        card.addEventListener('click', function() {
            const questId = this.getAttribute('data-quest-id');
            questCards.forEach(c => c.classList.remove('active-quest'));
            this.classList.add('active-quest');
            updateQuestDisplay(questId);
        });
    });
    
    const searchInput = document.getElementById('proj-quest-search');
    if (searchInput) searchInput.addEventListener('input', filterQuests);
    
    const filterSelect = document.getElementById('proj-difficulty-filter');
    if (filterSelect) filterSelect.addEventListener('change', filterQuests);
    
    console.log('✅ Guild Hall ready! Small projects → modal redirect');
});

window.updateQuestDisplay = updateQuestDisplay;
window.filterQuests = filterQuests;
window.questsData = questsData;