class Champion
  attr_accessor :name, :level, :skill_levels, :items, :stat_data, :ability_data, :item_data

  natural_stats = %i[attack_damage attack_speed crit_chance health health_regen mana mana_regen armor mr move_speed attack_range]
  item_stats = %i[ability_power ability_haste life_steal omnivamp physical_vamp magic_penetration mr_reduction lethality armor_reduction tenacity]

  def initialize(name, level, skill_levels, items)
    self.name = name
    self.level = level
    self.skill_levels = skill_levels
    self.items = items
    self.stat_data = Data.champion_stats[name]
    self.ability_data = Data.champion_abilities[name]
    self.item_data = Data.items
  end

  natural_stats.each do |stat|
    define_method stat do
      champion_stat(stat) + aggregate_item_stat(stat)
    end
  end

  item_stats.each do |stat|
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
    ability_data
  end

  def armor_penetration
    aggregate_item_stat(:armor_penetration) + lethality * (0.6 + 0.4 * level / 18)
  end

  def bonus_attack_damage
    aggregate_item_stat(:attack_damage)
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
