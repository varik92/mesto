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
    initialCards,
    validationSettings
} from '../utils/constants.js'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js"

const popupZoomImage = new PopupWithImage('.popup_type_zoom-image')
popupZoomImage.setEventListeners()

const initialCardsSection = new Section((card) => {
    const cardElement = new Card(card, elementTemplate, (data) => { popupZoomImage.open(data) }).generateCard();
    initialCardsSection.addItem(cardElement)
}, '.elements__list')

initialCardsSection.renderItems(initialCards)

const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description' })

const openPopupProfile = new PopupWithForm('.popup_type_edit-profile', (formValues) => {
    userInfo.setUserInfo(formValues)

    openPopupProfile.close()
})
buttonEdit.addEventListener('click', () => {
    openPopupProfile.open();
    popupProfileValidation.resetValidation();
    const userValues = userInfo.getUserInfo()
    openPopupProfile.setInputValues(userValues)
})
openPopupProfile.setEventListeners()

const openPopupPlace = new PopupWithForm('.popup_type_add-place', (data) => {
    initialCardsSection.renderItems([data])
    openPopupPlace.close()
})
buttonAdd.addEventListener('click', () => {
    openPopupPlace.open();
    popupAddPlaceValidation.resetValidation();
})
openPopupPlace.setEventListeners()

const popupProfileValidation = new FormValidator(validationSettings, popupProfile)
const popupAddPlaceValidation = new FormValidator(validationSettings, popupAddPlace)
popupProfileValidation.enableValidation()
popupAddPlaceValidation.enableValidation()