import { SET_ITEM } from './types/items';

export function setItem(subject, index, item) {
  return {
    type: SET_ITEM,
    subject: subject,
    payload: { index, item }
  }
}
