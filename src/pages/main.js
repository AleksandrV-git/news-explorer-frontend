import "../pages/main.css";
import "../images/favicon.svg"

import { Popup } from '../scripts/popup.js';
import { FormValidator } from '../scripts/formValidator.js';

    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        emailPatternMismatch: 'Неправильный формат email'
    };

const mainPageRoot = document.querySelector(".root");


const popupSignUp = new Popup(
  document.querySelector("#popupSignUp"),
  document.querySelector(".popup__close"),
  document.querySelector("#popupSignIn .popup__link"),
  mainPageRoot
  );
const popupSignIn = new Popup(
  document.querySelector("#popupSignIn"),
  document.querySelector("#popupSignIn .popup__close"),
  document.querySelector("#button-auth"),
  mainPageRoot
  );
const popupSuccessfulSignUp = new Popup(
  document.querySelector("#popupSuccessfulSignUp"),
  document.querySelector("#popupSuccessfulSignUp .popup__close"),
  null,
  mainPageRoot
  );
const formSignUpValidator = new FormValidator(
  document.querySelector('#formSignUp'),
  errorMessages
  );
const formSignInValidator = new FormValidator(
  document.querySelector('#formSignIn'),
  errorMessages
  );

popupSignUp.setEventListeners();
popupSignIn.setEventListeners();
formSignUpValidator.setEventListeners();
formSignInValidator.setEventListeners();
popupSuccessfulSignUp.setEventListeners();

document.querySelector("#popupSignUp .popup__link").addEventListener('click', () => { popupSignUp.close(); popupSignIn.open();});
document.querySelector("#popupSuccessfulSignUp .popup__link").addEventListener('click', () => { popupSuccessfulSignUp.close(); popupSignIn.open();});
document.querySelector("#popupSignIn .popup__link").addEventListener('click', () => { popupSignIn.close(); });

document.querySelector('#formSignIn').addEventListener('submit', (event) => {
  event.preventDefault();
  mainPageRoot.classList.add('root_active-authorized-user');
  popupSignIn.close();
  });
document.querySelector('#button-logout').addEventListener('click', () => {
  mainPageRoot.classList.remove('root_active-authorized-user');
  });
document.querySelector('#formSignUp').addEventListener('submit', (event) => {
  event.preventDefault();
  popupSuccessfulSignUp.open();
  popupSignUp.close();
  });
document.querySelector('.header__menu-open-icon').addEventListener('click', () => {
  popupSignIn.close();
  popupSignUp.close();
  popupSuccessfulSignUp.close();
  document.querySelector('.header__menu-open-icon').classList.toggle('header__menu-open-icon_theme-close-icon');
  document.querySelector('#nav-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('#nav-not-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('.adjustment-layer').classList.toggle('adjustment-layer_active')
  });

