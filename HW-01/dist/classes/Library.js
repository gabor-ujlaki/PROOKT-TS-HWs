"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Library = void 0;
class Library {
    constructor() {
        this._books = [];
    }
    addBook(book) {
        this._books.push(book);
        console.log(`Könyv hozzáadva: ${book.title}`);
    }
    removeBook(id) {
        const bookToToRemove = this.findBookById(id);
        if (bookToToRemove) {
            this._books = this._books.filter(b => b.id !== id);
            console.log(`Könyv eltávolítva: ${bookToToRemove.title}`);
        }
        else {
            console.error(`Nem található könyv ezzel az ID-val: ${id}`);
        }
    }
    findBookById(id) {
        return this._books.find(b => b.id === id);
    }
    listAllBooks() {
        console.log(`\n${'-'.repeat(30)} Könyvtár kínálata ${'-'.repeat(30)}`);
        this._books.forEach(b => {
            console.log(`[ID: ${b.id}] ${b.author}: ${b.title} - ${b.price} Ft (státusz: ${(b.status === 'borrowed' ? 'kikölcsönözve' : 'elérhető')})`);
        });
        console.log(`${'-'.repeat(80)}\n`);
    }
}
exports.Library = Library;
