import { combineReducers } from 'redux';
import createBuildReducer from './createBuildReducer';
import createItemsReducer from './createItemsReducer';
import createRunesReducer from './createRunesReducer';
import resultsReducer from './resultsReducer';
import dataReducer from './dataReducer';
import tabReducer from './tabReducer';

const rootReducer = combineReducers({
  source: combineReducers({
    build: createBuildReducer('source'),
    items: createItemsReducer('source'),
    runes: createRunesReducer('source'),
  }),
  target: combineReducers({
    build: createBuildReducer('target'),
    items: createItemsReducer('target'),
    runes: createRunesReducer('target'),
  }),
  results: resultsReducer,
  data: dataReducer,
  activeTab: tabReducer
});

export default rootReducer;
