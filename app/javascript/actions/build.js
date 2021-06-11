import { SET_CHAMPION, SET_LEVEL, SET_ABILITY } from './types/build';
import { updateActiveConfigs } from './configs';

export const setChampion = (subject, champion) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_CHAMPION,
      subject: subject,
      payload: champion
    });
    dispatch(updateActiveConfigs());
  }
}

export function setLevel(subject, level) {
  return {
    type: SET_LEVEL,
    subject: subject,
    payload: level
  }
}

export function setAbility(subject, ability, level) {
  return {
    type: SET_ABILITY,
    subject: subject,
    payload: { ability, level }
  }
}
