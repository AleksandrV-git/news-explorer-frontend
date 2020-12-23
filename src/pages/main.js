import "../pages/main.css";
import "../images/favicon.svg";

import { User } from '../js/components/User.js';
import { Header } from '../js/components/Header.js';
import { Popup } from '../js/components/Popup.js';
import { Form } from '../js/components/Form.js';
import { SearchForm } from '../js/components/SearchForm.js';
import { CardList } from '../js/components/CardList.js';
import { NewsCard } from '../js/components/NewsCard.js';
import { NewsApi } from '../js/api/NewsApi.js';
import { MainApi } from '../js/api/MainApi.js';
import { SearchStatus } from '../js/components/SearchStatus.js';

const ERROR_MESSAGES = {
  valueMissing: 'Это обязательное поле',
  tooShort: 'Должно быть от 2 до 30 символов',
  emailPatternMismatch: 'Неправильный формат email'
};
const NEWS_API_OPTIONS = {
  baseUrl: `https://nomoreparties.co/news`,
  apiKey: `1093de14a32d4381b3b2bf485c9cbf25`,
  sortBy: `popularity`,
  date: ``
};
const MAIN_API_OPTIONS = {
  baseUrl: `https://api.news-v.students.nomoreparties.space`,
  headers: {
    'Content-Type': 'application/json',
  }
};
const RENDERED_CARDS_NUMBER = 3;
const DAYS_AGO_TOSEARCH = 7;

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

let searchKeyWord = null;

// вспомогательные функции
const getDateToSearch = (daysAgo) => {
  let date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const newsApiDataHandler = (articlesArr) => {
  let articlesParamsArr = [];
  articlesArr.forEach(article => {
    const articleParams = {
      image: article.urlToImage,
      date: article.publishedAt,
      title: article.title.substr(0, 100),
      text: article.description.substr(0, 200),
      source: article.source.name.substr(0, 30),
      link: article.url,
    }
    articlesParamsArr.push(articleParams);
  });
  return articlesParamsArr;
}

// коллбеки для работы с экземплярами классов
const openHeaderMenu = () => {
  popupSignIn.close();
  popupSignUp.close();
  popupSuccessfulSignUp.close();
  ADJUSTMENT_LAYER.classList.toggle('adjustment-layer_active');
}

const saveCard = (cardInstans) => {
  const userInfo = user.getInfo(localStorage.user);
  if (!cardInstans.isSaved && userInfo && userInfo.isLoggedIn) {
    mainApi.createArticle(cardInstans)
      .then((articleData) => {
        cardInstans.cardNode.classList.add('article-card_active-saved');
        cardInstans.isSaved = true;
        cardInstans.id = articleData.data._id;
        cardInstans.ownerId = articleData.data.owner;
      })
      .catch((err) => { console.log(err) })
  } else { deleteCard(cardInstans) }
};

const deleteCard = (cardInstans) => {
  const userInfo = user.getInfo(localStorage.user);
  if (cardInstans.isSaved && userInfo && userInfo.isLoggedIn) {
    mainApi.removeArticle(cardInstans)
      .then(() => {
        cardInstans.cardNode.classList.remove('article-card_active-saved');
        cardInstans.isSaved = false;
        cardInstans.id = null;
        cardInstans.ownerId = null;
      })
      .catch((err) => { console.log(err) })
  }
}

const popupLinkHandler = (popupInstans) => {
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

const searchHandler = (event) => {
  event.preventDefault();
  searchKeyWord = formSearch.getInfo();
  if (!searchKeyWord) { return };
  cardList.clear();
  searchStatus.renderLoader();
  newsApi.getNews(searchKeyWord, getDateToSearch(DAYS_AGO_TOSEARCH))
    .then((foundResults) => {
      searchStatus.close();
      if (foundResults.articles.length === 0) {
        searchStatus.renderStatusNotFond();
      } else {
        cardList.renderResults(newsApiDataHandler(foundResults.articles), RENDERED_CARDS_NUMBER);
      }
    })
    .catch((err) => { searchStatus.renderErr(); console.log(err); })
}

const signinHandler = (event) => {
  event.preventDefault();
  mainApi.signin(formSignIn.getInfo())
    .then(() => {
      return mainApi.getUserData()
        .then((res) => { user.setInfo(res.data); return res.data })
        .catch((err) => {
          console.log(err);
          if (err === 401) { formSignIn.setServerError('Пользователь не зарегистрирован'); }
        });
    })
    .then((userData) => {
      if (!userData) { return Promise.reject('данные пользователя не получены') };
      header.render(user.getInfo(localStorage.user));
    })
    .then(() => {
      MAIN_PAGE_ROOT.classList.add('root_active-authorized-user');
      popupSignIn.close();
    })
    .catch((err) => {
      console.log(err);
      formSignIn.setServerError('Произошла ошибка');
    })
}

const logoutHandler = () => {
  user.removeInfo();
  MAIN_PAGE_ROOT.classList.remove('root_active-authorized-user');
}

const signupHandler = (event) => {
  event.preventDefault();
  mainApi.signup(formSignUp.getInfo())
    .then(() => {
      popupSuccessfulSignUp.open();
      popupSignUp.close();
    })
    .catch((err) => {
      console.log(err);
      if (err === 409) {
        formSignUp.setServerError('Пользователь с данным e-mail уже зарегистрирован');
      } else {
        formSignUp.setServerError('Произошла ошибка');
      }
    })
}

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg, searchKeyWord, NEWSCARD_TEMPLATE, saveCard);
const cardList = new CardList(ARTICLES_NODE, createCard);
const newsApi = new NewsApi(NEWS_API_OPTIONS);
const mainApi = new MainApi(MAIN_API_OPTIONS);
const popupSignUp = new Popup(POPUP_SIGNUP_NODE, MAIN_PAGE_ROOT, null, popupLinkHandler);
const popupSignIn = new Popup(POPUP_SIGNIN_NODE, MAIN_PAGE_ROOT, AUTH_BUTTON, popupLinkHandler);
const popupSuccessfulSignUp = new Popup(POPUP_SUCECCESFULSIGNUP_NODE, MAIN_PAGE_ROOT, null, popupLinkHandler);
const formSignUp = new Form(FORM_SIGNUP_NODE, ERROR_MESSAGES, signupHandler);
const formSignIn = new Form(FORM_SIGNIN_NODE, ERROR_MESSAGES, signinHandler);
const formSearch = new SearchForm(SEARCH_FORM_NODE, searchHandler);
const searchStatus = new SearchStatus(SEARCH_STATUS_NODE);
const header = new Header(HEADER_NODE, openHeaderMenu, logoutHandler);
const user = new User();

// проверка авторизации при загрузке страницы
window.onload = function () {
  const userInfo = user.getInfo(localStorage.user);
  if (userInfo && userInfo.isLoggedIn) {
    header.render(userInfo);
    MAIN_PAGE_ROOT.classList.add('root_active-authorized-user');
  } else { MAIN_PAGE_ROOT.classList.remove('root_active-authorized-user'); }
};

// установка слушателей
popupSignUp.setHandlers();
popupSignIn.setHandlers();
formSignUp.setHandlers();
formSignIn.setHandlers();
popupSuccessfulSignUp.setHandlers();
header.setHandlers();
formSearch.setHandlers();


