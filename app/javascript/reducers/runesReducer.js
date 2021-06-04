import { SET_PATH, SET_RUNE } from '../actions/types/runes';
import { initialRunes } from '../store/initialState';

export default function runesReducer(state = initialRunes, action) {
  switch (action.type) {
    case SET_PATH:
      if (action.payload.pathType === 'primary') {
        return {
          ...state,
          primaryPath: action.payload.path,
          keystone: '',
          primaryRune1: '',
          primaryRune2: '',
          primaryRune3: ''
        }
      } else if (action.payload.pathType === 'secondary') {
        return {
          ...state,
          secondaryPath: action.payload.path,
          secondaryRune1: '',
          secondaryRune2: ''
        }
      }
    case SET_RUNE:
      const newState = { ...state };
      newState[action.payload.runeId] = action.payload.rune;
      return newState;
    default:
      return state;
  }
}
