# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    has_one :gpx
    validates :name, presence: true

    def mountains_in_bounds
        gpx_data = gpx.prepare
        p least_lat = gpx_data[:bounds][:lat_bounds][0]
        p most_lat = gpx_data[:bounds][:lat_bounds][1]
        p least_lng = gpx_data[:bounds][:lng_bounds][0]
        p most_lng = gpx_data[:bounds][:lng_bounds][1]
        Mountain.where(
            "lat > #{least_lat} AND lat < #{most_lat} AND lng > #{least_lng} AND lng < #{most_lng}"
        )
    end
end
  