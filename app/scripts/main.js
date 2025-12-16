let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
let tablet = window.matchMedia('(min-width: 769px)');
let desktop = window.matchMedia('(min-width: 1025px)');

//
// Mobile menu
//

// const header = document.querySelector('.header'),
// 	headerBurger = document.querySelector('.header__burger'),
// 	headerOverlay = document.querySelector('.header__overlay'),
// 	headerClose = document.querySelector('.header__menu-close');

// function toggleMobileMenu(e) {
// 	header.classList.toggle('header-mobile-menu');
// 	document.body.classList.toggle('overflow-hidden');
// 	headerOverlay.classList.toggle('header__overlay--show');
// }

// headerBurger.addEventListener('click', toggleMobileMenu);
// headerClose.addEventListener('click', toggleMobileMenu);
// headerOverlay.addEventListener('click', toggleMobileMenu);

//
// Modals
//

// let modals = document.querySelectorAll('.modal');
// let modalButtons = document.querySelectorAll('[data-modal]');
// let closeButtons = document.querySelectorAll('[data-close-modal]');

// function openModal(modalId, modalTitle, modalText) {
// 	let modal = document.getElementById(modalId);

// 	if ((modalId, modalTitle)) {
// 		modal.querySelector('.modal__title').textContent = modalTitle;
// 		modal.querySelector('.modal__text').textContent = modalText;
// 	}

// 	modal.style.display = 'flex';
// 	modal.classList.add('modal--open');
// 	document.body.style.overflow = 'hidden';

// 	setTimeout(function () {
// 		modal.querySelector('.modal__square').style.transform = 'translateY(0)';
// 		modal.querySelector('.modal__square').style.opacity = '1';
// 	}, 10);
// }

// function closeModal(modalId) {
// 	let modal = document.getElementById(modalId);
// 	modal.querySelector('.modal__square').style.transform = 'translateY(20px)';
// 	modal.querySelector('.modal__square').style.opacity = '0';
// 	modal.classList.remove('modal--open');
// 	document.body.style.overflow = '';

// 	setTimeout(function () {
// 		modal.style.display = 'none';
// 	}, 300);
// }

// modalButtons.forEach(function (button) {
// 	button.addEventListener('click', function () {
// 		let modalId = button.getAttribute('data-modal');

// 		openModal(modalId);
// 	});
// });

// closeButtons.forEach(function (button) {
// 	button.addEventListener('click', function () {
// 		let modalId = document.querySelector('.modal--open').getAttribute('id');
// 		closeModal(modalId);
// 	});
// });

// window.addEventListener('click', function (event) {
// 	if (event.target.classList.contains('modal')) {
// 		let modalId = event.target.getAttribute('id');
// 		closeModal(modalId);
// 	}
// });

document.querySelectorAll('.solutions__card').forEach(card => {
    const cardInner = card.querySelector('.solutions__card-inner');
    const cardText = card.querySelector('.solutions__card-text');

    card.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
            cardInner.classList.add('is-hover');
            cardText.style.maxHeight = cardText.scrollHeight + 'px';
            cardText.style.opacity = '1';
            cardText.style.transform = 'translateY(0)';
        }
    });

    card.addEventListener('mouseleave', () => {
        if (window.innerWidth >= 1024) {
            cardInner.classList.remove('is-hover');
            cardText.style.maxHeight = '0';
            cardText.style.opacity = '0';
            cardText.style.transform = 'translateY(15px)';
        }
    });
});

//
// Sliders
//

let sliderSteps = new Swiper('.solutions__slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
});

let sliderSpecies = new Swiper('.species__slider', {
    loop: false,
    slidesPerView: 1.2,
    spaceBetween: 20,
});

let sliderBenefits = new Swiper('.benefits__slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
});

let sliderStats = new Swiper('.stats__slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
});

let sliderPartners = new Swiper('.partners__slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
});

let sliderServices = new Swiper('.services__slider', {
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
});

if (desktop.matches) {
    sliderSpecies.destroy();
    sliderBenefits.destroy();
}

if (tablet.matches) {
    sliderPartners.destroy();
}

// 
// Custom select
//

let customSelects = document.querySelectorAll('.select');

customSelects.forEach(function (customSelect) {
    let selectedValueInput = customSelect.querySelector('.select__input');
    let selectBtn = customSelect.querySelector('.select__btn');
    let selectDropdown = customSelect.querySelector('.select__dropdown');

    selectBtn.addEventListener('click', function (e) {
        e.target.classList.toggle('is-active')
        selectDropdown.classList.toggle('select__dropdown--hide');
    });

    selectDropdown.querySelectorAll('.select__dropdown-option').forEach(function (option) {
        option.addEventListener('click', function () {
            selectDropdown.querySelector('.option-active').classList.remove('option-active');

            let selectedValue = option.getAttribute('data-value');
            let selectedText = option.textContent;

            selectedValueInput.value = selectedValue;
            selectBtn.innerHTML = selectedText;

            option.classList.add('option-active');
            selectBtn.classList.remove('is-active')
            selectDropdown.classList.add('select__dropdown--hide');
        });
    });

    document.addEventListener('click', function (e) {
        if (!customSelect.contains(e.target)) {
            selectDropdown.classList.add('select__dropdown--hide');
            selectBtn.classList.remove('is-active')
        }
    });

    function choiseFirstOption() {
        let option = selectDropdown.querySelector('.select__dropdown-option');

        let selectedValue = option.getAttribute('data-value');
        let selectedText = option.textContent;

        selectedValueInput.value = selectedValue;
        selectBtn.innerHTML = selectedText;

        option.classList.add('option-active');
    }

    choiseFirstOption();
});

const input = document.querySelector('.input__elem--date');

if (input) {
    input.addEventListener('focus', () => {
        input.type = 'date';
        input.showPicker();
    });

    input.addEventListener('blur', () => {
        input.type = 'text';
    });
}

//
// Accordion
//

let accordionItems = document.querySelectorAll('.js-acc');

function toggleAccordion() {
    let isExpanded = this.getAttribute('aria-expanded') === 'true';

    accordionItems.forEach(item => {
        item.setAttribute('aria-expanded', 'false');
        item.nextElementSibling.style.height = null;
    });

    if (!isExpanded) {
        this.setAttribute('aria-expanded', 'true');
        this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
    }
}

accordionItems.forEach(item => {
    let itemContent = item.nextElementSibling;
    let parentItem = item.parentElement;

    if (item.getAttribute('aria-expanded') === 'true') {
        parentItem.classList.add('is-show');
        itemContent.style.height = itemContent.scrollHeight + 'px';

        if (item.classList.contains('faq__item-btn')) {
            let prevSibling = parentItem.previousElementSibling;
            if (prevSibling) prevSibling.classList.add('border-none');
        }
    }

    item.addEventListener('click', toggleAccordion);
});

//
// Footer map
//

ymaps.ready(function () {
    let footerMap = new ymaps.Map('footer-map', {
        center: [55.437674, 37.569710],
        zoom: 13,
        controls: []
    }, {}),

    officePlacemark = new ymaps.Placemark(footerMap.getCenter(), {
        // hintContent: '',
        // balloonContent: ''
    }, {
        iconColor: '#192741'
    });

    footerMap.geoObjects.add(officePlacemark);
});