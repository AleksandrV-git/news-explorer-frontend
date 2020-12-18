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
    this.saveCardCallback = saveCardCallback.bind(this) || (() => {});
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

  saveCard = (event) => {
    event.stopPropagation();
    return this.saveCardCallback(this);
  }

  openLink = () => {
    window.open(this.link);
  }

  setHandlers() {
    this.saveButton.addEventListener('click', this.saveCard);
    this.cardNode.addEventListener('click', this.openLink);
  }
}
