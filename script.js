// Marca que o JS está ativo (o CSS só esconde .reveal nesse caso)
document.documentElement.classList.add('js');

// Header: sombra ao rolar
const header = document.querySelector('.site-header');
const waFloat = document.querySelector('.wa-float');

const onScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 8);
  if (waFloat) waFloat.classList.toggle('show', window.scrollY > window.innerHeight * 0.7);
};

onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Menu mobile
const nav = document.getElementById('nav');
const menuBtn = document.querySelector('.menu-btn');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  });
}

// Animação de entrada
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const items = document.querySelectorAll('.reveal');

if (reduceMotion || !('IntersectionObserver' in window)) {
  items.forEach((el) => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach((el) => io.observe(el));
}

// Ano no rodapé
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();
