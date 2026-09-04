document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const resolveTheme = (mode) => {
    if (mode !== 'system') return mode;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const applyTheme = (mode) => {
    root.dataset.bsTheme = resolveTheme(mode);
    root.toggleAttribute('data-theme-persisted', mode !== 'system');

    if (mode === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', mode);
    }
  };

  const savedTheme = localStorage.getItem('theme');
  if (!root.dataset.bsTheme) applyTheme(savedTheme || 'system');

  document.querySelectorAll('#mode-toggle + .dropdown-menu [data-theme-mode]').forEach((button) => {
    button.addEventListener('click', () => applyTheme(button.dataset.themeMode));
  });

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
