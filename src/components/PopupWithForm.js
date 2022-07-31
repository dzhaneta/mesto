import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, formSubmitHandler }) {
    super(popupSelector);
    this._formSubmitHandler = formSubmitHandler;
    this._formElement = this._popup.querySelector(".form");
    this._inputList = this._formElement.querySelectorAll(".form__input");
  }

  _getInputValues() {
    this._inputValues = {};

    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  getFormElement() {
    return this._formElement;
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

}
