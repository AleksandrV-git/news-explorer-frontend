export class CardList {
  constructor(container, callbackCreateCard, userInfo) {
    this.container = container || (() => {});
    this.callbackCreateCard = callbackCreateCard || (() => {});
    this.userInfo = userInfo || (() => {});
  }

  addCard(image, date, title, text, source, cardOwnerId = null) {
    const newsCard = this.callbackCreateCard(image, date, title, text, source);
    const cardElem = newsCard.create();
    // if (likes.some(user => { return user._id === this.userInfo._id })) {
    //   newsCard.isLiked = true;
    //   newsCard.likeAddRender();
    // }
    // if (cardOwnerId === this.userInfo._id) {
    //   newsCard.showDeleteButton();
    // }
    // newsCard.setEventListeners();
    this.container.appendChild(cardElem);
  }

  renderResults(arr) {
    arr.forEach(item => {
      this.addCard(item.urlToImage, item.publishedAt, item.title, item.content, item.source);
      //this.addCard(item.name, item.link, item._id, item.owner._id, item.likes, );
    });
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
