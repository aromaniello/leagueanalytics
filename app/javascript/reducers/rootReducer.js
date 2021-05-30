import { combineReducers } from 'redux';
import buildReducer from './buildReducer';
import itemsReducer from './itemsReducer';
import runesReducer from './runesReducer';

const rootReducer = combineReducers({
  build: buildReducer,
  items: itemsReducer,
  runes: runesReducer
});

export default rootReducer;
