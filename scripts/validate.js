// CONSTANTS

const formSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__save-button',
  inactiveButtonClass: 'form__save-button_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

// ERROR DISPLAY FUNCTIONS

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(formSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(formSettings.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(formSettings.inputErrorClass);
  errorElement.classList.remove(formSettings.errorClass);
  errorElement.textContent = '';
};

// INPUT VALIDITY

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

// SUBMIT BUTTON AVAILABILITY

const toggleButtonState = (inputList, buttonElement) => {

  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(formSettings.inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(formSettings.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

// VALIDATION LISTENERS ACTIVATION

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = (formSettings) => {
  const formList = Array.from(document.querySelectorAll(formSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

// FORM VALIDATION LAUNCH

enableValidation(formSettings);

// REVALIDATION FOR REOPENED FORMS

const reValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(formSettings.inputSelector));
  const buttonElement = formElement.querySelector(formSettings.submitButtonSelector);

  toggleButtonState(inputList, buttonElement);
};
