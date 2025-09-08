import './App.css';
import TodoList from './features/TodoList/TodoList';
import TodoForm from './features/TodoForm';
import { useState, useEffect } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const addTodo = async (title) => {
    const payload = {
      records: [
        {
          fields: {
            title: title,
            isCompleted: false,
          }
        }
      ]
    };

    const options = {
      method: "POST",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        ...records[0].fields
      };
      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }
      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      console.log(error);
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const completedTodo = { ...originalTodo, isCompleted: true };
    
    // Optimistically update UI first
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return completedTodo;
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);

    const payload = {
      records: [
        {
          id: completedTodo.id,
          fields: {
            title: completedTodo.title,
            isCompleted: completedTodo.isCompleted
          }
        }
      ]
    };

    const options = {
      method: "PATCH",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    try {
      setIsSaving(true);
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...originalTodo };
        } else {
          return todo;
        }
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  };

  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    
    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted
          }
        }
      ]
    };

    const options = {
      method: "PATCH",
      headers: {
        "Authorization": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    try {
      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === editedTodo.id) {
          return { ...originalTodo };
        } else {
          return todo;
        }
      });
      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      
      const options = {
        method: "GET",
        headers: {
          "Authorization": token
        }
      };

      try {
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        
        const {records} = await resp.json();
        setTodoList(records.map(record => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if(!todo.isCompleted){
            todo.isCompleted = false;
          }
          return todo;
        }));
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>My Todos</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} isLoading={isLoading} />
      {errorMessage && (
        <div>
          <hr/>
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
