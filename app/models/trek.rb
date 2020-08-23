# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    has_one :gpx
    validates :name, presence: true

    def process_gpx
        gpx_data = gpx.prepare
        trkpts = gpx_data[:trkpts]
        bounds = gpx_data[:bounds]
        mountains = mountains_in_bounds(bounds)
        check_summits(mountains)
    end

    def check_summits(mountains, trkpts)
        mountains.each do |mountain|
            mountain_coords = {lng: mountain.lng, lat: mountain.lat}
            trkpts.each do |trkpt|

            end
        end
    end

    def mountains_in_bounds(bounds)
        least_lat = bounds[:lat_bounds][0]
        most_lat = bounds[:lat_bounds][1]
        least_lng = bounds[:lng_bounds][0]
        most_lng = bounds[:lng_bounds][1]
        Mountain.where(
            "lat > #{least_lat} AND lat < #{most_lat} AND lng > #{least_lng} AND lng < #{most_lng}"
        )
    end
end
  