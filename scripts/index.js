import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

// ПЕРЕМЕННЫЕ

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


const cardsGallery = document.querySelector('.photo-grid');

const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__bio');

const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileButton = document.querySelector('.profile__edit-button');
const closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');

const editProfileForm = document.querySelector('.form_type_edit-profile');
const nameInput = document.querySelector('.form__input_type_username');
const jobInput = document.querySelector('.form__input_type_userabout');

const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardButton = document.querySelector('.profile__add-button');
const closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');

const addCardForm = document.querySelector('.form_type_add-card');
const cardTitleInput = document.querySelector('.form__input_type_cardtitle');
const cardLinkInput = document.querySelector('.form__input_type_cardlink');
const cardTemplate = document.querySelector('#card').content;

const viewPhotoPopup = document.querySelector('.popup_type_view-photo');
const closeViewPhotoPopup = viewPhotoPopup.querySelector('.popup__close-button');

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
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(editProfilePopup);
}

// Обработчик «отправки» формы редактирования профиля
function profileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(editProfilePopup);
  formValidators['edit-profile-form'].enableValidation();
}

// Обработчик «отправки» формы добавления карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  const addCardInput = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(addCardInput);

  closePopup(addCardPopup);
  addCardForm.reset();
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

editProfileButton.addEventListener('click', fetchAndOpenProfile);
closeEditProfilePopupButton.addEventListener('click', () => {closePopup(editProfilePopup)});
editProfileForm.addEventListener('submit', profileFormSubmitHandler);

addCardButton.addEventListener('click', () => {openPopup(addCardPopup)});
closeAddCardPopupButton.addEventListener('click', () => {closePopup(addCardPopup)});
addCardForm.addEventListener('submit', addCardFormSubmitHandler);

closeViewPhotoPopup.addEventListener('click', () => {closePopup(viewPhotoPopup)});


export { viewPhotoPopup, openPopup };




