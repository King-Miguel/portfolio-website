document.addEventListener('DOMContentLoaded', function() {
    initMultiClassAdventurer();
});

function initMultiClassAdventurer() {
    // Class data with your actual stats
    const baseStats = {
        strength: 60,     
        intelligence: 55,   
        dexterity: 59,  
        charisma: 45      
    };

    const classData = {
        warrior: {
            name: "WARRIOR",
            subtitle: "Physical Training", 
            icon: "🏋️",
            bonuses: {
                strength: 10,
                constitution: 10
            },
            description: "+10 STR, +10 CON",
            unlock: "Endurance Aura",
            hobbyConnection: "6x weekly workouts build discipline and mental fortitude"
        },
        sage: {
            name: "SAGE", 
            subtitle: "Psychology Studies",
            icon: "📚",
            bonuses: {
                intelligence: 20,
                wisdom: 15
            },
            description: "+20 INT, +15 WIS", 
            unlock: "Pattern Recognition",
            hobbyConnection: "Psychology books enhance understanding of human behavior"
        },
        rogue: {
            name: "ROGUE",
            subtitle: "Strategic Gaming", 
            icon: "🎮",
            bonuses: {
                dexterity: 25,
                charisma: 20
            },
            description: "+25 DEX, +20 CHA",
            unlock: "Tactical Insight", 
            hobbyConnection: "Competitive gaming develops quick thinking and strategy"
        },
        bard: {
            name: "BARD",
            subtitle: "Story Analysis",
            icon: "🎬", 
            bonuses: {
                creativity: 15,
                empathy: 20
            },
            description: "+15 CRE, +20 EMP",
            unlock: "Narrative Crafting",
            hobbyConnection: "TV analysis enhances storytelling and character understanding"
        }
    };

    // Initialize the section
    setupClassSelection(classData);
    updateCharacterDisplay(baseStats, classData);
    setupSkillTreeAnimation();
    setTimeout(animateSkillTree, 1500);
}

function setupClassSelection(classData) {
    const classOptions = document.querySelectorAll('.class-option');
    
    classOptions.forEach(option => {
        option.addEventListener('click', function() {
            classOptions.forEach(opt => opt.classList.remove('active'));
            
            this.classList.add('active');
            
            const classType = this.dataset.class;
            
            if (classData[classType]) {
                showClassDetails(classData[classType]);
            }
        });
        
        // Set first class as active by default
        classOptions[0].classList.add('active');
    });
}

function animateSkillTree() {
    const connectionNodes = document.querySelectorAll('#hobbies .connection-node');
    
    // Add animation class to nodes
    connectionNodes.forEach((node, index) => {
        setTimeout(() => {
            node.style.animation = 'nodePulse 2s ease-in-out infinite';
        }, index * 300);
    });
}

function setupSkillTreeAnimation() {
    // Connection lines are animated via CSS, just trigger them
    setTimeout(() => {
        const connectionLines = document.querySelectorAll('.connection-node:not(:last-child)::after');
        // CSS handles the animation, this just ensures it triggers
    }, 1000);
}

function updateCharacterDisplay(baseStats, classData) {
    // Calculate final stats based on all class bonuses
    const finalStats = calculateFinalStats(baseStats, classData);
    
    console.log('Final stats calculated:', finalStats); // Debug log
    
    // Update stat cards with correct values
    updateStatCards(finalStats, baseStats, classData);
}

function calculateFinalStats(baseStats, classData) {
    const finalStats = { ...baseStats };
    
    // Add bonuses from all classes
    Object.values(classData).forEach(classInfo => {
        Object.entries(classInfo.bonuses).forEach(([stat, bonus]) => {
            const mappedStat = mapStatName(stat);
            if (mappedStat && finalStats[mappedStat] !== undefined) {
                finalStats[mappedStat] += bonus;
            }
        });
    });
    
    // Cap stats at 100
    Object.keys(finalStats).forEach(stat => {
        finalStats[stat] = Math.min(finalStats[stat], 100);
    });
    
    return finalStats;
}

function mapStatName(classStat) {
    const statMap = {
        'strength': 'strength',
        'constitution': 'strength',
        'intelligence': 'intelligence',
        'wisdom': 'intelligence',
        'dexterity': 'dexterity',
        'charisma': 'charisma',
        'creativity': 'charisma',
        'empathy': 'charisma'
    };
    
    return statMap[classStat.toLowerCase()];
}

function updateStatCards(finalStats, baseStats, classData) {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        const statName = card.classList[1].replace('stat-', '');
        const statValue = finalStats[statName];
        const baseValue = baseStats[statName];
        

        const sourcesElement = card.querySelector('.stat-sources');
        if (sourcesElement) {
            const bonus = statValue - baseValue;
            sourcesElement.innerHTML = `Base: ${baseValue}<br/>Bonuses: +${bonus}`;
        }
    });
}

function showClassDetails(classInfo) {
    console.log('Selected class:', classInfo.name);
    
    // Optional: You could add a modal or tooltip here
    // alert(`Selected: ${classInfo.name}\n${classInfo.description}`);
}

// Remove or comment out the animateStatBarsOnScroll function entirely
// It's causing issues by resetting bar widths
/*
function animateStatBarsOnScroll() {
    const statBars = document.querySelectorAll('#hobbies .stat-bar-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-in-out';
                    bar.style.width = targetWidth;
                }, 200);
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    statBars.forEach(bar => observer.observe(bar));
}
*/

// Export functions if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initMultiClassAdventurer };
}