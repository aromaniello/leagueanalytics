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

  // TODO: refactor to just iterate over the three keys, without calling this three times
  const renderDamageIfPresent = (breakdown, damage_type) => {
    if (breakdown[damage_type] === 0) return '';

    return (
      <div className="row">
        <div className="col-2">
          <div className="damage-breakdown-label">
            {_.capitalize(damage_type)}
          </div>
        </div>
        <div className="col-1">
          {breakdown[damage_type]}
        </div>
      </div>
    );
  }

  const renderDamage = () => {
    if (!('damage' in ability)) return '';

    if (ability.damage.category === "direct") {
      return renderDirectDamage();

    } else if (ability.damage.category === "variable") {
      return renderVariableDamage();
    }
  }

  const renderDirectDamage = () => {
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
        {renderDamageIfPresent(ability.damage.breakdown, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown, "true")}
      </React.Fragment>
    );
  }

  const renderVariableDamage = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-2">
            Damage per Tick
          </div>
          <div className="col-1">
            {ability.damage.per_tick}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Damage to Target
          </div>
          <div className="col-1">
            {ability.damage.target_per_tick}
          </div>
        </div>
        <div className="row">
          <div className="col-2">
            Damage per Tick Breakdown
          </div>
        </div>
        {renderDamageIfPresent(ability.damage.breakdown_per_tick, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown_per_tick, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown_per_tick, "true")}
        <div className="row">
          <div className="col-2">
            Total Damage
          </div>
        </div>
        {renderVariableDamageInstances(ability.damage.instances, ability.damage.instance_name )}
      </React.Fragment>
    );
  }

  const renderVariableDamageInstances = (instances, instance_name) => {
    return instances.map((instance) => {
      return (
        <div className="row">
          <div className="col-2">
            <div className="damage-breakdown-label">
              {`${instance.amount} ${_.capitalize(instance_name)}`}
            </div>
          </div>
          <div className="col-1">
            {instance.damage}
          </div>
        </div>
      );
    })
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
