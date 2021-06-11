import { SET_CONFIG, ADD_CONFIGS, REMOVE_INACTIVE_CONFIGS } from './types/configs';

export function setConfig(valueId, value) {
  return {
    type: SET_CONFIG,
    payload: { valueId, value }
  }
}

export function addConfigs(configs) {
  return {
    type: ADD_CONFIGS,
    payload: configs
  }
}

export function removeInactiveConfigs(activeSources) {
  return {
    type: REMOVE_INACTIVE_CONFIGS,
    payload: activeSources
  }
}

export const updateActiveConfigs = () => {
  return (dispatch, getState) => {
    const champion = getState().source.build.champion
    const items = getState().source.items
    const runes = getState().source.runes
    const runeList = [
      runes.keystone,
      runes.primaryRune1,
      runes.primaryRune2,
      runes.primaryRune3,
      runes.secondaryRune1,
      runes.secondaryRune2
    ]
    const activeSources = [champion].concat(items).concat(runeList)
    const runeAbilities = getState().data.runeAbilities;
    const configs = getState().configs;

    const newConfigs = [];

    for (const rune in runeAbilities) {
      if (!activeSources.includes(rune)) continue; // continue if the rune is not active

      const runeAbility = runeAbilities[rune];

      // if the `condition` key is present, this is a boolean config
      if ('condition' in runeAbility) {
        if (configExists('condition', rune, runeAbility.condition.name, configs)) continue;

        newConfigs.push({
          type: 'condition',
          source: rune,
          question: runeAbility.condition.question,
          valueId: runeAbility.condition.name,
          value: false
        });
      }
      // if the `stacks` key is present, this config allows the user to select the amount of current stacks
      else if ('stacks' in runeAbility) {
        if (configExists('stacks', rune, runeAbility.stacks.name, configs)) continue;

        newConfigs.push({
          type: 'stacks',
          source: rune,
          question: runeAbility.stacks.question,
          valueId: runeAbility.stacks.name,
          value: runeAbility.stacks.min,
          min: runeAbility.stacks.min,
          max: runeAbility.stacks.max
        });
      }
    }

    dispatch(addConfigs(newConfigs));
    dispatch(removeInactiveConfigs(activeSources));
  }
}

const configExists = (type, rune, valueId, configs) => {
  return configs.find(config => {
    return config.type === type &&
           config.valueId === valueId &&
           config.source === rune
  }) !== undefined;
}
