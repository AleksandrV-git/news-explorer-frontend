export class PopupProfileEditHandler {
  constructor(formProfile, popupEditProfile, userInfo, api) {
    this.formProfile = formProfile;
    this.popupEditProfile = popupEditProfile;
    this.userInfo = userInfo;
    this.api = api;
  }

  setFormValues() {
    this.formProfile.form.reset();

    this.formProfile.setSubmitButtonState(true);

    const { name, about } = this.formProfile.form.elements;

    name.value = this.userInfo.name;
    about.value = this.userInfo.about;

    this.formProfile.resetErrorText();
  }

  submit(event) {
    event.preventDefault();

    this.formProfile.setSubmitButtonState(true, "Загрузка...");
    this.api.patchUserProfile(this.formProfile.form.elements.name.value, this.formProfile.form.elements.about.value)

      .then((result) => {
        this.userInfo.setUserInfoFromGetRequest(result);
      })
      .then((result) => {
        this.userInfo.updateUserInfo(result);
        this.formProfile.form.reset();
        this.popupEditProfile.close();
        this.formProfile.setSubmitButtonState(false);
        /*REVIEW. + Нужно исправить. В методе then, в котором Вы будете заносить данные  о профиле на страницу, нужно произвести закрытие формы профиля, так как
        форма должна закрыться только после прихода успешного ответа и заполнения элементов страницы информацией (не раньше).
        Если же придёт неуспешный ответ (информация на сервере не сохранилась) форма вообще не должна закрываться - пользователь может выйти из формы по крестику,
        когда Вы ему сообщите о неуспешности, или попробовать ещё раз.
        */
      })
      .catch((err) => {
        this.formCard.setSubmitButtonState(true, "Ошибка, попробовать ещё раз");
        console.log(`Ошибка: ${err}`);
      })  
    /*REVIEW. + Нужно исправить.  Нужно правильно и в нужном месте сделать закрытие формы профиля при сабмите (напоминаю, она должна закрыться только
    после прихода успешного ответа от сервера и его обработки), учитывая асинхронность ответа сервера.
    Асинхронность означает, что все команды проекта, находящиеся вне метода then обработки ответа от сервера, выполнятся (которые могут выполниться
    в это время по логике проекта) раньше, чем придёт ответ от сервера. И, если Вы хотите, чтобы какие-то команды не выполнялись до прихода ответа,
    их нужно поместить в методы then, или catch обработки ответа. Поэтому две  нижеследующие инструкции надо отсюда убрать и куда поместить
    читайте в комментарии в классе Api. */
  }

  setEventListeners() {
    this
      .formProfile.form
      .addEventListener('submit', (event) => this.submit(event));

    this
      .popupEditProfile.openEl
      .addEventListener('click', (event) => this.setFormValues(event));
  }
}