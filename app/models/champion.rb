class Champion
  attr_accessor :name, :level, :data

  def initialize(name, level)
    self.name = name
    self.level = level
    self.data = Data.champions[name]
  end

  def stats
    {
      attackDamage: attack_damage,
      abilityPower: 120,
      health: health,
      mana: mana,
      armor: armor,
      magicRes: mr,
      healthRegen: health_regen,
      manaRegen: mana_regen,
      physicalVamp: 0,
      omnivamp: 0.1,
      attackSpeed: 0.63,
      critChance: 0.35,
      lethality: 20,
      armorPenFlat: 16,
      armorPenPerc: 0,
      magicPenFlat: 0,
      magicPenPerc: 0,
      attackRange: 300,
      tenacity: 0.3,
      abilityHaste: 20,
      lifeSteal: 0.05,
      cooldownReduction: 0.2,
      moveSpeed: 345
    }
  end

  def attack_damage
    value_for_stat("attack_damage")
  end

  def health
    value_for_stat("health")
  end

  def health_regen
    value_for_stat("health_regen")
  end

  def mana
    value_for_stat("mana")
  end

  def mana_regen
    value_for_stat("mana_regen")
  end

  def armor
    value_for_stat("armor")
  end

  def mr
    value_for_stat("mr")
  end

  def value_for_stat(stat)
    stat_for_level(data["base"][stat], data["growth"][stat])
  end

  def stat_for_level(base, growth)
    base + growth * (level - 1) * (0.7025 + 0.0175 * (level - 1))
  end
end
