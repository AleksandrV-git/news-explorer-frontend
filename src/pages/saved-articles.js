import "../pages/saved-articles.css";

import { User } from '../js/components/User.js';
import { Header } from '../js/components/Header.js';
import { CardList } from '../js/components/CardList.js';
import { NewsCard } from '../js/components/NewsCard.js';
import { MainApi } from '../js/api/MainApi.js';
import { SearchStatus } from '../js/components/SearchStatus.js';

const MAIN_API_OPTIONS = {
  //baseUrl: `https://www.news-v.api.students.nomoreparties.co`,
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
};

const MAIN_PAGE_ROOT = document.querySelector(".root");
const HEADER_NODE = document.querySelector(".header");
const ARTICLES_NODE = document.querySelector('.articles');
const SEARCH_STATUS_NODE = document.querySelector('.search-status');
const NEWSCARD_TEMPLATE = document.querySelector('#news-card');
const ADJUSTMENT_LAYER = document.querySelector('.adjustment-layer');

const openHeaderMenu = (headerInstance) => {
  ADJUSTMENT_LAYER.classList.toggle('adjustment-layer_active');
}

const deleteCard = (cardInstans) => {
  if (cardInstans.isSaved && user.isLoggedIn) {
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
}

const logoutHandler = () => {
  user.isLoggedIn = false;
}

// экземпляры классов
const createCard = (...arg) => new NewsCard(...arg, '12', NEWSCARD_TEMPLATE, deleteCard);
const cardList = new CardList(ARTICLES_NODE, createCard);
const mainApi = new MainApi(MAIN_API_OPTIONS);
const searchStatus = new SearchStatus(SEARCH_STATUS_NODE);
const header = new Header(HEADER_NODE, openHeaderMenu, logoutHandler);
const user = new User();
console.log(cardList)

const openSavedArticles = () => {
  header.render(user.getInfo())
  cardList.clear();
  searchStatus.renderLoader();
  mainApi.getArticles()
    .then((foundResults) => {
      searchStatus.close();
      console.log(foundResults)
      if (foundResults.data.length === 0) {
        searchStatus.renderStatusNotFond();
      } else {
        cardList.renderResults(foundResults.data);
      }
    })
    .catch((err) => { searchStatus.renderErr(); console.log(err); })
}
openSavedArticles();

// установка слушателей
header.setHandlers();
