import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ROUTER } from "./ROUTER";

const root = ReactDOM.createRoot(document.getElementById("root"));

// using <ROUTER/> as we are using react routing here.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ROUTER />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
