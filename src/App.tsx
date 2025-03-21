import './styles/globals.css';
import './styles/layout.less';
import { Button } from './components/Button/Button';
import { useTodos } from './hooks/useTodos';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

function App() {
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
  } = useTodos();

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-container">
          <h1 className="app__header-title">
            Teste técnico DeMaria - Luis Gomes
          </h1>
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
    </div>
  );
}

export default App;
