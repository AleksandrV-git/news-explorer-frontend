export class FormValidator {
  constructor(formElement, errorMessages) {
    this.form = formElement;
    this.errorMessages = errorMessages;
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

  setEventListeners() {
    this.btn = this.form.querySelector('button');
    this.btnText = this.btn.textContent;
    this.btnTextSize = this.btn.style.fontSize;
    this.inputs = this.form.querySelectorAll('input');
    this.form.addEventListener('input', () => this.checkInputValidity());
  }

  resetErrorText() {
    const errorElems = this.form.querySelectorAll('.popup__error');
    errorElems.forEach((el) => {
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
