import { SET_ITEM } from './types/items';

export function setItem(index, item) {
  return {
    type: SET_ITEM,
    payload: { index, item }
  }
}
