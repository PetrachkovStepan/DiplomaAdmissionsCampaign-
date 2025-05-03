import { RecipeAction } from "@utils/types/Actions";
import { RecipeState } from "@utils/types/States";

export const SET_ITEM = "SET_ITEM";

const defaultState: RecipeState = {
    uri: "http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_f1a89654f14747509601e0d436f628af"
  }
  
export const recipeReducer = (state = defaultState, 
  action:RecipeAction): RecipeState => {
    switch (action.type){
        case SET_ITEM:
            return{...state, uri: action.payload}
      default:
        return state;
    }
  }