# frozen_string_literal: true

# This model defines link between and mountains hiked.
class HikedMountain < ApplicationRecord
    belongs_to :user
    belongs_to :mountain

    validates :user, :mountain, presence: true
    validates_uniqueness_of :user_id, scope: :mountain_id

    def self.mountain_from_coordinates(coordinate_array)
        latitude = coordinate_array[0]
        longitude = coordinate_array[1]
        Mountain.where("lng >= :start_date AND created_at <= :end_date"
    end

    def self.coordinates_to_km(coordinate_array1, coordinate_array2)
        earth_radius = 6378.137 #in km
        dLat = coordinate_array2[0] * Math::PI / 180 - coordinate_array1[0] * Math::PI / 180
        dLon = coordinate_array2[1] * Math::PI / 180 - coordinate_array1[1] * Math::PI / 180
        a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1 * Math::PI / 180) * Math.cos(lat2 * Math::PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2)
        c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
        earth_radius * c
    end
end
  