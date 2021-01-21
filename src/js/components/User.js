export class User {
  constructor() {
    this.info = {};
    this.isLoggedIn = false;
  }

  setInfo = (user) => {
    user.isAuthorized = true;
    localStorage.setItem('user', JSON.stringify(user));
    this.info = user;
    this.isLoggedIn = true;
  }

  removeInfo = () => {
    localStorage.removeItem('user');
    this.info = {};
    this.isLoggedIn = false;
  }
}
