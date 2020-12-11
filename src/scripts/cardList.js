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
      //this.addCard(item.name, item.link, item._id, item.owner._id, item.likes, );
    });
  }

  clear() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }
}
