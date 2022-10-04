"use strict";
let book;
const add = document.querySelector(".add");
const body = document.querySelector("body");
const books = document.querySelector(".books");
const inputForm = document.querySelector("form");
const addNewBook = document.querySelector(".add-new-book");

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  toggleReadStatus() {
    this.isRead = !this.isRead;
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  removeBook(index) {
    this.books.splice(index, 1);
  }
}

const myLibrary = new Library();

const creatBookCard = function (book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book");
  bookCard.setAttribute("data-index", `${myLibrary.books.indexOf(book)}`);
  const title = document.createElement("p");
  title.classList.add("title");
  title.textContent = book.title;
  bookCard.appendChild(title);

  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = book.author;
  bookCard.appendChild(author);

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = book.pages;
  bookCard.appendChild(pages);

  // read button
  const toggleRead = document.createElement("button");
  toggleRead.classList.add("read-status");
  book.isRead
    ? (toggleRead.textContent = "Read")
    : (toggleRead.textContent = "Not Read");
  book.isRead
    ? toggleRead.classList.add("read")
    : toggleRead.classList.add("unread");
  bookCard.appendChild(toggleRead);

  // remove button
  // Create Element
  const remove = document.createElement("button");
  remove.classList.add("remove");
  remove.textContent = "Remove";
  bookCard.appendChild(remove);

  books.appendChild(bookCard);
};

function displayMyLibrary() {
  books.innerHTML = "";
  for (let book of myLibrary.books) {
    creatBookCard(book);
  }
  execute();
}

// Add listener to remove and read-status buttons
function execute() {
  // Remove
  const removeBtns = document.querySelectorAll(".remove");
  for (let btn of removeBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      const index = Number(btnParent.dataset.index);
      myLibrary.removeBook(index);
      displayMyLibrary();
    });
  }

  // Change Read Status
  const toggleReadBtns = document.querySelectorAll(".read-status");
  for (let btn of toggleReadBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      const index = Number(btnParent.dataset.index);
      myLibrary.books[index].toggleReadStatus();
      displayMyLibrary();
    });
  }
}

addNewBook.addEventListener("click", function () {
  inputForm.classList.toggle("hide");
});

add.addEventListener("click", function (e) {
  e.preventDefault();
  inputForm.checkValidity();
  inputForm.reportValidity();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#isread").checked;

  if (title !== "" && author !== "" && pages !== "") {
    book = new Book(title, author, pages, isRead);
    myLibrary.addBook(book);
    book = undefined;
    inputForm.reset();
    inputForm.classList.toggle("hide");
    displayMyLibrary();
  }
});

// Hide the form when click outside
document.addEventListener("click", function (e) {
  if (
    !inputForm.classList.contains("hide") &&
    !e.target.closest("form") &&
    !e.target.closest(".add-new-book")
  ) {
    inputForm.classList.add("hide");
  }
});

// Sample book
book = new Book("Kite Runner", "Khaled Hosseini", 371, true);
myLibrary.addBook(book);
displayMyLibrary();
