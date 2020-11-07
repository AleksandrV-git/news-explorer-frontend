export class Card {

  constructor(name, link, id, likes, imgZoom, mestoAPI) {
    this.name = name;
    this.link = link;
    this.id = id;
    this.imgZoom = imgZoom;
    this.likes = likes;
    this.isLiked = false;
    this.mestoAPI = mestoAPI;
  }

  create() {
    const placeCard = document.createElement('div');
    const image = document.createElement('div');
    const deleteButton = document.createElement('button');
    const description = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeContainer = document.createElement('div');
    const likeCounter = document.createElement('p');
    const likeButton = document.createElement('button');


    placeCard.classList.add('place-card');
    image.classList.add('place-card__image');
    image.style.backgroundImage = `url(${this.link})`;
    deleteButton.classList.add('place-card__delete-icon');
    description.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = this.name;
    likeContainer.classList.add('place-card__like-container');
    likeCounter.classList.add('place-card__like-count');
    likeCounter.textContent = `${this.likes.length}`;
    likeButton.classList.add('place-card__like-icon');

    image.appendChild(deleteButton);
    placeCard.appendChild(image);
    likeContainer.appendChild(likeButton);
    likeContainer.appendChild(likeCounter);
    description.appendChild(cardName);
    description.appendChild(likeContainer);
    placeCard.appendChild(description);

    this.likeCounterElem = likeCounter;
    this.cardElem = placeCard;
    this.likeButtonElem = likeButton;
    this.deleteButtonElem = deleteButton;
    this.imageElem = image;

    return placeCard;
  }

  setEventListeners() {
    this
      .likeButtonElem
      .addEventListener('click', this.like);

    this
      .deleteButtonElem
      .addEventListener('click', this.deleteCard);

    this
      .imageElem
      .addEventListener('click', this.cardImgZoom);
  }

  cardImgZoom = () => {
    this.imgZoom(this.link);
  }

  deleteCard = (event) => {
    event.stopPropagation();
    this.mestoAPI.deleteCard(this.id)

      .then(() => {
        this.removeCard()
      })
      .catch((err) => {
        console.log(err);
      })

  }

  like = () => {
    if (this.isLiked === true) {
      this.likeCounterElem.textContent = `${+this.likeCounterElem.textContent - 1}`
      this.isLiked = false;
      this.likeRemoveRender();
      this.mestoAPI.likeCardRemove(this.id)
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      this.likeCounterElem.textContent = `${+this.likeCounterElem.textContent + 1}`
      this.isLiked = true;
      this.likeAddRender();
      this.mestoAPI.likeCard(this.id)
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }

  }

  likeAddRender = () => {
    this.likeButtonElem.classList.add('place-card__like-icon_liked');
  }
  likeRemoveRender = () => {
    this.likeButtonElem.classList.remove('place-card__like-icon_liked');
  }

  showDeleteButton() {
    this.deleteButtonElem.style.display = "block";
  }

  removeCard = () => {
    this.imageElem.removeEventListener('click', this.cardImgZoom)
    this.likeButtonElem.removeEventListener('click', this.likeHandler)
    this.cardElem.remove()
    this.deleteButtonElem.removeEventListener('click', this.removeCard)
  };
}