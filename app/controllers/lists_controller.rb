# frozen_string_literal: true

class ListsController < ApplicationController
  # before_action :fetch_lists, only: [:index]
  before_action :fetch_list, only: [:show]
  before_action :fetch_regions_list, only: [:show]
  before_action :fetch_geojson, only: [:show]
  before_action :fetch_map_center, only: [:show]
  before_action :fetch_map_bounds, only: [:show]
  # before_action :fetch_mountains, only: [:show]
  # before_action :fetch_regions, only: [:show]

  def index; end

  def show; end

  private

  def fetch_list
    if List.exists?(id: params[:list_name])
      # @list = localize_name(List.find(params[:id]))
      @list = List.find(params[:list_name])
    else
      redirect_to list_path(List.first)
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
