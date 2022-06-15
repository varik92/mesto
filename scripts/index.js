const popup = document.querySelector('.popup')
const editButton = document.querySelector('.profile__edit-button')
const closeButton = document.querySelector('.popup__button-close')

editButton.addEventListener('click', popupOpened)

// Выберите элементы, куда должны быть вставлены значения полей
let currentName = document.querySelector('.profile__name')
let currentAbout = document.querySelector('.profile__description')

function popupOpened() {
    popup.classList.add('popup_opened')
    nameInput.value = currentName.textContent
    jobInput.value = currentAbout.textContent
}

function popupClosed() { popup.classList.remove('popup_opened') }

closeButton.addEventListener('click', popupClosed)

// Находим форму в DOM
let formElement = document.querySelector('.popup__form')  // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = formElement.querySelector('.input__name') // Воспользуйтесь инструментом .querySelector()
let jobInput = formElement.querySelector('.input__about') // Воспользуйтесь инструментом .querySelector()

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
    popupClosed()
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler); 