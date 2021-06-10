import { SET_CHAMPION, SET_LEVEL, SET_ABILITY } from '../actions/types/build';
import { initialSourceBuild, initialTargetBuild } from '../store/initialState';

export default function createBuildReducer(subject) {
  const initialState = subject === "source" ? initialSourceBuild : initialTargetBuild;

  return function buildReducer(state = initialState, action) {
    if (action.subject !== subject) return state;

    switch (action.type) {
      case SET_CHAMPION:
        return { ...state, champion: action.payload }
      case SET_LEVEL:
        return { ...state, level: action.payload };
      case SET_ABILITY:
        const newState = { ...state };
        newState[`${action.payload.ability}_level`] = action.payload.level;
        return newState;
      default:
        return state;
    }
  }
}
