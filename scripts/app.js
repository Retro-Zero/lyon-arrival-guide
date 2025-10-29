document.addEventListener('DOMContentLoaded', function () {
  if (window.feather && typeof window.feather.replace === 'function') {
    window.feather.replace();
  }

  const toggle = document.querySelector('.sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      sidebar.classList.toggle('open');
    });

    // Close on outside click (mobile)
    document.addEventListener('click', (e) => {
      if (!sidebar.classList.contains('open')) return;
      const within = sidebar.contains(e.target) || toggle.contains(e.target);
      if (!within) {
        sidebar.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl) {
    const d = new Date();
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(d);
    lastUpdatedEl.textContent = dateStr;
  }

  // Header shadow on scroll
  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 4) header.classList.add('elevated');
    else header.classList.remove('elevated');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Simple section highlight (h2 with id)
  const sectionHeads = Array.from(document.querySelectorAll('main h2[id]'));
  const sidebarLinks = Array.from(document.querySelectorAll('.sidebar-nav a[href^="#"]'));
  if (sectionHeads.length && sidebarLinks.length && 'IntersectionObserver' in window) {
    const byId = new Map(sidebarLinks.map(a => [a.getAttribute('href')?.slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        const link = byId.get(e.target.id);
        if (!link) return;
        if (e.isIntersecting) {
          sidebarLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -70% 0px', threshold: [0, 1] });
    sectionHeads.forEach(h => io.observe(h));
  }
});

