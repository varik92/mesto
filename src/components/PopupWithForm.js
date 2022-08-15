import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._popupSelector = document.querySelector(popupSelector);
        this._submitForm = submitForm;
        this._inputList = Array.from(this._popupSelector.querySelectorAll('.input'));
        this._currentName = document.querySelector('.profile__name')
        this._currentAbout = document.querySelector('.profile__description')
        this._nameInput = document.querySelector('.input_type_name')
        this._jobInput = document.querySelector('.input_type_about')
    }

    close() {
        super.close()
        this._popupSelector.querySelector('.popup__form').reset()
    }
    _getInputValues = () => {
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupSelector.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._submitForm(this._getInputValues())
        })
    }

}