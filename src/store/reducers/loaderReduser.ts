import { LoaderAction } from "@utils/types/Actions"
import { LoaderState } from "@utils/types/States"

export const CHANGE_LOADER = 'CHANGE_LOADER'

const defaultState: LoaderState = {
  isOpen: false,
}

export const loaderReducer = (state = defaultState, action: LoaderAction): LoaderState => {
  switch (action.type) {
    case CHANGE_LOADER:      
      return {...state, isOpen: action.payload}
    default:
      return state
  }
}