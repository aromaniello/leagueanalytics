module Api
  class BuildsController < ApiController
    def sim
      puts params
      name = params[:build][:champion]
      level = params[:build][:level].to_i

      champion = Champion.new(name, level)

      results = {
        stats: champion.stats,
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
