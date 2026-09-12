(() => {
  'use strict';

  const bookingUrl = 'https://www.booking.com/hotel/rs/vila-stevia.html';
  const formEndpoint = 'https://script.google.com/macros/s/AKfycbwM_zjT7NCVsRLQDV-AlOotI4jDktciNvrjENibk_jQEdDylf3Q0lm51V2Z__XaGjGy_A/exec';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];

  const menuButton = qs('.menu-toggle');
  const mobileMenu = qs('#mobile-menu');
  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('is-open');
      menuButton.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    qsa('a', mobileMenu).forEach(link => link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }));
  }

  const form = qs('#booking-form');
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem('vila-stevic-booking') || '{}'); } catch { return {}; }
  })();
  if (form) {
    ['dolazak', 'odlazak', 'odrasli', 'deca'].forEach(name => {
      const field = qs(`[name="${name}"]`, form);
      if (field && stored[name]) field.value = stored[name];
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      if (data.dolazak && data.odlazak && data.odlazak <= data.dolazak) {
        const status = qs('.booking-status', form);
        if (status) status.textContent = 'Odjava mora biti posle dolaska.';
        return;
      }
      try { localStorage.setItem('vila-stevic-booking', JSON.stringify(data)); } catch {}
      const params = new URLSearchParams();
      if (data.dolazak) params.set('checkin', data.dolazak);
      if (data.odlazak) params.set('checkout', data.odlazak);
      if (data.odrasli) params.set('group_adults', data.odrasli);
      if (data.deca) params.set('group_children', data.deca);
      window.open(`${bookingUrl}?${params.toString()}`, '_blank', 'noopener');
    });
  }
  qsa('[data-booking-link]').forEach(link => {
    link.href = bookingUrl;
    link.addEventListener('click', () => {
      if (!form) return;
      const data = Object.fromEntries(new FormData(form).entries());
      try { localStorage.setItem('vila-stevic-booking', JSON.stringify(data)); } catch {}
    });
  });

  const inquiry = qs('#inquiry-form');
  if (inquiry) {
    inquiry.addEventListener('submit', event => {
      event.preventDefault();
      const data = Object.fromEntries(new FormData(inquiry).entries());
      const subject = encodeURIComponent('Upit za Vila & SPA Stević');
      const body = encodeURIComponent(
        `Ime: ${data.ime || ''}\nE-mail: ${data.email || ''}\nTelefon: ${data.telefon || ''}\nPoruka:\n${data.poruka || ''}`
      );
      const status = qs('.form-status', inquiry);
      if (status) status.textContent = 'Šaljemo vaš upit…';
      fetch(formEndpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: new URLSearchParams(data).toString()
      }).then(() => {
        if (status) status.textContent = 'Hvala — vaš upit je poslat. Javićemo vam se direktno.';
        inquiry.reset();
      }).catch(() => {
        if (status) status.textContent = 'Otvaramo vaš program za e-mail…';
        window.location.href = `mailto:vilastevic@gmail.com?subject=${subject}&body=${body}`;
      });
    });
  }

  const lightbox = qs('#lightbox');
  if (lightbox) {
    const lightboxImage = qs('img', lightbox);
    const caption = qs('.lightbox-caption', lightbox);
    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    };
    qsa('[data-lightbox]').forEach(trigger => trigger.addEventListener('click', () => {
      const image = qs('img', trigger);
      if (!image) return;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      if (caption) caption.textContent = image.alt;
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    }));
    qs('.lightbox-close', lightbox)?.addEventListener('click', close);
    lightbox.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape') close(); });
  }

  if (!reducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .12 });
    qsa('.reveal').forEach(element => observer.observe(element));
  } else {
    qsa('.reveal').forEach(element => element.classList.add('is-visible'));
  }
})();
