export class CardList {
  constructor(container, callbackNewCard, userInfo) {
    this.container = container || (() => {});
    this.callbackNewCard = callbackNewCard || (() => {});
    this.userInfo = userInfo || (() => {});
  }

  addCard(articleParams, cardOwnerId = null) {
    //const params = image, date, title, text, source
    const newsCard = this.callbackNewCard(articleParams);
    const cardElem = newsCard.create();
    // if (likes.some(user => { return user._id === this.userInfo._id })) {
    //   newsCard.isLiked = true;
    //   newsCard.likeAddRender();
    // }
    // if (cardOwnerId === this.userInfo._id) {
    //   newsCard.showDeleteButton();
    // }
    newsCard.setEventListeners();
    this.container.appendChild(cardElem);
  }

  renderResults(arr) {
    arr.forEach(article => {
      const articleParams = {
        image: article.urlToImage,
        date: article.publishedAt,
        title: article.title,
        text: article.content,
        source: article.source.name,
        link: article.url,
      }
      this.addCard(articleParams);
      //this.addCard(item.name, item.link, item._id, item.owner._id, item.likes, );
    });
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
