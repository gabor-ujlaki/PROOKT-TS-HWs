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

    @LogAction('Könyv létrehozva')
    public static createBook(
        id: string,
        title: string,
        author: string,
        category?: Category
    ): Book {
        return new Book(id, title, author, category);
    }
}