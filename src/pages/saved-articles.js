import "../pages/saved-articles.css";

import { User } from '../js/components/User.js';
import { Header } from '../js/components/Header.js';
import { CardList } from '../js/components/CardList.js';
import { SavedNewsCard } from '../js/components/SavedNewsCard.js';
import { MainApi } from '../js/api/MainApi.js';
import { SearchStatus } from '../js/components/SearchStatus.js';
import { SavedArticles } from '../js/components/SavedArticles.js';

const MAIN_API_OPTIONS = {
  baseUrl: `https://api.news-v.students.nomoreparties.space`,
  headers: {
    'Content-Type': 'application/json',
  }
};

const RENDERED_CARDS_NUMBER = 3;

const HEADER_NODE = document.querySelector(".header");
const ARTICLES_NODE = document.querySelector('.articles');
const SEARCH_STATUS_NODE = document.querySelector('.search-status');
const NEWSCARD_TEMPLATE = document.querySelector('#news-card');
const ADJUSTMENT_LAYER = document.querySelector('.adjustment-layer');
const PAGE_DESCRIPTION_NODE = document.querySelector('.page-desription');

const openHeaderMenu = () => {
  ADJUSTMENT_LAYER.classList.toggle('adjustment-layer_active');
}

const deleteCard = (cardInstans) => {
  const userInfo = user.getInfo(localStorage.user);
  if (userInfo && userInfo.isLoggedIn) {
    mainApi.removeArticle(cardInstans)
      .then(() => {
        cardInstans.removeHandlers();
        cardInstans.cardNode.remove();
        cardInstans = null;
      })
      .catch((err) => { console.log(err) })
  }
}

const logoutHandler = () => {
  user.removeInfo();
  window.location.replace('./index.html');
}

// экземпляры классов
const createCard = (...arg) => new SavedNewsCard(...arg, NEWSCARD_TEMPLATE, deleteCard);
const cardList = new CardList(ARTICLES_NODE, createCard);
const mainApi = new MainApi(MAIN_API_OPTIONS);
const searchStatus = new SearchStatus(SEARCH_STATUS_NODE);
const header = new Header(HEADER_NODE, openHeaderMenu, logoutHandler);
const savedArticlesr = new SavedArticles(PAGE_DESCRIPTION_NODE);
const user = new User();

const getKeyWords = (arr) => {
  const keyWords = arr.map((article) => { return article.keyword });
  return keyWords;
}

const openSavedArticles = () => {
  header.render(user.getInfo(localStorage.user));
  cardList.clear();
  searchStatus.renderLoader();
  mainApi.getArticles()
    .then((foundResults) => {
      searchStatus.close();
      const data = foundResults.data;
      if (data.length === 0) {
        searchStatus.renderStatusNotFond();
      } else {
        savedArticlesr.setTitle(user.getInfo(localStorage.user).name, data.length);
        savedArticlesr.setKeyWords(getKeyWords(data));
        cardList.renderResults(data, RENDERED_CARDS_NUMBER);
      }
    })
    .catch((err) => { searchStatus.renderErr(); console.log(err); })
}
openSavedArticles();

// установка слушателей
header.setHandlers();
