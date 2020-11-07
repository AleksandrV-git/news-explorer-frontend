export class Popup {
  constructor(popupElement, closeElement, openElement = null) {
    this.popup = popupElement;
    this.closeEl = closeElement;
    this.openEl = openElement;
  }

  open = () => {
    this.popup.classList.add('popup_is-opened');
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {

    if (this.openEl !== null) {
      this
        .openEl
        .addEventListener('click', this.open);
    }

    this
      .closeEl
      .addEventListener('click', this.close);
  }
}
