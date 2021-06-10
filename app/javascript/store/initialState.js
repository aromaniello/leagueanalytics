export const initialBuild = {
  champion: 'Lux',
  level: '6',
  q_level: '1',
  w_level: '1',
  e_level: '3',
  r_level: '1'
};
export const initialItems = ["Blasting Wand"];
export const initialRunes = {
  primaryPath: 'Sorcery',
  keystone: 'Arcane Comet',
  primaryRune1: 'Manaflow Band',
  primaryRune2: 'Transcendence',
  primaryRune3: 'Gathering Storm',
  secondaryPath: 'Domination',
  secondaryRune1: 'Cheap Shot',
  secondaryRune2: 'Ultimate Hunter',
  stat1: 'Adaptive Force',
  stat2: 'Adaptive Force',
  stat3: 'Armor'
};

export const initialState = {
  build: initialBuild,
  items: initialItems,
  runes: initialRunes,
  results: {},
  activeTab: 0
};
