import { useState, useEffect, useRef } from 'react';
import { Todo } from '../types/entities';
import { get, post, put, del } from '../services/baseAPI';

export function useTodos(isAuthenticated: boolean = false) {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [todoEmEdicao, setTodoEmEdicao] = useState<Todo | undefined>();
    const [mostrarFormTodo, setMostrarFormTodo] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pendingToggles, setPendingToggles] = useState<Record<number, NodeJS.Timeout>>({});

    // Carrega todos quando o hook é inicializado e o usuário está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            fetchTodos();
        }
    }, [isAuthenticated]);

    // Limpa os timeouts pendentes ao desmontar o componente
    useEffect(() => {
        return () => {
            // Limpa todos os timeouts pendentes
            Object.values(pendingToggles).forEach(timeout => clearTimeout(timeout));
        };
    }, [pendingToggles]);

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

    const handleAddTodo = async (todo: Omit<Todo, 'id'>) => {
        try {
            setIsLoading(true);
            const response = await post('/api/todo', {
                title: todo.title,
                description: todo.description || '',
                status: todo.status || 'pendente'
            }, true); // withToken = true
            
            // Atualiza a lista completa após adicionar
            await fetchTodos();
            
            setTodoEmEdicao(undefined);
            setMostrarFormTodo(false);
            return response.data;
        } catch (error) {
            console.error('Erro ao adicionar todo:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditTodo = (todo: Todo) => {
        setTodoEmEdicao(todo);
        setMostrarFormTodo(true);
    };

    const handleToggleTodoStatus = (todo: Todo) => {
        // Atualiza visualmente de imediato (otimista)
        const newStatus = todo.status === 'pendente' ? 'concluida' : 'pendente';
        const updatedTodo = {
            ...todo,
            status: newStatus
        };
        
        // Atualiza a UI imediatamente
        setTodos((prevTodos) =>
            prevTodos.map((t) => (t.id === todo.id ? updatedTodo : t))
        );
        
        // Limpa timeout anterior se existir
        if (pendingToggles[todo.id]) {
            clearTimeout(pendingToggles[todo.id]);
        }
        
        // Configura novo timeout
        const timeoutId = setTimeout(async () => {
            try {
                setIsLoading(true);
                await put(`/api/todo/${todo.id}`, {
                    status: newStatus
                }, true);
                
                // Remove este toggle dos pendentes
                setPendingToggles(prev => {
                    const newPending = {...prev};
                    delete newPending[todo.id];
                    return newPending;
                });
                
                // Atualizar lista após persistir (opcional)
                // await fetchTodos();
            } catch (error) {
                console.error('Erro ao atualizar status:', error);
                // Reverte o estado visual em caso de erro
                setTodos((prevTodos) =>
                    prevTodos.map((t) => (t.id === todo.id ? todo : t))
                );
            } finally {
                setIsLoading(false);
            }
        }, 2000); // 2 segundos de debounce
        
        // Armazena o novo timeout
        setPendingToggles(prev => ({
            ...prev,
            [todo.id]: timeoutId
        }));
    };

    const handleUpdateTodo = async (todoAtualizado: Omit<Todo, 'id'>) => {
        if (todoEmEdicao) {
            try {
                setIsLoading(true);
                await put(`/api/todo/${todoEmEdicao.id}`, {
                    title: todoAtualizado.title,
                    description: todoAtualizado.description || '',
                    status: todoAtualizado.status || 'pendente'
                }, true); // withToken = true
                
                // Atualiza a lista após editar
                await fetchTodos();
                
                setTodoEmEdicao(undefined);
                setMostrarFormTodo(false);
            } catch (error) {
                console.error('Erro ao atualizar todo:', error);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            setIsLoading(true);
            await del(`/api/todo/${id}`, true); // withToken = true
            
            // Atualiza a lista depois de deletar
            await fetchTodos();
        } catch (error) {
            console.error('Erro ao excluir todo:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
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