class FormValidator {
    constructor(settings, elementValidationForm) {
        this._formSelector = settings.formSelector;
        this._inputSelector = settings.inputSelector;
        this._submitButtonSelector = settings.submitButtonSelector;
        this._inactiveButtonClass = settings.inactiveButtonClass;
        this._inputErrorClass = settings.inputErrorClass;
        this._errorClass = settings.errorClass;
        this._elementValidationForm = elementValidationForm;
    }

    _showInputError = (formPopupElement, inputElement, errorMessage) => {
        const errorElement = formPopupElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    _hideInputError = (formPopupElement, inputElement) => {
        const errorElement = formPopupElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);
        errorElement.textContent = '';
    };

    _checkInputValidity = (formPopupElement, inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(formPopupElement, inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(formPopupElement, inputElement);
        }
    };

    _setEventListeners = (formPopupElement) => {
        const inputList = Array.from(this._elementValidationForm.querySelectorAll(this._inputSelector));
        const buttonElement = this._elementValidationForm.querySelector(this._submitButtonSelector);
        this._toggleButtonState(inputList, buttonElement);
        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(this._elementValidationForm, inputElement);
                this._toggleButtonState(inputList, buttonElement);
            });
        });
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState = (inputList, buttonElement) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(this._inactiveButtonClass);
            buttonElement.removeAttribute("disabled");
        }
    }
    enableValidation = () => {
        this._setEventListeners(this._formSelector);
    };
};

export { FormValidator }