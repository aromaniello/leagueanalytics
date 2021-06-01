import React from 'react'
import PropTypes from 'prop-types'
import RuneEditor from './RuneEditor'
import ItemSetEditor from './ItemSetEditor'
import { useSelector, useDispatch } from 'react-redux'
import configureStore from '../store/configureStore'
import { initialState } from '../store/initialState'
import { setChampion, setLevel, setAbility } from '../actions/build'
import _ from 'lodash'

const BuildEditor = ({ data }) => {
  const dispatch = useDispatch();

  const renderChampionOptions = () => {
    return _.keys(data.champions).map((champion) => {
      return <option value={champion} key={`champion-option-${_.kebabCase(champion)}`}>{champion}</option>;
    })
  }

  const renderChampionSelect = () => {
    return (
      <select className="champion-select" name="champion-select" id="champion-select"
              value={useSelector(state => state.build.champion)}
              onChange={e => dispatch(setChampion(e.target.value))}>
        <option value="" key="champion-option-empty"></option>
        {renderChampionOptions()}
      </select>
    )
  }

  const renderLevelSelect = () => {
    return (
      <select className="level-select" name="level-select" id="level-select"
              value={useSelector(state => state.build.level)}
              onChange={e => dispatch(setLevel(e.target.value))}>
        {renderNumericOptions('level',1, 19)}
      </select>
    );
  }

  const renderBasicAbilitySelect = (ability) => {
    return (
      <select className="ability-select" name={`${ability}-ability`} id={`${ability}-ability`}
              value={useSelector(state => state.build[`${ability}_level`])}
              onChange={e => dispatch(setAbility(ability, e.target.value))}>
        {renderNumericOptions(name, 0, 6)}
      </select>
    );
  }

  const renderUltimateAbilitySelect = () => {
    return (
      <select className="ability-select" name={'r-ability'} id={'r-ability'}
              value={useSelector(state => state.build.r_level)}
              onChange={e => dispatch(setAbility('r', e.target.value))}>
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
    <div className="build-editor">
      <div className="row">
        <div className="col-3">
          <h2>Build 1</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <label className="">Champion</label>
        </div>
        <div className="col-3">
          {renderChampionSelect()}
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <label className="">Level</label>
        </div>
        <div className="col-3">
          {renderLevelSelect()}
        </div>
      </div>

      <div className="row">
        <div className="col-1">
          <label className="">Abilities</label>
        </div>
        <div className="col-11">
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
      <hr/>
      <ItemSetEditor items={data.items} />
      <hr/>
      <RuneEditor rune_data={data.runes} />
      <hr/>
      <div className="row">
        <div className="col-1 offset-11">
          <button className="sim-button btn btn-primary">Sim</button>
        </div>
      </div>
    </div>
  );
}

export default BuildEditor
