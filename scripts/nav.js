document.addEventListener('DOMContentLoaded', function () {
  const sidebarNav = document.querySelector('.sidebar-nav ul');
  if (!sidebarNav) return;

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
    .catch(() => {
      // Keep existing static nav if fetch fails
    });
});

