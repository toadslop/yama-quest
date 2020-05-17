FEATURE_TEMPLATE = {
  type: '',
  geometry: {
    type: '',
    coordinates: [0, 0]
  },
  properties: {
    title: '',
    description: ''
  }
}

class Mountain < ApplicationRecord
  belongs_to :region, -> { select(:id, :name) }
  has_many :list_mountains
  has_many :lists, through: :list_mountains

  def geojson_feature
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: name,
        description: name
      }
    }
  end
end
