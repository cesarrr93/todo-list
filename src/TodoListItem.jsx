// Object is passdown to function
function TodoListItem( { todo }) {
    return (
        <li>
            {todo.title}
        </li>
    );
}

export default TodoListItem;