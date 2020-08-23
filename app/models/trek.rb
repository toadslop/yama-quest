# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    validates :name, presence: true

    def self.prepare_gpx(gpx_url)
        gpx_trkps = Trek.get_gpx_trkpts(gpx_url)
        coord_array = Trek.get_coord_array(gpx_trkps)
        puts coord_array
    end

    def self.get_coord_array(gpx_trkpts)
        gpx_trkpts.map do |trkpt|
            {
                lng: trkpt.attributes["lat"].value,
                lat: trkpt.attributes["lon"].value
            }
        end
    end

    def self.get_gpx_trkpts(gpx_url)
        gpx = Nokogiri::XML(File.open(gpx_url))
        gpx.search('trkpt')
    end

    def self.get_lat_array(trkpts)
        trkpts.map { |trkpt| trkpt.attributes["lat"].value }.sort!
    end

    def self.get_lat_array(trkpts)
        trkpts.map { |trkpt| trkpt.attributes["lon"].value }.sort!
    end
  end
  