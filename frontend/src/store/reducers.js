import { combineReducers } from "redux";
import auth from "./slices/auth/login.js";
import { api } from "../services/api.js";

const reducers = combineReducers({
  auth: auth,
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
