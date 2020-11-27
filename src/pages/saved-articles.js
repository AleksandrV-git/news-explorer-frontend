import "../pages/saved-articles.css";

document.querySelector('.header__menu-open-icon').addEventListener('click', () => {
  document.querySelector('.header__menu-open-icon').classList.toggle('header__menu-open-icon_theme-close-icon');
  document.querySelector('#nav-authorized').classList.toggle('header__nav-container_mobile-opened')
  document.querySelector('.adjustment-layer').classList.toggle('adjustment-layer_active')
  });
