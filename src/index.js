import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import "./index.css";
import { PageLayout } from "./Pages/PageLayout";
import reportWebVitals from "./reportWebVitals";
import { AuthModal } from "./components/modals/auth modal/AuthModal";

const root = ReactDOM.createRoot(document.getElementById("root"));
export const setTheme = function (theme) {
  document.getElementById("root").setAttribute("theme", theme);
};

// using <ROUTER/> as we are using react routing here.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthModal />
        <PageLayout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
