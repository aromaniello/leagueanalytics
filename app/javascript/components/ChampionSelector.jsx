import React from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { setChampion, setLevel, setAbility } from '../actions/build'
import _ from 'lodash'

const ChampionSelector = ({ champion_data, subject }) => {
  const dispatch = useDispatch();

  const renderChampionOptions = () => {
    return champion_data.map((champion) => {
      return <option value={champion} key={`champion-option-${_.kebabCase(champion)}`}>{champion}</option>;
    })
  }

  const renderChampionSelect = () => {
    return (
      <select className="build-select champion-select" name="champion-select" id="champion-select"
              value={useSelector(state => state[subject].build.champion)}
              onChange={e => dispatch(setChampion(subject, e.target.value))}>
        <option value="" key="champion-option-empty"></option>
        {renderChampionOptions()}
      </select>
    )
  }

  const renderLevelSelect = () => {
    return (
      <select className="build-select level-select" name="level-select" id="level-select"
              value={useSelector(state => state[subject].build.level)}
              onChange={e => dispatch(setLevel(subject, e.target.value))}>
        {renderNumericOptions('level', 1, 19)}
      </select>
    );
  }

  const renderBasicAbilitySelect = (ability) => {
    return (
      <select className="build-select ability-select" name={`${ability}-ability`} id={`${ability}-ability`}
              value={useSelector(state => state[subject].build[`${ability}_level`])}
              onChange={e => dispatch(setAbility(subject, ability, e.target.value))}>
        {renderNumericOptions(name, 0, 6)}
      </select>
    );
  }

  const renderUltimateAbilitySelect = () => {
    return (
      <select className="build-select ability-select" name="r-ability" id="r-ability"
              value={useSelector(state => state[subject].build.r_level)}
              onChange={e => dispatch(setAbility(subject, 'r', e.target.value))}>
        {renderNumericOptions('r-ability', 0, 4)}
      </select>
    );
  }

  const renderNumericOptions = (selectName, from, to) => {
    return _.range(from, to).map((i) => {
      return <option value={i} key={`${selectName}-option-${i}`}>{i}</option>;
    });
  }
  return (
    <React.Fragment>
      <div className="row">
        <div className="col-1">
          <label className="">Champion</label>
        </div>
        <div className="col-3 build-select-container">
          {renderChampionSelect()}
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <label className="">Level</label>
        </div>
        <div className="col-3 build-select-container">
          {renderLevelSelect()}
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <label className="">Abilities</label>
        </div>
        <div className="col-5 build-select-container">
          <label>Q:</label>
          <div className="ability-select-container">
            {renderBasicAbilitySelect('q')}
          </div>

          <label>W:</label>
          <div className="ability-select-container">
            {renderBasicAbilitySelect('w')}
          </div>

          <label>E:</label>
          <div className="ability-select-container">
            {renderBasicAbilitySelect('e')}
          </div>

          <label>R:</label>
          <div className="ability-select-container">
            {renderUltimateAbilitySelect()}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChampionSelector
