import modals from "./modules/modals";
import sliders from "./modules/sliders";
import forms from "./modules/forms";
import mask from "./modules/mask";
import checkTextInputs from './modules/checkTextInputs';
import showMoreStyles from "./modules/showMoreStyles";
import calc from "./modules/calc";

window.addEventListener("DOMContentLoaded", ()=> {
    'use strict';

    let calcRes = {};
    calc("#size", "#material", "#options", ".promocode", ".calc-price", calcRes);

    modals();
    sliders(".feedback-slider-item", "horizontal", ".main-prev-btn", ".main-next-btn");
    sliders(".main-slider-item", "vertical");
    forms(calcRes);
    mask('[name="phone"]');
    checkTextInputs('[name="name"]');
    checkTextInputs('[name="message"]');
    showMoreStyles('.button-styles', '#styles .row');







    //1, 2, 3, 4, 5, 6, 7, 10, 12, 13, 14





});