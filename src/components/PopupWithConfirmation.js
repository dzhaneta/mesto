import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, ConfirmHandler }) {
    super(popupSelector);
    this._formElement = this._popup.querySelector(".form");
    this._ConfirmHandler = ConfirmHandler;
  }


  setEventListeners() {
    super.setEventListeners();

    this._formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._ConfirmHandler(cardId);
    });
  }

  open (cardId) {
    super.open();
    this._cardId = cardId;
   }


}
