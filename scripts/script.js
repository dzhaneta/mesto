let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__bio');

let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editProfileButton = document.querySelector('.profile__edit-button');
let closePopupButton = editProfilePopup.querySelector('.popup__close-button');

let formElement = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input_type_username');
let jobInput = document.querySelector('.form__input_type_userabout');

function togglePopup() {
  editProfilePopup.classList.toggle('popup_opened');
}

function FetchAndOpenProfile() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  togglePopup();
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  // Выберите элементы, куда должны быть вставлены значения полей
  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  togglePopup();
}


editProfileButton.addEventListener('click', FetchAndOpenProfile);


closePopupButton.addEventListener('click', togglePopup);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

