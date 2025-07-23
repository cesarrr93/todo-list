import './App.css';
import TodoList from './TodoList';
import TodoForm from './TodoForm';

function App() {


  return (
    <div className="App">
      <h1>My Todos</h1>
      <TodoForm />
      <TodoList />
    </div>
  );
}

export default App;
