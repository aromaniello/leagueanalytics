import { SET_PATH, SET_RUNE } from './types/runes';

export function setPath(subject, path, pathType) {
  return {
    type: SET_PATH,
    subject: subject,
    payload: { path, pathType }
  }
}

export function setRune(subject, runeId, rune) {
  return {
    type: SET_RUNE,
    subject: subject,
    payload: { runeId, rune }
  }
}
