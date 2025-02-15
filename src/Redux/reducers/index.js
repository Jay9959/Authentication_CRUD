import { combineReducers } from "redux";
import { recipeReducer } from "./recipesReducer";
import { authReducer } from "./auth.reducer";


export const rootReducer = combineReducers({
    recipeReducer,
    authReducer
})