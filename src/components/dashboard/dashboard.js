const dropDown = document.querySelector('.pur-header__dropdown');
const cardsContainer = document.querySelector('.dashboard__purchases-cards');
const arrowDown = document.querySelector('.arrow');


dropDown.addEventListener('click', e => {
    cardsContainer.classList.toggle('close');
    arrowDown.classList.toggle('close');
})
