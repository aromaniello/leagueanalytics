class SimulationService
  attr_accessor :champion, :items

  natural_stats = %i[attack_damage attack_speed crit_chance life_steal ability_power health health_regen mana mana_regen armor mr move_speed]
  item_stats = %i[ability_power ability_haste life_steal]

  def initialize(champion, level, skill_levels, items)
    puts "SimulationService champion #{champion} (#{champion.class}), level #{level} (#{level.class}), skill levels #{skill_levels} (#{skill_levels[:q].class}), items #{items} (#{items.first.class})"
    self.champion = Champion.new(champion, level, skill_levels)
    self.items = ItemBuild.new(items)
  end

  def stats
    {
      attack_damage: attack_damage,
      ability_power: ability_power,
      health: health,
      mana: mana,
      armor: armor,
      magic_res: mr,
      health_regen: health_regen,
      mana_regen: mana_regen,
      physical_vamp: 0,
      omnivamp: 0,
      attack_speed: attack_speed,
      crit_chance: crit_chance,
      lethality: 0,
      armor_pen_flat: 0,
      armor_pen_perc: 0,
      magic_pen_flat: 0,
      magic_pen_perc: 0,
      attack_range: 0,
      tenacity: 0,
      ability_haste: ability_haste,
      life_steal: life_steal,
      cooldown_reduction: cooldown_reduction,
      move_speed: move_speed
    }
  end

  def abilities
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
        damage = damage_for_ability(ability[:damage], skill_level)

        result[:damage] = {
          total: total_damage(damage),
          target: total_damage(damage), # TODO: change to after-mitigation damage
          breakdown: {
            physical: damage[:physical],
            magic: damage[:magic],
            true: damage[:true]
          }
        }
      end

      if ability[:shield].present?
        shield = add_scalings(ability[:shield], skill_level)

        result[:shield] = {
          value: shield
        }
      end

      if ability[:heal].present?

      end

      if ability[:move_speed].present?

      end

      result
    end
  end

  private

  natural_stats.each do |stat|
    define_method stat do
      champion.send(stat) + items.send(stat)
    end
  end

  item_stats.each do |stat|
    define_method stat do
      items.send(stat)
    end
  end

  def bonus_attack_damage
    items.attack_damage
  end

  # if the ability is part of another such as Q1 or Q2,
  # it should have a skill_from field which determines which skill to take its level from
  # otherwise, just use the short_name to determine the skill's level
  # TODO: add error checking to ensure the skill level is present in case of bad data
  def skill_level_for_ability(ability)
    if ability[:skill_from].present?
      champion.skill_levels[ability[:skill_from].downcase.to_sym]
    elsif ["q", "w", "e", "r"].include? ability[:short_name].downcase
      champion.skill_levels[ability[:short_name].downcase.to_sym]
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
    puts "add_scalings"
    puts skill_level
    puts ability_values
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
      array_or_number(ability_values[:ap_scaling], skill_level) * ability_power
    when :ad_scaling
      array_or_number(ability_values[:ad_scaling], skill_level) * attack_damage
    when :bonus_ad_scaling
      array_or_number(ability_values[:ad_scaling], skill_level) * bonus_attack_damage
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

  def cooldown_reduction
    ability_haste / (ability_haste + 100)
  end
end
