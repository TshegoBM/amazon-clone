import React from "react";
import ReactDOM from "react-dom"; // For React 17
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ShoppingState } from "../src/context/Shopping/ShoppingState";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ShoppingState>
        <App />
      </ShoppingState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
