import { TodoItem } from '../models/TodoItem';
import { TodoList } from '../services/TodoList';

describe('TodoList működésének tesztjei', () => {

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('add() – teendő hozzáadása: dekorátor log', () => {
        const list = new TodoList();
        const item = new TodoItem('TD001', 'vacsora', 'vásárlás');

        list.add(item);

        expect(console.log).toHaveBeenCalled();
    });

    it('filterByCategory() – teendő kategóriája', () => {
        const list = new TodoList();

        const item1 = new TodoItem('TD001', 'vacsora', 'vásárlás');
        const item2 = new TodoItem('TD002', 'fűnyírás', 'telek');

        list.add(item1);
        list.add(item2);

        const result = list.filterByCategory('telek');

        expect(result.length).toBe(1);
        expect(result[0].id).toBe('TD002');
    });

    it('remove() – teendő eltávolítása', () => {
        const list = new TodoList();
        const item = new TodoItem('TD001', 'vacsora', 'vásárlás');

        list.add(item);
        list.remove('TD001');

        const filtered = list.filterByCategory('vásárlás');
        expect(filtered.length).toBe(0);
    });
});
