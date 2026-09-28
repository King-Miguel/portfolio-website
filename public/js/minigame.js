/**
 * Bug Bash - lightweight side-quest mini-game
 * - Starts only on button press (zero cost until then)
 * - rAF loop stops on end / when section leaves view
 * - Score + best stored in localStorage
 * - Mobile-friendly tap targets
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'miguelito_bugbash_best';
  var DURATION = 30;
  var MAX_LIVES = 3;
  var MAX_BUGS = 6;

  var root, stage, overlay, msgEl, startBtn, restartBtn;
  var scoreEl, livesEl, timeEl, bestEl;

  var running = false;
  var score = 0;
  var lives = MAX_LIVES;
  var timeLeft = DURATION;
  var best = 0;
  var rafId = 0;
  var timerId = 0;
  var spawnAcc = 0;
  var lastTs = 0;
  var bugs = [];
  var reducedMotion = false;

  function $(id) {
    return document.getElementById(id);
  }

  function readBest() {
    try {
      var n = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
      return isFinite(n) && n > 0 ? n : 0;
    } catch (_) {
      return 0;
    }
  }

  function writeBest(n) {
    try {
      localStorage.setItem(STORAGE_KEY, String(n));
    } catch (_) {}
  }

  function updateHud() {
    if (scoreEl) scoreEl.textContent = String(score);
    if (livesEl) livesEl.textContent = String(lives);
    if (timeEl) timeEl.textContent = String(Math.max(0, Math.ceil(timeLeft)));
    if (bestEl) bestEl.textContent = String(best);
  }

  function setOverlay(visible, message, showStart) {
    if (!overlay) return;
    if (message && msgEl) msgEl.textContent = message;
    overlay.hidden = !visible;
    overlay.classList.toggle('is-hidden', !visible);
    if (startBtn) {
      startBtn.style.display = showStart ? '' : 'none';
      startBtn.disabled = !showStart;
    }
  }

  function clearBugs() {
    bugs.forEach(function (b) {
      if (b.el && b.el.parentNode) b.el.parentNode.removeChild(b.el);
    });
    bugs = [];
  }

  function stopLoop() {
    running = false;
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = 0;
    }
    if (timerId) {
      clearInterval(timerId);
      timerId = 0;
    }
  }

  function endRun(reason) {
    stopLoop();
    clearBugs();

    if (score > best) {
      best = score;
      writeBest(best);
    }
    updateHud();

    var title = reason === 'dead' ? 'PARTY WIPED' : 'TIME UP';
    var line = title + ' // Score ' + score + (score >= best && score > 0 ? ' (NEW BEST)' : '');
    setOverlay(true, line, true);
    if (startBtn) startBtn.textContent = 'RUN AGAIN';
    if (restartBtn) restartBtn.disabled = false;
  }

  function spawnBug() {
    if (!stage || bugs.length >= MAX_BUGS) return;

    var rect = stage.getBoundingClientRect();
    var pad = 28;
    var size = 36 + Math.floor(Math.random() * 14);
    var x = pad + Math.random() * Math.max(40, rect.width - size - pad * 2);
    var y = pad + Math.random() * Math.max(40, rect.height - size - pad * 2);

    // ~18% chance of a "feature" decoy (bonus, no life loss if missed)
    var isFeature = Math.random() < 0.18;
    var el = document.createElement('button');
    el.type = 'button';
    el.className = 'bug-entity' + (isFeature ? ' is-feature' : ' is-bug');
    el.setAttribute('aria-label', isFeature ? 'Feature bonus' : 'Squash bug');
    el.textContent = isFeature ? '✨' : '🐛';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.fontSize = Math.floor(size * 0.55) + 'px';

    var life = 1.6 + Math.random() * 1.4;
    var vx = (Math.random() - 0.5) * (reducedMotion ? 20 : 55);
    var vy = (Math.random() - 0.5) * (reducedMotion ? 20 : 55);

    var bug = {
      el: el,
      x: x,
      y: y,
      vx: vx,
      vy: vy,
      size: size,
      life: life,
      maxLife: life,
      isFeature: isFeature,
      dead: false
    };

    el.addEventListener('pointerdown', function (e) {
      e.preventDefault();
      e.stopPropagation();
      if (!running || bug.dead) return;
      squash(bug);
    });

    stage.appendChild(el);
    bugs.push(bug);
  }

  function squash(bug) {
    bug.dead = true;
    if (bug.isFeature) {
      score += 25;
      bug.el.classList.add('pop-good');
    } else {
      score += 10;
      bug.el.classList.add('pop-hit');
    }
    updateHud();

    setTimeout(function () {
      if (bug.el && bug.el.parentNode) bug.el.parentNode.removeChild(bug.el);
      bugs = bugs.filter(function (b) {
        return b !== bug;
      });
    }, 180);
  }

  function escapeBug(bug) {
    bug.dead = true;
    if (!bug.isFeature) {
      lives -= 1;
      updateHud();
      if (lives <= 0) {
        endRun('dead');
        return;
      }
    }
    if (bug.el && bug.el.parentNode) bug.el.parentNode.removeChild(bug.el);
    bugs = bugs.filter(function (b) {
      return b !== bug;
    });
  }

  function tick(ts) {
    if (!running) return;
    if (!lastTs) lastTs = ts;
    var dt = Math.min(0.05, (ts - lastTs) / 1000);
    lastTs = ts;

    var rect = stage.getBoundingClientRect();
    var w = rect.width;
    var h = rect.height;

    spawnAcc += dt;
    var spawnEvery = Math.max(0.45, 1.05 - score / 200);
    if (spawnAcc >= spawnEvery) {
      spawnAcc = 0;
      spawnBug();
    }

    for (var i = bugs.length - 1; i >= 0; i--) {
      var b = bugs[i];
      if (b.dead) continue;

      b.life -= dt;
      if (b.life <= 0) {
        escapeBug(b);
        if (!running) return;
        continue;
      }

      b.x += b.vx * dt;
      b.y += b.vy * dt;

      if (b.x < 4) {
        b.x = 4;
        b.vx *= -1;
      }
      if (b.y < 4) {
        b.y = 4;
        b.vy *= -1;
      }
      if (b.x + b.size > w - 4) {
        b.x = w - 4 - b.size;
        b.vx *= -1;
      }
      if (b.y + b.size > h - 4) {
        b.y = h - 4 - b.size;
        b.vy *= -1;
      }

      var fade = Math.max(0.35, b.life / b.maxLife);
      b.el.style.left = b.x + 'px';
      b.el.style.top = b.y + 'px';
      b.el.style.opacity = String(fade);
    }

    rafId = requestAnimationFrame(tick);
  }

  function startRun() {
    stopLoop();
    clearBugs();
    score = 0;
    lives = MAX_LIVES;
    timeLeft = DURATION;
    spawnAcc = 0.8;
    lastTs = 0;
    updateHud();
    setOverlay(false, '', false);
    if (restartBtn) restartBtn.disabled = false;
    if (startBtn) startBtn.textContent = 'START RUN';

    running = true;
    timerId = setInterval(function () {
      if (!running) return;
      timeLeft -= 1;
      updateHud();
      if (timeLeft <= 0) endRun('time');
    }, 1000);

    rafId = requestAnimationFrame(tick);
  }

  function init() {
    root = $('bugBash');
    stage = $('bugBashStage');
    overlay = $('bugBashOverlay');
    msgEl = $('bugBashMsg');
    startBtn = $('bugBashStart');
    restartBtn = $('bugBashRestart');
    scoreEl = $('bugScore');
    livesEl = $('bugLives');
    timeEl = $('bugTime');
    bestEl = $('bugBest');

    if (!root || !stage || !startBtn) return;

    reducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    best = readBest();
    updateHud();
    setOverlay(true, 'Ready, adventurer?', true);
    if (restartBtn) restartBtn.disabled = true;

    startBtn.addEventListener('click', function (e) {
      e.preventDefault();
      startRun();
    });

    if (restartBtn) {
      restartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        startRun();
      });
    }

    // Pause loop if the hobbies section leaves the viewport mid-run
    var hobbies = document.getElementById('hobbies');
    if (hobbies && 'IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting && running) {
              stopLoop();
              clearBugs();
              setOverlay(true, 'Paused (scrolled away). Resume when ready.', true);
              if (startBtn) startBtn.textContent = 'RESUME / NEW RUN';
            }
          });
        },
        { threshold: 0.05 }
      );
      io.observe(hobbies);
    }

    document.addEventListener('visibilitychange', function () {
      if (document.hidden && running) {
        stopLoop();
        clearBugs();
        setOverlay(true, 'Paused. Tab was hidden.', true);
        if (startBtn) startBtn.textContent = 'RESUME / NEW RUN';
      }
    });

    console.log('Bug Bash mini-game ready');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
