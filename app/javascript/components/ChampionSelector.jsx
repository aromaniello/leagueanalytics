import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setChampion, setLevel, setAbility } from '../actions/build'
import _ from 'lodash'

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  championSelect: {
    margin: theme.spacing(1),
    width: 200
  },
  formControl: {
    margin: theme.spacing(1),
    width: 60,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ChampionSelector = ({ subject }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const champion_data = useSelector(state => state.data.champions)
  const champion = useSelector(state => state[subject].build.champion);
  const level = useSelector(state => state[subject].build.level);

  const renderChampionSelect = () => {
    return (
      <FormControl className={classes.championSelect}>
        <InputLabel id={`${subject}-champion-select-label`}>Champion</InputLabel>
        <Select
          labelId={`${subject}-champion-select-label`}
          id={`${subject}-champion-select`}
          value={champion}
          onChange={e => dispatch(setChampion(subject, e.target.value))}
        >
          {renderChampionOptions()}
        </Select>
      </FormControl>
    )
  }

  const renderChampionOptions = () => {
    return champion_data.map((champion) => {
      return <MenuItem value={champion} key={`${champion}-option`}>{champion}</MenuItem>;
    })
  }

  const renderLevelSelect = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${subject}-level-select-label`}>Level</InputLabel>
        <Select
          labelId={`${subject}-level-select-label`}
          id={`${subject}-level-select`}
          value={level}
          onChange={e => dispatch(setLevel(subject, e.target.value))}
        >
          {renderNumericOptions('level', 1, 19)}
        </Select>
      </FormControl>
    );
  }

  const renderBasicAbilitySelect = (ability) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${subject}-${ability}-select-label`}>{_.toUpper(ability)}</InputLabel>
        <Select
          labelId={`${subject}-${ability}-select-label`}
          id={`${subject}-${ability}-select`}
          value={useSelector(state => state[subject].build[`${ability}_level`])}
          onChange={e => dispatch(setAbility(subject, ability, e.target.value))}
        >
          {renderNumericOptions(ability, 0, 6)}
        </Select>
      </FormControl>
    );
  }

  const renderUltimateAbilitySelect = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${subject}-r-select-label`}>R</InputLabel>
        <Select
          labelId={`${subject}-r-select-label`}
          id={`${subject}-r-select`}
          value={useSelector(state => state[subject].build.r_level)}
          onChange={e => dispatch(setAbility(subject, 'r', e.target.value))}
        >
          {renderNumericOptions('r-ability', 0, 4)}
        </Select>
      </FormControl>
    );
  }

  const renderNumericOptions = (id, from, to) => {
    return _.range(from, to).map((i) => {
      return <MenuItem value={i} key={`${id}-option-${i}`}>{i}</MenuItem>;
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        {renderChampionSelect()}
        {renderLevelSelect()}
        {renderBasicAbilitySelect('q')}
        {renderBasicAbilitySelect('w')}
        {renderBasicAbilitySelect('e')}
        {renderUltimateAbilitySelect()}
      </div>
    </React.Fragment>
  );
}

export default ChampionSelector
