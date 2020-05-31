class ExplorerController < ApplicationController
  before_action :fetch_list, only: [:show]
  before_action :fetch_regions_list, only: [:show]
  before_action :fetch_geojson, only: [:show]
  before_action :fetch_map_center, only: [:show]
  before_action :fetch_map_bounds, only: [:show]

  def show; end

  private

  def fetch_list
    # check to see if a list was requested
    if List.exists?(name: params[:name])
      @list = List.find_by_name(params[:name])
    else
      redirect_to explorer_path(List.first)
    end
  end

  def fetch_regions_list
    # @regions_list = localize_name(@list.regions_list)
    @regions_list = @list.regions_list
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
