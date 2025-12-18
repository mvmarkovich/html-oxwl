let mobile = window.matchMedia('(min-width: 0px) and (max-width: 768px)');
let tablet = window.matchMedia('(min-width: 769px)');
let desktop = window.matchMedia('(min-width: 1025px)');

function throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
        if (timer) return

        timer = setTimeout(() => {
            callee(...args)

            timer = null
        }, timeout)
    }
}

function initSwiper(selector, options = {}) {
    console.log(selector);
    const el = document.querySelector(selector);
    
    if (!el) return null;

    return new Swiper(el, options);
}

//
// Mobile menu
//

const header = document.querySelector('.header'),
    headerBurger = document.querySelector('.header__burger');

function toggleMobileMenu() {
    header.classList.toggle('header-mobile-menu');
    document.body.classList.toggle('overflow-hidden');
}

function initMobileMenu() {
    if (!headerBurger) return;
    headerBurger.addEventListener('click', toggleMobileMenu);
}

function setActiveSubmenuItem(current, items) {
    items.forEach(el => el.classList.remove('active'));
    current.classList.add('active');
}

function initSubmenu() {
    const navItems = document.querySelectorAll('.header__nav-item');
    navItems.forEach(navItem => {
        const submenu = navItem.querySelector('.header__nav-submenu');
        if (!submenu) return;

        const submenuItems = submenu.querySelectorAll('.header__nav-submenu-item');
        if (!submenuItems.length) return;

        setActiveSubmenuItem(submenuItems[0], submenuItems);

        submenuItems.forEach(item => {
            const toggle = item.querySelector('.header__nav-submenu-toggle');

            item.addEventListener('mouseenter', () => {
                if (window.innerWidth <= 1380) return;
                setActiveSubmenuItem(item, submenuItems);
            });

            if (toggle) {
                toggle.addEventListener('click', e => {
                    e.preventDefault();
                    setActiveSubmenuItem(item, submenuItems);
                });
            }
        });
    });
}

function initArrowItems() {
    const arrowItems = document.querySelectorAll('.header__nav-item--arrow');

    arrowItems.forEach(item => {
        let link = item.querySelector('.header__nav-link');

        link.addEventListener('click', e => {
            e.preventDefault();
            item.classList.toggle('active');
            if (window.innerWidth >= 1379) document.body.classList.toggle('overflow-hidden');
        });
    });

    document.addEventListener('click', e => {
        const isArrow = e.target.closest('.header__nav-item--arrow');
        const isSubmenu = e.target.closest('.header__nav-submenu');

        if (!isArrow && !isSubmenu) {
            arrowItems.forEach(item => item.classList.remove('active'));
            if (window.innerWidth >= 1379) document.body.classList.remove('overflow-hidden');
        }
    });
}

let lastScrollY = window.scrollY;
let upScrollDistance = 0;

function scrollHeader() {
    const currentScrollY = window.scrollY;
    const delta = lastScrollY - currentScrollY;

    if (delta > 0) {
        upScrollDistance += delta;

        if (upScrollDistance >= 100) {
            header.classList.add('header--visible');
        }
    }

    else {
        upScrollDistance = 0;
        header.classList.remove('header--visible');
    }

    if (currentScrollY > 100) {
        header.classList.add('header--bg');
    } else {
        header.classList.remove('header--bg');
        header.classList.remove('header--visible');
    }

    lastScrollY = currentScrollY;
}

function initHeader() {
    initMobileMenu();
    initSubmenu();
    initArrowItems();

    let optimizedHandler = throttle(scrollHeader, 400);
    window.addEventListener('scroll', optimizedHandler);
}

initHeader();

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

let sliderSteps = initSwiper('.solutions__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderSpecies = initSwiper('.species__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderBenefits = initSwiper('.benefits__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderCasesTabs = initSwiper('.cases__tabs', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderStats = initSwiper('.stats__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderPartners = initSwiper('.partners__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderServices = initSwiper('.services__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderBuildings = initSwiper('.buildings__slider', {
    loop: false,
    slidesPerView: 'auto',
});

let sliderFeatures = initSwiper('.features__slider', {
    loop: false,
    slidesPerView: 'auto',
});

if (desktop.matches) {
    if (sliderSpecies) sliderSpecies.destroy();
    if (sliderBenefits) sliderBenefits.destroy();
}

if (tablet.matches) {
    if (sliderPartners) sliderPartners.destroy();
    if (sliderFeatures) sliderFeatures.destroy();
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

//
// Cases tabs & slider
//

(function () {
    const cases = document.querySelector('.cases');
    if (!cases) return;

    const tabButtons = cases.querySelectorAll('.cases__tabs-btn');
    const sections = cases.querySelectorAll('.cases__section');

    const ACTIVE_BTN = 'cases__tabs-btn--active';
    const ACTIVE_SECTION = 'cases__section--active';

    let sliderCases = null;

    const initSlider = (section) => {
        const slider = section.querySelector('.cases__slider');
        if (!slider) return;

        sliderCases = new Swiper(slider, {
            loop: false,
            slidesPerView: 'auto',

            navigation: {
                prevEl: slider.parentElement.querySelector(".slider-prev"),
                nextEl: slider.parentElement.querySelector(".slider-next"),
            },

            pagination: {
                el: slider.parentElement.querySelector(".slider-pag"),
                type: 'bullets',
                clickable: true
            },
        });
    };

    const destroySwiper = () => {
        if (!sliderCases) return;
        sliderCases.destroy(true, true);
        sliderCases = null;
    };

    const setActiveTab = (tabName) => {
        tabButtons.forEach(btn => {
            btn.classList.toggle(
                ACTIVE_BTN,
                btn.dataset.tab === tabName
            );
        });

        sections.forEach(section => {
            const isActive = section.dataset.tab === tabName;

            if (isActive) {
                section.classList.add(ACTIVE_SECTION);

                destroySwiper();

                requestAnimationFrame(() => {
                    initSlider(section);
                });

            } else {
                section.classList.remove(ACTIVE_SECTION);
            }
        });
    };

    const firstTab = tabButtons[0];
    
    if (firstTab) {
        setActiveTab(firstTab.dataset.tab);
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains(ACTIVE_BTN)) return;
            setActiveTab(btn.dataset.tab);
        });
    });
})();
