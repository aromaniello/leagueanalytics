import React from 'react'
import PropTypes from 'prop-types'
import RuneEditor from './RuneEditor'
import ItemSetEditor from './ItemSetEditor'
import ResultsPanel from './ResultsPanel'
import { useSelector, useDispatch, useStore } from 'react-redux'
import configureStore from '../store/configureStore'
import { initialState } from '../store/initialState'
import { setChampion, setLevel, setAbility } from '../actions/build'
import axios from 'axios'
import _ from 'lodash'

const BuildEditor = ({ data }) => {
  const dispatch = useDispatch();
  const store = useStore();

  const performSim = () => {
    const state = store.getState();
    const post_data = {
      build: state.build,
      items: state.items,
      runes: state.runes
    }

    axios.post('/api/sim', post_data)
      .then ((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  const mockResults = () => {
    return {
      stats: {
        attackDamage: 75,
        abilityPower: 120,
        health: 1200,
        mana: 700,
        armor: 130,
        magicRes: 60,
        healthRegen: 5,
        manaRegen: 20,
        physicalVamp: 0,
        omnivamp: 0.1,
        attackSpeed: 0.63,
        critChance: 0.35,
        lethality: 20,
        armorPenFlat: 16,
        armorPenPerc: 0,
        magicPenFlat: 0,
        magicPenPerc: 0,
        attackRange: 300,
        tenacity: 0.3,
        abilityHaste: 20,
        lifeSteal: 0.05,
        cooldownReduction: 0.2,
        moveSpeed: 345
      },
      abilities: [{
        name: 'Illumination',
        short_name: 'P',
        damage: 300,
        damageToTarget: 250,
        damageBreakdown: {
          magic: 300,
          physical: 0,
          true: 0
        }
      },
      {
        name: 'Light Binding',
        short_name: 'Q',
        damage: 500,
        damageToTarget: 350,
        damageBreakdown: {
          magic: 500,
          physical: 0,
          true: 0
        },
        cooldown: 7.5,
        resourceCost: 50
      }]
    }
  }

  const renderChampionOptions = () => {
    return _.keys(data.champions).map((champion) => {
      return <option value={champion} key={`champion-option-${_.kebabCase(champion)}`}>{champion}</option>;
    })
  }

  const renderChampionSelect = () => {
    return (
      <select className="build-select champion-select" name="champion-select" id="champion-select"
              value={useSelector(state => state.build.champion)}
              onChange={e => dispatch(setChampion(e.target.value))}>
        <option value="" key="champion-option-empty"></option>
        {renderChampionOptions()}
      </select>
    )
  }

  const renderLevelSelect = () => {
    return (
      <select className="build-select level-select" name="level-select" id="level-select"
              value={useSelector(state => state.build.level)}
              onChange={e => dispatch(setLevel(e.target.value))}>
        {renderNumericOptions('level',1, 19)}
      </select>
    );
  }

  const renderBasicAbilitySelect = (ability) => {
    return (
      <select className="build-select ability-select" name={`${ability}-ability`} id={`${ability}-ability`}
              value={useSelector(state => state.build[`${ability}_level`])}
              onChange={e => dispatch(setAbility(ability, e.target.value))}>
        {renderNumericOptions(name, 0, 6)}
      </select>
    );
  }

  const renderUltimateAbilitySelect = () => {
    return (
      <select className="build-select ability-select" name={'r-ability'} id={'r-ability'}
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
        <div className="col-1 offset-5">
          <button className="sim-button btn btn-primary" onClick={performSim}>Sim</button>
        </div>
      </div>
      <hr/>
      <ItemSetEditor items={data.items} />
      <hr/>
      <RuneEditor rune_data={data.runes} />
      <hr/>
      <ResultsPanel results={mockResults()} />
    </div>
  );
}

export default BuildEditor
