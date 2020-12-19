export class Header {
  constructor(headerNode, openIconCallback, logoutCallback) {
    this.navAuthorized = headerNode.querySelector('#nav-authorized');
    this.navNotAuthorized = headerNode.querySelector('#nav-not-authorized');
    this.logoutBtn = headerNode.querySelector('#button-logout .button__inner-text');
    this.menuOpenIcon = headerNode.querySelector('.header__menu-open-icon');
    this.openIconCallback = openIconCallback.bind(this);
    this.logoutCallback = logoutCallback.bind(this);
    this.UserIsLoggedIn = false;
  }

  render(props) {
    if (props && props.isLoggedIn) {
      this.UserIsLoggedIn = true;
      this.logoutBtn.textContent = props.name;
    }
  }

  openNavMenu = () => {
    this.menuOpenIcon.classList.toggle('header__menu-open-icon_theme-close-icon');
    this.navAuthorized.classList.toggle('header__nav-container_mobile-opened');
    if (this.navNotAuthorized) {
      this.navNotAuthorized.classList.toggle('header__nav-container_mobile-opened');
    }
    return this.openIconCallback(this);
  }

  setHandlers() {
    this.menuOpenIcon.addEventListener('click', this.openNavMenu);
    this.logoutBtn.addEventListener('click', this.logoutCallback);
  }
}
