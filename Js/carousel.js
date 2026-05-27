export function initCarousel() {
	const track = document.getElementById('carouselTrack');
	const dots = document.querySelectorAll('.dot');
	const slides = document.querySelectorAll('.carousel-slide');

	if (!track) return;

	let currentIndex = 0;
	const totalSlides = slides.length;

	function updateCarousel(index) {
		track.style.transform = `translateX(-${index * 100}%)`;

		dots.forEach((dot, i) => {
			dot.classList.toggle('active', i === index);
		});

		currentIndex = index;
	}

	dots.forEach((dot, index) => {
		dot.addEventListener('click', () => {
			updateCarousel(index);
		});
	});

	let autoSlide = setInterval(() => {
		updateCarousel((currentIndex + 1) % totalSlides);
	}, 5000);

	const promoSection = document.querySelector('.promo-section');

	promoSection?.addEventListener('mouseenter', () => {
		clearInterval(autoSlide);
	});

	promoSection?.addEventListener('mouseleave', () => {
		autoSlide = setInterval(() => {
			updateCarousel((currentIndex + 1) % totalSlides);
		}, 5000);
	});
}