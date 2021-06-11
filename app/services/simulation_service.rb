class SimulationService
  attr_accessor :champion, :target, :configs

  def initialize(champion, target, configs)
    self.champion = champion
    self.target = target
    self.configs = configs
  end

  def stats
    {
      attack_damage: champion.attack_damage,
      ability_power: champion.ability_power,
      health: champion.health,
      mana: champion.mana,
      armor: champion.armor,
      magic_res: champion.mr,
      health_regen: champion.health_regen,
      mana_regen: champion.mana_regen,
      physical_vamp: champion.physical_vamp,
      omnivamp: champion.omnivamp,
      attack_speed: champion.attack_speed,
      crit_chance: champion.crit_chance,
      lethality: champion.lethality,
      armor_penetration: champion.armor_penetration,
      armor_reduction: champion.armor_reduction,
      magic_penetration: champion.magic_penetration,
      magic_reduction: champion.mr_reduction,
      attack_range: champion.attack_range,
      tenacity: champion.tenacity,
      ability_haste: champion.ability_haste,
      life_steal: champion.life_steal,
      cooldown_reduction: champion.cooldown_reduction,
      move_speed: champion.move_speed
    }
  end

  def abilities
    return [] if champion.abilities.blank?

    champion.abilities.map do |ability|
      skill_level = skill_level_for_ability(ability)

      result = {
        name: ability[:name],
        short_name: ability[:short_name]
      }

      cooldown = array_or_number(ability[:cooldown], skill_level)
      cost = array_or_number(ability[:cost], skill_level)

      result[:cooldown] = cooldown if cooldown.present?
      result[:cost] = cost if cost.present?

      if ability[:damage].present?
        if ability[:damage][:category] == "direct"
          damage = damage_for_ability(ability[:damage], skill_level)
          post_mitigation_damage = post_mitigation_damage(damage)

          result[:damage] = {
            category: "direct",
            total: total_damage(damage),
            target: total_damage(post_mitigation_damage),
            breakdown: {
              physical: damage[:physical],
              magic: damage[:magic],
              true: damage[:true]
            }
          }
        elsif ability[:damage][:category] == "variable"
          damage = damage_for_ability(ability[:damage], skill_level)
          damage_per_instance = total_damage(damage)
          min = ability[:damage][:min]
          max = ability[:damage][:max]

          damage_instances = (min..max).map do |instances|
            {
              amount: instances,
              damage: damage_per_instance * instances
            }
          end

          result[:damage] = {
            category: "variable",
            per_instance: damage_per_instance,
            target_per_instance: damage_per_instance, # TODO: change to after-mitigation damage
            breakdown: {
              physical: damage[:physical],
              magic: damage[:magic],
              true: damage[:true]
            },
            instances: damage_instances,
            target_instances: damage_instances, # TODO: change to after-mitigation damage
            instance_name: ability[:damage][:instance_name]
          }
        elsif ability[:damage][:category] == "dot"
          damage = damage_for_ability(ability[:damage], skill_level)
          damage_per_tick = total_damage(damage)
          max_ticks = ability[:damage][:max_time] / ability[:damage][:time_per_tick]

          damage_ticks = (1..max_ticks).map do |ticks|
            {
              amount: ticks,
              damage: damage_per_tick * ticks
            }
          end

          result[:damage] = {
            category: "dot",
            per_tick: damage_per_tick,
            target_per_tick: damage_per_tick, # TODO: change to after-mitigation damage
            breakdown: {
              physical: damage[:physical],
              magic: damage[:magic],
              true: damage[:true]
            },
            ticks: damage_ticks,
            target_ticks: damage_ticks # TODO: change to after-mitigation damage
          }
        elsif ability[:damage][:category] == "empowered_aa"
          damage = damage_for_ability(ability[:damage], skill_level)
          extra_damage = total_damage(damage)
          total_damage = attack_damage + extra_damage

          result[:damage] = {
            category: "empowered_aa",
            extra: total_damage(damage),
            target_extra: total_damage(damage), # TODO: change to after-mitigation damage
            breakdown: {
              physical: damage[:physical],
              magic: damage[:magic],
              true: damage[:true]
            },
            total: total_damage,
            target_total: total_damage # TODO: change to after-mitigation damage
          }
        end
      end

      if ability[:shield].present?
        shield = add_scalings(ability[:shield], skill_level)

        result[:shield] = {
          value: shield
        }
      end

      if ability[:heal].present?

      end

      if ability[:slow].present?

      end

      if ability[:move_speed].present?

      end

      result
    end
  end

  private

  # if the ability is part of another such as Q1 or Q2,
  # it should have a skill_from field which determines which skill to take its level from
  # otherwise, just use the short_name to determine the skill's level
  # TODO: add error checking to ensure the skill level is present in case of bad data
  def skill_level_for_ability(ability)
    if ability.key?(:skill_from)
      champion.skill_levels[ability[:skill_from].downcase.to_sym]
    elsif ability.key?(:short_name) && ["q", "w", "e", "r"].include?(ability[:short_name].downcase)
      champion.skill_levels[ability[:short_name].downcase.to_sym]
    else
      0
    end
  end

  def total_damage(ability_damage)
    ability_damage[:physical] + ability_damage[:magic] + ability_damage[:true]
  end

  # receives the damage portion of an ability hash
  def damage_for_ability(ability_damage, skill_level)
    {
      physical: damage_if_type_present(ability_damage, skill_level, :physical),
      magic: damage_if_type_present(ability_damage, skill_level, :magic),
      true: damage_if_type_present(ability_damage, skill_level, :true)
    }
  end

  def damage_if_type_present(ability_damage, skill_level, damage_type)
    ability_damage[damage_type].present? ? add_scalings(ability_damage[damage_type], skill_level) : 0
  end

  def add_scalings(ability_values, skill_level)
    value_for_scaling(ability_values, skill_level, :base) +
    value_for_scaling(ability_values, skill_level, :ap_scaling) +
    value_for_scaling(ability_values, skill_level, :ad_scaling) +
    value_for_scaling(ability_values, skill_level, :bonus_ad_scaling) +
    value_for_scaling(ability_values, skill_level, :level_scaling)
  end

  # a scaling can be:
  # - an array, in which case the skill level is used to determine the value
  # - a fixed value, which is used directly
  # - not present for this ability, so it's zero
  def value_for_scaling(ability_values, skill_level, scaling)
    return 0 if ability_values[scaling].blank?

    case scaling
    when :base
      array_or_number(ability_values[:base], skill_level)
    when :ap_scaling
      array_or_number(ability_values[:ap_scaling], skill_level) * champion.ability_power
    when :ad_scaling
      array_or_number(ability_values[:ad_scaling], skill_level) * champion.attack_damage
    when :bonus_ad_scaling
      array_or_number(ability_values[:bonus_ad_scaling], skill_level) * champion.bonus_attack_damage
    when :level_scaling
      ability_values[:level_scaling][champion.level-1]
    else
      0
    end
  end

  # skill level may not be present when it's a passive skill, or given by an item or rune
  def array_or_number(value, skill_level)
    value.is_a?(Array) && skill_level.present? ? value[skill_level-1] : value
  end

  def post_mitigation_damage(damage)
    {
      physical: post_mitigation_physical_damage(damage[:physical]),
      magic: post_mitigation_magic_damage(damage[:magic]),
      true: damage[:true]
    }
  end

  def post_mitigation_physical_damage(damage)
    return 0 if damage.zero?

    reduced_damage(damage, target.armor, champion.armor_reduction, champion.armor_penetration)
  end

  def post_mitigation_magic_damage(damage)
    return 0 if damage.zero?

    reduced_damage(damage, target.mr, champion.mr_reduction, champion.magic_penetration)
  end

  def reduced_damage(damage, resistance, resistance_reduction, resistance_penetration)
    effective_resistance = resistance * (1 - resistance_reduction) - resistance_penetration

    if effective_resistance >= 0
      damage * (100 / (100 + effective_resistance))
    else
      damage * (2 - 100 / (100 - effective_resistance))
    end
  end
end
