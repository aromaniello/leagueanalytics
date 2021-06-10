import { SET_TAB } from './types/tabs';

export function setTab(index) {
  return {
    type: SET_TAB,
    payload: index
  }
}
