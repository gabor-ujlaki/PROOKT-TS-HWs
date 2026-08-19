import { Library } from './Library';

export class User {
    private _userId: string;
    private _name: string;
    private _email: string;

    constructor(userId: string, name: string, email: string) {
        this._userId = userId;
        this._name = name;

        if (!/^.+@.+\.[a-zA-Z]{2,3}$/.test(email.trim())) {
            throw new Error(`Sikertelen felhasználó létrehozás: Érvénytelen e-mail cím formátum: "${email}"`);
        }
        this._email = email;
        console.log(`Felhasználó létrehozva: [${this._userId}] ${this._name}`);
    }

    public borrowBook(library: Library, bookId: string): void {
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
