// Fuzzy search with Fuse.js over current page content
document.addEventListener('DOMContentLoaded', function () {
  const searchBtn = document.querySelector('.search-btn');
  if (!searchBtn || !window.Fuse) return;

  // Build a small index from headings/paragraphs/lists
  const nodes = Array.from(document.querySelectorAll('h1, h2, h3, p, li'))
    .filter(n => (n.textContent || '').trim().length > 0);

  const items = nodes.map((el, i) => {
    if (!el.id) el.id = 's-' + i.toString(36);
    return { id: el.id, text: (el.textContent || '').trim() };
  });

  const fuse = new window.Fuse(items, {
    keys: ['text'],
    threshold: 0.35,
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  function doSearch() {
    const q = window.prompt('جستجو (حداقل دو حرف):', '');
    if (!q || q.trim().length < 2) return;
    const results = fuse.search(q.trim());
    if (!results || results.length === 0) {
      alert('نتیجه‌ای یافت نشد.');
      return;
    }
    const best = results[0].item;
    const target = document.getElementById(best.id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.outline = '2px solid var(--color-primary)';
      setTimeout(() => (target.style.outline = ''), 1600);
    }
  }

  searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    doSearch();
  });
});

