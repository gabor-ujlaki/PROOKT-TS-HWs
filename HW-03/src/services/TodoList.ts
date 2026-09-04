import { ITodoList } from '../interfaces/ITodoList';
import { ITodoItem, TodoContent } from '../interfaces/ITodoItem';
import { LogAdd } from '../utils/decorators';
import { isDatedTodo, isTextTodo } from '../utils/typeGuards';

export class TodoList<T extends TodoContent> implements ITodoList<T> {
    private items: Map<string, ITodoItem<T>> = new Map();

    @LogAdd
    public add(item: ITodoItem<T>): void {
        if (this.items.has(item.id)) {
            console.warn(`\nA ${item.id} teendő már létezik!`);
            return;
        }

        this.items.set(item.id, item);
        console.log(`\nA ${item.id} teendő hozzáadva a listához.`);
    }

    public remove(id: string): void {
        if (!this.items.has(id)) {
            console.warn(`\nA ${id} teendő nem található!`);
            return;
        }

        this.items.delete(id);
        console.log(`\nA ${id} teendő törölve.`);
    }

    public list(): void {
        console.log(`\n${'='.repeat(60)}`);
        console.log(`*** TODO LISTA ***`);
        console.log(`${'='.repeat(60)}`);

        if (this.items.size === 0) {
            console.log('A lista üres.');
            return;
        }

        for (const item of this.items.values()) {
            item.print();

            if (isTextTodo(item.content)) {
                console.log(`(Egyszerű szöveges feladat)`);
            }

            if (isDatedTodo(item.content)) {
                console.log(`(Határidős feladat: ${item.content.dueDate.toLocaleDateString('hu-HU')})`);
            }

            console.log('-'.repeat(60));
        }
    }

    public filterByCategory(category: string): ITodoItem<T>[] {
        return [...this.items.values()].filter(item => item.category === category);
    }
}
