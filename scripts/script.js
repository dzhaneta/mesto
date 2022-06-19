// ПЕРЕМЕННЫЕ

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

  const addCardInput = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
  };

  renderCard(addCardInput);

  closePopup(addCardPopup);
  addCardForm.reset();
  reValidation(addCardForm);
}

function addCard(inputInfo) {

  // клонируем содержимое тега template в заготовку новой карточки
  const newCard = cardTemplate.querySelector('.card').cloneNode(true);

  // наполняем заготовку содержимым
  const newCardPic = newCard.querySelector('.photo-grid__pic');

  newCardPic.src = inputInfo.link;
  newCardPic.alt = inputInfo.name;
  newCard.querySelector('.photo-grid__pic-title').textContent = inputInfo.name;
  const likeCardButton = newCard.querySelector('.photo-grid__like-button');
  const deleteCardButton = newCard.querySelector('.photo-grid__delete-button');
  const viewPhotoButton = newCardPic;


  likeCardButton.addEventListener('click', (evt) => {
    evt.target.classList.toggle('photo-grid__like-button_active')
  });

  deleteCardButton.addEventListener('click', () => {
    newCard.remove();
  })

  viewPhotoButton.addEventListener('click', () => {
    openViewPhotoPopup(inputInfo);
  })

  return newCard;

}

function renderCard(inputInfo) {
  cardsGallery.prepend(addCard(inputInfo));
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







