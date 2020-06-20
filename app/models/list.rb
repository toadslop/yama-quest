# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.
class List < ApplicationRecord
  validates :name, presence: true
  has_many :list_mountains, -> { select(:id, :number, :mountain_id) }
  has_many :mountains, through: :list_mountains
  has_many :regions, -> { select(:id, :name) }, through: :mountains

  def regions_list
    @region_list = regions.distinct.select(:name, :id).order(:id)
  end

  def feature_collection
    geojson = {}
    geojson[:type] = 'FeatureCollection'
    geojson[:bounds] = bounds(mountains)
    geojson[:features] = mountains.map do |mountain|
      mountain.geojson_feature
    end
    geojson
  end

  def latitudes
    mountains.select(:lat).order(:lat).map { |mountain| mountain.lat }
  end

  def longitudes
    mountains.select(:lng).order(:lng).map { |mountain| mountain.lng }
  end

  def midpoint(num_array)
    (num_array.first + num_array.last) / 2
  end

  def map_center
    { lat: midpoint(latitudes), lng: midpoint(longitudes) }
  end

  def map_bounds
    lats = mountains.select(:lat).order(:lat)
    lngs = mountains.select(:lng).order(:lng)
    south_bound = lats.last.lat
    north_bound = lats.first.lat
    west_bound = lngs.first.lng
    east_bound = lngs.last.lng
    {
      northeast: [east_bound, north_bound],
      southwest: [west_bound, south_bound]
    }
  end

  def region_mountains(region_id)
    mountains.where(region_id: region_id)
  end

  def bounds(mountain_set)
    lats = mountain_set.select(:lat).order(:lat)
    lngs = mountain_set.select(:lng).order(:lng)
    south_bound = lats.last.lat
    north_bound = lats.first.lat
    west_bound = lngs.first.lng
    east_bound = lngs.last.lng
    [[east_bound, north_bound], [west_bound, south_bound]]
  end

  def sub_map_data(region_id)
    mountain_set = region_mountains(region_id)
    map_data = GEOJSON_TEMPLATE
    map_data[:type] = 'FeatureCollection'
    map_data[:bounds] = bounds(mountain_set)
    map_data[:features] = mountain_set.map { |mountain| mountain.geojson_feature }
    map_data
  end
end
