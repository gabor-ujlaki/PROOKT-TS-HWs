import { ITodoItem, TodoContent } from './ITodoItem';

export interface ITodoList<T extends TodoContent> {
    add(item: ITodoItem<T>): void;
    remove(id: string): void;
    list(): void;
    filterByCategory(category: string): ITodoItem<T>[];
}
