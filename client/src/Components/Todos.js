import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import TodoItem from "./TodoItem";
import TodoService from "../Services/TodoService";
import { AuthContext } from "../Context/AuthContext";
import Message from "./Message";

const addTodoClassList = (todo) => {
  let baseClass = "btn btn-success btn-block ";
  if (!todo.name) {
    baseClass = " btn btn-outline-dark btn-block disabled";
  }
  return baseClass;
};

const shouldBeDisabled = (todo) => {
  if (!todo.name) {
    return true;
  }
  return false;
};

const Todo = (props) => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const getTodos = useCallback(() => {
    TodoService.getTodos().then((data) => {
      authContext.setLoadingTodos(true);
      const { message } = data;
      if (!message.msgError) {
        authContext.setTodos(data.todos);
        authContext.setLoadingTodos(false);
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  }, []);
  useEffect(() => {
    getTodos();
    return () => {
      authContext.setTodos(null);
      authContext.setLoadingTodos(null);
    };
  }, [getTodos]);

  const onFormSubmitHandler = (e) => {
    e.preventDefault();
    TodoService.postTodo(todo).then((data) => {
      const { message } = data;
      setTodo({ name: "" });
      if (!message.msgError) {
        TodoService.getTodos().then((getData) => {
          authContext.setTodos(getData.todos);
          setMessage(message);
        });
      } else if (message.msgBody == "Unauthorized") {
        setMessage(message);
        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  };
  return (
    <div className="mt-5">
      <h1 className="display-4 text-center">Your todos</h1>
      <div className={authContext.loadingTodos === false && "border-top"} />
      <ul className="list-group">
        {authContext.loadingTodos === false ? (
          authContext.todos.map((todo, index, arr) => {
            return (
              <TodoItem
                key={todo._id}
                index={index + 1}
                last={arr.length == index + 1 ? true : false}
                only={arr.length == 1 ? true : false}
                todo={todo}
              />
            );
          })
        ) : (
          <div>Loading Todos...</div>
        )}
      </ul>
      <form onSubmit={(e) => onFormSubmitHandler(e)}>
        <label htmlFor="todo">Todo name</label>
        <input
          value={todo.name}
          id="todo"
          onChange={(e) => {
            setTodo({ name: e.target.value }, setMessage(null));
          }}
          className="form-control"
          placeholder="Enter todo name"
        />
        <button
          disabled={shouldBeDisabled(todo)}
          className={addTodoClassList(todo)}
        >
          Add Todo
        </button>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Todo;
