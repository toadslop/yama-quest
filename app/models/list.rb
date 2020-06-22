# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.
class List < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  has_many :list_mountains, -> { select(:id, :number, :mountain_id) }
  has_many :mountains, through: :list_mountains
  has_many :regions, -> { select(:id, :name) }, through: :mountains

  def regions_list
    @region_list = regions.distinct.select(:name, :id).order(:id)
  end

  def feature_collection
    geojson = {}
    geojson[:type] = 'FeatureCollection'
    geojson[:bounds] = map_bounds
    geojson[:features] = mountains.map { |mountain| mountain.geojson_feature }
    geojson
  end

  private

  def latitudes
    mountains.select(:lat).order(:lat).map { |mountain| mountain.lat }
  end

  def longitudes
    mountains.select(:lng).order(:lng).map { |mountain| mountain.lng }
  end

  def map_bounds
    lats = latitudes
    lngs = longitudes
    south_bound = lats.last
    north_bound = lats.first
    west_bound = lngs.first
    east_bound = lngs.last
    [[east_bound, north_bound], [west_bound, south_bound]]
  end
end
