/* eslint-disable no-restricted-globals */
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import reportWebVitals from "./reportWebVitals";
import configureStore from "redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "hooks/AppContext";
import moment from "moment";

const { store, persistor } = configureStore();
moment.locale("mn-MN");

if (process.env.NODE_ENV !== "development") {
  if (!(navigator.userAgent.match(/(iphone)|(ipod)|(ipad)|(android)|(blackberry)|(windows phone)|(symbian)/i))) {
    location.replace("https://bulteek.mn");
  }

}
ReactDOM.render(
  <AppProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </Provider>
  </AppProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
export { store };
