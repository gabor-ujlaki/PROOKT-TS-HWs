"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userId, name, email) {
        this._userId = userId;
        this._name = name;
        this.email = email;
        console.log(`Felhasználó létrehozva: [${this._userId}] ${this._name}`);
    }
    set email(email) {
        if (!/^.+@.+\.[a-zA-Z]{2,3}$/.test(email.trim())) {
            throw new Error(`Sikertelen művelet: Érvénytelen e-mail cím formátum: "${email}"`);
        }
        this._email = email;
    }
    borrowBook(library, bookId) {
        const book = library.findBookById(bookId);
        if (!book) {
            console.error(`Sikertelen kölcsönzés: A(z) ${bookId} azonosítójú könyv nem található.`);
            return;
        }
        if (book.status !== 'available') {
            console.error(`Sikertelen kölcsönzés: A(z) "${book.title}" már ki van kölcsönözve.`);
            return;
        }
        book.status = 'borrowed';
        console.log(`${this._name} felhasználó sikeresen kikölcsönözte a(z) "${book.title}" című könyvet.`);
    }
}
exports.User = User;
