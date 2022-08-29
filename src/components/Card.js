class Card {
    constructor(data, cardTemplate, handleCardClick, popupCallback, userId, addCardLike, deleteCardLike) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._likeCount = data.likes.length;
        this._cardTemplate = cardTemplate;
        this.handleCardClick = handleCardClick;
        this._popupCallback = popupCallback;
        this._cardOwnerId = data.owner._id;
        this._cardId = data._id;
        this._userId = userId;
        this._addCardLike = addCardLike;
        this._deleteCardLike = deleteCardLike
    }

    _getTemplate() {
        return this._cardTemplate.querySelector(".element").cloneNode(true);
    }

    _deleteCard() {
        this._element.remove()
    }

    _setEventListeners() {
        this._likeButton.addEventListener('click', () => {
            this._toggleLike()
        });
        this._element.querySelector('.element__delete-button').addEventListener('click', () => {
            this._popupCallback(this._cardId, this._element)
        });
        this._elementImage.addEventListener('click', () => {
            this.handleCardClick({ name: this._name, link: this._link })
        })
        this._deleteButton = this._element.querySelector('.element__delete-button');
        if (this._cardOwnerId === this._userId) {
            this._deleteButton.classList.add('element__delete-button_active');
        }
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._elementTitle = this._element.querySelector('.element__title');
        this._elementTitle.textContent = this._name;
        this._elementLikeCount = this._element.querySelector('.element__like-count');
        this._elementLikeCount.textContent = this._likeCount;
        this._likeButton = this._element.querySelector('.element__like-button')
        this._setEventListeners();
        this._isLiked()

        return this._element;
    }
    _toggleLike() {
        if (this._likeButton.classList.contains('element__like-button_active')) {
            this._deleteCardLike(this._cardId)
                .then((res) => {
                    this._elementLikeCount.textContent = res.likes.length
                    this._likeButton.classList.remove('element__like-button_active')
                })
        } else {
            this._addCardLike(this._cardId)
                .then((res) => {
                    this._elementLikeCount.textContent = res.likes.length
                    this._likeButton.classList.add('element__like-button_active');
                })
        }
    }
    _isLiked() {
        if (this._likes.some(elem => elem._id === this._userId)) {
            this._likeButton.classList.add('element__like-button_active');
        } else {
            this._likeButton.classList.remove('element__like-button_active')
        }
    }
}

export { Card }