import { DatedTodo, TodoContent } from '../interfaces/ITodoItem';

export function isDatedTodo(content: TodoContent): content is DatedTodo {
    return typeof content === 'object' && 'dueDate' in content;
}

export function isTextTodo(content: TodoContent): content is string {
    return typeof content === 'string';
}
