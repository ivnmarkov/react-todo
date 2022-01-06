import React, { useState, createContext } from "react";
import { getTodosAPI } from "../api/todoApi";

import { TodoModel, TodoContextInterface } from "../models/todo";

export const TodoContext = createContext<TodoContextInterface>({
  todoList: [],
  getTodo: () => {},
  addTodo: (title: string) => {},
  removeTodo: (id: number) => {},
  checkTodo: (id: number) => {}
});

const TodoContextProvider: React.FC = (props) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [todosNumber, setTodosNumber] = useState<number>(0);

  const getTodoHandler = async () => {
    const loadedTodos = await getTodosAPI();
    setTodosNumber(loadedTodos.length);
    setTodos(loadedTodos);
  };

  const addTodoHandler = async (title: string) => {
    const newTodo: TodoModel = {
        title,
        id: todosNumber + 1,
        completed: false
    };
    setTodosNumber(todosNumber + 1);
    setTodos((prevTodos) => {
      return [newTodo, ...prevTodos];
    //   return prevTodos.concat(newTodo);
    });
  };

  const removeTodoHanlder = async (id: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const checkTodoHandler = async (id: number) => {
    const targetTodoIndex = todos.findIndex((todo) => todo.id === id);
    const targetTodo = todos[targetTodoIndex];
    const updateTodo = { ...targetTodo, completed: !targetTodo.completed };
    let updateTodos = [...todos];
    updateTodos[targetTodoIndex] = updateTodo;
    setTodos(updateTodos);
  };

  const todoContextValue: TodoContextInterface = {
    todoList: todos,
    getTodo: getTodoHandler,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHanlder,
    checkTodo: checkTodoHandler
  };

  return (
    <TodoContext.Provider value={todoContextValue}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;
