import { GET_RESULTS, SET_RESULTS } from './resultsTypes';
import axios from 'axios';

export const getResults = () => {
  return (dispatch, getState) => {
    // dispatch(getResultsStarted());

    axios
      .post('/api/sim', {})
      .then((response) => {
        console.log(response);
        dispatch(setResults(response.data))
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
