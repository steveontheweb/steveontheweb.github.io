document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  root.dataset.bsTheme = 'dark';
  root.removeAttribute('data-theme-persisted');
  localStorage.removeItem('theme');

  const filterButtons = [...document.querySelectorAll('[data-writing-filter]')];
  const entries = [...document.querySelectorAll('[data-writing-index] [data-topics]')];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.writingFilter;

      filterButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      entries.forEach((entry) => {
        const topics = entry.dataset.topics.toLowerCase();
        const visible = filter === 'all' || topics.includes(filter);
        entry.hidden = !visible;
      });
    });
  });
});
