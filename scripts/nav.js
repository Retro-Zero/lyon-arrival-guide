document.addEventListener('DOMContentLoaded', function () {
  const sidebarNav = document.querySelector('.sidebar-nav ul');
  if (!sidebarNav) return;

  // If we're on a content page with multiple sections, build a local ToC
  const headings = Array.from(document.querySelectorAll('main h2[id]'));
  if (headings.length && location.pathname.includes('/pages/fa/pre-arrival.html')) {
    sidebarNav.innerHTML = '';
    headings.forEach(h => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = h.textContent || '';
      a.href = '#' + h.id;
      li.appendChild(a);
      sidebarNav.appendChild(li);
    });
    return;
  }

  const prefix = location.pathname.includes('/pages/') ? '../../' : '';
  fetch(prefix + 'data/toc.json')
    .then(r => r.json())
    .then(data => {
      const items = (data && data.fa) || [];
      sidebarNav.innerHTML = '';
      const current = location.pathname.replace(/\\/g, '/');
      items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = item.title;
        a.href = item.path;
        if (current.endsWith(item.path)) {
          a.setAttribute('aria-current', 'page');
        }
        li.appendChild(a);
        sidebarNav.appendChild(li);
      });
    })
    .catch(() => { /* keep static nav if fetch fails */ });
});

