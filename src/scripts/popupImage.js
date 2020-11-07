import {Popup} from './popup.js';
export class PopupImage extends Popup {
  open = (imgLink) => {
    const popupImg = this.popup.querySelector(".popup_img")
    popupImg.setAttribute("src", `${imgLink}`);
    this.popup.classList.add('popup_is-opened');
  }
}
