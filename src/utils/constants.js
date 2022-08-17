export const elementTemplate = document.querySelector('.element-template').content
export const elementList = document.querySelector('.elements__list')
export const popupZoom = document.querySelector('.popup_type_zoom-image')
export const formElement = document.querySelector('.popup__form_type_profile')
export const nameInput = formElement.querySelector('.input_type_name')
export const jobInput = formElement.querySelector('.input_type_about')
export const popupProfile = document.querySelector('.popup_type_edit-profile')
export const buttonEdit = document.querySelector('.profile__edit-button')
export const popupAddPlace = document.querySelector('.popup_type_add-place')
export const buttonAdd = document.querySelector('.profile__add-button')
export const currentName = document.querySelector('.profile__name')
export const currentAbout = document.querySelector('.profile__description')
export const formAddElement = document.querySelector('.popup__form_type_place')
export const placeInput = formAddElement.querySelector('.input_type_place')
export const linkInput = formAddElement.querySelector('.input_type_link')
export const popupImage = document.querySelector('.popup__zoom-image')
export const popupFigcaption = document.querySelector('.popup__image-caption')
export const popupList = document.querySelectorAll('.popup')

export const initialCards = [
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

export const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.input',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-save_disabled',
    inputErrorClass: 'input_error',
    errorClass: 'popup__error_visible',
}