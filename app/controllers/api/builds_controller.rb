module Api
  class BuildsController < ApiController
    def sim
      puts params
      render json: { success: "success!" }, status: :ok
    end
  end
end
