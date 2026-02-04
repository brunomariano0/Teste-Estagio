

document.addEventListener('DOMContentLoaded', () => {  
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  if (!window.anime) {    
    document.querySelectorAll('.services-header, .service-card, .about-image, .about-content, .faq-header, .faq-item, .promo-card, .promo-left, .info-title')
      .forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }

  
  const revealSelector = '.info-title, .services-header, .service-card, .about-image, .about-content, .faq-header, .faq-item, .promo-card, .promo-left';
  const reveals = document.querySelectorAll(revealSelector);

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.willChange = 'transform, opacity';
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      if (el.classList.contains('service-card')) {
        // efeito em grade com stagger suave
        anime({
          targets: '.services-grid .service-card',
          opacity: [0, 1],
          translateY: [12, 0],
          easing: 'easeOutSine',
          duration: 900,
          delay: anime.stagger(140, { start: 60 })
        });
      } else {
        anime({
          targets: el,
          opacity: [0, 1],
          translateY: [12, 0],
          easing: 'easeOutSine',
          duration: 900,
          delay: 80
        });
      }

      obs.unobserve(el);
    });
  }, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

  reveals.forEach(el => observer.observe(el));

  // CTA: flutuação sutil
  const cta = document.querySelector('.promo-cta-button');
  if (cta) {
    anime({
      targets: cta,
      translateY: [0, -6],
      easing: 'easeInOutSine',
      duration: 2400,
      direction: 'alternate',
      loop: true
    });
  }

  // Hover suave nos service-cards
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      anime.remove(card);
      anime({ targets: card, scale: 1.02, duration: 320, easing: 'easeOutSine' });
    });
    card.addEventListener('mouseleave', () => {
      anime.remove(card);
      anime({ targets: card, scale: 1, duration: 420, easing: 'easeOutSine' });
    });
  });

  // Parallax muito sutil na promo-card baseado no mouse
  const promoWrap = document.querySelector('.promo-wrap');
  const promoCard = document.querySelector('.promo-card');
  if (promoWrap && promoCard) {
    promoWrap.addEventListener('mousemove', (e) => {
      const rect = promoWrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const tx = (x - 0.5) * 6; // deslocamento reduzido
      const ty = (y - 0.5) * 4;

      anime.remove(promoCard);
      anime({ targets: promoCard, translateX: tx, translateY: ty, rotate: tx / 30, duration: 360, easing: 'easeOutQuad' });
    });

    promoWrap.addEventListener('mouseleave', () => {
      anime.remove(promoCard);
      anime({ targets: promoCard, translateX: 0, translateY: 0, rotate: 0, duration: 700, easing: 'easeOutElastic(1, .7)' });
    });
  }

  // Header opacidade suave ao rolar
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const sc = Math.min(1, window.scrollY / 600);
    if (header) header.style.opacity = String(1 - sc * 0.18);
  }, { passive: true });

});