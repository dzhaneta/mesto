import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._formElement.querySelectorAll(".form__input");
    this._submitButton = this._formElement.querySelectorAll(".form__save-button");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._getInputValues();
        this._formSubmitHandler(this._inputValues);
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }

  showLoader(boolean, message) {
    let defaultMessage = this._submitButton.textContent;
    let newMessage = message;
    if (boolean) {
      this._submitButton.textContent = newMessage;
    } else {
      this._submitButton.textContent = defaultMessage;
    }
  }
}
