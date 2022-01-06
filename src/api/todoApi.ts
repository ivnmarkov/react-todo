import { TodoModel } from "../models/todo";

export const getTodosAPI = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  
      if (!response.ok) {
        throw new Error("Cannot get Todos, please check the source");
      }
  
      const data = await response.json();
      const loadedTodos: TodoModel[] = [];
  
      for (const key in data) {
        const {id, title, completed}: TodoModel = data[key];
        
        loadedTodos.push({id, title, completed});
      }
  
      return loadedTodos;
    } catch (error) {
      throw new Error("Cannot get Todos");
    }
  };