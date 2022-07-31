import './index.css';
import Section from '../components/Section.js';
import { initialCards } from '../components/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

// CONSTANTS

const cardsGallery = document.querySelector('.photo-grid');
const gallerySection = '.photo-grid';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const formProfile = document.querySelector('.form_type_edit-profile');
window.buttonEditProfile = buttonEditProfile;

const buttonAddCard = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('.form_type_add-card');

const formSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

// ALL FORMS VALIDATION
const formValidators = {};
const formList = [formProfile, formAddCard];
formList.forEach((form) => {
  formValidators[form.name] = new FormValidator(formSettings, form);
  formValidators[form.name].enableValidation();
});

// POPUPS

// PROFILE POPUP

const profileInfo = new UserInfo({
  usernameSelector:'.profile__name',
  aboutSelector:'.profile__bio'
});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  formSubmitHandler: (inputValues) => {
    profileInfo.setUserInfo(inputValues);
    profilePopup.close();
  }
});

profilePopup.setEventListeners();

function profileFormOpenHandler() {
  const currentProfileInfo = profileInfo.getUserInfo();
  profilePopup.name = profilePopup.getFormElement().querySelector('.form__input_type_username');
  profilePopup.about = profilePopup.getFormElement().querySelector('.form__input_type_userabout');

  profilePopup.name.value = currentProfileInfo.name;
  profilePopup.about.value = currentProfileInfo.about;
  formValidators[formProfile.name].disableButtonIfNeeded();
  profilePopup.open();
}

buttonEditProfile.addEventListener('click', profileFormOpenHandler);

// ADD-CARD POPUP

const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formSubmitHandler: (inputValues) => {

    const addCardInput = {
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    };

    renderCard(addCardInput);
    cardAddPopup.close();
  }
});

cardAddPopup.setEventListeners();

function cardAddPopupOpenHandler() {
  formAddCard.reset();
  formValidators[formAddCard.name].disableButtonIfNeeded();
  cardAddPopup.open();
}

buttonAddCard.addEventListener('click', cardAddPopupOpenHandler);

// VIEW-PHOTO POPUP

const viewPhotoPopup = new PopupWithImage('.popup_type_view-photo');
viewPhotoPopup.setEventListeners();

// FUNCTIONS
// Функция добавления новой карточки в секцию
function renderCard(inputInfo) {
  const card = new Card({
    data: inputInfo,
    handleCardClick: (cardName, cardImage) => {
      viewPhotoPopup.open(cardName, cardImage);
    }
  }, '#card');
  const cardElement = card.generateCard();

  cardsGallery.prepend(cardElement);
}

// GALLERY SECTION RENDERING

const galleryList = new Section({
  items: initialCards,
  renderer: (initialCardItem) => {
    const card = new Card({
      data: initialCardItem,
      handleCardClick: (cardName, cardImage) => {
        viewPhotoPopup.open(cardName, cardImage);
      }
    }, '#card');

    const cardElement = card.generateCard();

    galleryList.addItem(cardElement);
    },
  },
  gallerySection
);

galleryList.renderItems();





