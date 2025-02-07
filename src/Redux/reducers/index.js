import { combineReducers } from "redux";
import { bookReducer } from "./bookReducer";
import { authReducer } from "./auth.reducer";


export const rootReducer = combineReducers({
    bookReducer,
    authReducer
})