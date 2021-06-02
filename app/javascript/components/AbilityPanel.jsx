import React from "react"
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'

const AbilityPanel = ({ ability }) => {

  const renderCooldown = () => {
    if (!('cooldown' in ability)) return '';

    return (
      <div className="row">
        <div className="col-2">
          Cooldown
        </div>
        <div className="col-1">
          {ability.cooldown}
        </div>
      </div>
    );
  }

  const renderResourceCost = () => {
    if (!('resourceCost' in ability)) return '';

    return (
      <div className="row">
        <div className="col-2">
          Resource Cost
        </div>
        <div className="col-1">
          {ability.resourceCost}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="row">
        <strong>{ability.name} ({ability.short_name})</strong>
      </div>
      <div className="row">
        <div className="col-2">
          Damage
        </div>
        <div className="col-1">
          {ability.damage}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          Damage to Target
        </div>
        <div className="col-1">
          {ability.damageToTarget}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          Damage Breakdown
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="damage-breakdown-label">
            Physical
          </div>
        </div>
        <div className="col-1">
          {ability.damageBreakdown.physical}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="damage-breakdown-label">
            Magic
          </div>
        </div>
        <div className="col-1">
          {ability.damageBreakdown.magic}
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <div className="damage-breakdown-label">
            True
          </div>
        </div>
        <div className="col-1">
          {ability.damageBreakdown.true}
        </div>
      </div>
      {renderCooldown()}
      {renderResourceCost()}
    </React.Fragment>
  );
}

export default AbilityPanel
