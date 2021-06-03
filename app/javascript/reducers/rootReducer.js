import { combineReducers } from 'redux';
import buildReducer from './buildReducer';
import itemsReducer from './itemsReducer';
import runesReducer from './runesReducer';
import resultsReducer from './resultsReducer';

const rootReducer = combineReducers({
  build: buildReducer,
  items: itemsReducer,
  runes: runesReducer,
  results: resultsReducer
});

export default rootReducer;
