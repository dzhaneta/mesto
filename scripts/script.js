let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__bio');

let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');

let formElement = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input_type_username');
let jobInput = document.querySelector('.form__input_type_userabout');

let likePhotoButton = document.querySelectorAll('.photo-grid__like-button');

function togglePopup(targetPopup) {
  targetPopup.classList.toggle('popup_opened');
}

function fetchAndOpenProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  togglePopup(editProfilePopup);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  togglePopup(editProfilePopup);
}


editProfileButton.addEventListener('click', fetchAndOpenProfile);

closeEditProfilePopupButton.addEventListener('click', togglePopup(editProfilePopup));

formElement.addEventListener('submit', formSubmitHandler);


likePhotoButton.forEach(likePhotoButton => {
    likePhotoButton.addEventListener('click', function(evt) {
      likePhotoButton.classList.toggle('photo-grid__like-button_active')
    })
  }
);



let addCardPopup = document.querySelector('.popup_type_add-card');
let addCardButton = document.querySelector('.profile__add-button');
let closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');


