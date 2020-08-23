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
        degrees.to_f * Math::PI / 180
    end

    def self.coordinates_to_radians(coordinate_hash)
        {
            lng: to_radians(coordinate_hash[:lng]),
            lat: to_radians(coordinate_hash[:lat])
        }
    end

    def self.coordinates_to_km(coordinate_hash1, coordinate_hash2)
        earth_radius = 6371 #in km
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

    def self.summitted_mountain?(distance_from_summit)
        distance_from_summit <= 0.25
    end

    # todo:
    # open and parse gpx file method (just xml, use nokogiri)
    # get northernmost and southermost latitudes
    # get easternmost and westernmost longitudes
    # query database, get all mountains that fall within those boundaries
    # for each mountain, see if at least 1 of the submitted coordinates is within 500 meters of it's summit
    # register each mountain as a new HikedMountain for the user

end
  