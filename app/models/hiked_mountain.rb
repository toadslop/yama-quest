# frozen_string_literal: true

# This model defines link between and mountains hiked.
class HikedMountain < ApplicationRecord
    belongs_to :user
    belongs_to :mountain

    validates :user, :mountain, presence: true
    validates_uniqueness_of :user_id, scope: :mountain_id

    # currently rethinking this method
    # def self.mountain_from_coordinates(coordinate_hash)
    #     latitude = coordinate_hash[:lat]
    #     longitude = coordinate_hash[:lng]
    # end

    def self.to_radians(degrees)
        degrees * Math::PI / 180
    end

    def self.coordinates_to_radians(coordinate_hash)
        {
            lng: to_radians(coordinate_hash[:lng]),
            lat: to_radians(coordinate_hash[:lat])
        }
    end

    def self.coordinates_to_km(coordinate_hash1, coordinate_hash2)
        earth_radius = 6378.137 #in km
        radian_coordinates1 = coordinates_to_radians(coordinate_hash1)
        radian_coordinates2 = coordinates_to_radians(coordinate_hash2)

        change_in_lat = radian_coordinates2[:lat] - radian_coordinates1[:lat]
        change_in_lng = radian_coordinates2[:lng] - radian_coordinates1[:lng]

        angle = Math.sin(change_in_lat/2) * Math.sin(change_in_lat/2) +
                Math.cos(radian_coordinates1[:lat] ) * Math.cos(radian_coordinates2[:lat]) *
                Math.sin(change_in_lng/2) * Math.sin(change_in_lng/2)

        angular_distance = 2 * Math.atan2(Math.sqrt(angle), Math.sqrt(1-angle))

        earth_radius * angular_distance
    end
end
  