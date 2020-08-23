class Gpx < ApplicationRecord
    belongs_to :trek
    validates :url, presence: true

    def prepare
        gpx_trkpts = load_gpx
        trkpts = parse_gpx(gpx_trkpts)
        bounds = get_bounds(trkpts)
    end

    def get_bounds(trkpts)
        lats = get_lats(trkpts)
        lngs = get_lngs(trkpts)
        {
            lat_bounds: [lats[0], lats[-1]],
            lng_bounds: [lngs[0], lngs[-1]]
        }
    end

    def parse_gpx(gpx_trkpts)
        gpx = load_gpx
        gpx.map do |trkpt|
            {
                lng: trkpt.attributes["lat"].value,
                lat: trkpt.attributes["lon"].value
            }
        end
    end

    def load_gpx
        gpx = Nokogiri::XML(File.open(url))
        gpx.search('trkpt')
    end

    def get_lats(trkpts)
        trkpts.map { |trkpt| trkpt[:lat] }.sort!
    end

    def get_lngs(trkpts)
        trkpts.map { |trkpt| trkpt[:lng] }.sort!
    end
  end
  