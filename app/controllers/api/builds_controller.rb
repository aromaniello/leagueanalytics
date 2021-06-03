module Api
  class BuildsController < ApiController
    def sim
      puts params
      results = {
        stats: {
          attackDamage: 95,
          abilityPower: 120,
          health: 1200,
          mana: 700,
          armor: 130,
          magicRes: 60,
          healthRegen: 5,
          manaRegen: 20,
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
        },
        abilities: [{
          name: 'Illumination',
          short_name: 'P',
          damage: 300,
          damageToTarget: 250,
          damageBreakdown: {
            magic: 300,
            physical: 0,
            true: 0
          }
        },
        {
          name: 'Light Binding',
          short_name: 'Q',
          damage: 500,
          damageToTarget: 350,
          damageBreakdown: {
            magic: 500,
            physical: 0,
            true: 0
          },
          cooldown: 7.5,
          resourceCost: 50
        }]
      }

      render json: results, status: :ok
    end
  end
end
