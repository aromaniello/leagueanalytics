class ChampionBuild
  attr_accessor :champion, :items

  natural_stats = %i[attack_damage attack_speed crit_chance life_steal ability_power health health_regen mana mana_regen armor mr move_speed]
  item_stats = %i[ability_power ability_haste life_steal]

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

  def initialize(champion, level, skill_levels, items)
    self.champion = Champion.new(champion, level, skill_levels)
    self.items = ItemBuild.new(items)
  end

  natural_stats.each do |stat|
    define_method :"#{stat}" do
      champion.send(stat) + items.send(stat)
    end
  end

  item_stats.each do |stat|
    define_method :"#{stat}" do
      items.send(stat)
    end
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
        ability_damage = damage_for_ability(ability[:damage], skill_level)

        puts ability_damage

        damage = {
          total: total_damage(ability_damage),
          target: total_damage(ability_damage), # TODO: change to after-mitigation damage
          breakdown: {
            physical: ability_damage[:physical],
            magic: ability_damage[:magic],
            true: ability_damage[:true]
          }
        }

        result[:damage] = damage
      end

      result
    end
  end

  # if the ability is part of another such as Q1 or Q2,
  # it should have a skill_from field which determines which skill to take its level from
  # otherwise, just use the short_name to determine the skill's level
  # TODO: add error checking to ensure the skill level is present in case of bad data
  def skill_level_for_ability(ability)
    if ability[:skill_from].present?
      champion.skill_levels[ability[:skill_from].to_sym]
    elsif ["q", "w", "e", "r"].include? ability[:short_name].downcase
      champion.skill_levels[ability[:short_name].downcase.to_sym]
    end
  end

  def total_damage(ability_damage)
    ability_damage[:physical] + ability_damage[:magic] + ability_damage[:true]
  end

  # this method receives the damage portion of an ability hash
  def damage_for_ability(ability_damage, skill_level)
    {
      physical: damage_if_type_present(ability_damage, skill_level, :physical),
      magic: damage_if_type_present(ability_damage, skill_level, :magic),
      true: damage_if_type_present(ability_damage, skill_level, :true)
    }
  end

  def damage_if_type_present(ability_damage, skill_level, damage_type)
    ability_damage[damage_type].present? ? damage_for_type(ability_damage[damage_type], skill_level) : 0
  end

  def damage_for_type(ability_damage, skill_level)
    damage_for_scaling(ability_damage, skill_level, :base) +
    damage_for_scaling(ability_damage, skill_level, :ap_scaling) +
    damage_for_scaling(ability_damage, skill_level, :ad_scaling) +
    damage_for_scaling(ability_damage, skill_level, :bonus_ad_scaling) +
    damage_for_scaling(ability_damage, skill_level, :level_scaling)
  end

  # a scaling can be:
  # - an array, in which case the skill level is used to determine the value
  # - a fixed value, which is used directly
  # - not present for this ability, so it's zero
  def damage_for_scaling(ability_damage, skill_level, scaling)
    return 0 if ability_damage[scaling].blank?

    case scaling
    when :base
      array_or_number(ability_damage[:base], skill_level)
    when :ap_scaling
      array_or_number(ability_damage[:ap_scaling], skill_level) * ability_power
    when :ad_scaling
      array_or_number(ability_damage[:ad_scaling], skill_level) * attack_damage
    when :bonus_ad_scaling
      array_or_number(ability_damage[:ad_scaling], skill_level) * attack_damage # TODO: needs to be bonus, not implemented yet
    when :level_scaling
      ability_damage[:level_scaling][champion.level-1]
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
