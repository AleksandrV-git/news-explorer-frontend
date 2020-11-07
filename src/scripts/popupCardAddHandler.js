export class PopupCardAddHandler {
  constructor(formCard, popupCardAdd, cardList, ImgZoom, api) {
    this.formCard = formCard;
    this.popupCardAdd = popupCardAdd;
    this.cardList = cardList;
    this.ImgZoom = ImgZoom;
    this.api = api;
  }

  submit(event) {
    event.preventDefault();

    this.formCard.setSubmitButtonState(true, "Загрузка...");
    this.formCard.btn.style.fontSize = "18px";
    const { name, link } = this.formCard.form.elements;

    this.api.postCard(name.value, link.value)

      .then((data) => {
        this.cardList.addCard(data.name, data.link, data._id, data.owner._id, data.likes, this.ImgZoom);
        this.formCard.form.reset();
        this.popupCardAdd.close();
        this.formCard.setSubmitButtonState(false);
      })
      .catch((err) => {
        this.formCard.setSubmitButtonState(true, "Ошибка, попробовать ещё раз");
        console.log(`Ошибка: ${err}`);
      })
  }

  setEventListeners() {
    this
      .formCard.form
      .addEventListener('submit', this.submit.bind(this));
  }
}