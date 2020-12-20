export class CardList {
  constructor(container, newCardCallback) {
    this.container = container;
    this.grid = container.querySelector(".articles__list");
    this.showMoreButton = container.querySelector(".articles__button");
    this.newCardCallback = newCardCallback.bind(this) || (() => { });
    this.cardsCount = 0;
    this.articlesParamsArr = [];
    this.numberOfShowedCards = 0;
  }

  addCard(articleParams) {
    const newsCard = this.newCardCallback(articleParams);
    const cardElem = newsCard.create();
    newsCard.setHandlers();
    this.grid.appendChild(cardElem);
  }

  renderResults(arr, numberOfCards) {
    this.articlesParamsArr = arr;
    this.numberOfShowedCards = numberOfCards;
    this.showMore();
    this.setHandlers();
    this.container.style.display = 'flex';
  }

  showMore = () => {
    const n = this.numberOfShowedCards;
    const count = this.cardsCount;
    const arr = this.articlesParamsArr;
    for (let i = count; i <= arr.length; i++) {
      if (this.cardsCount < count + n && this.cardsCount < arr.length) {
        this.addCard(arr[i]);
        this.cardsCount++;
      } else if (this.cardsCount === arr.length) {
        this.showMoreButton.style.display = 'none';
      } else { return }
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
      this.cardsCount = 0;
    }
  }

  setHandlers() {
    this.showMoreButton.addEventListener('click', this.showMore);
  }
}
