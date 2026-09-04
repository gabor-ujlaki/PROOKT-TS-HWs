import { TodoItem } from './models/TodoItem';
import { TodoList } from './services/TodoList';

/* TESZT */
const todoList = new TodoList();

const t1 = new TodoItem('TD001', 'vacsora', 'vásárlás');
const t2 = new TodoItem('TD002', 'fűnyírás', 'telek');
const t3 = new TodoItem('TD003', 'kategórizálatlan tétel');
todoList.add(t1);
todoList.add(t2);
todoList.add(t3);
todoList.list();

const t4 = new TodoItem('TD004', {
    message: 'kommunális adó befizetése',
    dueDate: new Date(2026, 8, 15)
}, 'ingatlan');
todoList.add(t4);
todoList.list();

const workItems = todoList.filterByCategory('ingatlan');
workItems.forEach(item => item.print());

todoList.remove('TD003');
todoList.list();
