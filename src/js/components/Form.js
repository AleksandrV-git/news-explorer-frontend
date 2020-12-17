export class Form {
  constructor(formElement, errorMessages, submitCallback) {
    this.form = formElement;
    this.errorMessages = errorMessages;
    this.errorsNodeList = this.form.querySelectorAll('.popup__error');
    this.serverErrorElem = this.form.querySelector('.popup__form-error');
    this.submitCallback = submitCallback;
  }

  checkInputValidity() {
    let valid = true;

    this.inputs.forEach((el) => {
      const inputName = el.getAttribute('id');
      const errorElem = this.form.querySelector(`#${inputName}-error`);

      if (el.validity.valueMissing && !el.validity.tooShort) {
        errorElem.textContent = this.errorMessages.valueMissing;
        valid = false;
      } else if (el.validity.tooShort || el.validity.tooLong) {
        errorElem.textContent = this.errorMessages.tooShort;
        valid = false;
      } else if (el.type === 'email' && el.validity.patternMismatch) {
        errorElem.textContent = this.errorMessages.emailPatternMismatch;
        valid = false;
      } else {
        errorElem.textContent = ' ';
      }
    });

    this.setSubmitButtonState(valid);
  }

  getInfo() {
    const inputs = Array.from(this.form.elements).filter(el => el.tagName === "INPUT");
    const inputNames = inputs.map(el => el.getAttribute('name'));
    let inputsData = {};
    inputNames.forEach((el) => { inputsData[el] = this.form.elements[el].value });
    return inputsData;
  }

  setHandlers() {
    this.btn = this.form.querySelector('button');
    this.btnText = this.btn.textContent;
    this.btnTextSize = this.btn.style.fontSize;
    this.inputs = this.form.querySelectorAll('input');
    this.form.addEventListener('input', () => this.checkInputValidity());
    this.form.addEventListener('submit', this.submitCallback);
  }

  setServerError(errText) {
    this.serverErrorElem.textContent = errText;
  }

  resetErrorText() {
    this.errorsNodeList.forEach((el) => {
      el.textContent = ' ';
    });
  }

  setSubmitButtonState(validity, text = null) {
    if (validity === false) {
      this.btn.setAttribute('disabled', true);
      this.btn.classList.add('popup__button_disabled');
    } else {
      this.btn.removeAttribute('disabled');
      this.btn.classList.remove('popup__button_disabled');
    }
    if (text !== null) {
      this.btn.textContent = text;
    } else {
      this.btn.textContent = this.btnText;
      this.btn.style.fontSize = this.btnTextSize;
    }
  }
}
