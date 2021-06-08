module Api
  class BuildsController < ApiController
    def sim
      name = params[:build][:champion]
      level = params[:build][:level].to_i
      skill_levels = {
        q: params[:build][:q_level].to_i,
        w: params[:build][:w_level].to_i,
        e: params[:build][:e_level].to_i,
        r: params[:build][:r_level].to_i
      }
      items = params[:items]

      champion_build = ChampionBuild.new(name, level, skill_levels, items)
      champion_stats = champion_build.stats.transform_keys { |key| key.to_s.camelize(:lower) }
      champion_abilities = champion_build.abilities

      render json: { stats: champion_stats, abilities: champion_abilities }, status: :ok
    end
  end
end
