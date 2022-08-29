import { Popup } from './Popup.js'

export class PopupDelete extends Popup {
    constructor(popupSelector, deleteCallback) {
        super(popupSelector);
        this._confirmDeleteButton = this._popup.querySelector('.popup__button-save_type_delete-confirm')
        this._deleteCallback = deleteCallback
    }

    open(id, currentCardElement) {
        super.open()
        this._cardId = id;
        this._currentCardElement = currentCardElement
    }

    setEventListeners() {
        super.setEventListeners()
        this._confirmDeleteButton.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._deleteCallback(this._cardId, this._currentCardElement)
        })
    }
}