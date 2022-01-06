export interface TodoModel {
    [key: string]: string | number | boolean,
    title: string;
    id: number;
    completed: boolean;
}

export interface TodoContextInterface {
    todoList: TodoModel[];
    getTodo: () => void;
    addTodo: (title: string) => void;
    removeTodo: (id: number) => void;
    checkTodo: (id: number) => void;
}


  