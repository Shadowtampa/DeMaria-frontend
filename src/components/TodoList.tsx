import { Component, useState } from 'react';
import { Todo } from '../types/entities';
import '../styles/components/card.less';
import { Button } from './Button/Button';
import ConfirmationModal from './ConfirmationModal';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
    handleToggleTodoStatus: (todo: Todo) => void;
}

interface TodoListState {
    selectedTodo: Todo | null;
    confirmationModal: { isOpen: boolean; todoId: number };
}

class TodoList extends Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);
        this.state = {
            selectedTodo: null,
            confirmationModal: { isOpen: false, todoId: 0 }
        };
    }

    openDeleteConfirmation = (id: number) => {
        this.setState({ confirmationModal: { isOpen: true, todoId: id } });
    };

    closeDeleteConfirmation = () => {
        this.setState({ confirmationModal: { isOpen: false, todoId: 0 } });
    };

    confirmDelete = () => {
        this.props.onDelete(this.state.confirmationModal.todoId);
        this.closeDeleteConfirmation();
    };

    render() {
        const { todos, onEdit, handleToggleTodoStatus } = this.props;

        return (
            <>
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
                                <Button
                                    variant="primary"
                                    onClick={() => handleToggleTodoStatus(todo)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => onEdit(todo)}
                                >
                                    Editar
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => this.openDeleteConfirmation(todo.id)}
                                >
                                    Excluir
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
                <ConfirmationModal
                    isOpen={this.state.confirmationModal.isOpen}
                    title="Confirmar exclusão"
                    message="Tem certeza que deseja excluir este todo? Esta ação é irreversível."
                    onConfirm={this.confirmDelete}
                    onCancel={this.closeDeleteConfirmation}
                />
            </>
        );
    }
}

export default TodoList; 