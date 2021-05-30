import React from 'react'
import PropTypes from 'prop-types'
import RuneEditor from './RuneEditor'
import ItemSetEditor from './ItemSetEditor'
import { Provider } from 'react-redux'
import configureStore from '../store/configureStore'
import { initialState } from '../store/initialState'
import { setChampion, setLevel, setAbility } from '../actions/build'
import _ from 'lodash'

const store = configureStore(initialState);

class BuildEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  renderChampionOptions = () => {
    return _.keys(this.props.champions).map((champion) => {
      return <option value={champion} key={`champion-option-${_.kebabCase(champion)}`}>{champion}</option>;
    })
  }

  renderChampionSelect = () => {
    return (
      <select className="champion-select" name="champion-select" id="champion-select"
              value={store.getState().build.champion}
              // value={useSelector(state => state.build.champion)}
              onChange={e => store.dispatch(setChampion(e.target.value))}>
        <option value="" key="champion-option-empty"></option>
        {this.renderChampionOptions()}
      </select>
    )
  }

  renderLevelSelect = () => {
    return (
      <select className="level-select" name="level-select" id="level-select"
              value={store.getState().build.level}
              onChange={e => store.dispatch(setLevel(e.target.value))}>
        {this.renderNumericOptions('level',1, 19)}
      </select>
    );
  }

  renderBasicAbilitySelect = (ability) => {
    return (
      <select className="ability-select" name={`${ability}-ability`} id={`${ability}-ability`}
              value={store.getState().build[`${ability}_level`]}
              onChange={e => store.dispatch(setAbility(ability, e.target.value))}>
        {this.renderNumericOptions(name, 0, 6)}
      </select>
    );
  }

  renderUltimateAbilitySelect = () => {
    return (
      <select className="ability-select" name={'r-ability'} id={'r-ability'}
              value={store.getState().build.r_level}
              onChange={e => store.dispatch(setAbility('r', e.target.value))}>
        {this.renderNumericOptions('r-ability', 0, 4)}
      </select>
    );
  }

  renderNumericOptions = (selectName, from, to) => {
    return _.range(from, to).map((i) => {
      return <option value={i} key={`${selectName}-option-${i}`}>{i}</option>;
    });
  }

  render () {
    return (
      <Provider store={store}>
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
              <div className="">
                {this.renderChampionSelect()}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label className="">Level</label>
            </div>
            <div className="col-3">
              {this.renderLevelSelect()}
            </div>
          </div>

          <div className="row">
            <div className="col-1">
              <label className="">Abilities</label>
            </div>
            <div className="col-11">
              <label>Q:</label>
              <div className="ability-select-container">
                {this.renderBasicAbilitySelect('q')}
              </div>

              <label>W:</label>
              <div className="ability-select-container">
                {this.renderBasicAbilitySelect('w')}
              </div>

              <label>E:</label>
              <div className="ability-select-container">
                {this.renderBasicAbilitySelect('e')}
              </div>

              <label>R:</label>
              <div className="ability-select-container">
                {this.renderUltimateAbilitySelect()}
              </div>
            </div>
          </div>

          <hr/>
          <ItemSetEditor items={this.props.items} store={store} />
          <hr/>
          <RuneEditor rune_data={this.props.runes} store={store} />
          <hr/>

          <div className="row">
            <div className="col-1 offset-11">
              <button className="sim-button btn btn-primary">Sim</button>
            </div>
          </div>

        </div>
      </Provider>
    );
  }
}

export default BuildEditor
