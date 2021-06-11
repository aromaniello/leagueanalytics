import { GET_RESULTS, SET_RESULTS } from './types/results';
import { setTab } from './tabs'
import axios from 'axios';

export const getResults = () => {
  return (dispatch, getState) => {
    // dispatch(getResultsStarted());
    const request_data = {
      source: getState().source,
      target: getState().target,
      configs: getState().configs.map((config) => {
        return {
          type: config.type,
          valueId: config.valueId,
          value: config.value
        }
      })
    }

    axios
      .post('/api/sim', request_data)
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
