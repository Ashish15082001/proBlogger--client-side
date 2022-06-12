import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import "./index.css";
import { PageLayout } from "./Pages/PageLayout";
import reportWebVitals from "./reportWebVitals";
import { Modals } from "./components/modals/Modal";
import { BackDropOverlay } from "./components/backdrop overlay/BackDropOverlay";

const root = ReactDOM.createRoot(document.getElementById("root"));

// using <ROUTER/> as we are using react routing here.
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BackDropOverlay />
        <Modals />
        <PageLayout />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
