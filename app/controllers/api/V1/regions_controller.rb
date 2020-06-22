# frozen_string_literal: true
class Api::V1::RegionsController < ActionController::Base
  before_action :fetch_list, only: [:list_regions, :fetch_geojson, :fetch_map_bounds]
  before_action :fetch_regions_list, only: [:show]
  before_action :fetch_geojson, only: [:show]
  before_action :fetch_map_center, only: [:show]
  before_action :fetch_map_bounds, only: [:show]

  def list_regions
    @regions_list = @list.regions_list
  end

  def fetch_geojson
    @geojson = @list.feature_collection
  end

  def fetch_map_bounds
    @map_bounds = @list.map_bounds
  end
end