import { IBaseBorrower } from './interfaces/IBaseBorrower';
import { LogAction } from '../utils/decorators';
import { BookStatus } from './interfaces/IBaseLibrary';
import { Book } from './Book';

export class Borrower implements IBaseBorrower {
    private _id: string;
    private _name: string;
    private _mail: string;
    private borrowedBooks: Set<Book> = new Set();

    private static registry: Set<Borrower> = new Set();

    private constructor(id: string, name: string, mail: string) {
        this._id = id;
        this._name = name;
        this._mail = mail;
        Borrower.registry.add(this);
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public set name(newName: string) {
        this._name = newName;
    }

    public get mail(): string {
        return this._mail;
    }

    public set mail(newMail: string) {
        this._mail = newMail;
    }

    public addBorrowedBook(book: Book): void {
        this.borrowedBooks.add(book);
    }

    public removeBorrowedBook(book: Book): void {
        this.borrowedBooks.delete(book);
    }

    @LogAction('Felhasználó létrehozva')
    public static createUser(id: string, name: string, mail: string): Borrower {
        return new Borrower(id, name, mail);
    }

    @LogAction('Felhasználó törlése')
    public static destroyUser(user: Borrower): void {
        const hasBorrowed = [...user.borrowedBooks].some(book => book.status === BookStatus.BORROWED);

        if (hasBorrowed) {
            console.warn(
                `A felhasználó nem törölhető, amíg van nála kölcsönzött könyv!`
            );
            return;
        }

        if (Borrower.registry.has(user)) {
            Borrower.registry.delete(user);
            console.log(`A ${user.id} felhasználó törölve a regisztrációból.`);
        }
    }

    public listBorrowedBooks(): void {
        console.log(`\n${this._id} (${this._name}) kölcsönzött könyvei:`);
        if (this.borrowedBooks.size === 0) {
            console.log('\nNincs kölcsönzött könyv.');
            return;
        }
        for (const book of this.borrowedBooks) {
            book.print();
        }
    }

}