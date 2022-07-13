export const popupProfile = document.querySelector('.popup_type_edit-profile');
const buttonClosePopupProfile = popupProfile.querySelector('.popup__close-button');

export const popupAddCard = document.querySelector('.popup_type_add-card');
const buttonClosePopupAddCard = popupAddCard.querySelector('.popup__close-button');

export const popupViewPhoto = document.querySelector('.popup_type_view-photo');
const buttonClosePopupViewPhoto = popupViewPhoto.querySelector('.popup__close-button');

export function openPopup(targetPopup) {
  targetPopup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupByEsc);
  targetPopup.addEventListener("mousedown", closePopupByOverlay);
}

export function closePopup(targetPopup) {
  targetPopup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupByEsc);
  targetPopup.removeEventListener("mousedown", closePopupByOverlay);
}

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

buttonClosePopupProfile.addEventListener('click', () => {
  closePopup(popupProfile);
});

buttonClosePopupAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

buttonClosePopupViewPhoto.addEventListener('click', () => {
  closePopup(popupViewPhoto);
});
