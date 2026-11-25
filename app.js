const paperList = document.querySelector('#paper-list');
const paperCount = document.querySelector('#paper-count');
function renderPublications(filter = 'all') {
  const papers = window.publications.filter(paper => filter === 'all' || paper.category === filter);
  paperList.replaceChildren(...papers.map(paper => {
    const article = document.createElement('article');
    article.className = 'paper';
    const year = document.createElement('span');
    year.className = 'paper-year';
    year.textContent = paper.year;
    const body = document.createElement('div');
    const meta = document.createElement('p');
    meta.className = 'paper-meta';
    const venue = document.createElement('span');
    venue.textContent = paper.venue;
    const type = document.createElement('small');
    type.textContent = paper.type;
    meta.append(venue, type);
    const title = document.createElement('h3');
    title.textContent = paper.title;
    const role = document.createElement('p');
    role.className = 'paper-role';
    role.textContent = `高利剑 · ${paper.role}`;
    const details = document.createElement('details');
    const summary = document.createElement('summary');
    summary.textContent = '研究主题';
    const note = document.createElement('p');
    note.textContent = paper.note;
    details.append(summary, note);
    const search = document.createElement('a');
    search.className = 'paper-link';
    search.href = `https://scholar.google.com/scholar?q=${encodeURIComponent(paper.title)}`;
    search.textContent = '学术检索';
    search.target = '_blank';
    search.rel = 'noopener noreferrer';
    search.setAttribute('aria-label', `学术检索：${paper.title}`);
    body.append(meta, title, role, details);
    article.append(year, body, search);
    return article;
  }));
  paperCount.textContent = `${papers.length} 篇论文`;
}
renderPublications();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(item => {
    item.classList.toggle('active', item === button);
    item.setAttribute('aria-pressed', String(item === button));
  });
  renderPublications(button.dataset.filter);
}));

const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('academic-theme'); } catch {}
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-label', theme === 'dark' ? '切换浅色模式' : '切换深色模式');
  themeButton.title = themeButton.getAttribute('aria-label');
}
setTheme(savedTheme || (systemTheme.matches ? 'dark' : 'light'));
themeButton.addEventListener('click', () => {
  savedTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(savedTheme);
  try { localStorage.setItem('academic-theme', savedTheme); } catch {}
});
systemTheme.addEventListener('change', event => { if (!savedTheme) setTheme(event.matches ? 'dark' : 'light'); });

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '展开导航');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '收起导航' : '展开导航');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
const navLinks = navigation.querySelectorAll('a');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }), { rootMargin: '-12% 0px -50% 0px' });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}

// 确定性的概念声波，不表示实际实验数据。
const waveform = document.querySelector('#waveform');
for (let i = 0; i < 69; i++) {
  const bar = document.createElement('i');
  const envelope = Math.exp(-Math.pow((i - 34) / 21, 2));
  const amplitude = (0.3 + 0.7 * Math.abs(Math.sin(i * 1.73))) * envelope;
  bar.style.setProperty('--height', `${12 + amplitude * 220}px`);
  bar.style.setProperty('--delay', `${i * -0.035}s`);
  waveform.append(bar);
}
document.querySelector('#copyright-year').textContent = new Date().getFullYear();
