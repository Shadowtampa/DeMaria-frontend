import React, { useState } from 'react';
import '../styles/components/modal.less';
import { Button } from './Button/Button';

type ModalType = 'login' | 'signup' | null;

interface AuthModalProps {
  isOpen: boolean;
  type: ModalType;
  onClose: () => void;
  onSubmit: (name: string, email: string, password: string, passwordConfirmation: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, type, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type === 'login') {
      onSubmit('', email, password, '');
    } else {
      onSubmit(name, email, password, passwordConfirmation);
    }
    // Limpar campos após envio
    setEmail('');
    setPassword('');
    setName('');
    setPasswordConfirmation('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{type === 'login' ? 'Login' : 'Cadastro'}</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit}>
          {type === 'signup' && (
            <div className="form__group">
              <label htmlFor="name" className="form__group-label">Nome</label>
              <input 
                type="text"
                id="name"
                className="form__group-input"
                value={name} 
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          <div className="form__group">
            <label htmlFor="email" className="form__group-label">Email</label>
            <input 
              type="email"
              id="email"
              className="form__group-input"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="password" className="form__group-label">Senha</label>
            <input 
              type="password"
              id="password"
              className="form__group-input"
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {type === 'signup' && (
            <div className="form__group">
              <label htmlFor="passwordConfirmation" className="form__group-label">Confirmar Senha</label>
              <input 
                type="password"
                id="passwordConfirmation"
                className="form__group-input"
                value={passwordConfirmation} 
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
            </div>
          )}
          <div className="modal-footer">
            <Button type="submit" variant="primary">
              {type === 'login' ? 'Entrar' : 'Cadastrar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal; 