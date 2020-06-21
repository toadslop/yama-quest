# Frozen string literal: true

require 'test_helper'

class MountainTest < ActiveSupport::TestCase
  test 'should not save a mountain without a name' do
    mountain = Mountain.new(
      altitude: 2000,
      lat: 2000,
      lng: 2000,
      region_id: 1
    )
    assert_not mountain.save, 'saved a mountain without a name'
  end

  test 'should not save a mountain without a region' do
    mountain = Mountain.new(
      altitude: 2000,
      lat: 2000,
      lng: 2000,
      name: 'mountain'
    )
    assert_not mountain.save, 'saved a mountain without a region'
  end

  test 'should have altitude' do
    mountain = Mountain.new(
      name: 'mountain',
      lat: 2000,
      lng: 2000,
      region_id: 1
    )
    assert_not mountain.save, 'saved mountain without altitude'
  end

  test 'it should save a mountain with name, lat, lng, region_id, and altitude' do
    mountain = Mountain.new(
      name: 'mountain',
      lat: 2000,
      lng: 2000,
      region_id: 1,
      altitude: 2000
    )
    assert mountain.save, 'failed to save a mountain that has all required fields'
  end

  test 'it should return a proper geojson feature' do
    name = 'mountain'
    lat = 2000
    lng = 2000
    altitude = 2000
    terrain_diff = '★★'
    physical_diff = '★★'
    length = '日帰り'
    img_url = 'www.url.com'

    mountain = Mountain.new(
      name: name,
      lat: lat,
      lng: lng,
      altitude: altitude,
      terrain_diff: terrain_diff,
      physical_diff: physical_diff,
      length: length,
      img_url: img_url
  )

    feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: name,
        description: {
          altitude: altitude,
          terrain: terrain_diff,
          effort: physical_diff,
          length: length,
          img_url: img_url
        }
      }
    }

    assert_equal mountain.geojson_feature, feature, 'geojson feature rendered incorrectly'
  end
end
