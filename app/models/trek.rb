# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    validates :name, presence: true

    def self.prepare_gpx(gpx_url)
        trkps = Trek.get_gpx_trkpts(gpx_url)
        lat_array = Trek.get_lat_array(trkps)
        lng_array = Trek.get_lat_array(trkps)
    end

    def self.get_gpx_trkpts(gpx_url)
        gpx = Nokogiri::XML(File.open(gpx_url))
        gpx.search('trkpt')
    end

    def self.get_lat_array(trkpts)
        trkpts.map do |trkpt| 
            trkpt.attributes["lat"].value
        end
    end

    def self.get_lat_array(trkpts)
        trkpts.map do |trkpt| 
            trkpt.attributes["lon"].value
        end
    end
  end
  