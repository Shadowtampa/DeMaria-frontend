import { Component } from 'react';
import { Todo } from '../types/entities';
import '../styles/components/card.less';
import { Button } from './Button/Button';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
    onEdit: (todo: Todo) => void;
    handleToggleTodoStatus: (todo: Todo) => void;
}

interface TodoListState {
    selectedTodo: Todo | null;
}

class TodoList extends Component<TodoListProps, TodoListState> {
    constructor(props: TodoListProps) {
        super(props);
        this.state = {
            selectedTodo: null
        };
    }

    render() {
        const { todos, onDelete, onEdit, handleToggleTodoStatus } = this.props;

        return (
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
                                onClick={() => onDelete(todo.id)}
                            >
                                Excluir
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default TodoList; 