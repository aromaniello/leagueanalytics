import { combineReducers } from 'redux';
import buildReducer from './buildReducer';
import itemsReducer from './itemsReducer';
import runesReducer from './runesReducer';
import resultsReducer from './resultsReducer';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
  build: buildReducer,
  items: itemsReducer,
  runes: runesReducer,
  results: resultsReducer,
  activeTab: tabReducer
});

export default rootReducer;
