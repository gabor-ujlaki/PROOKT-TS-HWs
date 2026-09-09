import { Book } from '../models/Book';
import { Borrower } from '../models/Borrower';
import { Library } from '../models/Library';
import { IBaseLoan } from '../models/interfaces/IBaseLoan';

export class LoanManager<T extends Book> {
    private library: Library;
    private loans: Map<string, IBaseLoan> = new Map();

    constructor(library: Library) {
        this.library = library;
    }

    private generateLoanId(book: T, borrower: Borrower): string {
        const now = new Date();
        const date = now.toISOString().slice(0, 10).replace(/-/g, '');
        const time = now.toTimeString().slice(0, 8).replace(/:/g, '');
        return `${borrower.id}-${book.id}-${date}-${time}`;
    }

}