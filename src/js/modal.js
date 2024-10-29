const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close-btn');

openModalBtn.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.classList.add('modal-open');
});

closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    document.body.classList.remove('modal-open');
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
        document.body.classList.remove('modal-open');
    }
});

