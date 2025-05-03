import {combineReducers, legacy_createStore as createStore } from 'redux';
import { recipeReducer } from './reducers/recipeReducer';
import { searchReducer } from './reducers/searchReducer';
import { recipeListReducer } from './reducers/recipeListReducer';
import { burgerMenuReducer } from './reducers/burgerMenuReducer';
import { loaderReducer } from './reducers/loaderReduser';


const rootReducer = combineReducers({
    recipe: recipeReducer,
    search: searchReducer,
    list: recipeListReducer,
    burger: burgerMenuReducer,
    loader: loaderReducer,
})
  
export const store = createStore(rootReducer)

export type RootState = ReturnType<typeof rootReducer>