class ChampionBuild
  attr_accessor :champion, :items

  natural_stats = %i[attack_damage attack_speed crit_chance life_steal ability_power health health_regen mana mana_regen armor mr move_speed]
  item_stats = %i[ability_power ability_haste life_steal]

  def stats
    {
      attackDamage: attack_damage,
      abilityPower: ability_power,
      health: health,
      mana: mana,
      armor: armor,
      magicRes: mr,
      healthRegen: health_regen,
      manaRegen: mana_regen,
      physicalVamp: 0,
      omnivamp: 0,
      attackSpeed: attack_speed,
      critChance: crit_chance,
      lethality: 0,
      armorPenFlat: 0,
      armorPenPerc: 0,
      magicPenFlat: 0,
      magicPenPerc: 0,
      attackRange: 0,
      tenacity: 0,
      abilityHaste: ability_haste,
      lifeSteal: life_steal,
      cooldownReduction: cooldown_reduction,
      moveSpeed: move_speed
    }
  end

  def initialize(champion, level, items)
    self.champion = Champion.new(champion, level)
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

  def cooldown_reduction
    ability_haste / (ability_haste + 100)
  end
end
