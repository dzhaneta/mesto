
export class Card {
  constructor({ data, user, handleCardClick, handleAddLike, handleRemoveLike, handleDeleteCard }, cardSelector) {
    this._data = data;
    this._text = data.name;
    this._image = data.link;
    this._user = user;
    this._owner = data.owner._id;
    this._cardId = data._id;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleRemoveLike = handleRemoveLike;
    this._handleDeleteCard = handleDeleteCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;

  }

  // Remove Delete Button or Add Listener

  _deleteCard() {
    if (this._owner !== this._user) {
      this._deleteCardButton.remove();
    } else {
      this._deleteCardButton.addEventListener('click', () => {
        this._handleDeleteCard(this._cardId, this._element);
      });
    }
  }

  _toggleLikes(likeButton) {
    let handleLike = likeButton.classList.contains('photo-grid__like-button_active') ? this._handleRemoveLike : this._handleAddLike;
    handleLike(this._cardId);
  }

  updateLikes(data) {
    const liked = Boolean(data.likes.some(like => like._id === this._user));

    if (liked) {
      this._likeCardButton.classList.add('photo-grid__like-button_active');
    } else {
      this._likeCardButton.classList.remove('photo-grid__like-button_active');
    }

    this._cardLikes.textContent = data.likes.length;
  }

  generateCard() {
    this._element = this._getTemplate();

    this._cardName = this._element.querySelector('.photo-grid__pic-title');
    this._cardImage = this._element.querySelector('.photo-grid__pic');

    this._cardLikes = this._element.querySelector('.photo-grid__pic-likes');
    this._likeCardButton = this._element.querySelector('.photo-grid__like-button');
    this._deleteCardButton = this._element.querySelector('.photo-grid__delete-button');

    this._cardImage.src = this._image;
    this._cardImage.alt = this._text;
    this._cardName.textContent = this._text;

    this.updateLikes(this._data);
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    const buttonViewPhoto = this._element.querySelector('.photo-grid__pic');

    this._likeCardButton.addEventListener('click', (evt) => {
      this._toggleLikes(evt.currentTarget);
    });

    this._deleteCard();

    buttonViewPhoto.addEventListener('click', () => {
      this._handleCardClick(this._cardName, this._cardImage);
    })
  }

  getElement() {
    return this._card
  }
}
