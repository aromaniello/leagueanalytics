import { SET_PATH, SET_RUNE } from './types/runes';
import { updateActiveConfigs } from './configs';

export const setPath = (subject, path, pathType) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_PATH,
      subject: subject,
      payload: { path, pathType }
    });
    dispatch(updateActiveConfigs());
  }
}

export const setRune = (subject, runeId, rune) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_RUNE,
      subject: subject,
      payload: { runeId, rune }
    });
    dispatch(updateActiveConfigs());
  }
}
