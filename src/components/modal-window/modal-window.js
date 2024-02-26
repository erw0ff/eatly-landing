const modalController = ({modalWindow, modalOpen, modalClose, timeout= 300}) => {
    const modalLinks = document.querySelectorAll(modalOpen);
    const modal = document.querySelector(modalWindow);


    const closeModal = event => {
        event.preventDefault();
        const target = event.target;

        if (target === modal || target.closest(modalClose) || event.code === 'Escape') {
            modal.style.opacity = 0;

            setTimeout(() => modal.style.visibility = 'hidden', timeout);
        }

        window.removeEventListener('keydown', closeModal);
    }

    const openModal = event => {
        event.preventDefault();
        modal.style.visibility = 'visible';
        modal.style.opacity = 1;
        modal.style.transition = 'all 0.6s ease 0s';

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

});