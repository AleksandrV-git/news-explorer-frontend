export class CardList {
  constructor(container, newCardCallback, userInfo) {
    this.container = container;
    this.grid = container.querySelector(".articles__list");
    this.newCardCallback = newCardCallback.bind(this) || (() => {});
    this.userInfo = userInfo || (() => {});
  }

  addCard(articleParams, cardOwnerId = null) {
    const newsCard = this.newCardCallback(articleParams);
    const cardElem = newsCard.create();
    // if (likes.some(user => { return user._id === this.userInfo._id })) {
    //   newsCard.isLiked = true;
    //   newsCard.likeAddRender();
    // }
    // if (cardOwnerId === this.userInfo._id) {
    //   newsCard.showDeleteButton();
    // }
    newsCard.setEventListeners();
    this.grid.appendChild(cardElem);
  }

  renderResults(arr) {
    console.log(arr)
    arr.forEach(article => {
      const articleParams = {
        image: article.urlToImage,
        date: article.publishedAt,
        title: article.title.substr(0, 100),
        text: article.description.substr(0, 200),
        source: article.source.name.substr(0, 30),
        link: article.url,
      }
      this.addCard(articleParams);
    });
    this.container.style.display = 'flex'
  }

  renderStatus() {
    return this.statusCallback(this);
  }

  renderLoader(preloder) {
    //preloder.style.display = 'block';
  }

  clear() {
    while (this.grid.firstChild) {
      this.grid.removeChild(this.grid.firstChild);
    }
  }
}
