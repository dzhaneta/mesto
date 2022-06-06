const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileAbout = profile.querySelector('.profile__bio');

let editProfilePopup = document.querySelector('.popup_type_edit-profile');
let editProfileButton = profile.querySelector('.profile__edit-button');
let editProfileClose = editProfilePopup.querySelector('.popup__close-button');

let formElement = document.querySelector('.form_type_edit-profile');
let nameInput = document.querySelector('.form__input_type_username');
let jobInput = document.querySelector('.form__input_type_userabout');


editProfileButton.addEventListener('click', function() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  editProfilePopup.classList.add('popup_opened');
});


editProfileClose.addEventListener('click', function() {
  editProfilePopup.classList.remove('popup_opened');
});


// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    console.log(nameInput.value);
    console.log(jobInput.value);
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
    profileName.textContent = nameInput.value;
    profileAbout.textContent = jobInput.value;
    editProfilePopup.classList.remove('popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

