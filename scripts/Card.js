import { zoomImage as _zoomImage } from './index.js'

class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._selector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._selector).content.cloneNode(true);

        return cardElement;
    }

    _deleteCard(evt) {
        evt.target.closest('.element').remove()
    }

    _toggleLikeButton(evt) {
        evt.target.classList.toggle('element__like-button_active')
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
            this._toggleLikeButton(evt);
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', (evt) => {
            this._deleteCard(evt);
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            _zoomImage(this._name, this._link);
        })
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__title').textContent = this._name;

        return this._element;
    }
}

export { Card }