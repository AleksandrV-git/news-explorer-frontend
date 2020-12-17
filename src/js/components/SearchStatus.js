export class SearchStatus {
  constructor(StatusNode) {
    this.preloader = StatusNode.querySelector('.search-status__preloader');
    this.status = StatusNode.querySelector('.search-status__message');
    this.title = StatusNode.querySelector('.search-status__message-title');
    this.text = StatusNode.querySelector('#err-message');
    console.log(this.title)
  }

  renderLoader() {
    this.status.style.display = 'none';
    this.preloader.style.display = 'flex';
  }

  renderStatusNotFond() {
    this.title.textContent = 'Ничего не найдено';
    this.text.textContent = 'К сожалению по вашему запросу ничего не найдено.';
    this.preloader.style.display = 'none';
    this.status.style.display = 'flex';
  }

  renderErr() {
    this.title.textContent = 'Во время запроса произошла ошибка';
    this.text.textContent = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    this.preloader.style.display = 'none';
    this.status.style.display = 'flex';
  }

  close() {
    this.status.style.display = 'none';
    this.preloader.style.display = 'none';
  }
}
