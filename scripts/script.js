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

let editProfileForm = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input_type_username');
let jobInput = document.querySelector('.form__input_type_userabout');

let addCardPopup = document.querySelector('.popup_type_add-card');
let addCardButton = document.querySelector('.profile__add-button');
let closeAddCardPopupButton = addCardPopup.querySelector('.popup__close-button');

let addCardForm = document.querySelector('.form_type_add-card');
let cardTitleInput = document.querySelector('.form__input_type_cardtitle');
let cardLinkInput = document.querySelector('.form__input_type_cardlink');

let viewPhotoPopup = document.querySelector('.popup_type_view-photo');
let closeViewPhotoPopup = viewPhotoPopup.querySelector('.popup__close-button');


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

function openViewPhotoPopup(targetCard) {
  viewPhotoPopup.querySelector('.popup__photo-pic').src = targetCard.link;
  viewPhotoPopup.querySelector('.popup__photo-pic').alt = targetCard.name;
  viewPhotoPopup.querySelector('.popup__photo-caption').textContent = targetCard.name;
  openPopup(viewPhotoPopup);
}

// Обработчик «отправки» формы редактирования профиля
function profileFormSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(editProfilePopup);
}

// Обработчик «отправки» формы добавления карточки
function addCardFormSubmitHandler (evt) {
  evt.preventDefault();

  let addCardInput = [];

  addCardInput.name = cardTitleInput.value;
  addCardInput.link = cardLinkInput.value;

  addCard(addCardInput);

  closePopup(addCardPopup);
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
  const likeCardButton = newCard.querySelector('.photo-grid__like-button');
  const deleteCardButton = newCard.querySelector('.photo-grid__delete-button');
  const viewPhotoButton = newCard.querySelector('.photo-grid__pic');


  likeCardButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_active')
  });

  deleteCardButton.addEventListener('click', () => {
    newCard.remove();
  })

  viewPhotoButton.addEventListener('click', () => {
    openViewPhotoPopup(newCard);
  })


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
editProfileForm.addEventListener('submit', profileFormSubmitHandler);

addCardButton.addEventListener('click', () => {openPopup(addCardPopup)});
closeAddCardPopupButton.addEventListener('click', () => {closePopup(addCardPopup)});
addCardForm.addEventListener('submit', addCardFormSubmitHandler);

closeViewPhotoPopup.addEventListener('click', () => {closePopup(viewPhotoPopup)});







