import { Book } from '../Book';

export enum BookStatus {
    AVAILABLE = 'available',
    BORROWED = 'borrowed',
    DISCARDED = 'discarded',
}

export interface IBaseLibrary {
    readonly id: string;
    name: string;

    books: Map<string, Book>;
}
