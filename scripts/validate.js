const showInputError = (formPopupElement, inputElement, errorMessage, { inputErrorClass, errorClass }) => {
    const errorElement = formPopupElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formPopupElement, inputElement, { inputErrorClass, errorClass }) => {
    const errorElement = formPopupElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formPopupElement, inputElement, rest) => {
    if (!inputElement.validity.valid) {
        showInputError(formPopupElement, inputElement, inputElement.validationMessage, rest);
    } else {
        hideInputError(formPopupElement, inputElement, rest);
    }
};

const setEventListeners = (formPopupElement, { inputSelector, submitButtonSelector, ...rest }) => {
    const inputList = Array.from(formPopupElement.querySelectorAll(inputSelector));
    const buttonElement = formPopupElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, rest);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formPopupElement, inputElement, rest);
            toggleButtonState(inputList, buttonElement, rest);
        });
    });
};

const enableValidation = ({ formSelector, ...rest }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formPopupElement) => {
        setEventListeners(formPopupElement, rest);
    });
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'input_error',
    errorClass: 'popup__error_visible',
});

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass }) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute("disabled");
    }
}