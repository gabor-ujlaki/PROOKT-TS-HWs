import { ILibrary } from '../interfaces/ILibrary';
import { Book } from './Book';

export class Library implements ILibrary {
    private _books: Book[];

    constructor() {
        this._books = [];
    }

    public addBook(book: Book): void {
        this._books.push(book);
        console.log(`Könyv hozzáadva: ${book.title}`);
    }

    public removeBook(id: string): void {
        const bookToToRemove = this.findBookById(id);

        if (bookToToRemove) {
            this._books = this._books.filter(b => b.id !== id);
            console.log(`Könyv eltávolítva: ${bookToToRemove.title}`);
        } else {
            console.error(`Nem található könyv ezzel az ID-val: ${id}`);
        }
    }

    public findBookById(id: string): Book | undefined {
        return this._books.find(b => b.id === id);
    }

    public listAllBooks(): void {
        console.log(`\n${'-'.repeat(30)} Könyvtár kínálata ${'-'.repeat(30)}`)
        this._books.forEach(b => {
            console.log(`[ID: ${b.id}] ${b.author}: ${b.title} - ${b.price} Ft (státusz: ${(b.status === 'borrowed' ? 'kikölcsönözve' : 'elérhető')})`);
        });
        console.log(`${'-'.repeat(80)}\n`);
    }
}
