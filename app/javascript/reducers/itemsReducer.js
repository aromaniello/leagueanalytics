import { SET_ITEM } from '../actions/itemsTypes';
import { initialItems } from '../store/initialState';

export default function itemsReducer(state = initialItems, action) {
  switch (action.type) {
    case SET_ITEM:
      let newState = { ...state };
      newState.items[parseInt(action.index)] = action.item;
      return newState;
    default:
      return state;
  }
}
