import "../pages/main.css";
import "../images/favicon.svg"

import { Popup } from '../scripts/popup.js';
import { Form } from '../scripts/form.js';
import { CardList } from '../scripts/cardList.js';
import { NewsCard } from '../scripts/newsCard.js';
import { initialCards } from '../scripts/cards.js';
import { NewsApi } from '../scripts/newsApi.js';
import { MainApi } from '../scripts/MainApi.js';

const errorMessages = {
    valueMissing: 'Это обязательное поле',
    tooShort: 'Должно быть от 2 до 30 символов',
    emailPatternMismatch: 'Неправильный формат email'
};
const newsApiOptions = {
  baseUrl: `https://newsapi.org`,
  apiKey: `1093de14a32d4381b3b2bf485c9cbf25`,
  sortBy: `popularity`,
  date: `2020-12-01`
};
const mainApiOptions = {
  baseUrl: `http://localhost:3000`,
  headers: {
    'Content-Type': 'application/json'
  }
};

const mainPageRoot = document.querySelector(".root");
const menuOpenIcon = document.querySelector('.header__menu-open-icon');
const searchFormNode = document.querySelector('.search-form');
const formSignUpNode = document.querySelector('#formSignUp');
const formSignInNode = document.querySelector('#formSignIn');

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg);
const cardList = new CardList(
  document.querySelector('.articles__list'),
  createCard,
);
const newsApi = new NewsApi(newsApiOptions);
const mainApi = new MainApi(mainApiOptions);
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
  formSignUpNode,
  errorMessages
);
const formSignIn = new Form(
  document.querySelector('#formSignIn'),
  errorMessages
);
const formSearch = new Form(
  searchFormNode,
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
menuOpenIcon.addEventListener('click', () => {
  popupSignIn.close();
  popupSignUp.close();
  popupSuccessfulSignUp.close();
  menuOpenIcon.classList.toggle('header__menu-open-icon_theme-close-icon');
  document.querySelector('#nav-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('#nav-not-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('.adjustment-layer').classList.toggle('adjustment-layer_active')
});
searchFormNode.addEventListener('submit', (event) => {
  event.preventDefault();
  cardList.clear();
  newsApi.getNews(formSearch.getInfo().search)
    .then((foundResults) => {cardList.renderResults(foundResults.articles)})
});
formSignUpNode.addEventListener('submit', (event) => {
  event.preventDefault();
  const { name, email, password } = formSignUp.getInfo();
  mainApi.signup(name, email, password)
    .then(() => {
      popupSuccessfulSignUp.open();
      popupSignUp.close();
    })
    .catch((err) => {
      const formErr = formSignUpNode.querySelector('.popup__form-error')
      if (err === 409) {
        formErr.textContent = 'Пользователь с данным e-mail уже зарегистрирован'
      } else {
        formErr.textContent = 'Произошла ошибка'
      }
    })
});
formSignInNode.addEventListener('submit', (event) => {
  event.preventDefault();
  const { email, password } = formSignIn.getInfo();
  mainApi.signin(email, password)
    .then(() => {
      popupSignIn.close();
    })
    .catch(() => {
      const formErr = formSignUpNode.querySelector('.popup__form-error')
      formErr.textContent = 'Произошла ошибка'
    })
});

console.log()


