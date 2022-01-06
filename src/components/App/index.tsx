import React from "react";
import "./styles.css";
import TodoForm from "../TodoForm";
import TodoList from "../TodoList";

function App() {
  return (
    <>
      <main className="App">
        <div className="container">
          <TodoForm />
          <TodoList />
        </div>
      </main>
    </>
  );
}

export default App;
