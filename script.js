const library = [];

function Book (title = "Unknown Title", author = "Unknown Author", pages = 0, read = false) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

Book.prototype.toggleRead = function() {
    this.read = !this.read 
}

function addBook() {

}

