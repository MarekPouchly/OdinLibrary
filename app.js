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

const openModalButton = document.querySelector('[data-modal-target]');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const addBookForm = document.getElementById('addBookForm');
const books = document.querySelector('.books');

openModalButton.addEventListener('click', () => {
    openModal(modal);
})

overlay.addEventListener('click', () => {
    closeModal(modal);
})

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

addBookForm.onsubmit = addBookToLibrary;

function addBookToLibrary() {
    const newBook = getBookFromForm();
    saveBookToLibrary(newBook);
    updateBooksGrid()
    closeModal()
}

function getBookFromForm() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').value;
    return new Book(title, author, pages, isRead);
}

function saveBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

function updateBooksGrid() {
    resetBooksGrid();
    for (const book of myLibrary) {
        createBookCard(book)
    }
}

function createBookCard(book) {
    const card = `
        <div class="card">
            <p>${book.title}</p>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <div class="buttons">
                <button class="btn">${isBookRead(book.isRead)}</button>
                <button class="btn">Remove</button>
            </div>
        </div>
    `;
    books.innerHTML += card;
}

function isBookRead(isRead) {
    return isRead === true ? 'Read' : 'Not Read';
}

function resetBooksGrid() {
    books.innerHTML = ''
}