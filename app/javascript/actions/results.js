import { GET_RESULTS, SET_RESULTS } from './types/results';
import { setTab } from './tabs'
import axios from 'axios';

export const getResults = () => {
  return (dispatch, getState) => {
    // dispatch(getResultsStarted());
    const results = {
      build: getState().build,
      items: getState().items,
      runes: getState().runes
    };

    axios
      .post('/api/sim', results)
      .then((response) => {
        console.log(response);
        dispatch(setResults(response.data));
        dispatch(setTab(3));
      })
      .catch((error) => {
        console.log(error);
      })
  }
}

export const setResults = (results) => {
  return {
    type: SET_RESULTS,
    payload: results
  }
}
