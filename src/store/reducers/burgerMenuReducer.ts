import { BurgerAction } from "@utils/types/Actions"
import { BurgerState } from "@utils/types/States"

export const CHANGE_BURGER = 'CHANGE_BURGER'

const defaultState: BurgerState = {
  isOpen: false,
}

export const burgerMenuReducer = (state = defaultState, action: BurgerAction): BurgerState => {
  switch (action.type) {
    case CHANGE_BURGER:
      return {...state, isOpen: !state.isOpen}
    default:
      return state
  }
}