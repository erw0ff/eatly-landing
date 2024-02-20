const buttonUp = document.querySelector('.footer__top-button-up');

const buttonUpController = function () {
    window.addEventListener("scroll", () => {
        if (window.pageYOffset >= 5000) {
            buttonUp.classList.add('focus');
        } else {
            buttonUp.classList.remove('focus');
        }
    });

    buttonUp.addEventListener('click', e => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    })
}

buttonUpController();