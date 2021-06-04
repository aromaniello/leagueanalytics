class ItemBuild
  attr_accessor :items, :data

  stats = %i[attack_damage attack_speed crit_chance life_steal ability_power health health_regen mana mana_regen armor mr move_speed]

  def initialize(items)
    self.items = items
    self.data = Data.items
  end

  def aggregate_stat(stat)
    items.reduce(0) { |sum, item| sum + stat_for_item(item, stat) }
  end

  def stat_for_item(item, stat)
    data[item][stat] || 0
  end

  # generate methods to aggregate each stat
  stats.each do |stat|
    define_method :"#{stat}" do
      aggregate_stat(stat.to_s)
    end
  end
end
