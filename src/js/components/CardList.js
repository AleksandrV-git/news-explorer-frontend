export class CardList {
  constructor(container, newCardCallback) {
    this.container = container;
    this.grid = container.querySelector(".articles__list");
    this.showMoreButton = container.querySelector(".articles__button");
    this.newCardCallback = newCardCallback.bind(this) || (() => { });
    this.cardsCount = 0;
    this.articlesParamsArr = [];
  }

  addCard(articleParams) {
    const newsCard = this.newCardCallback(articleParams);
    const cardElem = newsCard.create();
    // if (likes.some(user => { return user._id === this.userInfo._id })) {
    //   newsCard.isLiked = true;
    //   newsCard.likeAddRender();
    // }
    // if (cardOwnerId === this.userInfo._id) {
    //   newsCard.showDeleteButton();
    // }
    console.log(this.grid)
    newsCard.setHandlers();
    this.grid.appendChild(cardElem);
  }

  renderResults(arr) {
    console.log(arr)
    // arr.forEach(article => {
    //   const articleParams = {
    //     image: article.urlToImage,
    //     date: article.publishedAt,
    //     title: article.title.substr(0, 100),
    //     text: article.description.substr(0, 200),
    //     source: article.source.name.substr(0, 30),
    //     link: article.url,
    //   }
    //   this.articlesParamsArr.push(articleParams);
    // });
    this.articlesParamsArr = arr;
    this.showMore();
    this.setHandlers();
    this.container.style.display = 'flex';
  }

  showMore = () => {
    const count = this.cardsCount;
    const arr = this.articlesParamsArr;
    console.log(count);
    console.log(arr.length);
    for (let i = count; i < arr.length; i++) {
      if (this.cardsCount < count + 3) {
        this.addCard(arr[i]);
        this.cardsCount = i;
      } else if (count >= arr.length - 3) {
        this.showMoreButton.style.display = 'none';
      } else { return }
    }
  }

  renderStatus() {
    return this.statusCallback(this);
  }

  clear() {
    while (this.grid.firstChild) {
      this.grid.removeChild(this.grid.firstChild);
    }
    this.articlesParamsArr = [];
    this.cardsCount = 0;
  }

  setHandlers() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}
