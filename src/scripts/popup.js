export class Popup {
    constructor(popupElement, closeElement, openElement = null, rootPageElement = null) {
        this.popup = popupElement;
        this.closeEl = closeElement;
        this.openEl = openElement;
        this.rootPageElement = rootPageElement;
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

    setEventListeners() {
        this.closeEl.addEventListener('click', this.close);

        if (this.openEl !== null) {
            this.openEl.addEventListener('click', this.open);
        }
    }
}
