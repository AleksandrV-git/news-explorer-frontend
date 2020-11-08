import "./pages/index.css";
import { Popup } from './scripts/popup.js';
import { PopupImage } from './scripts/popupImage.js';
import { FormValidator } from './scripts/formValidator.js';
import { Api } from './scripts/api.js';
import { UserInfo } from './scripts/userInfo.js';
import { CardList } from './scripts/cardList.js';
import { PopupCardAddHandler } from './scripts/popupCardAddHandler.js';
import { PopupProfileEditHandler } from './scripts/popupProfileEditHandler.js';
import { PopupAvatarEditHandler } from './scripts/popupAvatarEditHandler.js';
import { Card } from './scripts/card.js';

'use strict';

const serverUrl = NODE_ENV === 'production' ? 'https://nomoreparties.co' : 'http://nomoreparties.co';

(function() {

    const errorMessages = {
        valueMissing: 'Это обязательное поле',
        tooShort: 'Должно быть от 2 до 30 символов',
        typeMismatch: 'Здесь должна быть ссылка'
    };

    const userFetchOptions = {
        baseUrl: `${serverUrl}/cohort11`,
        headers: {
            authorization: '9e994c9b-3ee0-4017-bdfe-5cb3911497f0',
            'Content-Type': 'application/json'
        }
    };

    const createCard = (...arg) => new Card(...arg);
    const popupCardAdd = new Popup(document.querySelector(".popup"), document.querySelector(".popup__close"), document.querySelector(".search-form__button"));
    const popupEditProfile = new Popup(document.querySelector(".popup_edit-profile"), document.querySelector(".popup__close_edit-profile"), document.querySelector(".nav-container__button"));
    const popupEditAvatar = new Popup(document.querySelector("#avatarEditPopup"), document.querySelector("#avatarPopupClose"), document.querySelector(".author-info__photo"));
    const popupImage = new PopupImage(document.querySelector(".popup_image"), document.querySelector(".popup__close_image"));
    const formCard = new FormValidator(document.querySelector('form[name="new"]'), errorMessages);
    const formProfile = new FormValidator(document.querySelector('form[name="formProfile"]'), errorMessages);
    const formProfileAvatar = new FormValidator(document.querySelector('form[name="formAvatar"]'), errorMessages);
    const mestoFetchApi = new Api(userFetchOptions);
    const userInfo = new UserInfo(document.querySelector(".author-info__text"), document.querySelector(".author-info__paragraf"), document.querySelector(".author-info__photo"), mestoFetchApi);
    const cardList = new CardList(document.querySelector(".places-list"), createCard, userInfo, mestoFetchApi);
    const popupCardAddHandler = new PopupCardAddHandler(formCard, popupCardAdd, cardList, popupImage.open, mestoFetchApi);
    const popupProfileEditHandler = new PopupProfileEditHandler(formProfile, popupEditProfile, userInfo, mestoFetchApi);
    const popupAvatarEditHandler = new PopupAvatarEditHandler(formProfileAvatar, popupEditAvatar, userInfo, mestoFetchApi);



    // popupCardAdd.setEventListeners();
    // popupEditProfile.setEventListeners();
    // popupEditAvatar.setEventListeners();
    // popupImage.setEventListeners();
    // formCard.setEventListeners();
    // formProfile.setEventListeners();
    // formProfileAvatar.setEventListeners();
    // popupCardAddHandler.setEventListeners();
    // popupProfileEditHandler.setEventListeners();
    // popupAvatarEditHandler.setEventListeners();


    // userInfo.getUserInfo();
    // cardList.renderFromRequest(popupImage.open);

})();
