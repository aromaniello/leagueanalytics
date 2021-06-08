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
    if (!('cost' in ability)) return '';

    return (
      <div className="row">
        <div className="col-2">
          Cost
        </div>
        <div className="col-1">
          {ability.cost}
        </div>
      </div>
    );
  }

  const renderDamageIfPresent = (damage_type) => {
    if (ability.damage.breakdown[damage_type] === 0) return '';

    return (
      <div className="row">
        <div className="col-2">
          <div className="damage-breakdown-label">
            {_.capitalize(damage_type)}
          </div>
        </div>
        <div className="col-1">
          {ability.damage.breakdown[damage_type]}
        </div>
      </div>
    );
  }

  const renderDamage = () => {
    if (!('damage' in ability)) return '';

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            Damage
          </div>
          <div className="col-1">
            {ability.damage.total}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Damage to Target
          </div>
          <div className="col-1">
            {ability.damage.target}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Damage Breakdown
          </div>
        </div>
        {renderDamageIfPresent("physical")}
        {renderDamageIfPresent("magic")}
        {renderDamageIfPresent("true")}
      </React.Fragment>
    );
  }

  const renderShield = () => {
    if (!('shield' in ability)) return '';

    return (
      <div className="row">
        <div className="col-2">
          Shield
        </div>
        <div className="col-1">
          {ability.shield.value}
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className="row">
        <strong>{ability.name} ({ability.short_name})</strong>
      </div>
      {renderCooldown()}
      {renderResourceCost()}
      {renderDamage()}
      {renderShield()}
    </React.Fragment>
  );
}

export default AbilityPanel
