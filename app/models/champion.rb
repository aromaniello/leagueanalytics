class Champion
  attr_accessor :name, :level, :data

  natural_stats = %i[attack_damage attack_speed crit_chance health health_regen mana mana_regen armor mr move_speed]
  zero_stats = %i[ability_power life_steal]

  def initialize(name, level)
    self.name = name
    self.level = level
    self.data = Data.champions[name]
  end

  natural_stats.each do |stat|
    define_method :"#{stat}" do
      value_for_stat(stat.to_s)
    end
  end

  zero_stats.each do |stat|
    define_method :"#{stat}" do
      0
    end
  end

  # if the stat has growth, use the growth formula, otherwise return the base stat
  def value_for_stat(stat)
    if data["growth"][stat].present?
      stat_for_level(data["base"][stat], data["growth"][stat])
    else
      data["base"][stat]
    end
  end

  def stat_for_level(base, growth)
    base + growth * (level - 1) * (0.7025 + 0.0175 * (level - 1))
  end
end
