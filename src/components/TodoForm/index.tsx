import React, { useRef, useContext } from "react";
import { TodoContext } from "../../store/store-todo";
import "./module.css";

const TodoForm = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const todoCtx = useContext(TodoContext);
  const addTodo = todoCtx.addTodo;

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current!.value.trim() === "") {
      return;
    }
    addTodo(inputRef.current!.value);
    inputRef.current!.value = "";
  };
  return (
    <div className="container">
      <form onSubmit={submitHandler} className="form">
        <input
          className="form_input"
          id="todoText"
          type="text"
          maxLength={64}
          placeholder="What needs to be done?"
          ref={inputRef}
        ></input>
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
