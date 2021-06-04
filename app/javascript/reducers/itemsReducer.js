import { SET_ITEM } from '../actions/types/items';
import { initialItems } from '../store/initialState';

export default function itemsReducer(state = initialItems, action) {
  switch (action.type) {
    case SET_ITEM:
      let newState = [ ...state ];
      newState[action.payload.index] = action.payload.item;
      return newState;
    default:
      return state;
  }
}
