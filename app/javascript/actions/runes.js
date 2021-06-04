import { SET_PATH, SET_RUNE } from './types/runes';

export function setPath(path, pathType) {
  return {
    type: SET_PATH,
    payload: { path, pathType }
  }
}

export function setRune(runeId, rune) {
  return {
    type: SET_RUNE,
    payload: { runeId, rune }
  }
}
