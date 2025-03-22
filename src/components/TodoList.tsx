import React, { Component} from 'react';
import { Todo } from '../types/entities';
import '../styles/components/card.less';
import { Button } from './Button/Button';
import ConfirmationModal from './ConfirmationModal';
import { Switch } from './Switch/Switch';

interface TodoListProps {
    todos: Todo[];
    viewType: 'grid' | 'list';
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
    handleToggleTodoStatus: (todo: Todo) => void;
}

interface TodoListState {
    selectedTodo: Todo | null;
    confirmationModal: { isOpen: boolean; todoId: number };
}

const TodoList: React.FC<TodoListProps> = ({ todos, viewType, onDelete, onEdit, handleToggleTodoStatus }) => {
    const [state, setState] = React.useState<TodoListState>({
        selectedTodo: null,
        confirmationModal: { isOpen: false, todoId: 0 }
    });

    const openDeleteConfirmation = (id: number) => {
        setState(prevState => ({ 
            ...prevState, 
            confirmationModal: { isOpen: true, todoId: id } 
        }));
    };

    const closeDeleteConfirmation = () => {
        setState(prevState => ({ 
            ...prevState, 
            confirmationModal: { isOpen: false, todoId: 0 } 
        }));
    };

    const confirmDelete = () => {
        onDelete(state.confirmationModal.todoId);
        closeDeleteConfirmation();
    };

    return (
        <div className={`todo-list ${viewType === 'list' ? 'todo-list--list' : 'todo-list--grid'}`}>
            {todos.length === 0 ? (
                <p className="todo-list__empty">Nenhum todo encontrado.</p>
            ) : (
                viewType === 'grid' ? (
                    <div className="section__grid">
                        {todos.map((todo) => (
                            <div key={todo.id} className="card">
                                <div className="card__header">
                                    <h3 className="card__header-title">{todo.title}</h3>
                                </div>
                                <div className="card__content">
                                    {todo.description && (
                                        <p className="card__content-text">{todo.description}</p>
                                    )}
                                    <p 
                                        className={`card__content-quantity ${todo.status === "concluida" ? "tachado" : ""}`} 
                                        onClick={() => handleToggleTodoStatus(todo)}
                                    >
                                        Status: {todo.status === "pendente" ? "Pendente" : "Concluída"}
                                    </p>
                                </div>
                                <div className="card__footer">
                                    <Switch 
                                        checked={todo.status === "concluida"}
                                        onChange={() => handleToggleTodoStatus(todo)}
                                        label="Concluído"
                                    />
                                    <Button
                                        variant="secondary"
                                        onClick={() => onEdit(todo)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => openDeleteConfirmation(todo.id)}
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="todo-list__list">
                        {todos.map((todo) => (
                            <div key={todo.id} className="todo-list__item">
                                <div className="todo-list__item-content">
                                    <h3 className="todo-list__item-title">{todo.title}</h3>
                                </div>
                                <div className="todo-list__item-actions">
                                    <Switch 
                                        checked={todo.status === "concluida"}
                                        onChange={() => handleToggleTodoStatus(todo)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
            <ConfirmationModal
                isOpen={state.confirmationModal.isOpen}
                title="Confirmar exclusão"
                message="Tem certeza que deseja excluir este todo? Esta ação é irreversível."
                onConfirm={confirmDelete}
                onCancel={closeDeleteConfirmation}
            />
        </div>
    );
};

export default TodoList; 