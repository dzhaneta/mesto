import { popupViewPhoto, openPopup } from './popups.js';


export class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;

  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const newCardPic = this._element.querySelector('.photo-grid__pic');
    newCardPic.src = this._image;
    newCardPic.alt = this._text;
    this._element.querySelector('.photo-grid__pic-title').textContent = this._text;


    return this._element;
  }

  _setEventListeners() {
    const buttonLikeCard = this._element.querySelector('.photo-grid__like-button');
    const buttonDeleteCard = this._element.querySelector('.photo-grid__delete-button');
    const buttonViewPhoto = this._element.querySelector('.photo-grid__pic');

    buttonLikeCard.addEventListener('click', this._likeCard);

    buttonDeleteCard.addEventListener('click', () => {
      this._deleteCard();
    })

    buttonViewPhoto.addEventListener('click', () => {
      this._openViewPhotoPopup();
    })
  }

  _likeCard(evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }

  _openViewPhotoPopup() {
    const viewPhotoPopupPic = popupViewPhoto.querySelector('.popup__photo-pic');
    viewPhotoPopupPic.src = this._image;
    viewPhotoPopupPic.alt = this._text;
    popupViewPhoto.querySelector('.popup__photo-caption').textContent = this._text;
    openPopup(popupViewPhoto);
  }
}
