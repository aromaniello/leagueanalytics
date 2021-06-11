import { SET_ITEM } from './types/items';
import { updateActiveConfigs } from './configs';

export const setItem = (subject, index, item) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_ITEM,
      subject: subject,
      payload: { index, item }
    });
    dispatch(updateActiveConfigs());
  }
}
