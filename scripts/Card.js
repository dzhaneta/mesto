import { viewPhotoPopup, openPopup } from './index.js';


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
    const likeCardButton = this._element.querySelector('.photo-grid__like-button');
    const deleteCardButton = this._element.querySelector('.photo-grid__delete-button');
    const viewPhotoButton = this._element.querySelector('.photo-grid__pic');

    likeCardButton.addEventListener('click', (evt) => {
      evt.target.classList.toggle('photo-grid__like-button_active')
    });

    deleteCardButton.addEventListener('click', () => {
      this._element.remove();
    })

    viewPhotoButton.addEventListener('click', () => {
      this._openViewPhotoPopup();
    })
  }

  _openViewPhotoPopup() {
    viewPhotoPopup.querySelector('.popup__photo-pic').src = this._image;
    viewPhotoPopup.querySelector('.popup__photo-pic').alt = this._image;
    viewPhotoPopup.querySelector('.popup__photo-caption').textContent = this._text;
    openPopup(viewPhotoPopup);
  }

}
