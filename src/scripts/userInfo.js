export class UserInfo {
  constructor(nameElement, aboutElement, avatarElement, mestoApi) {
    this.nameElement = nameElement;
    this.aboutElement = aboutElement;
    this.avatarElement = avatarElement;
    this.name = nameElement.textContent;
    this.about = aboutElement.textContent;
    this.avatar = null;
    this._id = null;
    this.cohort = null;
    this.mestoApi = mestoApi;
  }

  getUserInfo = () => {
    this.mestoApi.getUserProfile()

      .then((result) => {
        this.setUserInfoFromGetRequest(result);
      })
      .then((result) => {
        this.updateUserInfo(result);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }


  setUserInfo(formElements) {
    this.name = formElements.name.value;
    this.about = formElements.about.value;
  }

  setUserInfoFromGetRequest(obj) {
    this.name = obj.name;
    this.about = obj.about;
    this.avatar = obj.avatar;
    this._id = obj._id;
    this.cohort = obj.cohort;
  }

  updateUserInfo = () => {
    this.nameElement.textContent = this.name;
    this.aboutElement.textContent = this.about;
    if (this.avatar !== null) {
      this.avatarElement.style.backgroundImage = `url(${this.avatar})`;
    }
  }
}