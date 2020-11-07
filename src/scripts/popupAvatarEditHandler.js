export class PopupAvatarEditHandler {
    constructor(formAvatar, popupEditAvatar, userInfo, api) {
        this.formAvatar = formAvatar;
        this.popupEditAvatar = popupEditAvatar;
        this.userInfo = userInfo;
        this.api = api;
    }

    submit(event) {
        event.preventDefault();

        this.formAvatar.setSubmitButtonState(true, "Загрузка...");
        this.api.patchUserAvatar(this.formAvatar.form.elements.link.value)

            .then((result) => {
                this.userInfo.setUserInfoFromGetRequest(result);
            })
            .then((result) => {
                this.userInfo.updateUserInfo(result);
                this.formAvatar.form.reset();
                this.popupEditAvatar.close();
                this.formAvatar.setSubmitButtonState(false);
            })
            .catch((err) => {
                this.formCard.setSubmitButtonState(true, "Ошибка, попробовать ещё раз");
                console.log(`Ошибка: ${err}`);
            })
    }

    setEventListeners() {
        this
            .formAvatar.form
            .addEventListener('submit', (event) => this.submit(event));
    }
}