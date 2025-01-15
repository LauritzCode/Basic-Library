const library = []

function Book (title = "Unknown Title", author = "Unknown Author", pages = 0, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function() {
    this.read = !this.read 
}

function addBook(book) {
    library.push(book)
    displayBooks()
}

function displayBooks() {
    const bookShelf = document.querySelector(".bookshelf-wrap")

    bookShelf.innerHTML = "";

    library.forEach((book, index) => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-item")

        bookCard.innerHTML = `
        <div class="book-info">
        <div class="title">${book.title}</div>
        <div class="author">${book.author}</div>
        <div class="pages">${book.pages} pages</div>
        <div class="read-status">${book.read ? "Read":"Not Read"}</div>
        <button class="remove-btn" data-index="${index}">Remove</button>
        <button class="toggle-btn" data-index="${index}">Mark as ${book.read ? "Not Read" : "Read"}</button>
        </div>
        `

        bookShelf.appendChild(bookCard);
    })

    document.querySelectorAll(".remove-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index")
            removeBook(index);
        })
    })

    document.querySelectorAll(".toggle-btn").forEach(button => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index")
            library[index].toggleRead();
            displayBooks();
        })
    })
}

function removeBook(index) {
    library.splice(index,1)
    displayBooks()
}


const openModalBtn = document.getElementById("openFormBtn");
const addBookBtn = document.getElementById("addBookBtn");
const content = document.querySelector(".content");
const modalWrap = document.querySelector(".modal-wrap")
const cancelBtn = document.getElementById("cancelBtn")
const bookForm = document.getElementById("book-form");

cancelBtn.addEventListener("click", () => {
    content.classList.remove("blur")
    modalWrap.classList.add("hide")
})

openModalBtn.addEventListener("click", () => {
    content.classList.add("blur")
    modalWrap.classList.remove("hide")
})


bookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!bookForm.checkValidity()) {
        bookForm.reportValidity()
        return 
    }  

    content.classList.remove("blur")
    modalWrap.classList.add("hide")

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    const newBook = new Book(title, author, pages, read) 

    addBook(newBook)
    bookForm.reset()
})

