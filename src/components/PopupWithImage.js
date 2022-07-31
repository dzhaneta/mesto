import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector('.popup__photo-pic');
    this._popupCaption = this._popup.querySelector('.popup__photo-caption');
  }

  open(cardName, cardImage) {
    this._popupCaption.textContent = cardName.textContent;
    this._popupImage.src = cardImage.src;
    this._popupImage.alt = cardName.alt;

    super.open();
  }

}
