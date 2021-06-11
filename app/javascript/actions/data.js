import { SET_DATA } from './types/data';

export function setData(data) {
  return {
    type: SET_DATA,
    payload: data
  }
}
