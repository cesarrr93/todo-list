import { useRef, useState } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');
  const [workingTodoTitle, setWorkingTodoTitle] = useState('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle('');
    todoTitleInput.current.focus();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">
        Todo
        <input
          id="todoTitle"
          name="title"
          type="text"
          ref={todoTitleInput}
          placeholder="New To do item"
          value={workingTodoTitle}
          onChange={(event) => setWorkingTodoTitle(event.target.value)}
        />
      </label>
      <button disabled={workingTodoTitle === ''}>Add Todo</button>
    </form>
  );
}

export default TodoForm;
