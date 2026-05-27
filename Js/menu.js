const menuData = [

	{ name: "Цезарь с курицей", desc: "Курица, пармезан, соус цезарь, гренки", price: "450 ₽", category: "salads" },
	{ name: "Греческий салат", desc: "Фета, оливки, огурцы, перец, лук", price: "380 ₽", category: "salads" },
	{ name: "Оливье", desc: "Классический рецепт с перепелиным яйцом", price: "320 ₽", category: "salads" },
	{ name: "Салат с лососем", desc: "Слабосоленый лосось, авокадо, микс салата", price: "580 ₽", category: "salads" },
	{ name: "Борщ", desc: "Со сметаной и пампушками", price: "340 ₽", category: "soups" },
	{ name: "Томатный суп", desc: "С базиликом и пармезаном", price: "290 ₽", category: "soups" },
	{ name: "Суп-пюре грибной", desc: "Из белых грибов со сливками", price: "370 ₽", category: "soups" },
	{ name: "Солянка", desc: "Мясная сборная с лимоном и маслинами", price: "390 ₽", category: "soups" },
	{ name: "Стейк из говядины", desc: "Каменный уголь, соус демиглас", price: "890 ₽", category: "hot" },
	{ name: "Лосось на гриле", desc: "С овощами и цитрусовым соусом", price: "790 ₽", category: "hot" },
	{ name: "Паста Карбонара", desc: "С беконом и пармезаном", price: "490 ₽", category: "hot" },
	{ name: "Свиные ребрышки", desc: "В медово-горчичном соусе", price: "690 ₽", category: "hot" },
	{ name: "Утиная грудка", desc: "С ягодным соусом и запеченным картофелем", price: "850 ₽", category: "hot" },
	{ name: "Тирамису", desc: "Классический итальянский десерт", price: "320 ₽", category: "desserts" },
	{ name: "Чизкейк", desc: "Нью-йорк с ягодным соусом", price: "290 ₽", category: "desserts" },
	{ name: "Медовик", desc: "Нежный торт по домашнему рецепту", price: "280 ₽", category: "desserts" },
	{ name: "Панна-котта", desc: "Ванильная с малиновым кули", price: "270 ₽", category: "desserts" },
	{ name: "Наполеон", desc: "Слойка с заварным кремом", price: "310 ₽", category: "desserts" },
	{ name: "Капучино", desc: "Итальянский кофе с пышной пенкой", price: "180 ₽", category: "drinks" },
	{ name: "Лимонад", desc: "Домашний, с мятой и имбирем", price: "220 ₽", category: "drinks" },
	{ name: "Фруктовый чай", desc: "Авторский чай с бергамотом", price: "190 ₽", category: "drinks" },
	{ name: "Просекко", desc: "Итальянское игристое", price: "390 ₽", category: "drinks" },
	{ name: "Морс", desc: "Клюквенный, домашний", price: "160 ₽", category: "drinks" }
];


function renderDishes(filter = 'all') {
	const dishesList = document.getElementById('dishesList');
	if (!dishesList) return;

	let filteredDishes = menuData;
	if (filter !== 'all') {
		filteredDishes = menuData.filter(dish => dish.category === filter);
	}

	dishesList.innerHTML = '';

	filteredDishes.forEach(dish => {
		const dishItem = document.createElement('div');
		dishItem.className = 'dish-item';
		dishItem.innerHTML = `
			<div class="dish-info">
				<div class="dish-name">${dish.name}</div>
				<div class="dish-desc">${dish.desc}</div>
			</div>
			<div class="dish-price">${dish.price}</div>
		`;
		dishesList.appendChild(dishItem);
	});
}

function openMenuModal() {
	const menuModal = document.getElementById('menuModal');
	menuModal.style.display = 'flex';
	document.body.classList.add('modal-open');
	setTimeout(() => {
		menuModal.classList.add('show');
	}, 10);
	renderDishes('all');
}

function closeMenuModal() {
	const menuModal = document.getElementById('menuModal');
	menuModal.classList.remove('show');
	setTimeout(() => {
		menuModal.style.display = 'none';
		document.body.classList.remove('modal-open');
	}, 300);
}

function initFilters() {
	const filterBtns = document.querySelectorAll('.filter-btn');

	filterBtns.forEach(btn => {
		btn.addEventListener('click', () => {
			filterBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			const filter = btn.dataset.filter;
			renderDishes(filter);
		});
	});
}

export function initMenu() {
	initFilters();

	document.querySelectorAll('.btn-menu, .nav-menu-link')
		.forEach(btn => {
			btn.addEventListener('click', (e) => {
				e.preventDefault();
				openMenuModal();
			});
		});

	const closeMenuBtn = document.querySelector('.close-menu-btn');

	if (closeMenuBtn) {
		closeMenuBtn.onclick = closeMenuModal;
	}

	window.addEventListener('click', (e) => {
		const menuModal = document.getElementById('menuModal');

		if (e.target === menuModal) {
			closeMenuModal();
		}
	});
}