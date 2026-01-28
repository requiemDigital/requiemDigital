// 🎥 Hover-triggered video playback
document.querySelectorAll(".service-card").forEach(card => {
  const video = card.querySelector(".service-video");
  card.addEventListener("mouseenter", () => video?.play());
  card.addEventListener("mouseleave", () => {
    video?.pause();
    video.currentTime = 0;
  });
});

// ✨ Fade-in animation for service cards
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.2 });

document.querySelectorAll(".service-card").forEach(card => observer.observe(card));

// 🌀 Sonar effect on links
const sonar = document.getElementById("sonar");

document.addEventListener("mousemove", event => {
  const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);

  // Check if the hovered element is an anchor tag
  if (hoveredElement && hoveredElement.tagName.toLowerCase() === "a") {
    sonar.style.display = "block";
    sonar.style.top = `${event.clientY - 25}px`;
    sonar.style.left = `${event.clientX - 25}px`;
  } else {
    sonar.style.display = "none";
  }
});

// 💬 Testimonials Carousel
const slideContainer = document.querySelector('.carousel-slide');
const slides = document.querySelectorAll('.testimonial');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let index = 0;
let interval = setInterval(autoSlide, 10000);

function updateSlide() {
  slides.forEach(slide => {
    slide.classList.remove('active');
    slide.style.opacity = "0";
  });
  slides[index].classList.add('active');
  slides[index].style.opacity = "1";
  slideContainer.style.transform = `translateX(-${index * 100}%)`;
}

function autoSlide() {
  index = (index + 1) % slides.length;
  updateSlide();
}

function resetTimer() {
  clearInterval(interval);
  interval = setInterval(autoSlide, 10000);
}

nextBtn.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlide();
  resetTimer();
});

prevBtn.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
  resetTimer();
});

let startX = 0;

slideContainer.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

slideContainer.addEventListener('touchmove', e => {
  const moveX = e.touches[0].clientX;
  const diff = startX - moveX;

  if (diff > 50) {
    index = (index + 1) % slides.length;
    updateSlide();
    resetTimer();
    startX = moveX;
  } else if (diff < -50) {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
    resetTimer();
    startX = moveX;
  }
});

// Constant variables for page theme

const toggleBtn = document.getElementById('theme-toggle');
const rootEl = document.documentElement;
const storageKey = 'site-theme';

//Initializing theme on page load

(function initTheme() {
	//1. Check localStorage
	const savedTheme = localStorage.getItem(storageKey);
	if (savedTheme) {
	rootEl.dataset.theme = savedTheme;
	} else {
		//2. Fallback to system preference.
		const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
		rootEl.dataset.theme = prefersLight ? 'light' : 'dark';
	}
	updateToggleLabel();
})();
//Toggle handler
toggleBtn.addEventListener('click', () => {
	const current = rootEl.dataset.theme === 'light' ? 'dark' : 'light';
	rootEl.dataset.theme = current;
	localStorage.setItem(storageKey, current);
	updateToggleLabel();
});

//Update button text/icon
function updateToggleLabel() {
	const theme = rootEl.dataset.theme;
	toggleBtn.innerHTML = theme === 'light' ? '🌙 <span>Dark Mode</span>'
    : '🔆 <span>Light Mode</span>';
}

window.matchMedia('(prefers-color-scheme: light)')
  .addEventListener('change', e => {
    if (!localStorage.getItem(storageKey)) {
      rootEl.dataset.theme = e.matches ? 'light' : 'dark';
      updateToggleLabel();
    }
  });
