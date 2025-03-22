import React, { useState, useEffect } from 'react';
import { Todo } from '../types/entities';
import '../styles/components/form.less';
import '../styles/components/card.less';
import { Button } from './Button/Button';

interface TodoFormProps {
    todo?: Todo;
    onSubmit: (todo: Omit<Todo, 'id'>) => void;
    onCancel: () => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ todo, onSubmit, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pendente');

    useEffect(() => {
        if (todo) {
            setTitle(todo.title);
            setDescription(todo.description);
            setStatus(todo.status);
        }
    }, [todo]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            title,
            description,
            status
        });

        // Limpar formulário
        setTitle('');
        setDescription('');
        setStatus("");
    };

    return (
        <div className="card">
            <form onSubmit={handleSubmit}>
                <div className="card__header">
                    <h2 className="card__header-title">
                        {todo ? 'Editar Todo' : 'Novo Todo'}
                    </h2>
                </div>
                <div className="card__content">
                    <div className="form__group">
                        <label htmlFor="title" className="form__group-label">
                            Título
                        </label>
                        <input
                            type="text"
                            id="title"
                            className="form__group-input"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form__group">
                        <label htmlFor="description" className="form__group-label">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            className="form__group-input form__group-input--textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                </div>
                <div className="card__footer">
                    <Button type="button" variant="secondary" onClick={onCancel}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="primary">
                        {todo ? 'Atualizar' : 'Criar'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm; 