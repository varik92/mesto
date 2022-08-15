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
} from '../utils/constants.js'

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { Popup } from '../components/Popup.js'
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js"

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];



function renderElement(data) {
    const initialCardsSection = new Section({
        items: data,
        renderer: (card) => {
            const cardElement = new Card(card, elementTemplate, (data) => {
                const popupZoomImage = new PopupWithImage(data, '.popup_type_zoom-image')
                popupZoomImage.open()
                popupZoomImage.setEventListeners()
            }
            ).generateCard();

            initialCardsSection.addItem(cardElement)
        }
    }, '.elements__list')

    initialCardsSection.renderItems()
}
const userInfo = new UserInfo({ name: '.profile__name', about: '.profile__description' })

const openPopupProfile = new PopupWithForm('.popup_type_edit-profile', (formValues) => {
    userInfo.setUserInfo(formValues)

    openPopupProfile.close()
})
buttonEdit.addEventListener('click', () => {
    openPopupProfile.open();
    const userValues = userInfo.getUserInfo()
    nameInput.value = userValues.name.textContent
    jobInput.value = userValues.about.textContent
})
openPopupProfile.setEventListeners()

const openPopupPlace = new PopupWithForm('.popup_type_add-place', () => {
    popupAddPlaceValidation.disableSubmitButton();
    renderElement([{ name: placeInput.value, link: linkInput.value }])
    openPopupPlace.close()
})
buttonAdd.addEventListener('click', () => openPopupPlace.open())
openPopupPlace.setEventListeners()

renderElement(initialCards)

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'input_error',
    errorClass: 'popup__error_visible',
}
const popupProfileValidation = new FormValidator(validationSettings, popupProfile)
const popupAddPlaceValidation = new FormValidator(validationSettings, popupAddPlace)
popupProfileValidation.enableValidation()
popupAddPlaceValidation.enableValidation()