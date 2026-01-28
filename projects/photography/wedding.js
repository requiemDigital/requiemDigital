document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', anchor.getAttribute('href'));
    }
  });
});

const jars = document.querySelectorAll('.masonJar');
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('.lightboxImg');
const lbCaption = lightbox.querySelector('.lightboxCaption');
const closeBtn = lightbox.querySelector('.closeBtn');

// open lightbox
jars.forEach(jar => {
  const open = () => {
    const src = jar.dataset.fullsrc;
    const caption = jar.dataset.caption;
    lbImg.src = src;
    lbImg.alt = caption;
    lbCaption.textContent = caption;
    lightbox.classList.remove('hidden');
    closeBtn.focus();
  };

  jar.addEventListener('click', open);
  jar.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') open();
  });
});

// close lightbox
const closeLightbox = () => {
  lightbox.classList.add('hidden');
  lbImg.src = '';
};

closeBtn.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
    closeLightbox();
  }
});

//Service section interactivity

const cards = document.querySelectorAll('.serviceCard');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('isVisible', entry.isIntersecting);
  });
}, { threshold: 0.25 });

cards.forEach(card => observer.observe(card));

//Testimonials carousel functionality

document.addEventListener('DOMContentLoaded', () => {
  const carouselWrapper = document.querySelector('.carouselWrapper');
  if (!carouselWrapper) {
    console.warn('Carousel wrapper not found');
    return;
  }

  const list = carouselWrapper.querySelector('.testimonialsList');
  const slides = Array.from(list.children);
  const prevBtn = carouselWrapper.querySelector('.carouselNav.prev');
  const nextBtn = carouselWrapper.querySelector('.carouselNav.next');
  const dots = Array.from(carouselWrapper.querySelectorAll('.carouselDot'));
  let currentIndex = 0;
  let autoCycle;

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    list.style.transform = `translateX(-${100 * currentIndex}%)`;
    dots.forEach(dot => {
      dot.setAttribute('aria-selected', Number(dot.dataset.slide) === currentIndex);
    });
  }

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  dots.forEach(dot =>
    dot.addEventListener('click', () => goToSlide(Number(dot.dataset.slide)))
  );

  function startAutoCycle() {
    autoCycle = setInterval(() => goToSlide(currentIndex + 1), 5000);
  }
  function stopAutoCycle() {
    clearInterval(autoCycle);
  }

  carouselWrapper.addEventListener('mouseenter', stopAutoCycle);
  carouselWrapper.addEventListener('mouseleave', startAutoCycle);

  goToSlide(0);
  startAutoCycle();

  // Optional: scroll-triggered fade-in
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('isVisible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document
    .querySelectorAll('.fadeInTarget')
    .forEach(el => observer.observe(el));
});

//Contact form validation functionality 

const form = document.getElementById('contactForm');
const fields = ['name', 'email', 'message'];

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  fields.forEach(fieldName => {
    const field = form[fieldName];
    const error = field.nextElementSibling;
    if (!field.checkValidity()) {
      valid = false;
      error.textContent = field.validationMessage;
      field.classList.add('input-error');
    } else {
      error.textContent = '';
      field.classList.remove('input-error');
    }
  });

  if (valid) {
    // TODO: hook into your email service or API
    form.reset();
    alert('Thanks! Your message has been sent.');
  }
});

