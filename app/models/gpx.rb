class GPX < ApplicationRecord
    belongs_to :trek
    validates :url, presence: true

    def prepare_gpx(gpx_url)
        gpx_trkps = Trek.get_gpx_trkpts(gpx_url)
        coord_array = Trek.get_coord_array(gpx_trkps)
        puts coord_array
    end

    def get_coord_array(gpx_trkpts)
        gpx_trkpts.map do |trkpt|
            {
                lng: trkpt.attributes["lat"].value,
                lat: trkpt.attributes["lon"].value
            }
        end
    end

    def get_trip_bounds
    end

    def get_gpx_trkpts(gpx_url)
        gpx = Nokogiri::XML(File.open(gpx_url))
        gpx.search('trkpt')
    end

    def get_lat_array(trkpts)
        trkpts.map { |trkpt| trkpt.attributes["lat"].value }.sort!
    end

    def get_lat_array(trkpts)
        trkpts.map { |trkpt| trkpt.attributes["lon"].value }.sort!
    end
  end
  