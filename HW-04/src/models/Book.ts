import { IBaseBook } from './interfaces/IBaseBook';
import { Category } from './Category';
import { BookStatus } from './interfaces/IBaseLibrary';
import { LogAction } from '../utils/decorators';

export class Book implements IBaseBook {
    private _id: string;
    private _title: string;
    private _author: string;
    private _category?: Category;
    private _status: BookStatus = BookStatus.AVAILABLE;

    private static registry: Set<Book> = new Set();

    private constructor(id: string, title: string, author: string, category?: Category) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._category = category;
        Book.registry.add(this);
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public set title(newTitle: string) {
        this._title = newTitle;
    }

    public get author(): string {
        return this._author;
    }

    public set author(newAuthor: string) {
        this._author = newAuthor;
    }

    public get category(): Category | undefined {
        return this._category;
    }

    public set category(newCategory: Category | undefined) {
        this._category = newCategory;
    }

    public get status(): BookStatus {
        return this._status;
    }

    public set status(newStatus: BookStatus) {
        this._status = newStatus;
    }

    @LogAction('Könyv létrehozva')
    public static createBook(
        id: string,
        title: string,
        author: string,
        category?: Category
    ): Book {
        return new Book(id, title, author, category);
    }

    @LogAction('Könyv törlése')
    public static destroyBook(book: Book): void {
        //kidolgozni
    }

    public print(): void {
        //kidolgozni
    }
}