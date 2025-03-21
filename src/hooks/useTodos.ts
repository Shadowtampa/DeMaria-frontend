import { useState } from 'react';
import { Todo } from '../types/entities';

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoEmEdicao, setTodoEmEdicao] = useState<Todo | undefined>();
    const [mostrarFormTodo, setMostrarFormTodo] = useState(false);

    const handleAddTodo = (todo: Omit<Todo, 'id'>) => {
        const novoTodo: Todo = {
            ...todo,
            id: todos.length + 1
        };
        setTodos([...todos, novoTodo]);
        setTodoEmEdicao(undefined);
        setMostrarFormTodo(false);
    };

    const handleEditTodo = (todo: Todo) => {
        setTodoEmEdicao(todo);
        setMostrarFormTodo(true);
    };

    const handleToggleTodoStatus = (todo: Todo) => {
        const updatedTodo = {
            ...todo,
            status: todo.status === 'pendente' ? 'concluida' : 'pendente'
        };
        setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
    };

    const handleUpdateTodo = (todoAtualizado: Omit<Todo, 'id'>) => {
        if (todoEmEdicao) {
            const todosAtualizados = todos.map(m =>
                m.id === todoEmEdicao.id
                    ? { ...todoAtualizado, id: m.id }
                    : m
            );
            setTodos(todosAtualizados);
            setTodoEmEdicao(undefined);
            setMostrarFormTodo(false);
        }
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(m => m.id !== id));
    };

    const handleCancelTodo = () => {
        setTodoEmEdicao(undefined);
        setMostrarFormTodo(false);
    };

    const handleShowTodoForm = () => {
        setMostrarFormTodo(true);
        setTodoEmEdicao(undefined);
    };

    return {
        todos,
        setTodos,
        todoEmEdicao,
        mostrarFormTodo,
        handleAddTodo,
        handleEditTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleCancelTodo,
        handleShowTodoForm,
        handleToggleTodoStatus
    };
} 