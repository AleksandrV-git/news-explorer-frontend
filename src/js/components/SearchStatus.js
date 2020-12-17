export class SearchStatus {
  constructor(StatusNode) {
    this.preloader = StatusNode.querySelector('.search-status__preloader');
    this.status = StatusNode.querySelector('.search-status__message');
  }

  renderLoader() {
    this.status.style.display = 'none';
    this.preloader.style.display = 'flex';
  }

  renderStatus() {
    this.preloader.style.display = 'none';
    this.status.style.display = 'flex';
  }

  close() {
    this.status.style.display = 'none';
    this.preloader.style.display = 'none';
  }
}
