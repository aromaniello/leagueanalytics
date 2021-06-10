import { SET_ITEM } from '../actions/types/items';
import { initialSourceItems, initialTargetItems } from '../store/initialState';

export default function createItemsReducer(subject) {
  const initialState = subject === "source" ? initialSourceItems : initialTargetItems;

  return function itemsReducer(state = initialState, action) {
    if (action.subject !== subject) return state;

    switch (action.type) {
      case SET_ITEM:
        let newState = [ ...state ];
        newState[action.payload.index] = action.payload.item;
        return newState;
      default:
        return state;
    }
  }
}
