const modal = document.getElementById('bookingModal');
const successModal = document.getElementById('successModal');
const closeBtn = document.querySelector('.close-btn');
const closeSuccess = document.querySelector('.close-success');
const form = document.getElementById('bookingForm');
const restaurantSelect = document.getElementById('restaurant');
const tablesCountInput = document.getElementById('tablesCount');

const defaultTables = {
	'Адрес1': 35,
	'Адрес2': 28,
	'Адрес3': 21
};

let availableTables =
	JSON.parse(localStorage.getItem('availableTables')) || { ...defaultTables };

function saveTables() {
	localStorage.setItem(
		'availableTables',
		JSON.stringify(availableTables)
	);
}

function updateTablesDisplay() {
	const options = restaurantSelect.options;

	for (let i = 0; i < options.length; i++) {
		const option = options[i];
		const address = option.value;

		if (address && availableTables[address] !== undefined) {
			const freeCount = availableTables[address];

			let text = '';

			if (address === 'Адрес1') {
				text = `Адрес1 (свободно: ${freeCount})`;
			}

			if (address === 'Адрес2') {
				text = `Адрес2 (свободно: ${freeCount})`;
			}

			if (address === 'Адрес3') {
				text = `Адрес3 (свободно: ${freeCount})`;
			}

			option.textContent = text;

			if (freeCount <= 0) {
				option.disabled = true;
			} else {
				option.disabled = false;
			}
		}
	}
}

function openModal() {
	modal.style.display = 'flex';

	document.body.classList.add('modal-open');

	setTimeout(() => {
		modal.classList.add('show');
	}, 10);
}

function closeModal() {
	modal.classList.remove('show');

	setTimeout(() => {
		modal.style.display = 'none';
		document.body.classList.remove('modal-open');
	}, 300);
}

function openSuccessModal() {
	successModal.style.display = 'flex';

	setTimeout(() => {
		successModal.classList.add('show');
	}, 10);
}

function closeSuccessModal() {
	successModal.classList.remove('show');

	setTimeout(() => {
		successModal.style.display = 'none';
	}, 300);
}

export function initBooking() {

	updateTablesDisplay();

	restaurantSelect.addEventListener('change', function () {

		const address = this.value;

		if (address && availableTables[address] !== undefined) {

			const maxAvailable = availableTables[address];

			tablesCountInput.max = maxAvailable;
			tablesCountInput.placeholder = `Доступно: ${maxAvailable}`;
			tablesCountInput.value = '';

		} else {

			tablesCountInput.max = 10;
			tablesCountInput.placeholder = 'Сколько столов?';
		}

		document.getElementById('tablesCountError').textContent = '';
		tablesCountInput.style.borderColor = '#e5c8b0';
	});

	document.querySelectorAll('.btn-book, .nav-book-link')
		.forEach(btn => {

			btn.addEventListener('click', (e) => {

				e.preventDefault();

				openModal();

				updateTablesDisplay();

				restaurantSelect.value = '';
				tablesCountInput.value = '';
				tablesCountInput.max = 10;
				tablesCountInput.placeholder = 'Сколько столов?';

				clearErrors();
			});
		});

	if (closeBtn) {
		closeBtn.onclick = closeModal;
	}

	if (closeSuccess) {
		closeSuccess.onclick = closeSuccessModal;
	}

	window.addEventListener('click', (e) => {

		if (e.target === modal) {
			closeModal();
		}

		if (e.target === successModal) {
			closeSuccessModal();
		}
	});
}

function clearErrors() {

	document.querySelectorAll('.error')
		.forEach(el => el.textContent = '');

	document.querySelectorAll('input, select')
		.forEach(el => el.style.borderColor = '#e5c8b0');
}

function validatePhone(phone) {

	const digits = phone.replace(/\D/g, '');

	return digits.length === 11;
}

if (form) {

	form.onsubmit = (e) => {

		e.preventDefault();

		const name = document.getElementById('name');
		const phone = document.getElementById('phone');
		const restaurant = document.getElementById('restaurant');
		const tablesCount = document.getElementById('tablesCount');

		let isValid = true;

		if (!name.value.trim()) {

			document.getElementById('nameError').textContent =
				'Введите имя';

			name.style.borderColor = '#dc2626';

			isValid = false;

		} else {

			document.getElementById('nameError').textContent = '';

			name.style.borderColor = '#e5c8b0';
		}

		if (!validatePhone(phone.value)) {

			document.getElementById('phoneError').textContent =
				'Введите 11 цифр';

			phone.style.borderColor = '#dc2626';

			isValid = false;

		} else {

			document.getElementById('phoneError').textContent = '';

			phone.style.borderColor = '#e5c8b0';
		}

		const address = restaurant.value;

		if (!address) {

			document.getElementById('restaurantError').textContent =
				'Выберите ресторан';

			restaurant.style.borderColor = '#dc2626';

			isValid = false;

		} else {

			document.getElementById('restaurantError').textContent = '';

			restaurant.style.borderColor = '#e5c8b0';
		}

		const count = parseInt(tablesCount.value);

		const maxAvailable = availableTables[address];

		if (!count || count < 1) {

			document.getElementById('tablesCountError').textContent =
				'Введите количество столов';

			tablesCount.style.borderColor = '#dc2626';

			isValid = false;

		} else if (count > maxAvailable) {

			document.getElementById('tablesCountError').textContent =
				`Доступно только ${maxAvailable} столов`;

			tablesCount.style.borderColor = '#dc2626';

			isValid = false;

		} else {

			document.getElementById('tablesCountError').textContent = '';

			tablesCount.style.borderColor = '#e5c8b0';
		}

		if (isValid) {

			availableTables[address] -= count;

			saveTables();

			updateTablesDisplay();

			closeModal();

			setTimeout(() => {
				openSuccessModal();
			}, 300);

			form.reset();

			tablesCountInput.max = 10;

			tablesCountInput.placeholder = 'Сколько столов?';

			setTimeout(() => {
				closeSuccessModal();
			}, 2500);
		}
	};
}