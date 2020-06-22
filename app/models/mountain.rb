# frozen_string_literal: true

class Mountain < ApplicationRecord
  belongs_to :region, -> { select(:id, :name) }
  has_many :list_mountains
  has_many :lists, through: :list_mountains
  validates_associated :region
  validates :name, :altitude, :lat, :lng, presence: true

  # This returns the data necessary to render a feature as a point on mapbox map.
  def geojson_feature
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: name,
        region_id: region_id,
        description: {
          altitude: altitude,
          terrain: terrain_diff,
          effort: physical_diff,
          length: length,
          img_url: img_url
        }
      }
    }
  end
end
