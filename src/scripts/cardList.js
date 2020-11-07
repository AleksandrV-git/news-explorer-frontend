export class CardList {
  constructor(container, createCard, userInfo, mestoApi) {
    this.container = container;
    this.createCard = createCard;
    this.userInfo = userInfo;
    this.mestoApi = mestoApi;
  }

  addCard(name, link, id, cardOwnerId, likes, imgZoom) {
    const placeCard = this.createCard(name, link, id, likes, imgZoom, this.mestoApi);
    const cardElem = placeCard.create();
    if (likes.some(user => { return user._id === this.userInfo._id })) {
      placeCard.isLiked = true;
      placeCard.likeAddRender();
    }
    if (cardOwnerId === this.userInfo._id) {
      placeCard.showDeleteButton();
    }
    placeCard.setEventListeners();
    this.container.appendChild(cardElem);
  }

  render(arr, imgZoom) {
    arr.forEach(item => {
      this.addCard(item.name, item.link, item._id, item.owner._id, item.likes, imgZoom);
    });
  }

  renderFromRequest(imgZoom) {

    this.mestoApi.getInitialCards()

      .then((result) => {
        this.render(result, imgZoom);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }
}
