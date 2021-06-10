import { SET_PATH, SET_RUNE } from '../actions/types/runes';
import { initialSourceRunes, initialTargetRunes } from '../store/initialState';

export default function createRunesReducer(subject) {
  const initialState = subject === "source" ? initialSourceRunes : initialTargetRunes;

  return function runesReducer(state = initialState, action) {
    if (action.subject !== subject) return state;
    
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
}
