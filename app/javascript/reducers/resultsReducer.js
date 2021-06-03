import { SET_RESULTS } from '../actions/resultsTypes';

export default function resultsReducer(state = {}, action) {
  switch (action.type) {
    case SET_RESULTS:
      return action.payload;
    default:
      return state;
  }
}
