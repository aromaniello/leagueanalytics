import { SET_DATA } from '../actions/types/data';

export default function dataReducer(state = {}, action) {
  switch (action.type) {
    case SET_DATA:
      return action.payload;
    default:
      return state;
  }
}
