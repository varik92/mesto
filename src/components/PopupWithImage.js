import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._popupSelector = document.querySelector(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__zoom-image');
        this._popupImageCaption = this._popupSelector.querySelector('.popup__image-caption');
        this._name = data.name;
        this._link = data.link;
    }

    open = () => {
        this._popupSelector.classList.add('popup_opened')
        document.addEventListener('keydown', this._handleEscClose)
        this._popupImage.setAttribute('src', this._link)
        this._popupImage.setAttribute('alt', this._name)
        this._popupImageCaption.textContent = this._name
    }

} 