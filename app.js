let myLibrary = [];

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = 0,
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages 
        this.isRead = isRead
    }
}

function addBookToLibrary() {
  // do stuff here
}

const openModalButton = document.querySelector('[data-modal-target]');
const overlay = document.getElementById('overlay');
const modal = document.querySelector(openModalButton.dataset.modalTarget);

openModalButton.addEventListener('click', () => {
    openModal(modal);
})

overlay.addEventListener('click', () => {
    closeModal(modal);
})

function openModal(modal) {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}