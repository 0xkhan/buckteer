import SassyModal from './js/plugins/SassyModal';
import CtrlView from './js/plugins/CtrlView';
import { resizeTextarea, navMarker } from './js/components/components';
import logo from './assets/logo.svg';
import baliImg from './assets/bali.jpg';

// Selectors
const logoElem = document.querySelector('#logo');
const menuBtn = document.querySelector('.nav__menu-btn');
const navIcon = document.querySelector('.nav__icon');
const menuList = document.querySelector('.nav__list');
const header = document.querySelector('header');
const footer = document.querySelector('footer');
const mainContent = document.querySelector('.main-content');
const footerNavMarker = document.querySelector('.footer-nav__marker');
const footerNavItems = document.querySelectorAll('.footer-nav__link');
const modalNavMarker = document.querySelector('.modal__nav-marker');
const modalNavItems = document.querySelectorAll('.modal__nav-btn');
const addAllModalClose = document.querySelector('[data-modal-close="add-all"]');

logoElem.style.backgroundImage = `url(${logo})`;

// Shows nav items
const showMenu = function() {
    menuBtn.addEventListener('click', () => {
        menuList.classList.toggle('nav__show-list');
        navIcon.classList.toggle('rotate');
    });
};

// Gets computed styles - used for calculating viewport height
const getStyle = function(elem, attribute) {
    const computedStyles = window.getComputedStyle(elem);
    const computedValue = computedStyles.getPropertyValue(attribute);

    return computedValue;
};

// Main content
const setViewPort = function() {
    const headerHeight = +getStyle(header, 'height').split('px')[0];
    const headerMargin = +getStyle(header, 'margin-top').split('px')[0];
    const footerHeight = +getStyle(footer, 'height').split('px')[0];
    const takenHeightPx = headerHeight + headerMargin + footerHeight;
    const viewPortHeight = window.visualViewport.height;
    const takenHeightPercent = (takenHeightPx / viewPortHeight) * 100;
    mainContent.style.minHeight = `${100 - takenHeightPercent}vh`;
};

// After modal is closed move the footer nav marker to initial point i.e first item
addAllModalClose.addEventListener('click', () => {
    navMarker(footerNavMarker, footerNavItems);
});

// Sub-modal confirm
const fillModalForm = function() {
    const submits = document.querySelectorAll('[data-submodal-confirm]');

    if (submits.length > 0) {
        submits.forEach((submit) => {
            submit.addEventListener('click', (event) => {
                event.preventDefault();
                const subModalID = event.target.getAttribute('data-submodal-confirm');
                setValue({ subModalID: subModalID });
            });
        });
    }
};

const setValue = function({ subModalID }) {
    const targetIDArray = subModalID.split('-');
    const targetID = targetIDArray.length > 2 ? `${targetIDArray[0]}-${targetIDArray[1]}` : subModalID;
    const viewValue = document.querySelector(`[data-submodal-viewValue=${targetID}]`);
    const inputValue = document.querySelector(`[data-submodal-inputValue=${targetID}]`);
    const value = getValue({ subModalID });

    viewValue.innerText = subModalID === 'trip-budget' ? `$${value}` : value;
    inputValue.value = value;

    // Close Modal
    submodal.closeModal({ modalID: targetID });
};

const getValue = function({ subModalID }) {
    const elem = document.querySelector(`[data-submodal-input=${subModalID}]`);
    let inputValue;

    if (elem.tagName == 'INPUT') {
        inputValue = elem.value;
    } else {
        inputValue = elem.innerText;
    }

    return inputValue;
};


// Initialize Sassy Modal
const modal = new SassyModal({
    blur: false,
    centered: true,
    animation: 'fade-out',
    showModalCSS: 'show-modal'
});

const submodal = new SassyModal({
    blur: false,
    centered: true,
    animation: 'fade-in',
    showModalCSS: 'show-modal',
    dataAttributes: {
        trigger: 'data-submodal-trigger',
        closer: 'data-submodal-close',
        id: 'data-submodal-id'
    }
});

// Initialize Ctrl View
const ctrlView = new CtrlView({
    activateElemCSS: "modal__form-extras--activate"
});

const init = function() {
    setViewPort();
    showMenu();
    resizeTextarea();
    fillModalForm();
    navMarker(footerNavMarker, footerNavItems);
    navMarker(modalNavMarker, modalNavItems);
};

init();
