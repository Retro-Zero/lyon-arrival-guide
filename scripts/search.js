// Minimal keyword search: scans headings and paragraphs on the current page
document.addEventListener('DOMContentLoaded', function () {
  const prefix = location.pathname.includes('/pages/') ? '../../' : '';
  const searchBtn = document.querySelector('.search-btn');
  if (!searchBtn) return;

  function promptSearch() {
    const q = window.prompt('جستجو:', '');
    if (!q) return;
    const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const nodes = Array.from(document.querySelectorAll('h1, h2, h3, p, li'));
    const first = nodes.find(n => rx.test(n.textContent || ''));
    if (first) {
      first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      first.style.outline = '2px solid var(--color-primary)';
      setTimeout(() => (first.style.outline = ''), 1600);
    } else {
      alert('نتیجه‌ای یافت نشد.');
    }
  }

  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    promptSearch();
  });
});

