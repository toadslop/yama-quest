class Api::V1::ListsController < ActionController::Base
  before_action :fetch_list, only: [:list_regions]
  before_action :fetch_regions_list, only: [:show]
  before_action :fetch_geojson, only: [:show]
  before_action :fetch_map_center, only: [:show]
  before_action :fetch_map_bounds, only: [:show]

  def list_regions
    @regions_list = @list.regions_list
  end

  private

  def fetch_list
    # check to see if a list was requested
    if List.exists?(name: params[:list_name])
      @list = List.find_by_name(params[:list_name])
    else
      redirect_to explorer_path(List.first)
    end
  end

  def fetch_geojson
    @geojson = @list.feature_collection
  end

  def fetch_map_center
    @map_center = @list.map_center
  end

  def fetch_map_bounds
    @map_bounds = @list.map_bounds
  end
end
