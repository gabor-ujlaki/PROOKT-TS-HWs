"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Book_1 = require("./classes/Book");
const Library_1 = require("./classes/Library");
const User_1 = require("./classes/User");
//TESZT
const library = new Library_1.Library();
const book1 = new Book_1.Book('B001', 'Esti Kornél', 'Kosztolányi Dezső', 3000);
const book2 = new Book_1.Book('B002', 'Állatfarm', 'George Orwell', 3500);
library.addBook(book1);
library.addBook(book2);
library.listAllBooks();
try {
    const user1 = new User_1.User('U001', 'Teszt Elek', 'elek.teszt@email.com'); //Sikeres felhasználó létrehozás
    user1.borrowBook(library, 'B001'); // Sikeres kölcsönzés
    user1.borrowBook(library, 'B001'); // Sikertelen kölcsönzés
    const user2 = new User_1.User('U002', 'Gipsz Jakab', 'email-cim'); //Sikertelen felhasználó létrehozás
}
catch (err) {
    console.error(err.message);
}
library.listAllBooks();
library.removeBook('B002');
library.listAllBooks();
