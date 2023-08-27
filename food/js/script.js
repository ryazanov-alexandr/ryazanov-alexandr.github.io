'use strict';
require('es6-promise').polyfill();

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import forms from './modules/forms';
import slider from './modules/slider';
import calc from './modules/calc';
import { openModal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);
    

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2023-07-14');
    cards();
    forms('form', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide', 
        prevArrow: '.offer__slider-prev', 
        nextArrow: '.offer__slider-next',
        currentCounter: '#current', 
        totalCounter: '#total', 
        wrapper: '.offer__slider-wrapper', 
        field: '.offer__slider-inner'
    });
    calc();
    
    
});