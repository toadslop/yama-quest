# Frozen_string_literal: true

require 'test_helper'

class MountainTest < ActiveSupport::TestCase
  def setup
    @mountain = FactoryBot.create(:mountain)
  end

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
    region = FactoryBot.create(:region, name: '東北')
    mountain = FactoryBot.build(:mountain, name: '利尻岳')
    mountain.region_id = region.id
    assert mountain.save, 'failed to save a mountain that has all required fields'
  end

  test 'it should return a proper geojson feature' do
    name = 'mountain'
    lat = 2000.0
    lng = 2000.0
    altitude = 2000
    terrain_diff = '★★'
    physical_diff = '★★'
    length = '日帰り'
    img_url = 'www.url.com'
    region_id = 1

    mountain = Mountain.new(
      name: name,
      lat: lat,
      lng: lng,
      altitude: altitude,
      terrain_diff: terrain_diff,
      physical_diff: physical_diff,
      length: length,
      img_url: img_url,
      region_id: region_id
    )

    feature = {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lng, lat]
      },
      properties: {
        title: name,
        region_id: region_id,
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

  def teardown
    Mountain.delete_all
    Region.delete_all
  end
end
