import React from "react"
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'

const AbilityPanel = ({ ability }) => {

  const renderCooldown = () => {
    if (!('cooldown' in ability)) return '';

    return (
      <div className="row">
        <div className="col-6">
          Cooldown
        </div>
        <div className="col-6">
          {ability.cooldown}
        </div>
      </div>
    );
  }

  const renderResourceCost = () => {
    if (!('cost' in ability)) return '';

    return (
      <div className="row">
        <div className="col-6">
          Cost
        </div>
        <div className="col-6">
          {ability.cost}
        </div>
      </div>
    );
  }

  // TODO: refactor to just iterate over the three keys, without calling this three times
  const renderDamageIfPresent = (breakdown, damage_type) => {
    if (breakdown[damage_type] === 0) return '';

    return (
      <div className="row" style={{fontSize:'0.8rem'}}>
        <div className="col-6">
          <div className="damage-breakdown-label">
            {_.capitalize(damage_type)}
          </div>
        </div>
        <div className="col-6">
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

    } else if (ability.damage.category === "dot") {
      return renderDotDamage();

    } else if (ability.damage.category === "empowered_aa") {
      return renderEmpoweredAaDamage();
    }
  }

  const renderDirectDamage = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            Damage
          </div>
          <div className="col-6">
            {ability.damage.total}
          </div>
        </div>
        {renderDamageIfPresent(ability.damage.breakdown, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown, "true")}
        <div className="row">
          <div className="col-6">
            Damage to Target
          </div>
          <div className="col-6">
            {ability.damage.target.toFixed(1)}
          </div>
        </div>
      </React.Fragment>
    );
  }

  const renderVariableDamage = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            Damage per Instance
          </div>
          <div className="col-1">
            {ability.damage.per_instance}
          </div>
        </div>
        {renderDamageIfPresent(ability.damage.breakdown, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown, "true")}
        <div className="row">
          <div className="col-3">
            Damage per Instance to Target
          </div>
          <div className="col-1">
            {ability.damage.target_per_instance}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            Total Damage
          </div>
        </div>
        {renderVariableDamageInstances(ability.damage.instances, _.capitalize(ability.damage.instance_name) )}
        <div className="row">
          <div className="col-3">
            Total Damage to Target
          </div>
        </div>
        {renderVariableDamageInstances(ability.damage.target_instances, _.capitalize(ability.damage.instance_name) )}
      </React.Fragment>
    );
  }

  const renderVariableDamageInstances = (instances, instance_name) => {
    return instances.map((instance) => {
      return (
        <div className="row">
          <div className="col-3">
            <div className="damage-breakdown-label">
              {`${instance.amount} ${instance_name}`}
            </div>
          </div>
          <div className="col-1">
            {instance.damage}
          </div>
        </div>
      );
    })
  }

  const renderDotDamage = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            Damage per Tick
          </div>
          <div className="col-1">
            {ability.damage.per_tick}
          </div>
        </div>
        {renderDamageIfPresent(ability.damage.breakdown, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown, "true")}
        <div className="row">
          <div className="col-3">
            Damage per Tick to Target
          </div>
          <div className="col-1">
            {ability.damage.target_per_tick}
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            Total Damage
          </div>
        </div>
        {renderVariableDamageInstances(ability.damage.ticks, "ticks")}
        <div className="row">
          <div className="col-3">
            Total Damage to Target
          </div>
        </div>
        {renderVariableDamageInstances(ability.damage.target_ticks, "ticks")}
      </React.Fragment>
    );
  }

  const renderEmpoweredAaDamage = () => {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-6">
            Extra Damage
          </div>
          <div className="col-6">
            {ability.damage.extra}
          </div>
        </div>
        {renderDamageIfPresent(ability.damage.breakdown, "physical")}
        {renderDamageIfPresent(ability.damage.breakdown, "magic")}
        {renderDamageIfPresent(ability.damage.breakdown, "true")}
        <div className="row">
          <div className="col-6">
            Extra Damage to Target
          </div>
          <div className="col-6">
            {ability.damage.target_extra}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            Total Damage (+ AA)
          </div>
          <div className="col-6">
            {ability.damage.total}
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            Total Damage to Target (+ AA)
          </div>
          <div className="col-6">
            {ability.damage.target_total}
          </div>
        </div>
      </React.Fragment>
    );
  }

  const renderShield = () => {
    if (!('shield' in ability)) return '';

    return (
      <div className="row">
        <div className="col-3">
          Shield
        </div>
        <div className="col-1">
          {ability.shield.value}
        </div>
      </div>
    );
  }

  const renderShortName = () => {
    if (!!ability.short_name) {
      return `(${ability.short_name})`;
    } else {
      return '';
    }
  }

  return (
    <div className="ability-panel">
      <div className="row">
        <strong>{ability.name} {renderShortName()}</strong>
      </div>
      {renderCooldown()}
      {renderResourceCost()}
      {renderDamage()}
      {renderShield()}
    </div>
  );
}

export default AbilityPanel
