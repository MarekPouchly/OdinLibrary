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
const errorMessage = document.querySelector('.error-message');
const library = getLibraryFromLocalStorage();

openModalButton.addEventListener('click', () => {
    openModal(modal);
})

overlay.addEventListener('click', () => {
    closeModal(modal);
})

function openModal() {
    addBookForm.reset();
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    errorMessage.style.display = 'none';
}

addBookForm.onsubmit = addBookToLibrary;

function addBookToLibrary() {
    const newBook = getBookFromForm();
    if (verifyUniqueTitle(newBook.title)) {
        addBook(newBook);
        updateBooksGrid();
        closeModal();
    } else {
        showErrorMessage(true);
    }
}

function getBookFromForm() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const isRead = document.getElementById('isRead').checked;
    return new Book(title, author, pages, isRead);
}

function updateBooksGrid() {
    resetBooksGrid();
    if( library.length > 0 ) {
        for (let book of library) {
            createBookCard(book);
        }
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
    books.innerHTML = '';
}

function toggleIsRead(e) {
    const title = findTitle(e);
    const book = library.find(book => book.title === title);
    book.isRead = !book.isRead;
    updateLocal();
    updateBooksGrid();
}

function findTitle(event) {
    return event.target.parentNode.parentNode.firstChild.textContent;
}

function verifyUniqueTitle(title) {
    const titles = library.map(book => book.title);
    return !titles.includes(title);
}

function showErrorMessage() {
    errorMessage.style.display = 'block';
} 

document.addEventListener("DOMContentLoaded", function() {
    updateBooksGrid();
});

function removeBook(e) {
    const bookTitleToRemove = findTitle(e);
    const bookIndexToRemove = library?.findIndex( book => book.title === bookTitleToRemove );
    if (bookIndexToRemove !== undefined) {
        library.splice(bookIndexToRemove, 1);
        updateLocal();
    }
    updateBooksGrid();
}

function addBook(book) {
    library.push(book);
    updateLocal();
}

function getLibraryFromLocalStorage() {
    return JSON.parse(localStorage.getItem("library") ?? "[]");
}

function updateLocal() {
    localStorage.setItem("library", JSON.stringify(library));
}