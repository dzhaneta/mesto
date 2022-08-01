import './index.css';
import {
  gallerySection,
  buttonEditProfile,
  formProfile,
  buttonAddCard,
  formAddCard,
  formSettings
} from '../utils/constants.js';
import Section from '../components/Section.js';
import { initialCards } from '../utils/initialCards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';


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

function openProfilePopupHandler() {
  const currentProfileInfo = profileInfo.getUserInfo();
  profilePopup.setInputValues(currentProfileInfo);
  formValidators[formProfile.name].resetValidation();
  profilePopup.open();
}

buttonEditProfile.addEventListener('click', openProfilePopupHandler);

// ADD-CARD POPUP

const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formSubmitHandler: (inputValues) => {

    const addCardInput = {
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    };

    galleryList.addItem(addCardInput);
    cardAddPopup.close();
  }
});

cardAddPopup.setEventListeners();

function openAddCardPopupHandler() {
  formValidators[formAddCard.name].resetValidation();
  cardAddPopup.open();
}

buttonAddCard.addEventListener('click', openAddCardPopupHandler);

// VIEW-PHOTO POPUP

const viewPhotoPopup = new PopupWithImage('.popup_type_view-photo');
viewPhotoPopup.setEventListeners();

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
    return cardElement;
    },
  },
  gallerySection
);

galleryList.renderItems();





