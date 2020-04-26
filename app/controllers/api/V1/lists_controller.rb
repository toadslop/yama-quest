class Api::V1::ListsController < ActionController::Base
  def show
    @list = List.find(params[:id])
    render json: @list
  end
end
