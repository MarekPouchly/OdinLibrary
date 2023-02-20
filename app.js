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
const errorMessage = document.querySelector('.error-message')

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
    if (verifyUniqueTitle(newBook.title)) {
        saveBookToLibrary(newBook);
        updateBooksGrid();
        closeModal();
        showErrorMessage(true);
    } else {
        showErrorMessage(false);
    }
}

function getBookFromForm() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
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
    const bookCard = document.createElement('div');
    const titleOfBook = document.createElement('p');
    const authorOfBook = document.createElement('p');
    const bookPages = document.createElement('p');
    const cardButtons = document.createElement('div');
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    bookCard.classList.add('card');
    cardButtons.classList.add('buttons');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn');

    readBtn.onclick = toggleIsRead;
    removeBtn.onclick = removeBook;

    titleOfBook.textContent = `${book.title}`;
    authorOfBook.textContent = `${book.author}`;
    bookPages.textContent = `${book.pages}`;
    removeBtn.textContent = 'Remove';

    if (book.isRead) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('read-btn')
    } else {
        readBtn.textContent = 'Not Read';
        readBtn.classList.add('not-read-btn')
    }

    bookCard.appendChild(titleOfBook);
    bookCard.appendChild(authorOfBook);
    bookCard.appendChild(bookPages);
    cardButtons.appendChild(readBtn);
    cardButtons.appendChild(removeBtn);
    bookCard.appendChild(cardButtons);
    books.appendChild(bookCard);
}

function resetBooksGrid() {
    books.innerHTML = ''
}

function toggleIsRead(e) {
    const title = e.target.parentNode.parentNode.firstChild.textContent;
    const book = myLibrary.find(book => book.title === title);
    book.isRead = !book.isRead;
    updateBooksGrid();
}

function removeBook(e) {
    const title = e.target.parentNode.parentNode.firstChild.textContent;
    myLibrary = myLibrary.filter( book => book.title !== title )
    updateBooksGrid();
}

function verifyUniqueTitle(title) {
    const titles = myLibrary.map(book => book.title);
    return !titles.includes(title);
}

function showErrorMessage(condition) {
    condition === false
        ? errorMessage.style.display = 'block'
        : errorMessage.style.display = 'none';
} 