import React, { useContext, useEffect, useState } from "react";
import { TodoModel } from "../../models/todo";
import { TodoContext } from "../../store/store-todo";
import TodoDetails from "../TodoDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import "./styles.css";

const TodoList = () => {
  const todoCtx = useContext(TodoContext);
  const getTodo = todoCtx.getTodo;

  const [columnsSortState, setColumnsSortState] = useState<{[key: string]: string}>({
      id: 'default',
      title: 'default',
      completed: 'default'
  });
  const [currentSortKey, setCurrentSortKey] = useState("");

  useEffect(() => {
    getTodo();
  }, []);

  const sortBy = (key: string) => {
      let tempObject: {[key: string]: string} = {...columnsSortState}
      setCurrentSortKey(key);
      switch (columnsSortState[key]) {
          case 'asc':
              tempObject[key] = 'desc';
              setColumnsSortState({...tempObject});
              break;
          case 'desc':
              tempObject[key] = 'default';
              setColumnsSortState({...tempObject});
              break;
          default:
              tempObject[key] = 'asc';
              setColumnsSortState({...tempObject});
              break;
      }
  }

  const getSortMethod = (key: string, sortKeyNumber: number) => {
    return ( prevItem: TodoModel, nextItem: TodoModel ) => {
        if ( prevItem[key] < nextItem[key] ){
        return sortKeyNumber * (-1);
        }
        if ( prevItem[key] > nextItem[key] ){
        return sortKeyNumber;
        }
        return 0;
    }
  }

  const getSortedList = () => {
    switch (columnsSortState[currentSortKey]) {
        case 'asc':
            return [...todoCtx.todoList].sort(getSortMethod(currentSortKey, 1));
        case 'desc':
            return [...todoCtx.todoList].sort(getSortMethod(currentSortKey, -1));
        default:
            return [...todoCtx.todoList];
    }
  }

  const sortIcon = (key: string) => {
    switch (columnsSortState[key]) {
        case 'asc':
            return <FontAwesomeIcon icon={faSortUp} />
        case 'desc':
            return <FontAwesomeIcon icon={faSortDown} />
        default:
            return (
                <span className="iconsBlock">
                    <FontAwesomeIcon icon={faSortUp} />
                    <FontAwesomeIcon icon={faSortDown} />
                </span>
            );
            
    }
  }

  const isListSorted = columnsSortState.id !== 'default' || columnsSortState.title !== 'default' || columnsSortState.completed !== 'default';

  const listForRender = isListSorted ? getSortedList() : todoCtx.todoList;

  const componentContent = () => {
      if(todoCtx.todoList.length) {
          return (
            <>
                {
                    listForRender.map((todo) => <TodoDetails key={todo.id} todo={todo} />)
                }
            </>
          );
      } else {
          return (
            <tr>
                <td className="loader" colSpan={4} >Loading...</td>
            </tr>
        );
      }
  }

  return (
      <table>
          <thead>
            <tr>
                <td>
                    <div className="td-content">
                        <span>ID</span><button onClick={() => sortBy("id")}>{sortIcon("id")}</button>
                    </div>
                </td>
                <td>
                    <div className="td-content">
                        <span>Name</span><button onClick={() => sortBy("title")}>{sortIcon("title")}</button>
                    </div>
                </td>
                <td>
                    <div className="td-content">
                        <span>Status</span><button onClick={() => sortBy("completed")}>{sortIcon("completed")}</button>
                    </div>
                </td>
                <td>
                    <div className="td-content">
                        <span>Delete</span>
                    </div>
                </td>
            </tr>
          </thead>
          <tbody>
            {componentContent()}
          </tbody>
      </table>
  );
};

export default TodoList;
