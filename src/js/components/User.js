export class User {
  constructor() {
    this.info = {};
  }

  setInfo = (userData) => {
    this.info = userData;
    this.info.isLoggedIn = true;
  }

  getInfo = () => {
    return this.info;
  }

  removeInfo = () => {
    this.info = {};
  }
}
