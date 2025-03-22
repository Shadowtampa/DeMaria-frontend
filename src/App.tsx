import { useState } from 'react';
import './styles/globals.css';
import './styles/layout.less';
import { Button } from './components/Button/Button';
import { useTodos } from './hooks/useTodos';
import { useAuth } from './hooks/useAuth';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import AuthModal from './components/AuthModal';
import AITaskModal from './components/AITaskModal';

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
    handleAutomateTodo,
    handleCancelTodo,
    handleShowTodoForm,
    handleToggleTodoStatus
  } = useTodos(isAuthenticated);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = 
  useState<'login' | 'signup' | null>(null);

  const [aiModalOpen, setAiModalOpen] = useState(false);

  const [statusFilter, setStatusFilter] = useState<'all' | 'pendente' | 'concluida'>('all');

  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const filteredTodos = todos.filter(todo => {
    if (statusFilter === 'all') return true;
    return todo.status === statusFilter;
  });

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

  const handleAITaskSubmit = (activity: string) => {
    handleAutomateTodo(activity);
    setAiModalOpen(false);
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
            <div className="section__header-title-container">
              <h2 className="section__header-title">Todos</h2>
              <div className="view-toggle">
                <Button 
                  variant={viewType === 'grid' ? "primary" : "secondary"} 
                  onClick={() => setViewType('grid')}
                >
                  <span>Grade</span>
                </Button>
                <Button 
                  variant={viewType === 'list' ? "primary" : "secondary"} 
                  onClick={() => setViewType('list')}
                >
                  <span>Lista</span>
                </Button>
              </div>
            </div>
            <div className="section__header-buttons">
              <Button
                variant="secondary"
                onClick={() => setAiModalOpen(true)}
              >
                Criar com IA
              </Button>
              <Button
                variant="primary"
                onClick={handleShowTodoForm}
              >
                Novo Todo
              </Button>
            </div>
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

          <div className="section__filters">
            <div className="filter-group">
              <span className="filter-label">Filtrar por status:</span>
              <div className="filter-buttons">
                <Button 
                  variant={statusFilter === 'all' ? "primary" : "secondary"} 
                  onClick={() => setStatusFilter('all')}
                >
                  Todos
                </Button>
                <Button 
                  variant={statusFilter === 'pendente' ? "primary" : "secondary"} 
                  onClick={() => setStatusFilter('pendente')}
                >
                  Pendentes
                </Button>
                <Button 
                  variant={statusFilter === 'concluida' ? "primary" : "secondary"} 
                  onClick={() => setStatusFilter('concluida')}
                >
                  Concluídas
                </Button>
              </div>
            </div>
          </div>

          <TodoList
            todos={filteredTodos}
            viewType={viewType}
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
      
      <AITaskModal
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onSubmit={handleAITaskSubmit}
      />
    </div>
  );
}

export default App;
