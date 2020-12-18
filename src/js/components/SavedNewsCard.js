import { NewsCard } from './NewsCard.js';

export class SavedNewsCard extends NewsCard {
  constructor(articleData, keyword, template, saveCardCallback, deleteCallback) {
    super(articleData, keyword, template, saveCardCallback)
    this.deleteCallback = deleteCallback || (() => {});
    this.keyword = articleData.keyword;
  }

   create() {
    const card = this.template;
    console.log(card)
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

  deleteCard = (event) => {
    event.stopPropagation();
    return this.deleteCallback(this);
  }

  setHandlers() {
    this.deleteButton.addEventListener('click', this.deleteCard);
    this.cardNode.addEventListener('click', this.openLink);
  }
}
