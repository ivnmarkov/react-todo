import React, { useContext, useState } from "react";
import { TodoModel } from "../../models/todo";
import { TodoContext } from "../../store/store-todo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import "./styles.css";

interface TodoDetailsProps {
  todo: TodoModel;
}
const TodoDetails = ({ todo }: TodoDetailsProps) => {
  const [todoStatus, setTodostatus] = useState<boolean>(todo.completed);

  const todoCtx = useContext(TodoContext);
  const removeTodo = todoCtx.removeTodo;
  const checkTodo = todoCtx.checkTodo;

  const removeTodoHanlder = () => {
    removeTodo(todo.id!);
  };

  const checkTodoHandler = () => {
    setTodostatus(!todoStatus)
    checkTodo(todo.id!);
  };

  return (
      <tr>
          <td>{todo.id}</td>
          <td>{todo.title}</td>
          <td onClick={checkTodoHandler.bind(null, todo.id)}>
            {todoStatus ? <FontAwesomeIcon icon={faCheckCircle} />: <button>TODO</button>}
          </td>
          <td>
            <button onClick={removeTodoHanlder.bind(null, todo.id)}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </td>
      </tr>
  );
};

export default TodoDetails;
