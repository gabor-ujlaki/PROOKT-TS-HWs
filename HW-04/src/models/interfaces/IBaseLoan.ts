import { Book } from '../Book';
import { Borrower } from '../Borrower';
import { BookStatus } from './IBaseLibrary';

export interface IBaseLoan {
    readonly id: string;
    book: Book;
    borrower: Borrower;
    loanDate: Date;
    returnDate?: Date;
    status: BookStatus;
}
