import { initTheme } from './theme.js';
import { initMenu } from './menu.js';
import { initCarousel } from './carousel.js';
import { initBooking } from './valid.js';

document.addEventListener('DOMContentLoaded', () => {
	initTheme();
	initMenu();
	initCarousel();
	initBooking();
});