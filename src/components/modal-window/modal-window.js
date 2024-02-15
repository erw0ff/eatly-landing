const modalController = ({modalWindow, modalOpen, modalClose, timeout= 300}) => {
    const modalLinks = document.querySelectorAll(modalOpen);
    const modal = document.querySelector(modalWindow);
    const close = document.querySelector(modalClose);
    const body = document.querySelector('body');


    let unlock = true;

    const closeModal = event => {
        event.preventDefault();
        const target = event.target;

        if (target === modal || target.closest('.close') || event.code === 'Escape') {
            modal.style.opacity = 0;

            setTimeout(() => modal.style.visibility = 'hidden', timeout);
        }

        window.removeEventListener('keydown', closeModal);
    }

    const openModal = event => {
        event.preventDefault();
        modal.style.visibility = 'visible';
        modal.style.opacity = 1;

        window.addEventListener('keydown', closeModal);
    };

    if (modalLinks.length > 0) {
        modalLinks.forEach(link => {
            link.addEventListener('click', openModal)});
    }

    modal.addEventListener('click', closeModal);
}

modalController( {
    modalWindow: '.modal-window',
    modalOpen: '._modal-link',
    modalClose: '.close',
    timeout: 600

});