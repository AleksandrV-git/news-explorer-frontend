import "../pages/main.css";
import "../images/favicon.svg";

import { Header } from '../scripts/Header.js';
import { Popup } from '../scripts/Popup.js';
import { Form } from '../scripts/Form.js';
import { SearchForm } from '../scripts/SearchForm.js';
import { CardList } from '../scripts/CardList.js';
import { NewsCard } from '../scripts/NewsCard.js';
import { initialCards } from '../scripts/Cards.js';
import { NewsApi } from '../scripts/NewsApi.js';
import { MainApi } from '../scripts/MainApi.js';
import { SearchStatus } from '../scripts/SearchStatus.js';

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
  //baseUrl: `https://www.news-v.api.students.nomoreparties.co`,
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
};

const MAIN_PAGE_ROOT = document.querySelector(".root");
const HEADER_NODE = document.querySelector(".header");
const SEARCH_FORM_NODE = document.querySelector('.search-form');
const FORM_SIGNUP_NODE = document.querySelector('#formSignUp');
const FORM_SIGNIN_NODE = document.querySelector('#formSignIn');
const POPUP_SIGNIN_NODE = document.querySelector('#popupSignIn');
const POPUP_SIGNUP_NODE = document.querySelector('#popupSignUp');
const POPUP_SUCECCESFULSIGNUP_NODE = document.querySelector('#popupSuccessfulSignUp');
const SEARCH_STATUS_NODE = document.querySelector('.search-status');
const ARTICLES_NODE = document.querySelector('.articles');
const NEWSCARD_TEMPLATE = document.querySelector('#news-card');
const ADJUSTMENT_LAYER = document.querySelector('.adjustment-layer');
const AUTH_BUTTON = document.querySelector("#button-auth");

let SEARCH_KEYWORD = null;

// функции
const openHeaderMenu = (headerInstance) => {
  popupSignIn.close();
  popupSignUp.close();
  popupSuccessfulSignUp.close();
  ADJUSTMENT_LAYER.classList.toggle('adjustment-layer_active');
}

const saveCardCallback = (cardInstans) => {
  if (!cardInstans.isSaved) {
    console.log(cardInstans)
    mainApi.createArticle(cardInstans)
      .then((articleData) => {
        //console.log(articleData);
        cardInstans.cardNode.classList.add('article-card_active-saved');
        cardInstans.isSaved = true;
        cardInstans.id = articleData.data._id;
        cardInstans.ownerId = articleData.data.owner;
        console.log(cardInstans);
      })
      .then((res) => {
        console.log('saved')
      })
      .catch((err) => { console.log(err) })
  } else if (cardInstans.isSaved) {
    mainApi.removeArticle(cardInstans)
      .then((articleData) => {
        cardInstans.cardNode.classList.remove('article-card_active-saved');
        //console.log(articleData)
        cardInstans.isSaved = false;
        cardInstans.id = null;
        cardInstans.ownerId = null;
      })
      .then(() => {
        console.log('deleted')
      })
      .catch((err) => { console.log(err) })
  }
};

const popupLinkCallback = (popupInstans) => {
  if (popupInstans.popup.id === 'popupSignUp') {
    popupSignUp.close(); popupSignIn.open();
  }
  if (popupInstans.popup.id === 'popupSignIn') {
    popupSignIn.close(); popupSignUp.open();
  }
  if (popupInstans.popup.id === 'popupSuccessfulSignUp') {
    popupSuccessfulSignUp.close(); popupSignIn.open();
  }
}

const searchSubmit = (event) => {
  event.preventDefault();
  SEARCH_KEYWORD = formSearch.getInfo();
  if (!SEARCH_KEYWORD) { return };
  cardList.clear();
  searchStatus.renderLoader();
  console.log(formSearch.getInfo());
  console.log(newsApi.getNews(formSearch.getInfo()));
  newsApi.getNews(SEARCH_KEYWORD)
    .then((foundResults) => {
      searchStatus.close();
      cardList.renderResults(foundResults.articles);
    })
    .catch((err) => { console.log(err); })
}

const signinSubmit = (event) => {
  event.preventDefault();
  let user = {};
  mainApi.signin(formSignIn.getInfo())
    .then(() => {
      return mainApi.getUserData().then((res) => { user = res });
    })
    .then(() => {
      user.isLoggedIn = true;
      header.render(user);
    })
    .then (() => {
      MAIN_PAGE_ROOT.classList.add('root_active-authorized-user');
      popupSignIn.close();
    })
    .catch((err) => {
      console.log(err);
      formSignIn.setServerError('Произошла ошибка');
    })
}

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg, SEARCH_KEYWORD, NEWSCARD_TEMPLATE, saveCardCallback);
const cardList = new CardList(ARTICLES_NODE, createCard);
const newsApi = new NewsApi(newsApiOptions);
const mainApi = new MainApi(mainApiOptions);
const popupSignUp = new Popup(POPUP_SIGNUP_NODE, MAIN_PAGE_ROOT, null, popupLinkCallback);
const popupSignIn = new Popup(POPUP_SIGNIN_NODE, MAIN_PAGE_ROOT, AUTH_BUTTON, popupLinkCallback);
const popupSuccessfulSignUp = new Popup(POPUP_SUCECCESFULSIGNUP_NODE, MAIN_PAGE_ROOT, null, popupLinkCallback);
const formSignUp = new Form(FORM_SIGNUP_NODE, errorMessages);
const formSignIn = new Form(FORM_SIGNIN_NODE, errorMessages, signinSubmit);
const formSearch = new SearchForm(SEARCH_FORM_NODE, searchSubmit);
const searchStatus = new SearchStatus(SEARCH_STATUS_NODE);
const header = new Header(HEADER_NODE, openHeaderMenu);

// установка слушателей
popupSignUp.setEventListeners();
popupSignIn.setEventListeners();
formSignUp.setHandlers();
formSignIn.setHandlers();
popupSuccessfulSignUp.setEventListeners();
header.setHandlers();
formSearch.setHandlers();

// document.querySelector("#button-auth").addEventListener('click', () => {
//   popupSignIn.open();
// });

document.querySelector('#button-logout').addEventListener('click', () => {
  MAIN_PAGE_ROOT.classList.remove('root_active-authorized-user');
});
FORM_SIGNUP_NODE.addEventListener('submit', (event) => {
  event.preventDefault();
  mainApi.signup(formSignUp.getInfo())
    .then(() => {
      popupSuccessfulSignUp.open();
      popupSignUp.close();
    })
    .catch((err) => {
      //console.log(err);
      if (err === 409) {
        formSignUp.setServerError('Пользователь с данным e-mail уже зарегистрирован');
      } else {
        formSignUp.setServerError('Произошла ошибка');
      }
    })
});

