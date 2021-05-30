import { SET_CHAMPION, SET_LEVEL, SET_ABILITY } from './buildTypes';

export function setChampion(champion) {
  return {
    type: SET_CHAMPION,
    payload: champion
  }
}

export function setLevel(level) {
  return {
    type: SET_LEVEL,
    payload: level
  }
}

export function setAbility(ability, level) {
  return {
    type: SET_ABILITY,
    payload: { ability, level }
  }
}
