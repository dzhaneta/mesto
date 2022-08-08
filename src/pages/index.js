import './index.css';
import {
  gallerySection,
  buttonEditProfile,
  formProfile,
  buttonAddCard,
  formAddCard,
  buttonEditAvatar,
  formEditAvatar,
  formSettings
} from '../utils/constants.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
/* import { initialCards } from '../utils/initialCards.js'; */
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';

// API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-46',
  headers: {
    authorization: 'f4153072-2789-4ce5-9bfb-c8ce57bf3b50',
    'Content-Type': 'application/json'
  }
});



// ALL FORMS VALIDATION
const formValidators = {};
const formList = [formProfile, formAddCard, formEditAvatar];
formList.forEach((form) => {
  formValidators[form.name] = new FormValidator(formSettings, form);
  formValidators[form.name].enableValidation();
});

// POPUPS


// PROFILE POPUP

const profileInfo = new UserInfo({
  avatarSelector: '.profile__avatar',
  usernameSelector:'.profile__name',
  aboutSelector:'.profile__bio'
});

const profilePopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-profile',
  formSubmitHandler: (inputValues) => {
    profilePopup.showLoader(true, 'Сохранение...');
    api.saveProfile(inputValues.name, inputValues.about)
    .then(() =>  profileInfo.setUserInfo(inputValues))
    .finally(() => profilePopup.showLoader(false, 'Сохранить'));
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

// AVATAR EDIT POPUP

const avatarEditPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit-avatar',
  formSubmitHandler: (inputValues) => {
    avatarEditPopup.showLoader(true, 'Сохранение...');

    const avatarEditInput = {
      link: inputValues['avatar']
    };

    api.saveAvatar(avatarEditInput.link)
    .then(() =>  profileInfo.setUserInfo(inputValues))
    .catch((err) => console.log(err))
    .finally(() => cardAddPopup.showLoader(false, 'Сохранить'));
    avatarEditPopup.close();
  }
});

avatarEditPopup.setEventListeners();

function openEditAvatarPopupHandler() {
  formValidators[formEditAvatar.name].resetValidation();
  avatarEditPopup.open();
}

buttonEditAvatar.addEventListener('click', openEditAvatarPopupHandler);

// ADD-CARD POPUP

const cardAddPopup = new PopupWithForm({
  popupSelector: '.popup_type_add-card',
  formSubmitHandler: (inputValues) => {
    cardAddPopup.showLoader(true, 'Сохранение...');

    const addCardInput = {
      name: inputValues['card-title'],
      link: inputValues['card-link'],
    };


    api.saveCard(addCardInput.name, addCardInput.link)
    .then((res) => galleryList.addItem(res))
    .catch((err) => console.log(err))
    .finally(() => cardAddPopup.showLoader(false, 'Создать'));
    cardAddPopup.close();
  }
});

cardAddPopup.setEventListeners();

function openAddCardPopupHandler() {
  formValidators[formAddCard.name].resetValidation();
  cardAddPopup.open();
}

buttonAddCard.addEventListener('click', openAddCardPopupHandler);

// DELETE-CARD POPUP

const cardDeletePopup = new PopupWithConfirmation({
  popupSelector: '.popup_type_delete-card'
});

cardDeletePopup.setEventListeners();

// VIEW-PHOTO POPUP

const viewPhotoPopup = new PopupWithImage('.popup_type_view-photo');
viewPhotoPopup.setEventListeners();

// RENDERING



const galleryList = new Section({
  renderer: (initialCardItem) => {
    const card = new Card({
      data: initialCardItem,
      user: profileID,
      handleCardClick: (cardName, cardImage) => viewPhotoPopup.open(cardName, cardImage),

      handleAddLike: cardId => {
        api.addLike(cardId)
          .then(data => card.updateLikes(data))
          .catch((error) => console.log(error));
      },

      handleRemoveLike: cardId => {
        api.removeLike(cardId)
          .then(data => card.updateLikes(data))
          .catch((error) => console.log(error));
      },

      handleDeleteCard: card => {
        cardDeletePopup.open();
        cardDeletePopup.setSubmitAction(() => {
          api.deleteCard(card._cardId)
          .then(() => card.removeCard())
          .then(() => cardDeletePopup.close())
          .catch((err) => console.log(err))
        });
      }
    }, '#card');
    const cardElement = card.generateCard();
    return cardElement;
    },
  },
  gallerySection
);

let profileID;

Promise.all([api.getProfile(), api.getCards()])
  .then(([profile, cards]) => {

    profileID = profile._id;

    profileInfo.setUserInfo(profile);

    galleryList.renderItems(cards);
  })
  .catch((err) => {console.log(err);});







