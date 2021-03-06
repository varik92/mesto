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

const elementTemplate = document.querySelector('.element-template').content
const elementList = document.querySelector('.elements__list')
const popupZoom = document.querySelector('.popup_type_zoom-image')
const formElement = document.querySelector('.popup__form_type_profile')
const nameInput = formElement.querySelector('.input_type_name')
const jobInput = formElement.querySelector('.input_type_about')
const popupProfile = document.querySelector('.popup_type_edit-profile')
const buttonEdit = document.querySelector('.profile__edit-button')
const popupAddPlace = document.querySelector('.popup_type_add-place')
const buttonAdd = document.querySelector('.profile__add-button')
const currentName = document.querySelector('.profile__name')
const currentAbout = document.querySelector('.profile__description')
const formAddElement = document.querySelector('.popup__form_type_place')
const placeInput = formAddElement.querySelector('.input_type_place')
const linkInput = formAddElement.querySelector('.input_type_link')
const popupImage = document.querySelector('.popup__zoom-image')
const popupFigcaption = document.querySelector('.popup__image-caption')
const popupList = document.querySelectorAll('.popup')

function createElement(name, link) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector('.element__title').textContent = name;
    const elementImage = htmlElement.querySelector('.element__image');
    elementImage.src = link;
    elementImage.alt = name;
    htmlElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    htmlElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    elementImage.addEventListener('click', function (evt) {
        zoomImage(name, link);
    })
    return htmlElement;
}

function renderElement(name, link) {
    elementList.prepend(createElement(name, link));
}

initialCards.reverse();

initialCards.forEach(function (el) {
    renderElement(el.name, el.link)
});

buttonEdit.addEventListener('click', () => openPopupProfile())
buttonAdd.addEventListener('click', () => openPopupPlace())

function openPopup(popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closeByEsc)
}

function openPopupPlace() {
    openPopup(popupAddPlace);
    popupAddPlace.querySelector('.popup__button-save').setAttribute("disabled", true);
    popupAddPlace.querySelector('.popup__button-save').classList.add('popup__button-save_disabled');
}

function closeByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
    }
}

function openPopupProfile() {
    nameInput.value = currentName.textContent
    jobInput.value = currentAbout.textContent
    openPopup(popupProfile)
}

function closePopup(popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closeByEsc)
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    const newName = nameInput.value
    const newAbout = jobInput.value

    currentName.textContent = newName
    currentAbout.textContent = newAbout
    closePopup(popupProfile)
}

formElement.addEventListener('submit', formSubmitHandler);

function addNewElement(evt) {
    evt.preventDefault();

    renderElement(placeInput.value, linkInput.value)
    placeInput.value = '';
    linkInput.value = '';
    closePopup(popupAddPlace)
}

formAddElement.addEventListener('submit', addNewElement);

function zoomImage(name, link) {
    openPopup(popupZoom);
    popupImage.setAttribute('src', link)
    popupImage.setAttribute('alt', name)
    popupFigcaption.textContent = name
}

popupList.forEach((popupElement) => {
    popupElement.addEventListener('mousedown', (evt) => {
        if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__button-close')) {
            closePopup(popupElement);
        };
    });
}); 