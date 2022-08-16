import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__zoom-image');
        this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
    }

    open = (data) => {
        super.open()
        this._popupImage.setAttribute('src', data.link)
        this._popupImage.setAttribute('alt', data.name)
        this._popupImageCaption.textContent = data.name
    }

} 