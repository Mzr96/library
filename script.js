"use strict";

const add = document.querySelector(".add");
const body = document.querySelector("body");
const books = document.querySelector(".books");
const inputForm = document.querySelector("form");
const addNewBook = document.querySelector(".add-new-book");
let myLibrary = [];

function Book(title, author, pages, Isread) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = Isread;
  this.info = function () {
    return `${title} by ${author}, ${this.pages} pages, ${
      this.Isread ? "read" : "not read yet"
    }.`;
  };
}

// Change read-status Btn
Book.prototype.changeReadeStatus = function () {
  this.isRead ? (this.isRead = false) : (this.isRead = true);
  displayMyLibrary();
};

function addBookToLibrary(...bookDetails) {
  myLibrary.push(new Book(...bookDetails));
}

function displayMyLibrary() {
  books.textContent = "";
  for (let book of myLibrary) {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");
    bookElement.setAttribute("data-index", `${myLibrary.indexOf(book)}`);
    const title = document.createElement("p");
    title.classList.add("title");
    title.textContent = book.title;
    bookElement.appendChild(title);

    const author = document.createElement("p");
    author.classList.add("author");
    author.textContent = book.author;
    bookElement.appendChild(author);

    const pages = document.createElement("p");
    pages.classList.add("pages");
    pages.textContent = book.pages;
    bookElement.appendChild(pages);

    // read button
    const toggleRead = document.createElement("button");
    toggleRead.classList.add("read-status");
    book.isRead
      ? (toggleRead.textContent = "Read")
      : (toggleRead.textContent = "Not Read");
    bookElement.appendChild(toggleRead);

    // remove button
    // Create Element
    const remove = document.createElement("button");
    remove.classList.add("remove");
    remove.textContent = "Remove";
    bookElement.appendChild(remove);

    books.appendChild(bookElement);
  }
  execute();
}

function execute() {
  // Remove
  const removeBtns = document.querySelectorAll(".remove");
  for (let btn of removeBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      console.log(Number(btnParent.dataset.index));
      const index = Number(btnParent.dataset.index);
      myLibrary.splice(index, 1);
      console.log(myLibrary);
      displayMyLibrary();
    });
  }

  // Change Read Status
  const toggleReadBtns = document.querySelectorAll(".read-status");
  console.log(toggleReadBtns);
  for (let btn of toggleReadBtns) {
    btn.addEventListener("click", function (e) {
      const btnParent = e.target.parentElement;
      console.log(Number(btnParent.dataset.index));
      const index = Number(btnParent.dataset.index);
      myLibrary[index].changeReadeStatus();
      displayMyLibrary();
    });
  }
}

addNewBook.addEventListener("click", function () {
  console.log("hi");
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
    addBookToLibrary(title, author, pages, isRead);
    inputForm.reset();
    inputForm.classList.toggle("hide");
    displayMyLibrary();
  }
});
