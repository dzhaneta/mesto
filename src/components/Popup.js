export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.classList.add('popup_opened');
  }

  close() {
    document.removeEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });

    this._popup.classList.remove('popup_opened');
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button').addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target == evt.currentTarget) {
        this.close();
      }
    });
  }
}
