export class SavedNewsCard {
  constructor(articleData, template, deleteCallback) {
    this.template = template;
    this.image = articleData.image;
    this.date = articleData.date;
    this.title = articleData.title;
    this.text = articleData.text;
    this.source = articleData.source;
    this.keyword = articleData.keyword;
    this.link = articleData.link;
    this.ownerId = articleData.owner;
    this.id = articleData._id;
    this.deleteCallback = deleteCallback.bind(this) || (() => {});
    this.isSaved = true;
  }

   create() {
    const card = this.template;
    const image = card.content.querySelector('.article-card__image');
    const date = card.content.querySelector('.article-card__date');
    const title = card.content.querySelector('.article-card__title');
    const text = card.content.querySelector('.article-card__text');
    const source = card.content.querySelector('.article-card__source');
    const category = card.content.querySelector('.article-card__category');

    image.setAttribute('src', this.image);
    date.textContent = this.date;
    title.textContent = this.title;
    text.textContent = this.text;
    source.textContent = this.source;
    category.textContent = this.keyword;

    const cardNode = card.content.cloneNode(true);

    this.cardNode = cardNode.querySelector('.article-card')
    this.deleteButton = cardNode.querySelector('.article-card__icon-delete');

    return cardNode;
  }

  openLink = () => {
    window.open(this.link);
  }

  deleteCard = (event) => {
    event.stopPropagation();
    return this.deleteCallback(this);
  }

  setHandlers() {
    this.deleteButton.addEventListener('click', this.deleteCard);
    this.cardNode.addEventListener('click', this.openLink);
  }

  removeHandlers() {
    this.deleteButton.removeEventListener('click', this.deleteCard);
    this.cardNode.removeEventListener('click', this.openLink);
  }
}
