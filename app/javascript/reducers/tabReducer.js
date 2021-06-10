import { SET_TAB } from '../actions/types/tabs';

export default function tabReducer(state = 0, action) {
  switch (action.type) {
    case SET_TAB:
      return action.payload;
    default:
      return state;
  }
}
