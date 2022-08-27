"use strict";

function Book(title, author, pages, Isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.Isread = Isread;
  this.info = function () {
    return `${title} by ${author}, ${this.pages} pages, ${
      this.Isread ? "read" : "not read yet"
    }.`;
  };
}

let myLibrary = [];

function addBookToLibrary(...bookDetails) {
  myLibrary.push(new Book(...bookDetails));
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
console.log(myLibrary);

const books = document.querySelector(".books");

function displayMyLibrary() {
  for (let book of myLibrary) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;
    bookElement.appendChild(title);
    console.log(title);

    const author = document.createElement("p");
    author.textContent = book.author;
    author.classList.add("author");
    bookElement.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    bookElement.appendChild(pages);

    //   bookElement.textContent = book.info();
    console.log(bookElement);
    books.appendChild(bookElement);
  }
}
