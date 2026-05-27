export function initTheme() {
	const themeToggle = document.getElementById('themeToggle');

	if (!themeToggle) return;

	if (localStorage.getItem('theme') === 'dark') {
		document.body.classList.add('dark-theme');
		themeToggle.textContent = '☀️';
	}

	themeToggle.addEventListener('click', () => {
		document.body.classList.toggle('dark-theme');

		const isDark = document.body.classList.contains('dark-theme');

		themeToggle.textContent = isDark ? '☀️' : '🌙';

		localStorage.setItem('theme', isDark ? 'dark' : 'light');
	});
}