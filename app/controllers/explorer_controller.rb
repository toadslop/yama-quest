# frozen_string_literal: true

# This is the controller for the Exploror react app.
# This app is an interactive map for displaying the locations of
# mountains, as well as popups with information displayed by clicking
# the mountain icons.
class ExplorerController < ApplicationController
  before_action :fetch_list, only: [:load]
  before_action :fetch_regions_list, only: [:load]
  before_action :fetch_geojson, only: [:load]

  def load; end

  private

  def fetch_list
    @list = if List.exists?(name: params[:list_name])
              List.find_by_name(params[:list_name])
            else
              List.first
            end
  end

  def fetch_regions_list
    @regions_list = @list.regions_list
  end

  def fetch_geojson
    @geojson = @list.feature_collection
  end
end
