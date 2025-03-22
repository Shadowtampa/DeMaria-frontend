import React, { useState } from 'react';
import '../styles/components/modal.less';
import { Button } from './Button/Button';

interface AITaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (activity: string) => void;
}

const AITaskModal: React.FC<AITaskModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [activity, setActivity] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(activity);
    setActivity('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Criar Todo com IA</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="activity" className="form__group-label">
              Descreva a atividade que deseja criar
            </label>
            <input
              type="text"
              id="activity"
              className="form__group-input"
              placeholder="aprender a dirigir, construir um prédio"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              required
            />
          </div>
          <div className="modal-footer">
            <Button type="submit" variant="primary">
              Criar com IA
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AITaskModal; 