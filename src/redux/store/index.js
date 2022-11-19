/* eslint-disable import/no-anonymous-default-export */
import { applyMiddleware, compose, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import rootReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "checkout"],
};

export default (preloadedState) => {
  const middlewares = [thunk];
  let composeEnhancers = compose;

  if (
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    process.env.NODE_ENV === "development"
  ) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  }

  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  const persistor = persistStore(store);

  return { store, persistor };
};
