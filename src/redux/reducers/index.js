import { combineReducers } from "redux";
import auth from "./auth";
import checkout from "./checkout";
import general from "./general";

export default combineReducers({
  auth,
  general,
  checkout,
});
