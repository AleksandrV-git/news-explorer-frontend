export class User {
  constructor() {
  }

  setInfo = (userData) => {
    const user = userData;
    user.isLoggedIn = true;
    localStorage.user = JSON.stringify(user);;
  }

  getInfo = () => {
    //const user = localStorage.user
    const user = JSON.parse(localStorage.user);
    return user;
  }

  removeInfo = () => {
    localStorage.user = {};
  }
}
