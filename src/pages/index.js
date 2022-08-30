import './index.css';

import {
    elementTemplate,
    popupProfileElement,
    buttonEdit,
    popupAddPlaceElement,
    buttonAdd,
    validationSettings,
    buttonAvatar,
    popupAvatarElement
} from '../utils/constants.js'

import {
    addProgress,
    removeProgress
} from '../utils/utils.js'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js"
import { PopupDelete } from '../components/PopupDelete.js';
import { Promise } from 'core-js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-49',
    headers: {
        authorization: '529bfdce-b741-4ca4-a35a-ee860c90802c',
        'Content-Type': 'application/json'
    }
});

let userId, currentCardId, currentCardElement;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([resUserInfo, resInitialCards]) => {
        userInfo.setUserInfo(resUserInfo)
        userInfo.setUserAvatar(resUserInfo)
        userId = resUserInfo._id
        resInitialCards.reverse()
        cardsContainer.renderItems(resInitialCards)
    }).catch((err) => console.log(err))

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image')
popupZoomImage.setEventListeners()

const createCard = (card) => {
    const newCard = new Card(
        card,
        elementTemplate,
        (data) => { popupZoomImage.open(data) },
        (cardId, cardElement) => {
            popupDelete.open()
            currentCardId = cardId
            currentCardElement = cardElement
        },
        userId,
        (id) => { return api.addCardLike(id) },
        (id) => { return api.deleteCardLike(id) }
    )
    const cardElement = newCard.generateCard();
    return cardElement
}

const cardsContainer = new Section((card) => {
    cardsContainer.addItem(createCard(card));
}, '.elements__list')

const popupDelete = new PopupDelete('.popup_type_delete-confirm', () => {
    api.deleteCard(currentCardId)
        .then(() => {
            currentCardElement.remove()
            popupDelete.close()
        }).catch((err) => console.log(err))
})

popupDelete.setEventListeners()

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar' })

const popupProfile = new PopupWithForm('.popup_type_edit-profile', (formValues, button) => {
    userInfo.setUserInfo(formValues)
    addProgress(button)
    api.editUserInfo(formValues)
        .then(() => popupProfile.close())
        .catch((err) => console.log(err))
        .finally(() => removeProgress(button))
})
buttonEdit.addEventListener('click', () => {
    popupProfile.open();
    popupProfileValidation.resetValidation();
    const userValues = userInfo.getUserInfo(api.getUserInfo())
    popupProfile.setInputValues(userValues)
})
popupProfile.setEventListeners()

const popupPlace = new PopupWithForm('.popup_type_add-place', (data, button) => {
    addProgress(button)
    api.addNewCard(data)
        .then((res) => {
            cardsContainer.addItem(createCard(res))
            popupPlace.close()
        })
        .catch((err) => console.log(err))
        .finally(() => removeProgress(button))
})

buttonAdd.addEventListener('click', () => {
    popupPlace.open();
    popupAddPlaceValidation.resetValidation();
})
popupPlace.setEventListeners()

const popupAvatar = new PopupWithForm('.popup_type_change-avatar', (data, button) => {
    addProgress(button)
    api.changeAvatar(data)
        .then((data) => {
            userInfo.setUserAvatar(data)
            popupAvatar.close()
        })
        .catch((err) => console.log(err))
        .finally(() => removeProgress(button))
})
buttonAvatar.addEventListener('click', () => {
    popupAvatar.open()
    popupAvatarValidation.resetValidation();
})
popupAvatar.setEventListeners()
const popupProfileValidation = new FormValidator(validationSettings, popupProfileElement)
const popupAddPlaceValidation = new FormValidator(validationSettings, popupAddPlaceElement)
popupProfileValidation.enableValidation()
popupAddPlaceValidation.enableValidation()
const popupAvatarValidation = new FormValidator(validationSettings, popupAvatarElement)
popupAvatarValidation.enableValidation()