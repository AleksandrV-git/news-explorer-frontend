export class SearchForm {
  constructor(formENode, submitCallback) {
    this.form = formENode;
    this.error = formENode.querySelector('#search-field-error');
    this.submitCallback = submitCallback.bind(this);
  }

  getInfo = () => {
    const elem = this.form.elements.search;
    if (!this.checkInputValidity(elem)) {
      this.error.textContent = 'Нужно ввести ключевое слово'
    } else {
      this.error.textContent = ''
      return elem.value;
    }
  }

  checkInputValidity = (input) => {
    const regExp = /^\S{1,30}$/;
    console.log(regExp.test(input.value));
    return regExp.test(input.value);
  }

  setHandlers = () => {
    this.form.addEventListener('submit', this.submitCallback)
  }
}

