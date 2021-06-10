import React from 'react'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import ChampionSelector from './ChampionSelector'
import ItemSetEditor from './ItemSetEditor'
import RuneEditor from './RuneEditor'
import ResultsPanel from './ResultsPanel'
import { useSelector, useDispatch, useStore } from 'react-redux'
import { setChampion, setLevel, setAbility } from '../actions/build'
import { getResults, setResults } from '../actions/results'
import { setTab } from '../actions/tabs'
import _ from 'lodash'

const BuildEditorTabs = withStyles({
  root: {
    backgroundColor: 'white'
  }
})(Tabs);

const BuildEditor = ({ data }) => {
  const dispatch = useDispatch();
  const store = useStore();

  const activeTab = () => useSelector(state => state.activeTab);
  const changeTab = (event, newActiveTab) => dispatch(setTab(newActiveTab));

  const renderChampionOptions = () => {
    return data.champions.map((champion) => {
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
        {renderNumericOptions('level', 1, 19)}
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

  const renderResultsPanel = () => {
    const results = useSelector(store => store.results);

    if (Object.keys(results).length > 0) {
      return <ResultsPanel results={results} />;
    }
  }

  return (
    <div className="build-editor">
      <AppBar position="static" elevation={0}>
        <BuildEditorTabs value={activeTab()} onChange={changeTab} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Champion"/>
          <Tab label="Target"/>
          <Tab label="Config"/>
          <Tab label="Results"/>
        </BuildEditorTabs>
      </AppBar>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 0}>
        <ChampionSelector champion_data={data.champions} subject="source" />
        <hr/>
        <ItemSetEditor item_data={data.items} subject="source" />
        <hr/>
        <RuneEditor rune_data={data.runes} subject="source" />
        <hr/>
        <div className="row">
          <div className="col-2 offset-10">
            <button className="sim-button btn btn-primary" onClick={e => dispatch(getResults())}>Get Results</button>
          </div>
        </div>
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 1}>
        <ChampionSelector champion_data={data.champions} subject="target" />
        <hr/>
        <ItemSetEditor item_data={data.items} subject="target" />
        <hr/>
        <RuneEditor rune_data={data.runes} subject="target" />
        <hr/>
        <div className="row">
          <div className="col-2 offset-10">
            <button className="sim-button btn btn-primary" onClick={e => dispatch(getResults())}>Get Results</button>
          </div>
        </div>
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 2}>
        Configs
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 3}>
        {renderResultsPanel()}
      </div>
    </div>
  );
}

export default BuildEditor
