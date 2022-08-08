export {
  cardsGallery,
  gallerySection,
  buttonEditProfile,
  formProfile,
  buttonAddCard,
  formAddCard,
  buttonEditAvatar,
  formEditAvatar,
  formSettings
};

const cardsGallery = document.querySelector('.photo-grid');
const gallerySection = '.photo-grid';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.form_type_edit-profile');

const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.form_type_add-card');

const buttonEditAvatar = document.querySelector('.profile__avatar-container');
const formEditAvatar = document.querySelector('.form_type_edit-avatar');

const formSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};
