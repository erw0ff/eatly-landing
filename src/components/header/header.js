
const burger = document.querySelector('.burger-btn')
const header = document.querySelector('.header')

burger.addEventListener('click', () => {
    header.classList.toggle('open')
})
