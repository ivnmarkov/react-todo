import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import TodoContextProvider from "./store/store-todo";
ReactDOM.render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
