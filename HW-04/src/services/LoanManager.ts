import { Book } from '../models/Book';
import { Borrower } from '../models/Borrower';
import { Library } from '../models/Library';
import { BookStatus } from '../models/interfaces/IBaseLibrary';
import { IBaseLoan } from '../models/interfaces/IBaseLoan';
import { LogAction } from '../utils/decorators';

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

    @LogAction('Könyv kikölcsönzése')
    public borrowBook(bookId: string, borrowerId: string): void {
        const book = this.library.books.get(bookId) as T | undefined;
        const borrower = this.library.borrowers.get(borrowerId);

        if (!book) {
            console.warn(`A ${bookId} könyv nem található a könyvtárban!`);
            return;
        }

        if (!borrower) {
            console.warn(`A ${borrowerId} kölcsönző nincs regisztrálva a könyvtárban!`);
            return;
        }

        if (book.status !== BookStatus.AVAILABLE) {
            console.warn(
                `A könyv nem kölcsönözhető, mert a státusza: ${book.status}. Csak available esetén kölcsönözhető.`
            );
            return;
        }

                const loanId = this.generateLoanId(book, borrower);
        const loan: IBaseLoan = {
            id: loanId,
            book,
            borrower,
            loanDate: new Date(),
            status: BookStatus.BORROWED,
        };

        this.loans.set(loanId, loan);
        book.status = BookStatus.BORROWED;
        borrower.addBorrowedBook(book);

        console.log(
            `A ${book.id} könyv kikölcsönözve ${borrower.id} részére. [LoanID: ${loanId}]`
        );
    }

    @LogAction('Könyv visszahozása')
    public returnBook(bookId: string, borrowerId: string): void {
        const book = this.library.books.get(bookId) as T | undefined;
        const borrower = this.library.borrowers.get(borrowerId);

        if (!book || !borrower) {
            console.warn('A könyv vagy a kölcsönző nem található.');
            return;
        }

        const loan = [...this.loans.values()].find(
            l => l.book.id === bookId && l.borrower.id === borrowerId && l.status === BookStatus.BORROWED
        );

        if (!loan) {
            console.warn('Nincs aktív kölcsönzés ehhez a könyvhöz és kölcsönzőhöz.');
            return;
        }

        loan.status = BookStatus.AVAILABLE;
        loan.returnDate = new Date();
        book.status = BookStatus.AVAILABLE;
        borrower.removeBorrowedBook(book);

        console.log(
            `A ${book.id} könyv visszahozva ${borrower.id} által. [LoanID: ${loan.id}]`
        );
    }

    public listLoans(): void {
        console.log(`\nAktív kölcsönzések:`);
        if (this.loans.size === 0) {
            console.log('Nincs kölcsönzés.');
            return;
        }

        for (const loan of this.loans.values()) {
            console.log(`LoanID: ${loan.id} | Könyv: ${loan.book.id} (${loan.book.title}) | Kölcsönző: ${loan.borrower.id} (${loan.borrower.name}) | Státusz: ${loan.status}`);
        }
    }
}