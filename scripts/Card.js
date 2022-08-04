import { zoomImage as _zoomImage } from './index.js'

class Card {
    constructor(data, cardTemplate) {
        this._name = data.name;
        this._link = data.link;
        this._cardTemplate = cardTemplate;
    }

    _getTemplate() {
        return this._cardTemplate.querySelector(".element").cloneNode(true);
    }

    _deleteCard() {
        this._element.remove()
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like-button_active')
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._toggleLikeButton(evt);
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._deleteCard();
        });
        this._elementImage.addEventListener('click', () => {
            _zoomImage(this._name, this._link);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementTitle.textContent = this._name;
        this._setEventListeners();

        return this._element;
    }
}

export { Card }