// ============================================
// ADVENTURER LEVEL - auto age + XP from birthday
// Birthday: April 28. Level = age. XP bar fills
// from last birthday toward the next one.
// ============================================

(function () {
    // Adjust BIRTH_YEAR if age is ever off by one.
    // After Apr 28, 2026 someone born 2005-04-28 is 21.
    var BIRTH_MONTH = 4;  // April
    var BIRTH_DAY = 28;
    var BIRTH_YEAR = 2005;
    var XP_MAX = 2100;

    function startOfDay(d) {
        return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }

    function getAdventurerProgress(now) {
        now = startOfDay(now || new Date());

        var birthdayThisYear = new Date(now.getFullYear(), BIRTH_MONTH - 1, BIRTH_DAY);
        var age = now.getFullYear() - BIRTH_YEAR;
        if (now < birthdayThisYear) age -= 1;

        var lastBirthday;
        var nextBirthday;
        if (now >= birthdayThisYear) {
            lastBirthday = birthdayThisYear;
            nextBirthday = new Date(now.getFullYear() + 1, BIRTH_MONTH - 1, BIRTH_DAY);
        } else {
            lastBirthday = new Date(now.getFullYear() - 1, BIRTH_MONTH - 1, BIRTH_DAY);
            nextBirthday = birthdayThisYear;
        }

        var totalMs = nextBirthday.getTime() - lastBirthday.getTime();
        var gainedMs = now.getTime() - lastBirthday.getTime();
        var pct = 0;
        if (totalMs > 0) {
            pct = Math.round((gainedMs / totalMs) * 100);
        }
        if (pct < 0) pct = 0;
        if (pct > 100) pct = 100;

        // On the birthday itself, show a fresh level at 0% into the new year
        if (now.getTime() === birthdayThisYear.getTime()) {
            pct = 0;
        }

        var xp = Math.round((pct / 100) * XP_MAX);

        return {
            level: age,
            nextLevel: age + 1,
            xp: xp,
            xpMax: XP_MAX,
            pct: pct,
            birthdayLabel: 'Apr 28'
        };
    }

    function setText(selector, text) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.textContent = text;
        });
    }

    function setBarWidth(selector, pct) {
        document.querySelectorAll(selector).forEach(function (el) {
            el.style.width = pct + '%';
        });
    }

    function applyAdventurerLevel() {
        var p = getAdventurerProgress(new Date());

        // About page character sheet
        setText('[data-level-value]', String(p.level));
        setText('[data-xp-value]', p.xp + '/' + p.xpMax + ' XP');
        setText('[data-xp-value-short]', p.xp + '/' + p.xpMax);
        setText('[data-xp-label]', p.pct + '% to Level ' + p.nextLevel);
        setText('[data-xp-label-upper]', p.pct + '% TO LEVEL ' + p.nextLevel);
        setBarWidth('[data-xp-bar]', p.pct);

        // Hobbies character level badge if present
        setText('[data-level-badge]', 'LVL ' + p.level);

        // Profile picture modal subtitle
        setText('[data-profile-level-line]', 'Web Adventurer - Level ' + p.level);

        // Expose for debugging / other scripts
        window.adventurerProgress = p;
        console.log(
            'Level ' + p.level +
            ' | ' + p.xp + '/' + p.xpMax + ' XP (' + p.pct +
            '%) | next level on ' + p.birthdayLabel
        );
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyAdventurerLevel);
    } else {
        applyAdventurerLevel();
    }

    window.getAdventurerProgress = getAdventurerProgress;
    window.applyAdventurerLevel = applyAdventurerLevel;
})();
