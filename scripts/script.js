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

let cardsGallery = document.querySelector('.photo-grid');

let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__bio');

let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editProfileButton = document.querySelector('.profile__edit-button');
let closeEditProfilePopupButton = editProfilePopup.querySelector('.popup__close-button');

let addCardPopup = document.querySelector('.popup_type_add-card');
let addCardButton = document.querySelector('.profile__add-button');
let closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');

let formElement = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input_type_username');
let jobInput = document.querySelector('.form__input_type_userabout');

let likePhotoButton = document.querySelectorAll('.photo-grid__like-button');


// ФУНКЦИИ

function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
}

function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
}

function fetchAndOpenProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(editProfilePopup);
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

function addCard(inputInfo) {
    //берем темплейт//
  const cardTemplate = document.querySelector('#card').content;

  // клонируем содержимое тега template в заготовку новой карточки
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем заготовку содержимым
  newCard.querySelector('.photo-grid__pic').src = inputInfo.link;
  newCard.querySelector('.photo-grid__pic').alt = inputInfo.name;
  newCard.querySelector('.photo-grid__pic-title').textContent = inputInfo.name;

  // отображаем на странице
  cardsGallery.prepend(newCard);
}

//рендерим галерею при загрузке
initialCards.forEach((initialCards) => {
  addCard(initialCards);
}
);



// СЛУШАТЕЛИ

editProfileButton.addEventListener('click', () => {fetchAndOpenProfile()});
closeEditProfilePopupButton.addEventListener('click', () => {closePopup(editProfilePopup)});
formElement.addEventListener('submit', formSubmitHandler);

addCardButton.addEventListener('click', () => {openPopup(addCardPopup)});
closeAddCardPopupButton.addEventListener('click', () => {closePopup(addCardPopup)});



likePhotoButton.forEach(likePhotoButton => {
    likePhotoButton.addEventListener('click', function(evt) {
      likePhotoButton.classList.toggle('photo-grid__like-button_active')
    })
  }
);






console.log(likePhotoButton);

