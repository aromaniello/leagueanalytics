import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import BuildEditor from './BuildEditor'
import ConfigEditor from './ConfigEditor'
import ResultsPanel from './ResultsPanel'
import { useSelector, useDispatch } from 'react-redux'
import { getResults, setResults } from '../actions/results'
import { updateActiveConfigs } from '../actions/configs'
import { setTab } from '../actions/tabs'
import _ from 'lodash'

const StyledTabs = withStyles({
  root: {
    backgroundColor: 'white'
  }
})(Tabs);

const App = () => {
  const dispatch = useDispatch();

  const activeTab = () => useSelector(state => state.activeTab);
  const changeTab = (event, newActiveTab) => dispatch(setTab(newActiveTab));

  useEffect(() => {
    dispatch(updateActiveConfigs());
  });

  const renderResultsPanel = () => {
    const results = useSelector(store => store.results);

    if (Object.keys(results).length > 0) {
      return <ResultsPanel results={results} />;
    }
  }

  return (
    <div className="app-container">
      <AppBar position="static" elevation={0}>
        <StyledTabs value={activeTab()} onChange={changeTab} indicatorColor="primary" textColor="primary" centered>
          <Tab label="Champion"/>
          <Tab label="Target"/>
          <Tab label="Config"/>
          <Tab label="Results"/>
        </StyledTabs>
      </AppBar>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 0}>
        <BuildEditor subject="source" />
        <hr/>
        <div className="row">
          <div className="col-2 offset-10">
            <button className="sim-button btn btn-primary" onClick={e => dispatch(getResults())}>Get Results</button>
          </div>
        </div>
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 1}>
        <BuildEditor subject="target" />
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 2}>
        <ConfigEditor />
      </div>
      <div role="tabpanel" className="build-editor-tabpanel" hidden={activeTab() !== 3}>
        {renderResultsPanel()}
      </div>
    </div>
  );
}

export default App
