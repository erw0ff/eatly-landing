
const burger = document.querySelector('.burger-btn')
const header = document.querySelector('.header')

burger.addEventListener('click', () => {
    if (header.classList.contains('open')) {
        header.classList.remove('open')
    } else {
        header.classList.add('open')
    }
})
