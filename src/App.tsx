import { useState } from 'react';
import './styles/globals.css';
import './styles/layout.less';
import { Button } from './components/Button/Button';
import { useTodos } from './hooks/useTodos';
import { useAuth } from './hooks/useAuth';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AuthModal from './components/AuthModal';

function App() {
  const { isAuthenticated, handleSignUp, handleLogin, handleLogout, user } = useAuth();
  
  const {
    todos,
    todoEmEdicao,
    mostrarFormTodo,
    handleAddTodo,
    handleEditTodo,
    handleUpdateTodo,
    handleDeleteTodo,
    handleCancelTodo,
    handleShowTodoForm,
    handleToggleTodoStatus
  } = useTodos(isAuthenticated);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'login' | 'signup' | null>(null);

  const openSignUpForm = () => {
    setModalType('signup');
    setModalOpen(true);
  };

  const openLoginForm = () => {
    setModalType('login');
    setModalOpen(true);
  };

  const handleAuthSubmit = (name: string, email: string, password: string, passwordConfirmation: string) => {
    modalType === 'login' 
      ? handleLogin(email, password)
      : handleSignUp(name, email, password, passwordConfirmation);
    
    setModalOpen(false);
  };

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container">
          <h1 className="app__header-title">
            Teste técnico DeMaria - Luis Gomes
          </h1>
          <div className="app__header-buttons">
            {isAuthenticated ? (
              <Button variant="danger" onClick={handleLogout}>
                Logout {user && user.name ? `(${user.name})` : ''}
              </Button>
            ) : (
              <>
                <Button variant="primary" onClick={openSignUpForm}>
                  Cadastrar
                </Button>
                <Button variant="secondary" onClick={openLoginForm}>
                  Login
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="app__main">
        <section className="section">
          <div className="section__header">
            <h2 className="section__header-title">Todos</h2>
            <Button
              variant="primary"
              onClick={handleShowTodoForm}
            >
              Novo Todo
            </Button>
          </div>

          {mostrarFormTodo && (
            <div className="section__form">
              <TodoForm
                todo={todoEmEdicao}
                onSubmit={todoEmEdicao ? handleUpdateTodo : handleAddTodo}
                onCancel={handleCancelTodo}
              />
            </div>
          )}

          <TodoList
            todos={todos}
            onDelete={handleDeleteTodo}
            onEdit={handleEditTodo}
            handleToggleTodoStatus={handleToggleTodoStatus}
          />
        </section>
      </main>

      <AuthModal 
        isOpen={modalOpen}
        type={modalType}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAuthSubmit}
      />
    </div>
  );
}

export default App;
