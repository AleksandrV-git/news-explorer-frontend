export class Popup {
  constructor(popupNode, rootPageElement, OpenElement, linkCallBack) {
    this.popup = popupNode;
    this.closeEl = popupNode.querySelector(".popup__close");
    this.openElement = OpenElement || null;
    this.link = popupNode.querySelector(".popup__link");
    this.rootPageElement = rootPageElement || null;
    this.linkCallBack = linkCallBack.bind(this) || (() => { });
  }

  open = () => {
    this.popup.classList.add('popup_is-opened');
    if (this.rootPageElement !== null) {
      this.rootPageElement.classList.add('root_active-scroll-block');
    }
  }

  close = () => {
    this.popup.classList.remove('popup_is-opened');
    if (this.rootPageElement !== null) {
      this.rootPageElement.classList.remove('root_active-scroll-block');
    }
  }

  openLink = () => {
    return this.linkCallBack(this);
  }

  setHandlers() {
    this.closeEl.addEventListener('click', this.close);
    this.link.addEventListener('click', this.openLink);
    if (this.openElement !== null) {
      this.openElement.addEventListener('click', this.open);;
    }
  }
}
