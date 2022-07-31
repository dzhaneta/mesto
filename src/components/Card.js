
export class Card {
  constructor({ data, handleCardClick }, cardSelector) {
    this._text = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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

    this._cardName = this._element.querySelector('.photo-grid__pic-title');
    this._cardImage = this._element.querySelector('.photo-grid__pic');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._cardName.textContent = this._text;

    this._setEventListeners();
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
      this._handleCardClick(this._cardName, this._cardImage);
    })
  }

  _likeCard(evt) {
    evt.target.classList.toggle('photo-grid__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  }
}
