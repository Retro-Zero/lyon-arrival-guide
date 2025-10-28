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
  }

  const lastUpdatedEl = document.getElementById('last-updated');
  if (lastUpdatedEl) {
    const d = new Date();
    const dateStr = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium' }).format(d);
    lastUpdatedEl.textContent = dateStr;
  }
});

