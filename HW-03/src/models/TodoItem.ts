import { ITodoItem, TodoContent } from '../interfaces/ITodoItem';

export class TodoItem<T extends TodoContent> implements ITodoItem<T> {
    private _id: string;
    private _content: T;
    public category?: string;

    constructor(id: string, content: T, category?: string) {
        this._id = id;
        this._content = content;
        this.category = category;
    }

    public get id(): string {
        return this._id;
    }

    public get content(): T {
        return this._content;
    }

    public print(): void {
        console.log(`ID: ${this._id} | Kategória: ${this.category ?? '-'} | Tartalom: ${JSON.stringify(this._content)}`);
    }
}
