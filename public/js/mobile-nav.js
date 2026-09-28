// Mobile navigation drawer
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('mobileMenuBtn');
  var icon = document.getElementById('mobileMenuIcon');
  var sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
  var overlay = document.getElementById('mobileNavOverlay');
  var mq = window.matchMedia('(max-width: 900px)');

  if (!btn || !sidebar) return;

  function isMobile() {
    return mq.matches;
  }

  function openNav() {
    document.body.classList.add('nav-open');
    sidebar.classList.add('is-open');
    if (overlay) {
      overlay.hidden = false;
      overlay.classList.add('active');
    }
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation');
    if (icon) icon.textContent = 'close';
    if (isMobile()) document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    sidebar.classList.remove('is-open');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.hidden = true;
    }
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation');
    if (icon) icon.textContent = 'menu';
    document.body.style.overflow = '';
  }

  function toggleNav() {
    if (sidebar.classList.contains('is-open')) closeNav();
    else openNav();
  }

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    toggleNav();
  });

  if (overlay) {
    overlay.addEventListener('click', closeNav);
  }

  // Close when a nav link is chosen (mobile)
  sidebar.querySelectorAll('.nav-item, a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (isMobile()) closeNav();
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeNav();
  });

  // If resizing up to desktop, force closed drawer state
  function onMq() {
    if (!isMobile()) closeNav();
  }
  if (mq.addEventListener) mq.addEventListener('change', onMq);
  else if (mq.addListener) mq.addListener(onMq);

  console.log('Mobile nav ready');
});
