import React from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from 'react-redux'
import { setPath, setRune } from '../actions/runes'
import _ from "lodash"

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  itemSelect: {
    margin: theme.spacing(1),
    minWidth: 140
  },
  formControl: {
    margin: theme.spacing(1),
    width: 160
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const RuneEditor = ({ subject }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const rune_data = useSelector(state => state.data.runes);

  // TODO: convert strings to constants
  const rows = ['first_row', 'second_row', 'third_row'];
  const runeRows = {
    primaryRune1: 'first_row',
    primaryRune2: 'second_row',
    primaryRune3: 'third_row',
    stat1: 'first_row',
    stat2: 'second_row',
    stat3: 'third_row'
  }
  const rowForRune = runeId => runeRows[runeId];

  const renderPathSelect = (pathType, placeholder) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${pathType}-path-select-label`}>{`${_.capitalize(pathType)} Path`}</InputLabel>
        <Select
          labelId={`${pathType}-path-select-label`}
          id={`${pathType}-path-select`}
          value={useSelector(state => state[subject].runes[`${pathType}Path`]) || ''}
          onChange={e => dispatch(setPath(subject, e.target.value, pathType))}
        >
          <MenuItem value=""></MenuItem>
          {renderPathOptions(pathType)}
        </Select>
      </FormControl>
    );
  }

  const renderPathOptions = (pathType) => {
    return rune_data['Paths'].map((path) => {
      return <MenuItem value={path} key={`${pathType}-option-${path}`}>{path}</MenuItem>;
    })
  }

  const renderKeystoneSelect = () => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id="keystone-select-label">Keystone</InputLabel>
        <Select
          labelId="keystone-select-label"
          id="keystone-select"
          value={useSelector(state => state[subject].runes.keystone) || ''}
          onChange={e => dispatch(setRune(subject, 'keystone', e.target.value))}
        >
          <MenuItem value=""></MenuItem>
          {renderKeystoneOptions()}
        </Select>
      </FormControl>
    );
  }

  const renderKeystoneOptions = () => {
    const primaryPath = useSelector(state => state[subject].runes.primaryPath);

    if (rune_data['Paths'].includes(primaryPath)) {
      return rune_data['Keystones'][primaryPath].map((keystone) => {
        return <MenuItem value={keystone} key={`${keystone}-option`}>{keystone}</MenuItem>;
      })
    }
  }

  const renderPrimaryRuneSelect = (runeId, label) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${runeId}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${runeId}-select-label`}
          id={`${runeId}-select`}
          value={useSelector(state => state[subject].runes[runeId]) || ''}
          onChange={e => dispatch(setRune(subject, runeId, e.target.value))}
        >
          <MenuItem value=""></MenuItem>
          {renderPrimaryRuneOptions(runeId)}
        </Select>
      </FormControl>
    );
  }

  const renderPrimaryRuneOptions = (runeId) => {
    const path = useSelector(state => state[subject].runes.primaryPath);

    if (rune_data['Paths'].includes(path)) {
      const options = rune_data['Runes'][path][rowForRune(runeId)];

      return options.map((option) => {
        return <MenuItem value={option} key={`${runeId}-${option}`}>{option}</MenuItem>;
      });
    }
  }

  const renderSecondaryRuneSelect = (runeId, label) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${runeId}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${runeId}-select-label`}
          id={`${runeId}-select`}
          value={useSelector(state => state[subject].runes[runeId]) || ''}
          onChange={e => dispatch(setRune(subject, runeId, e.target.value))}
        >
          <MenuItem value=""></MenuItem>
          {renderSecondaryRuneOptionGroups(runeId)}
        </Select>
      </FormControl>
    );
  }

  const renderSecondaryRuneOptionGroups = (runeId) => {
    const path = useSelector(state => state[subject].runes.secondaryPath);
    const otherRuneId = runeId === 'secondaryRune1' ? 'secondaryRune2' : 'secondaryRune1';
    const otherRune = useSelector(state => state[subject].runes[otherRuneId]);

    if (rune_data['Paths'].includes(path)) {
      const options = rune_data['Runes'][path];

      return rows.map((row) => {
        if (rowForSecondaryRune(otherRune, path) === row) return '';

        const label = row.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
        const key = `${_.kebabCase(runeId)}-optgroup-${_.kebabCase(row)}`;
        return (
          [<ListSubheader key={key}>{label}</ListSubheader>]
        ).concat(renderSecondaryRuneOptions(runeId, options[row]));
      });
    }
  }

  const rowForSecondaryRune = (rune, path) => {
    return rows.find((row) => rune_data['Runes'][path][row].includes(rune));
  }

  const renderSecondaryRuneOptions = (runeId, runes) => {
    return runes.map((rune) => {
      return <MenuItem value={rune} key={`${runeId}-${rune}`}>{rune}</MenuItem>;
    })
  }

  const renderStatSelect = (statId, label) => {
    return (
      <FormControl className={classes.formControl}>
        <InputLabel id={`${statId}-select-label`}>{label}</InputLabel>
        <Select
          labelId={`${statId}-select-label`}
          id={`${statId}-select`}
          value={useSelector(state => state[subject].runes[statId]) || ''}
          onChange={e => dispatch(setRune(subject, statId, e.target.value))}
        >
          <MenuItem value=""></MenuItem>
          {renderStatOptions(statId)}
        </Select>
      </FormControl>
    );
  }

  const renderStatOptions = (statId) => {
    return rune_data['Stats'][rowForRune(statId)].map((stat) => {
      return <MenuItem value={stat} key={`${statId}-${stat}`}>{stat}</MenuItem>;
    })
  }

  return (
    <div>
      <div className="row build-editor-subtitle">
        RUNES
      </div>

      <div className="row">
        {renderPathSelect('primary', 'Primary Path')}
        {renderKeystoneSelect()}
        {renderPrimaryRuneSelect('primaryRune1', 'Rune #1')}
        {renderPrimaryRuneSelect('primaryRune2', 'Rune #2')}
        {renderPrimaryRuneSelect('primaryRune3', 'Rune #3')}
      </div>

      <div className="row">
        {renderPathSelect('secondary', 'Secondary Path')}
        {renderSecondaryRuneSelect('secondaryRune1', 'Rune #5')}
        {renderSecondaryRuneSelect('secondaryRune2', 'Rune #6')}
      </div>

      <div className="row">
        {renderStatSelect('stat1', 'Stat #1')}
        {renderStatSelect('stat2', 'Stat #2')}
        {renderStatSelect('stat3', 'Stat #3')}
      </div>
    </div>
  );
}

export default RuneEditor;
