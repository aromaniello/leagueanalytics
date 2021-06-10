import React from "react"
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'
import StatsPanel from './StatsPanel'
import AbilityPanel from './AbilityPanel'

const ResultsPanel = ({ results }) => {

  const renderAbilities = () => {
    return results.abilities.map((ability) => {
      return (
        <div className="ability-panel-container" key={`ability-${ability.short_name}`}>
          <AbilityPanel ability={ability} />
        </div>
      );
    });
  }

  return (
    <React.Fragment>
      <div className="row">
        <h5>Stats</h5>
      </div>

      <StatsPanel stats={results.stats} />

      <div className="row" style={{marginTop: '1.5rem'}}>
        <h5>Abilities</h5>
      </div>

      {renderAbilities()}
    </React.Fragment>
  );
}

export default ResultsPanel;
