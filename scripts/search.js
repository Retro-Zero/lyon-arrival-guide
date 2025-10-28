// Fuzzy search with Fuse.js over current page content
document.addEventListener('DOMContentLoaded', function () {
  if (!window.Fuse) return;
  const searchBtn = document.querySelector('.search-btn');
  const overlay = document.getElementById('search-overlay');
  const modal = document.getElementById('search-modal');
  const input = document.getElementById('search-input');
  const closeBtn = document.getElementById('search-close');
  const resultsEl = document.getElementById('search-results');
  if (!searchBtn || !overlay || !modal || !input || !resultsEl) return;

  // Build index
  const nodes = Array.from(document.querySelectorAll('h1, h2, h3, p, li'))
    .filter(n => (n.textContent || '').trim().length > 0);
  const items = nodes.map((el, i) => {
    if (!el.id) el.id = 's-' + i.toString(36);
    return { id: el.id, text: (el.textContent || '').trim(), title: el.closest('article') ? (document.querySelector('h1')?.textContent || '') : '' };
  });
  const fuse = new window.Fuse(items, { keys: ['text'], threshold: 0.35, ignoreLocation: true, minMatchCharLength: 2 });

  function openModal() {
    overlay.hidden = false; modal.hidden = false;
    overlay.classList.add('open');
    input.value = '';
    resultsEl.innerHTML = '';
    input.focus();
  }
  function closeModal() {
    overlay.classList.remove('open');
    overlay.hidden = true; modal.hidden = true;
  }
  function renderResults(list) {
    resultsEl.innerHTML = '';
    list.slice(0, 12).forEach((r, idx) => {
      const el = document.createElement('div');
      el.className = 'search-result' + (idx === 0 ? ' active' : '');
      el.setAttribute('role', 'option');
      el.dataset.targetId = r.item.id;
      const title = document.createElement('div');
      title.className = 'search-result-title';
      title.textContent = r.item.title || document.title.replace(' | سلام لیون','');
      const snippet = document.createElement('p');
      snippet.className = 'search-result-snippet';
      snippet.textContent = r.item.text.slice(0, 140) + (r.item.text.length > 140 ? '…' : '');
      el.appendChild(title); el.appendChild(snippet);
      el.addEventListener('click', () => goTo(el.dataset.targetId));
      resultsEl.appendChild(el);
    });
  }
  function goTo(id) {
    closeModal();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      target.style.outline = '2px solid var(--color-primary)';
      setTimeout(() => (target.style.outline = ''), 1600);
    }
  }

  searchBtn.addEventListener('click', (e) => { e.preventDefault(); openModal(); });
  closeBtn?.addEventListener('click', () => closeModal());
  overlay.addEventListener('click', () => closeModal());

  input.addEventListener('input', () => {
    const q = input.value.trim();
    if (q.length < 2) { resultsEl.innerHTML = ''; return; }
    const results = fuse.search(q);
    renderResults(results);
  });

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') return closeModal();
    const items = Array.from(resultsEl.querySelectorAll('.search-result'));
    if (!items.length) return;
    const current = items.findIndex(el => el.classList.contains('active'));
    if (e.key === 'ArrowDown') {
      const next = (current + 1) % items.length;
      items[current]?.classList.remove('active'); items[next].classList.add('active');
      items[next].scrollIntoView({ block: 'nearest' });
      e.preventDefault();
    } else if (e.key === 'ArrowUp') {
      const prev = (current - 1 + items.length) % items.length;
      items[current]?.classList.remove('active'); items[prev].classList.add('active');
      items[prev].scrollIntoView({ block: 'nearest' });
      e.preventDefault();
    } else if (e.key === 'Enter') {
      const active = items[current] || items[0];
      if (active) goTo(active.dataset.targetId);
    }
  });
});

