import { SET_ITEM } from './itemsTypes';

export function setItem(index, item) {
  return {
    type: SET_ITEM,
    payload: { index, item }
  }
}
