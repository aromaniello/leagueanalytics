import { SET_CHAMPION, SET_LEVEL, SET_ABILITY } from '../actions/buildTypes';
import { initialBuild } from '../store/initialState';

export default function buildReducer(state = initialBuild, action) {
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
