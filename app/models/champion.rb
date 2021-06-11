class Champion
  attr_accessor :name, :level, :skill_levels, :items, :runes, :configs, :stat_data, :ability_data, :item_data, :rune_data

  natural_stats = %i[crit_chance health_regen mana mana_regen move_speed attack_range]
  other_stats = %i[life_steal omnivamp physical_vamp mr_reduction lethality armor_reduction tenacity]

  def initialize(name, level = 1, skill_levels = { q: 0, w: 0, e: 0, r: 0 }, items = [], runes = {}, configs = [])
    self.name = name
    self.level = level
    self.skill_levels = skill_levels
    self.items = items
    self.runes = runes
    self.configs = configs
    self.stat_data = Data.champion_stats[name]
    self.ability_data = Data.champion_abilities[name]
    self.item_data = Data.items
    self.rune_data = Data.rune_abilities
  end

  natural_stats.each do |stat|
    define_method stat do
      champion_stat(stat) + aggregate_item_stat(stat)
    end
  end

  other_stats.each do |stat|
    define_method stat do
      aggregate_item_stat(stat)
    end
  end

  def aggregate_item_stat(stat)
    items.reduce(0) { |sum, item| sum + item_stat(item, stat) }
  end

  def item_stat(item, stat)
    item_data[item][stat] || 0
  end

  def abilities
    champion_abilities + item_abilities + rune_abilities
  end

  def champion_abilities
    ability_data
  end

  def item_abilities
    []
  end

  def rune_abilities
    new_rune_abilities = []

    runes.values.each do |rune|
      if rune_data[rune] && rune_data[rune].key?(:ability)
        ability = Hash.new

        ability[:name] = rune
        ability[:short_name] = ''

        if rune_data[rune][:ability].key?(:damage)
          ability[:damage] = rune_data[rune][:ability][:damage]
          ability[:damage][adaptive_damage_type] = ability[:damage].delete(:adaptive) if ability[:damage].key?(:adaptive)
        end

        new_rune_abilities << ability
      end
    end

    new_rune_abilities
  end

  def adaptive_damage_type
    bonus_attack_damage > ability_power ? :physical : :magic
  end

  def ability_haste
    aggregate_item_stat(:ability_haste) + ability_haste_from_runes
  end

  def ability_haste_from_runes
    ah = runes.values.count("Ability Haste") * 8

    ah += 5 if has_rune? "Transcendence" && level >= 5
    ah += 5 if has_rune? "Transcendence" && level >= 8

    ah
  end

  # flat, also assuming no items give flat pen anymore
  def armor_penetration
    armor_pen_from_lethality + armor_pen_from_runes
  end

  def armor_pen_from_lethality
    lethality * (0.6 + 0.4 * level / 18)
  end

  def armor_pen_from_runes
    sudden_impact_active = value_for_config("sudden_impact_active")

    if sudden_impact_active.present? && sudden_impact_active[:value]
      7
    else
      0
    end
  end

  def magic_penetration
    aggregate_item_stat(:magic_penetration) + magic_pen_from_runes
  end

  def magic_pen_from_runes
    sudden_impact_active = value_for_config("sudden_impact_active")

    if sudden_impact_active.present? && sudden_impact_active[:value]
      6
    else
      0
    end
  end

  def value_for_config(value_id)
    configs.select { |config| config[:value_id] == value_id }.first
  end

  # TODO: missing ad from adaptive force
  def bonus_attack_damage
    aggregate_item_stat(:attack_damage)
  end

  def adaptive_force
    aggregate_item_stat(:adaptive_force) + adaptive_force_from_runes
  end

  def adaptive_force_from_runes
    af = runes.values.count("Adaptive Force") * 9

    eyeballs = value_for_config("eyeballs")
    af += eyeballs * 2 if eyeballs.present? && eyeballs[:value] > 0

    ghost_poros = value_for_config("ghost_poros")
    af += ghost_poros * 2 if ghost_poros.present? && ghost_poros[:value] > 0

    zombie_wards = value_for_config("zombie_wards")
    af += zombie_wards * 2 if zombie_wards.present? && zombie_wards[:value] > 0

    if has_rune? "Gathering Storm"
      # TODO: needs game time config
      af += 0
    end

    af
  end

  def summoner_spell_haste
    if has_rune? "Cosmic Insight"
      18
    else
      0
    end
  end

  def item_haste
    if has_rune? "Cosmic Insight"
      10
    else
      0
    end
  end

  def ability_power_before_adaptive_force
    aggregate_item_stat(:ability_power)
  end

  def attack_damage_before_adaptive_force
    champion_stat(:attack_damage) + aggregate_item_stat(:attack_damage)
  end

  def ability_power
    if ability_power_before_adaptive_force > attack_damage_before_adaptive_force
      ability_power_before_adaptive_force + adaptive_force
    else
      ability_power_before_adaptive_force
    end
  end

  def attack_damage
    if attack_damage_before_adaptive_force > ability_power_before_adaptive_force
      attack_damage_before_adaptive_force + adaptive_force * 0.6
    else
      attack_damage_before_adaptive_force
    end
  end

  def base_attack_speed
    stat_data[:base][:attack_speed]
  end

  def attack_speed_growth_for_level
    stat_data[:growth][:attack_speed] * (level - 1) * (0.7025 + 0.0175 * (level - 1))
  end

  def attack_speed_from_runes
    runes.values.count("Attack Speed") * 0.1
  end

  def attack_speed
    base_attack_speed * (1 + (attack_speed_growth_for_level + aggregate_item_stat(:attack_speed) + attack_speed_from_runes) / 100)
  end

  def has_rune?(rune)
    runes.values.include?(rune)
  end

  def health
    champion_stat(:health) + bonus_health
  end

  def bonus_health
    aggregate_item_stat(:health) + health_from_runes
  end

  def health_from_runes
    if has_rune? "Health"
      [15, 19.41, 23.82, 28.24, 32.65, 37.06, 41.47, 45.88, 50.29, 54.71, 59.12, 63.54, 67.94, 72.35, 76.76, 81.18, 85.59, 90][level-1]
    else
      0
    end
  end

  def armor
    champion_stat(:armor) + aggregate_item_stat(:armor) + armor_from_runes
  end

  def bonus_armor
    aggregate_item_stat(:armor) + armor_from_runes
  end

  def mr
    champion_stat(:armor) + aggregate_item_stat(:armor) + mr_from_runes
  end

  def bonus_mr
    aggregate_item_stat(:armor) + mr_from_runes
  end

  def armor_from_runes
    runes.values.count("Armor") * 6
  end

  def mr_from_runes
    runes.values.count("Magic Resist") * 8
  end

  # if the stat has growth, use the growth formula, otherwise return the base stat
  def champion_stat(stat)
    if stat_data[:growth][stat].present?
      stat_for_level(stat_data[:base][stat], stat_data[:growth][stat])
    else
      stat_data[:base][stat]
    end
  end

  # growth formula
  def stat_for_level(base, growth)
    base + growth * (level - 1) * (0.7025 + 0.0175 * (level - 1))
  end

  def cooldown_reduction
    ability_haste / (ability_haste + 100)
  end

  def effective_health
    {
      physical: effective_health_vs_physical,
      magic: effective_health_vs_magic,
      mixed: effective_health_mixed
    }
  end

  def effective_health_vs_physical
    health * (1 + armor / 100)
  end

  def effective_health_vs_magic
    health * (1 + mr / 100)
  end

  # what ratio to use?
  def effective_health_mixed
    0
  end
end
