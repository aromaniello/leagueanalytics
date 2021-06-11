import { SET_CONFIG, ADD_CONFIGS, REMOVE_INACTIVE_CONFIGS } from '../actions/types/configs';

export default function configsReducer(state = [], action) {
  switch (action.type) {
    case SET_CONFIG:
      const newState = [ ...state ];
      const config = newState.find(c => c.valueId === action.payload.valueId)
      if (!config) return state; // necessary? it shouldn't happen
      config.value = action.payload.value
      return newState;
    case ADD_CONFIGS:
      return [ ...state ].concat(action.payload);
    case REMOVE_INACTIVE_CONFIGS:
      return [ ...state ].filter((config) => action.payload.includes(config.source));
    default:
      return state;
  }
}
