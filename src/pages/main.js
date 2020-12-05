import "../pages/main.css";
import "../images/favicon.svg"

import { Popup } from '../scripts/popup.js';
import { Form } from '../scripts/form.js';
import { CardList } from '../scripts/cardList.js';
import { NewsCard } from '../scripts/newsCard.js';
import { initialCards } from '../scripts/cards.js';
import { NewsApi } from '../scripts/newsApi.js';

  const errorMessages = {
      valueMissing: 'Это обязательное поле',
      tooShort: 'Должно быть от 2 до 30 символов',
      emailPatternMismatch: 'Неправильный формат email'
  };

  const newsFetchOptions = {
    baseUrl: `https://newsapi.org`,
    apiKey: `1093de14a32d4381b3b2bf485c9cbf25`,
    sortBy: `popularity`,
    date: `2020-12-01`
  };

const mainPageRoot = document.querySelector(".root");
const menuOpenIcon = document.querySelector('.header__menu-open-icon')

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg);
const cardList = new CardList(
  document.querySelector('.articles__list'),
  createCard,
);
const newsApi = new NewsApi(newsFetchOptions)
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
const formSignUp = new Form(
  document.querySelector('#formSignUp'),
  errorMessages
);
const formSignIn = new Form(
  document.querySelector('#formSignIn'),
  errorMessages
);
const formSearch = new Form(
  document.querySelector('.search-form'),
  errorMessages
);

// установка слушателей
popupSignUp.setEventListeners();
popupSignIn.setEventListeners();
formSignUp.setEventListeners();
formSignIn.setEventListeners();
formSearch.setEventListeners();
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
menuOpenIcon.addEventListener('click', () => {
  popupSignIn.close();
  popupSignUp.close();
  popupSuccessfulSignUp.close();
  menuOpenIcon.classList.toggle('header__menu-open-icon_theme-close-icon');
  document.querySelector('#nav-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('#nav-not-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('.adjustment-layer').classList.toggle('adjustment-layer_active')
});
document.querySelector('.search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  formSearch.setSubmitButtonState(true);
  newsApi.getNews(formSearch._getInfo().search)
    .then((foundResults) => {cardList.renderResults(foundResults.articles)})
})


console.log()


