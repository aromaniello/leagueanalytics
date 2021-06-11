export const initialSourceBuild = {
  champion: 'Lux',
  level: '6',
  q_level: '1',
  w_level: '1',
  e_level: '3',
  r_level: '1'
};
export const initialSourceItems = ["Doran's Ring"];
export const initialSourceRunes = {
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

export const initialTargetBuild = {
  champion: 'Ashe',
  level: '6',
  q_level: '1',
  w_level: '3',
  e_level: '1',
  r_level: '1'
};
export const initialTargetItems = ["Doran's Blade"];
export const initialTargetRunes = {
  primaryPath: 'Precision',
  keystone: 'Lethal Tempo',
  primaryRune1: 'Presence of Mind',
  primaryRune2: 'Legend: Bloodline',
  primaryRune3: 'Coup de Grace',
  secondaryPath: 'Inspiration',
  secondaryRune1: 'Biscuit Delivery',
  secondaryRune2: 'Approach Velocity',
  stat1: 'Attack Speed',
  stat2: 'Adaptive Force',
  stat3: 'Armor'
};

export const initialState = {
  source: {
    build: initialSourceBuild,
    items: initialSourceItems,
    runes: initialSourceRunes
  },
  target: {
    build: initialTargetBuild,
    items: initialTargetItems,
    runes: initialTargetRunes
  },
  results: {},
  data: {},
  activeTab: 0
};
