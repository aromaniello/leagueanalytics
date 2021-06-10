import { SET_CHAMPION, SET_LEVEL, SET_ABILITY } from './types/build';

export function setChampion(subject, champion) {
  return {
    type: SET_CHAMPION,
    subject: subject,
    payload: champion
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
