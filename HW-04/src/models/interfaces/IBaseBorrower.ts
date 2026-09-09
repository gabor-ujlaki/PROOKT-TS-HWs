import { Book } from '../Book';

export interface IBaseBorrower {
    readonly id: string;
    name: string;
    mail: string;

    addBorrowedBook(book: Book): void
    removeBorrowedBook(book: Book): void
    listBorrowedBooks(): void
}
