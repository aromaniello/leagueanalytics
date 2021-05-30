import { SET_RUNE } from '../actions/buildTypes';
import { initialRunes } from '../store/initialState';

export default function runesReducer(state = initialRunes, action) {
  switch (action.type) {
    case SET_RUNE:
      return {};
    default:
      return state;
  }
}
