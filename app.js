/* ═══════════════════════════════════════════════════════════════════════════
   ASUS Vivobook Pro 15 OLED – Landing Page Scripts
   ═══════════════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Gallery ──────────────────────────────────────────────────────────── */
  const viewer  = document.getElementById('galleryViewer');
  const images  = viewer.querySelectorAll('img');
  const thumbs  = document.querySelectorAll('#galleryThumbs .thumb');
  const counter = document.getElementById('galleryCounter');
  let   current = 0;
  const total   = images.length;

  function goTo(idx) {
    images[current].classList.remove('active');
    thumbs[current].classList.remove('active');
    current = (idx + total) % total;
    images[current].classList.add('active');
    thumbs[current].classList.add('active');
    counter.textContent = `${current + 1} / ${total}`;
    thumbs[current].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  viewer.querySelector('.prev').addEventListener('click', () => goTo(current - 1));
  viewer.querySelector('.next').addEventListener('click', () => goTo(current + 1));
  thumbs.forEach((t, i) => t.addEventListener('click', () => goTo(i)));

  // Swipe táctil
  let touchStartX = 0;
  viewer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  viewer.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  /* ── Lightbox ─────────────────────────────────────────────────────────── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt || 'Imagen ampliada';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Imágenes de la galería principal
  images.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  // Imagen de la sección de estado (Condition) y portada
  const zoomableImages = document.querySelectorAll('.condition-img img, .hero-img-wrap img');
  zoomableImages.forEach(img => {
    img.addEventListener('click', () => openLightbox(img.src, img.alt));
  });

  // Cerrar con botón X
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  // Cerrar al hacer clic en el exterior de la imagen (fondo / overlay)
  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Cerrar con tecla Escape (Esc)
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      closeLightbox();
    }
  });

  /* ── Scroll reveal ────────────────────────────────────────────────────── */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

});
