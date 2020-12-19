export class User {
  constructor() {
  }

  setInfo = (userData) => {
    const user = userData;
    user.isLoggedIn = true;
    localStorage.user = JSON.stringify(user);;
  }

  getInfo = (localStorageUser) => {
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      return user;
    }
  }

  removeInfo = () => {
    localStorage.user = null;
  }
}
