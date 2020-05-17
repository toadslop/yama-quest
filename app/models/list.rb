# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.

GEOJSON_TEMPLATE = {
  type: '',
  features: []
}

class List < ApplicationRecord
  validates :name, presence: true
  has_many :list_mountains, -> { select(:id, :number, :mountain_id) }
  has_many :mountains, through: :list_mountains #, -> { select(:name, :region_id) },
  has_many :regions, -> { select(:id, :name) }, through: :mountains

  def regions_list
    @region_list = regions.distinct.select(:name, :id).order(:id)
  end

  def feature_collection
    @collection = GEOJSON_TEMPLATE
    @collection[:type] = 'FeatureCollection'
    mountains.each do |mountain|
      @collection[:features] << mountain.geojson_feature
    end
    @collection
  end
end
