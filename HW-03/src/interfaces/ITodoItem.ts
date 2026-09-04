export type TextTodo = string;

export interface DatedTodo {
    message: string;
    dueDate: Date;
}

export type TodoContent = TextTodo | DatedTodo;

export interface ITodoItem<T extends TodoContent> {
    readonly id: string;
    readonly content: T;
    category?: string;

    print(): void;
}
