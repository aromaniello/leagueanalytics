import React from "react"
import PropTypes from "prop-types"
import { useSelector, useDispatch } from 'react-redux'
import { setPath, setRune } from '../actions/runes'
import _ from "lodash"

const RuneEditor = ({ subject, rune_data }) => {
  const dispatch = useDispatch();

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
      <select className="build-select rune-select" name={`${pathType}-path-select`} id={`${pathType}-path-select`}
              value={useSelector(state => state[subject].runes[`${pathType}Path`]) || ''}
              onChange={e => dispatch(setPath(subject, e.target.value, pathType))}>
        <option value="">{placeholder}</option>
        {renderPathOptions(`${pathType}-path`)}
      </select>
    );
  }

  const renderPathOptions = (selectName) => {
    return rune_data['Paths'].map((path) => {
      return <option value={path} key={`${selectName}-option-${_.kebabCase(path)}`}>{path}</option>;
    })
  }

  const renderKeystoneSelect = () => {
    return (
      <select className="build-select rune-select" name="keystone-select" id="keystone-select"
              value={useSelector(state => state[subject].runes.keystone) || ''}
              onChange={e => dispatch(setRune(subject, 'keystone', e.target.value))}>
        <option value="">Keystone</option>
        {renderKeystoneOptions()}
      </select>
    );
  }

  const renderKeystoneOptions = () => {
    const primaryPath = useSelector(state => state[subject].runes.primaryPath);

    if (rune_data['Paths'].includes(primaryPath)) {
      return rune_data['Keystones'][primaryPath].map((keystone) => {
        return <option value={keystone} key={keystone}>{keystone}</option>;
      })
    }
  }

  const renderPrimaryRuneSelect = (runeId, placeholder) => {
    const id = `${_.kebabCase(runeId)}-select`;
    return (
      <select className="build-select rune-select" name={id} id={id}
              value={useSelector(state => state[subject].runes[runeId]) || ''}
              onChange={e => dispatch(setRune(subject, runeId, e.target.value))}>
        <option value="">{placeholder}</option>
        {renderPrimaryRuneOptions(runeId)}
      </select>
    );
  }

  const renderPrimaryRuneOptions = (runeId) => {
    const path = useSelector(state => state[subject].runes.primaryPath);

    if (rune_data['Paths'].includes(path)) {
      const options = rune_data['Runes'][path][rowForRune(runeId)];

      return options.map((option) => {
        return <option value={option} key={`${runeId}-${option}`}>{option}</option>;
      });
    }
  }

  const renderSecondaryRuneSelect = (runeId, placeholder) => {
    const id = `${_.kebabCase(runeId)}-select`;
    return (
      <select className="build-select rune-select" name={id} id={id}
              value={useSelector(state => state[subject].runes[runeId]) || ''}
              onChange={e => dispatch(setRune(subject, runeId, e.target.value))}>
        <option value="">{placeholder}</option>
        {renderSecondaryRuneOptionGroups(runeId)}
      </select>
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
          <optgroup label={label} key={key}>
            {renderSecondaryRuneOptions(runeId, options[row])}
          </optgroup>
        );
      });
    }
  }

  const rowForSecondaryRune = (rune, path) => {
    return rows.find((row) => rune_data['Runes'][path][row].includes(rune));
  }

  const renderSecondaryRuneOptions = (runeId, runes) => {
    return runes.map((rune) => {
      return <option value={rune} key={`${_.kebabCase(runeId)}-${_.kebabCase(rune)}`}>{rune}</option>;
    })
  }

  const renderStatSelect = (statId, placeholder) => {
    const id = `${_.kebabCase(statId)}-select`;
    return (
      <select className="build-select rune-select" name={id} id={id}
              value={useSelector(state => state[subject].runes[statId]) || ''}
              onChange={e => dispatch(setRune(subject, statId, e.target.value))}>
        <option value="">{placeholder}</option>
        {renderStatOptions(statId)}
      </select>
    );
  }

  const renderStatOptions = (statId) => {
    return rune_data['Stats'][rowForRune(statId)].map((stat) => {
      return <option value={stat} key={`${_.kebabCase(statId)}-option-${_.kebabCase(stat)}`}>{stat}</option>;
    })
  }

  return (
    <div>
      <div className="row">
        <div className="col-3">
          <h3>Runes</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderPathSelect('primary', 'Primary Path')}
        </div>
        <div className="col-2">
          {renderPathSelect('secondary', 'Secondary Path')}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderKeystoneSelect()}
        </div>
        <div className="col-2">
          {renderSecondaryRuneSelect('secondaryRune1', 'Rune #5')}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderPrimaryRuneSelect('primaryRune1', 'Rune #1')}
        </div>
        <div className="col-2">
          {renderSecondaryRuneSelect('secondaryRune2', 'Rune #6')}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderPrimaryRuneSelect('primaryRune2', 'Rune #2')}
        </div>
        <div className="col-2">
          {renderStatSelect('stat1', 'Stat #1')}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          {renderPrimaryRuneSelect('primaryRune3', 'Rune #3')}
        </div>
        <div className="col-2">
          {renderStatSelect('stat2', 'Stat #2')}
        </div>
      </div>

      <div className="row">
        <div className="col-2 offset-2">
          {renderStatSelect('stat3', 'Stat #3')}
        </div>
      </div>
    </div>
  );
}

export default RuneEditor;
