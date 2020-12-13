export class NewsCard {

  constructor(articleData, keyword, template, saveCardCallback) {
    console.log(articleData)
    this.template = template;
    this.image = articleData.image;
    this.date = articleData.date;
    this.title = articleData.title;
    this.text = articleData.text;
    this.source = articleData.source;
    this.keyword = keyword;
    this.link = articleData.link;
    this.saveCardCallback = saveCardCallback.bind(this);
    this.isSaved = false;
  }

  create() {
    const card = this.template;
    console.log(card)
    const image = card.content.querySelector('.article-card__image');
    const date = card.content.querySelector('.article-card__date');
    const title = card.content.querySelector('.article-card__title');
    const text = card.content.querySelector('.article-card__text');
    const source = card.content.querySelector('.article-card__source');

    image.setAttribute('src', this.image);
    date.textContent = this.date;
    title.textContent = this.title;
    text.textContent = this.text;
    source.textContent = this.source;

    const cardNode = card.content.cloneNode(true);

    this.cardNode = cardNode.querySelector('.article-card')
    this.saveButton = cardNode.querySelector('.article-card__icon-save');

    return cardNode;
  }

  consoleLog = () => {
    console.log()
  }

  saveCard = () => {
    return this.saveCardCallback(this);
  }

  setEventListeners() {
    this.saveButton.addEventListener('click', this.saveCard);
  }
  // setEventListeners() {
  //   this
  //     .likeButtonElem
  //     .addEventListener('click', this.like);

  //   this
  //     .deleteButtonElem
  //     .addEventListener('click', this.deleteCard);

  //   this
  //     .imageElem
  //     .addEventListener('click', this.cardImgZoom);
  // }

  // deleteCard = (event) => {
  //   event.stopPropagation();
  //   this.mestoAPI.deleteCard(this.id)

  //     .then(() => {
  //       this.removeCard()
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })

  // }

  // like = () => {
  //   if (this.isLiked === true) {
  //     this.likeCounterElem.textContent = `${+this.likeCounterElem.textContent - 1}`
  //     this.isLiked = false;
  //     this.likeRemoveRender();
  //     this.mestoAPI.likeCardRemove(this.id)
  //       .catch((err) => {
  //         console.log(`Ошибка: ${err}`);
  //       });
  //   } else {
  //     this.likeCounterElem.textContent = `${+this.likeCounterElem.textContent + 1}`
  //     this.isLiked = true;
  //     this.likeAddRender();
  //     this.mestoAPI.likeCard(this.id)
  //       .catch((err) => {
  //         console.log(`Ошибка: ${err}`);
  //       });
  //   }

  // }

  // likeAddRender = () => {
  //   this.likeButtonElem.classList.add('place-card__like-icon_liked');
  // }
  // likeRemoveRender = () => {
  //   this.likeButtonElem.classList.remove('place-card__like-icon_liked');
  // }

  // showDeleteButton() {
  //   this.deleteButtonElem.style.display = "block";
  // }

  // removeCard = () => {
  //   this.imageElem.removeEventListener('click', this.cardImgZoom)
  //   this.likeButtonElem.removeEventListener('click', this.likeHandler)
  //   this.cardElem.remove()
  //   this.deleteButtonElem.removeEventListener('click', this.removeCard)
  // };
}
