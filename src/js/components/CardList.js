export class CardList {
  constructor(container, newCardCallback) {
    this.container = container;
    this.grid = container.querySelector(".articles__list");
    this.showMoreButton = container.querySelector(".articles__button");
    this.newCardCallback = newCardCallback.bind(this) || (() => { });
    this.shownQuantity = 0;
    this.articlesParamsArr = [];
    this.cardsIncrement = 0;
  }

  addCard(articleParams) {
    const newsCard = this.newCardCallback(articleParams);
    const cardElem = newsCard.create();
    newsCard.setHandlers();
    this.grid.appendChild(cardElem);
  }

  renderResults(arr, quantity) {
    this.articlesParamsArr = arr;
    this.cardsIncrement = quantity;
    this.showMore();
    this.setHandlers();
    this.container.style.display = 'flex';
  }

  showMore = () => {
    const n = this.cardsIncrement;
    const arr = this.articlesParamsArr;
    let counter = this.shownQuantity - 1;

    for (let i = 1; i <= n; i++) {
      if (this.shownQuantity < arr.length) {
        counter++
        this.addCard(arr[counter]);
        this.shownQuantity++;
      } else {
        this.showMoreButton.style.display = 'none';
        break;
      }
    }
  }

  renderStatus() {
    return this.statusCallback(this);
  }

  clear() {
    if (this.grid.firstChild) {
      while (this.grid.firstChild) {
        this.grid.removeChild(this.grid.firstChild);
      }
      this.articlesParamsArr = [];
      this.shownQuantity = 0;
    }
  }

  setHandlers() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}
