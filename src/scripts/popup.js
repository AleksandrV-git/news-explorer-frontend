export class Popup {
  constructor(popupNode, rootPageElement, linkCallBack) {
    this.popup = popupNode;
    console.log(popupNode)
    this.closeEl = popupNode.querySelector(".popup__close");
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

  setEventListeners(handlersArr = null) {
    this.closeEl.addEventListener('click', this.close);
    this.link.addEventListener('click', this.openLink);
  }
}
