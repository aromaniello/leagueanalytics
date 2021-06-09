import React from "react"
import PropTypes from "prop-types"
import { useSelector } from 'react-redux'

const StatsPanel = ({ stats }) => {
  const numberToPercentage = n => `${(n*100).toFixed(1)} %`;

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-2">
          Attack Damage
        </div>
        <div className="col-1">
          {stats.attackDamage.toFixed(1)}
        </div>

        <div className="col-2">
          Life Steal
        </div>
        <div className="col-1">
          {numberToPercentage(stats.lifeSteal)}
        </div>

        <div className="col-2">
          Health
        </div>
        <div className="col-1">
          {stats.health.toFixed(0)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Attack Speed
        </div>
        <div className="col-1">
          {stats.attackSpeed.toFixed(2)}
        </div>

        <div className="col-2">
          Physical Vamp
        </div>
        <div className="col-1">
          {numberToPercentage(stats.physicalVamp)}
        </div>

        <div className="col-2">
          Health Regen
        </div>
        <div className="col-1">
          {stats.healthRegen.toFixed(1)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Critical Strike Chance
        </div>
        <div className="col-1">
          {numberToPercentage(stats.critChance)}
        </div>

        <div className="col-2">
          Omnivamp
        </div>
        <div className="col-1">
          {numberToPercentage(stats.omnivamp)}
        </div>

        <div className="col-2">
          Mana
        </div>
        <div className="col-1">
          {stats.mana.toFixed(0)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Lethality
        </div>
        <div className="col-1">
          {stats.lethality}
        </div>

        <div className="col-2">
          Ability Haste
        </div>
        <div className="col-1">
          {stats.abilityHaste}
        </div>

        <div className="col-2">
          Mana Regen
        </div>
        <div className="col-1">
          {stats.manaRegen.toFixed(1)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Armor Pen (Flat)
        </div>
        <div className="col-1">
          {stats.armorPenFlat}
        </div>

        <div className="col-2">
          Cooldown Reduction
        </div>
        <div className="col-1">
          {numberToPercentage(stats.cooldownReduction)}
        </div>

        <div className="col-2">
          Armor
        </div>
        <div className="col-1">
          {stats.armor.toFixed(2)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Armor Pen (%)
        </div>
        <div className="col-1">
          {numberToPercentage(stats.armorPenPerc)}
        </div>

        <div className="col-2">
          Attack Range
        </div>
        <div className="col-1">
          {stats.attackRange}
        </div>

        <div className="col-2">
          Magic Res
        </div>
        <div className="col-1">
          {stats.magicRes}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Ability Power
        </div>
        <div className="col-1">
          {stats.abilityPower}
        </div>

        <div className="col-2">
          Tenacity
        </div>
        <div className="col-1">
          {numberToPercentage(stats.tenacity)}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Magic Pen (Flat)
        </div>
        <div className="col-1">
          {stats.magicPenFlat}
        </div>

        <div className="col-2">
          Move Speed
        </div>
        <div className="col-1">
          {stats.moveSpeed}
        </div>
      </div>

      <div className="row">
        <div className="col-2">
          Magic Pen (%)
        </div>
        <div className="col-1">
          {numberToPercentage(stats.magicPenPerc)}
        </div>
      </div>
    </React.Fragment>
  );
}

export default StatsPanel
