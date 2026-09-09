import { Book } from '../Book';
import { Borrower } from '../Borrower';

export enum BookStatus {
    AVAILABLE = 'available',
    BORROWED = 'borrowed',
    DISCARDED = 'discarded',
}

export interface IBaseLibrary {
    readonly id: string;
    name: string;

    books: Map<string, Book>;
    borrowers: Map<string, Borrower>;

    addBook(book: Book): void;
    removeBook(bookId: string): void;
    listBooks(): void;
}
