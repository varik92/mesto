import './index.css';

import {
    elementTemplate,
    elementList,
    popupZoom,
    formElement,
    nameInput,
    jobInput,
    popupProfile,
    buttonEdit,
    popupAddPlace,
    buttonAdd,
    currentName,
    currentAbout,
    formAddElement,
    placeInput,
    linkInput,
    popupImage,
    popupFigcaption,
    popupList,
    validationSettings,
    buttonAvatar,
    avatar,
    popupAvatar
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

let userId;
api.getUserInfo().then(res => {
    userInfo.setUserInfo(res)
    userInfo.setUserAvatar(res)
    userId = res._id
})

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image')
popupZoomImage.setEventListeners()

const initialCardsSection = new Section((card) => {
    const cardElement = new Card(
        card,
        elementTemplate,
        (data) => { popupZoomImage.open(data) },
        (cardId, currentCardElement) => { popupDelete.open(cardId, currentCardElement) },
        userId,
        (id) => { return api.addCardLike(id) },
        (id) => { return api.deleteCardLike(id) }
    ).generateCard();
    initialCardsSection.addItem(cardElement);
}, '.elements__list')


const popupDelete = new PopupDelete('.popup_type_delete-confirm', (id, currentCardElement) => {
    api.deleteCard(id)
    currentCardElement.remove()
    popupDelete.close()
})

popupDelete.setEventListeners()

api.getInitialCards().then(res => initialCardsSection.renderItems(res))

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description', avatar: '.profile__avatar' })

const openPopupProfile = new PopupWithForm('.popup_type_edit-profile', (formValues, button) => {
    userInfo.setUserInfo(formValues)
    addProgress(button)
    api.editUserInfo(formValues).finally(() => removeProgress(button))
    openPopupProfile.close()
})
buttonEdit.addEventListener('click', () => {
    openPopupProfile.open();
    popupProfileValidation.resetValidation();
    const userValues = userInfo.getUserInfo(api.getUserInfo())
    openPopupProfile.setInputValues(userValues)
})
openPopupProfile.setEventListeners()

const openPopupPlace = new PopupWithForm('.popup_type_add-place', (data, button) => {
    addProgress(button)
    api.addNewCard(data).then((res) =>
        initialCardsSection.renderItems([res])).finally(() => removeProgress(button))
    openPopupPlace.close()
})
buttonAdd.addEventListener('click', () => {
    openPopupPlace.open();
    popupAddPlaceValidation.resetValidation();
})
openPopupPlace.setEventListeners()

const openPopupAvatar = new PopupWithForm('.popup_type_change-avatar', (data, button) => {
    addProgress(button)
    api.changeAvatar(data).finally(() => removeProgress(button))
    avatar.src = data.avatar
    openPopupAvatar.close()
})
buttonAvatar.addEventListener('click', () => {
    openPopupAvatar.open()
    popupAvatarValidation.resetValidation();
})
openPopupAvatar.setEventListeners()
const popupProfileValidation = new FormValidator(validationSettings, popupProfile)
const popupAddPlaceValidation = new FormValidator(validationSettings, popupAddPlace)
popupProfileValidation.enableValidation()
popupAddPlaceValidation.enableValidation()
const popupAvatarValidation = new FormValidator(validationSettings, popupAvatar)
popupAvatarValidation.enableValidation()