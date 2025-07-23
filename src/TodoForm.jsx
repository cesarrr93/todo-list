function TodoForm() {
  return (
    <form>
      <label htmlFor="todoTitle" placeholder="New To do item">
        Todo
        <input type="text" name="todoTitle" id="todoTitle" />
      </label>
      <button>Add Todo</button>
    </form>
  );
}

export default TodoForm;
