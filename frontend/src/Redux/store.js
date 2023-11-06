import { applyMiddleware, combineReducers, createStore } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  adminLogoutReducer,
  adminProfileReducer,
  authReducer,
  forgotPasswordReducer,
} from "./reducers/authReducer";

import { getAllCmsReducer } from "./reducers/cmsReducer";

import { getAllUsersReducer, getUserReducer } from "./reducers/userReducer";

const Middleware = [thunk];

const adminInfoFromLocalStorage = localStorage.getItem("adminInfo")
  ? JSON.parse(localStorage.getItem("adminInfo"))
  : null;
const adminProfileFromLocalStorage = localStorage.getItem("adminProfileInfo")
  ? JSON.parse(localStorage.getItem("adminProfileInfo"))
  : null;

const reducer = combineReducers({
  adminLogin: authReducer,
  adminProfileInfo: adminProfileReducer,
  adminLogout: adminLogoutReducer,
  allUsers: getAllUsersReducer,
  userDetails: getUserReducer,

  CMS: getAllCmsReducer,
  otpToken: forgotPasswordReducer,
 
});
const initialState = {
  adminLogin: { adminInfo: adminInfoFromLocalStorage },
  adminProfileInfo: { adminProfile: adminProfileFromLocalStorage },
};
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...Middleware))
);
export default store;
