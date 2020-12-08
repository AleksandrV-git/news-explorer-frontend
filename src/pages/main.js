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
  date: `2020-12-02`
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

let searchKeyword = null

// функции
const saveCardCallback = (cardInstans) => {
  console.log(cardInstans)
  //mainApi.createArticle(articleParams);
};

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg, searchKeyword, saveCardCallback);
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
  console.log(newsApi.getNews(formSearch.getInfo().search))
  searchKeyword = formSearch.getInfo().search
  newsApi.getNews(searchKeyword)
    .then((foundResults) => {
      cardList.renderResults(foundResults.articles)})
    .catch((err) => {console.log(err);})
});
formSignUpNode.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signup(formSignUp.getInfo())
    .then(() => {
      popupSuccessfulSignUp.open();
      popupSignUp.close();
    })
    .catch((err) => {
      console.log(err);
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
  mainApi.signin(formSignIn.getInfo())
    .then((res) => {
      const headerLogoutBtn = document.querySelector('#button-logout .button__inner-text');
      headerLogoutBtn.textContent = res.data.name;
      popupSignIn.close();
      mainPageRoot.classList.add('root_active-authorized-user');
    })
    .catch((err) => {
      console.log(err);
      const formErr = formSignInNode.querySelector('.popup__form-error');
      formErr.textContent = 'Произошла ошибка'
    })
});

console.log()


