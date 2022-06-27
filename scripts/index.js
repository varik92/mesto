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
const zoomPopup = document.querySelector('.popup_type_zoom-image')


function createElement(name, link) {
    const htmlElement = elementTemplate.cloneNode(true);
    htmlElement.querySelector('.element__title').textContent = name;
    htmlElement.querySelector('.element__image').src = link;
    htmlElement.querySelector('.element__image').alt = name;
    htmlElement.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-button_active');
    });
    htmlElement.querySelector('.element__delete-button').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    htmlElement.querySelector('.element__image').addEventListener('click', function (evt) {
        popupOpened(zoomPopup);
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

const popupProfile = document.querySelector('.popup_type_edit-profile')
const editButton = document.querySelector('.profile__edit-button')
const closeButtonPlace = document.querySelector('.popup__button-close_type_place')
const closeButtonProfile = document.querySelector('.popup__button-close_type_profile')
const popupAddPlace = document.querySelector('.popup_type_add-place')
const addButton = document.querySelector('.profile__add-button')

editButton.addEventListener('click', () => popupOpened(popupProfile))
addButton.addEventListener('click', () => popupOpened(popupAddPlace))

// Выберите элементы, куда должны быть вставлены значения полей
let currentName = document.querySelector('.profile__name')
let currentAbout = document.querySelector('.profile__description')

function popupOpened(popup) {
    popup.classList.add('popup_opened')
    nameInput.value = currentName.textContent
    jobInput.value = currentAbout.textContent
}

function popupClosed(popup) { popup.classList.remove('popup_opened') }

closeButtonProfile.addEventListener('click', () => popupClosed(popupProfile))
closeButtonPlace.addEventListener('click', () => popupClosed(popupAddPlace))

// Находим форму в DOM
let formElement = document.querySelector('.popup__form_type_profile')  // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.input_type_name') // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.input_type_about') // Воспользуйтесь инструментом .querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Так мы можем определить свою логику отправки.
    // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    let newName = nameInput.value
    let newAbout = jobInput.value
    // Вставьте новые значения с помощью textContent
    currentName.textContent = newName
    currentAbout.textContent = newAbout
    popupClosed(popupProfile)
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

let formAddElement = document.querySelector('.popup__form_type_place')
let placeInput = formAddElement.querySelector('.input_type_place')
let linkInput = formAddElement.querySelector('.input_type_link')

function addNewElement(evt) {
    evt.preventDefault();

    renderElement(placeInput.value, linkInput.value)

    popupClosed(popupAddPlace)
}
formAddElement.addEventListener('submit', addNewElement);

const popupImage = document.querySelector('.popup__zoom-image')
const popupFigcaption = document.querySelector('.popup__image-caption')

function zoomImage(name, link) {
    popupImage.setAttribute('src', link)
    popupImage.setAttribute('alt', name)
    popupFigcaption.textContent = name
}

const closeButtonZoom = document.querySelector('.popup__button-close_type_figure')
const popupZoom = document.querySelector('.popup_type_zoom-image')

closeButtonZoom.addEventListener('click', () => popupClosed(popupZoom))