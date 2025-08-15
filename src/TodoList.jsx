import TodoListItem from './TodoListItem';

function TodoList({ todoList, onCompleteTodo }) {
  const filteredTodoList = todoList.filter(todo => !todo.isCompleted);
  return (
    <>
      {filteredTodoList.length === 0 ? 
      //if true
      (
        <p>Add todo above to get started</p>
      ): //else
      (
        <ul>
          {filteredTodoList.map((todo) => (
            <TodoListItem key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />
          ))}
        </ul>
      )}
    </>
  );
}

export default TodoList;
