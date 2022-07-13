import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// ПЕРЕМЕННЫЕ

const cardsGallery = document.querySelector('.photo-grid');

const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__bio');

const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');

const formProfile = document.querySelector('.form_type_edit-profile');
const nameInput = document.querySelector('.form__input_type_username');
const jobInput = document.querySelector('.form__input_type_userabout');

const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');

const formAddCard = document.querySelector('.form_type_add-card');
const cardTitleInput = document.querySelector('.form__input_type_cardtitle');
const cardLinkInput = document.querySelector('.form__input_type_cardlink');

const popupViewPhoto = document.querySelector('.popup_type_view-photo');
const buttonClosePopupViewPhoto = popupViewPhoto.querySelector('.popup__close-button');

const formSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

// ВАЛИДАЦИЯ ФОРМ
const formValidators = {};
const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
formList.forEach((form) => {
  formValidators[form.name] = new FormValidator(formSettings,form);
  formValidators[form.name].enableValidation();
});


// ФУНКЦИИ

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closePopupByOverlay(evt) {
  if (evt.target == evt.currentTarget) {
    closePopup(document.querySelector('.popup_opened'));
  }

}

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
  targetPopup.addEventListener("mousedown", closePopupByOverlay);
}

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
  targetPopup.removeEventListener("mousedown", closePopupByOverlay);
}


function fetchAndOpenProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = aboutProfile.textContent;
  formValidators['edit-profile-form'].enableValidation();
  openPopup(popupProfile);
}

// Обработчик «отправки» формы редактирования профиля
function profileFormSubmitHandler (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = jobInput.value;
  closePopup(popupProfile);

}

// Обработчик «отправки» формы добавления карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  const addCardInput = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(addCardInput);

  closePopup(popupAddCard);
  formAddCard.reset();
  formValidators['add-card-form'].enableValidation();
}

// Функция создания новой карточки
function renderCard(inputInfo) {
  const card = new Card(inputInfo, '#card');
  const cardElement = card.generateCard();

  cardsGallery.prepend(cardElement);
}

//рендерим галерею при загрузке
initialCards.forEach((initialCards) => {
  renderCard(initialCards);
  }
);

// СЛУШАТЕЛИ

buttonEditProfile.addEventListener('click', fetchAndOpenProfile);
buttonClosePopupProfile.addEventListener('click', () => {closePopup(popupProfile)});
formProfile.addEventListener('submit', profileFormSubmitHandler);

buttonAddCard.addEventListener('click', () => {openPopup(popupAddCard)});
buttonClosePopupAddCard.addEventListener('click', () => {closePopup(popupAddCard)});
formAddCard.addEventListener('submit', addCardFormSubmitHandler);

buttonClosePopupViewPhoto.addEventListener('click', () => {closePopup(popupViewPhoto)});


export { popupViewPhoto, openPopup };




