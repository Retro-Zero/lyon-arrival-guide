document.addEventListener('DOMContentLoaded', function () {
  const list = document.querySelector('.checklist');
  if (!list) return;
  const key = 'checklist:' + location.pathname;
  const saved = JSON.parse(localStorage.getItem(key) || '{}');

  list.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
    const id = cb.id;
    if (id && saved[id]) {
      cb.checked = true;
      const label = list.querySelector('label[for="' + id + '"]');
      if (label) label.classList.add('done');
    }
    cb.addEventListener('change', () => {
      const label = list.querySelector('label[for="' + cb.id + '"]');
      if (cb.checked) {
        saved[cb.id] = true;
        label && label.classList.add('done');
      } else {
        delete saved[cb.id];
        label && label.classList.remove('done');
      }
      localStorage.setItem(key, JSON.stringify(saved));
    });
  });
});


