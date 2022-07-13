import { initialCards } from './initialCards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup, popupAddCard, popupProfile } from './popups.js'; // создала некий
//задел под классы попапов для ПР8 и избежала таким образом цикличности

// ПЕРЕМЕННЫЕ

const cardsGallery = document.querySelector('.photo-grid');

const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__bio');

const buttonEditProfile = document.querySelector('.profile__edit-button');

const formProfile = document.querySelector('.form_type_edit-profile');
const nameInput = document.querySelector('.form__input_type_username');
const jobInput = document.querySelector('.form__input_type_userabout');

window.buttonEditProfile = buttonEditProfile;

const buttonAddCard = document.querySelector('.profile__add-button');

const formAddCard = document.querySelector('.form_type_add-card');
const cardTitleInput = document.querySelector('.form__input_type_cardtitle');
const cardLinkInput = document.querySelector('.form__input_type_cardlink');

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
const formList = [formProfile, formAddCard];
formList.forEach((form) => {
  formValidators[form.name] = new FormValidator(formSettings, form);
  formValidators[form.name].enableValidation();
});


// ФУНКЦИИ

function fetchAndOpenProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = aboutProfile.textContent;
  formValidators[formProfile.name].disableButtonIfNeeded();
  openPopup(popupProfile);
}

function openAddCardPopup() {
  formAddCard.reset();
  formValidators[formAddCard.name].disableButtonIfNeeded();
  openPopup(popupAddCard);
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
});

// СЛУШАТЕЛИ

buttonEditProfile.addEventListener('click', fetchAndOpenProfile);
formProfile.addEventListener('submit', profileFormSubmitHandler);
buttonAddCard.addEventListener('click', openAddCardPopup);
formAddCard.addEventListener('submit', addCardFormSubmitHandler);
