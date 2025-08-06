import { useRef } from 'react';

function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');

  const handleAddTodo = (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    onAddTodo(title);
    event.target.title.value = '';
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
        />
      </label>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
