import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userReducers";
import locationReducer from './locationReducer'; 

export default combineReducers({
    user: userReducer,
    location: locationReducer,
});
