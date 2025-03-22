import { useState, useEffect } from 'react';
import { Todo } from '../types/entities';
import { get } from '../services/baseAPI';

export function useTodos(isAuthenticated: boolean = false) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoEmEdicao, setTodoEmEdicao] = useState<Todo | undefined>();
    const [mostrarFormTodo, setMostrarFormTodo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Carrega todos quando o hook é inicializado e o usuário está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            fetchTodos();
        }
    }, [isAuthenticated]);

    const fetchTodos = async () => {
        try {
            setIsLoading(true);
            const response = await get('/api/todo', true); // withToken = true
            setTodos(response.data);
            return response.data;
        } catch (error) {
            console.error('Erro ao buscar todos:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

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
        isLoading,
        fetchTodos,
        handleAddTodo,
        handleEditTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleCancelTodo,
        handleShowTodoForm,
        handleToggleTodoStatus
    };
} 