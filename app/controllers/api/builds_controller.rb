module Api
  class BuildsController < ApiController
    def sim
      source = champion_values(:source)
      target = champion_values(:target)

      source_champion = Champion.new(source[:name], source[:level], source[:skill_levels], source[:items])
      target_champion = Champion.new(target[:name], target[:level], target[:skill_levels], target[:items])

      service = SimulationService.new(source_champion, target_champion, configs)

      champion_stats = service.stats.transform_keys { |key| key.to_s.camelize(:lower) }
      champion_abilities = service.abilities

      render json: { stats: champion_stats, abilities: champion_abilities }, status: :ok
    end

    private

    def champion_values(subject)
      {
        name: params[subject][:build][:champion],
        level: params[subject][:build][:level].to_i,
        skill_levels: {
          q: params[subject][:build][:q_level].to_i,
          w: params[subject][:build][:w_level].to_i,
          e: params[subject][:build][:e_level].to_i,
          r: params[subject][:build][:r_level].to_i
        },
        items: params[subject][:items]
      }
    end

    def configs
      params.permit(configs: [:type, :valueId, :value])[:configs].map { |config| config.to_h }
    end
  end
end
