import { DIET_CATEGORIES, DISH_CATEGORIES } from "../actions/searchActions"
import { SearchAction } from "@utils/types/Actions"
import { SearchState } from "@utils/types/States"

export const SEARCH_LINE = 'SEARCH_LINE'
export const DISH_CATEGORY = 'DISH_CATEGORY'
export const DIET_CATEGORY = 'DIET_CATEGORY'

const defaultState: SearchState = {
  searchLine: "",
  dish_category: DISH_CATEGORIES[0],
  diet_category: DIET_CATEGORIES[0],
}

export const searchReducer = (state = defaultState, action: SearchAction): SearchState => {
  switch (action.type) {
    case SEARCH_LINE:
      return {...state, searchLine: action.payload}
    case DISH_CATEGORY:
      return {...state, dish_category: action.payload}
    case DIET_CATEGORY:
      return {...state, diet_category: action.payload}
    default:
      return state
  }
}