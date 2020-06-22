# frozen_string_literal: true
class Api::V1::ListsController < ActionController::Base
  before_action :fetch_list
  before_action :fetch_region, only: [:region_geojson]

  def list_regions
    @regions_list = @list.regions_list
  end

  def fetch_geojson
    @geojson = @list.feature_collection
  end

  def fetch_map_bounds
    @map_bounds = @list.map_bounds
  end

  def region_geojson
    @geojson = @list.sub_map_data(@region.id)
  end

  private

  def fetch_list
    @list = List.find_by_name(params[:list_name])
  end

  def fetch_region
    @region = Region.find(params[:region_id])
  end
end
