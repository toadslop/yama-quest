# frozen_string_literal: true

# This is the controller for the Exploror react app.
# This app is an interactive map for displaying the locations of
# mountains, as well as popups with information displayed by clicking
# the mountain icons.
class ExplorerController < ApplicationController
  before_action :fetch_list, only: [:show]
  before_action :fetch_regions_list, only: [:show]
  before_action :fetch_geojson, only: [:show]
  before_action :fetch_map_center, only: [:show]
  before_action :fetch_map_bounds, only: [:show]

  def show; end

  private

  # This function gets the list from the params.
  def fetch_list
    # Check to see if the requested list exists.
    # If not, just get the first one.
    @list = if List.exists?(name: params[:list_name])
              List.find_by_name(params[:list_name])
            else
              List.first
            end
  end

  # This function gets a list of the regions that contain mountains
  # from this list. This content is displayed in the sidebar of the
  # explorer app.
  def fetch_regions_list
    @regions_list = @list.regions_list
  end

  # this returns a hash containing all the information needed to display
  # the list of mountains on the map -- names, coordinates, the bounds
  # of the map, difficulty, image url, etc.
  def fetch_geojson
    @geojson = @list.feature_collection
  end

  # this is no longer used because we use a bounding box now instead of
  # a map center and zoom. However, this could be useful in the future
  # so for now it's left in place.
  def fetch_map_center
    @map_center = @list.map_center
  end

  # This returns an array containing two arrays. Each of the arrays contains
  # longitude and latitude coordinates.
  # example: [[northernmost, easternmoest], [southernmost, westernmost]]
  def fetch_map_bounds
    @map_bounds = @list.map_bounds
  end
end
