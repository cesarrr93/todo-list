import { useState } from 'react';
import { TextInputWithLabel } from '../../shared/TextInputWithLabel';

// Object is passdown to function
function TodoListItem({ todo, onCompleteTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [workingTitle, setWorkingTitle] = useState(todo.title);

    const handleCancel = () => {
        setWorkingTitle(todo.title);
        setIsEditing(false);
    };

    const handleEdit = (event) => {
        setWorkingTitle(event.target.value);
    };
    return (
        <li>
            {isEditing ? (
                <>
                    <TextInputWithLabel
                        value={workingTitle}
                        onChange={handleEdit}
                    />
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <form>
                    <input
                        type="checkbox"
                        checked={todo.isCompleted}
                        onChange={() => onCompleteTodo(todo.id)}
                    />
                    <span onClick={() => setIsEditing(true)}>{todo.title}</span>
                </form>
            )}
        </li>
    );
}

export default TodoListItem;