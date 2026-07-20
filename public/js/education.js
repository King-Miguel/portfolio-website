document.addEventListener('DOMContentLoaded', function() {
    const milestones = document.querySelectorAll('.timeline-milestone');
    
    milestones.forEach(milestone => {
        milestone.addEventListener('click', function() {
            milestones.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            this.style.transform = 'translateX(8px)';
            setTimeout(() => {
                this.style.transform = 'translateX(5px)';
            }, 150);
        });
    });

    milestones.forEach(milestone => {
        milestone.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(128, 128, 128, 0.3)';
            }
        });
        
        milestone.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.background = 'rgba(128, 128, 128, 0.2)';
            }
        });
    });



const viewSideQuestsBtn = document.getElementById('viewSideQuestsBtn');
const sideQuestsModal = document.getElementById('sideQuestsModal');
const closeSideQuestsModal = document.getElementById('closeSideQuestsModal');
const certificatePreview = document.getElementById('certificatePreview');

if (viewSideQuestsBtn && sideQuestsModal) {
    viewSideQuestsBtn.addEventListener('click', function() {
        sideQuestsModal.classList.add('active');
    });
}

if (closeSideQuestsModal) {
    closeSideQuestsModal.addEventListener('click', function() {
        sideQuestsModal.classList.remove('active');
    });
}

sideQuestsModal.addEventListener('click', function(e) {
    if (e.target === sideQuestsModal) {
        sideQuestsModal.classList.remove('active');
    }
});
    
    const certificateModal = document.getElementById('certificateModal');
    const closeModal = document.getElementById('closeModal');
    const modalTitle = document.getElementById('modalTitle');
    const certificateImage = document.getElementById('certificateImage');
    const certificateDescription = document.getElementById('certificateDescription');
    const certificateDate = document.getElementById('certificateDate');
    
        const certificateData = {
            html: {
                title: "C# Fundamentals",
                description: "Mastered the foundational concepts of C# programming language including syntax, data types, and basic programming structures.",
                date: "Completed: January 28, 2025",
                imageUrl: "/images/Cer1.jpg"
            },
            css: {
                title: "Basics of Classes and Objects in C#",
                description: "Gained expertise in object-oriented programming principles in C#, including class creation, inheritance, and encapsulation.",
                date: "Completed: February 11, 2025",
                imageUrl: "/images/Cer2.jpg"
            },
            javascript: {
                title: "HTML Fundamentals",
                description: "Learned the core principles of HTML for creating structured web pages and applications.",
                date: "Completed: November 28, 2024",
                imageUrl: "/images/Cer3.jpg"
            },
            responsive: {
                title: "Introduction to CSS",
                description: "Acquired skills in styling web pages with Cascading Style Sheets for visual presentation.",
                date: "Completed: December 4, 2024",
                imageUrl: "/images/Cer4.jpg"
            },
            git: {
                title: "Java Fundamentals",
                description: "Mastered the essential concepts of Java programming including syntax, classes, and basic algorithms.",
                date: "Completed: April 1, 2025",
                imageUrl: "/images/Cer5.jpg"
            },
            python: {
                title: "Modern JavaScript for Beginners",
                description: "Learned modern JavaScript programming techniques including ES6+ features and DOM manipulation.",
                date: "Completed: January 12, 2025",
                imageUrl: "/images/Cer6.jpg"
            },
            sql: {
                title: "Object-Oriented Programming in JavaScript",
                description: "Gained skills in implementing object-oriented programming patterns and principles in JavaScript.",
                date: "Completed: January 20, 2025",
                imageUrl: "/images/Cer7.jpg"
            },
            react: {
                title: "Introduction to PHP",
                description: "Learned the fundamentals of PHP server-side scripting language for web development.",
                date: "Completed: March 1, 2025",
                imageUrl: "/images/Cer8.jpg"
            },
            node: {
                title: "Introduction to Python",
                description: "Acquired skills in Python programming language basics including syntax and core concepts.",
                date: "Completed: January 25, 2025",
                imageUrl: "/images/Cer9.jpg"
            },
            api: {
                title: "SQL for Beginners",
                description: "Learned to design and query relational databases using Structured Query Language (SQL).",
                date: "Completed: February 7, 2025",
                imageUrl: "/images/Cer10.jpg"
            },
            security: {
                title: "SQL for Intermediate",
                description: "Advanced SQL skills including complex queries, joins, and database optimization techniques.",
                date: "Completed: March 1, 2025",
                imageUrl: "/images/Cer11.jpg"
            },
            testing: {
                title: "Introduction to Golang",
                description: "Gained foundational knowledge of Go programming language including concurrency and modern syntax.",
                date: "Completed: September 2, 2025",
                imageUrl: "/images/Cer12.jpg"
            }
        };
    const sideQuestMilestones = document.querySelectorAll('.side-quest-milestone');
    
        sideQuestMilestones.forEach(milestone => {
            milestone.addEventListener('click', function() {
                const certificateId = this.getAttribute('data-certificate');
                const certificate = certificateData[certificateId];
                
                if (certificate) {
                    certificatePreview.innerHTML = `
                        <div class="certificate-display">
                            <div class="certificate-image" style="background-image: url('${certificate.imageUrl}')"></div>
                            <div class="certificate-info">
                                <h4>${certificate.title}</h4>
                                <p>${certificate.description}</p>
                                <div class="certificate-meta">${certificate.date}</div>
                            </div>
                        </div>
                    `;
                }
            });
        });
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            certificateModal.classList.remove('active');
        });
    }
    
    certificateModal.addEventListener('click', function(e) {
        if (e.target === certificateModal) {
            certificateModal.classList.remove('active');
        }
    });

    console.log('Education Chronicle loaded! Ready to explore the Academy! 🎓✨');
});