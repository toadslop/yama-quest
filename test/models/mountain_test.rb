# Frozen_string_literal: true

require 'test_helper'

class MountainTest < ActiveSupport::TestCase
  def setup
    @mountain = FactoryBot.build(:mountain)
  end

  test 'should not save a mountain without a name' do
    @mountain.name = nil
    assert_not @mountain.save, 'saved a mountain without a name'
  end

  test 'should not save a mountain without a region' do
    @mountain.region = nil
    assert_not @mountain.save, 'saved a mountain without a region'
  end

  test 'should have altitude' do
    @mountain.altitude = nil
    assert_not @mountain.save, 'saved mountain without altitude'
  end

  test 'should save a mountain with name, lat, lng, region_id, and altitude' do
    assert  @mountain.save,
            'failed to save a mountain that has all required fields'
  end

  test 'should be able to be entered in multiple lists' do
    list1 = FactoryBot.create(:list)
    list2 = FactoryBot.create(:list)
    FactoryBot.create(:list_mountain, list: list1, mountain: @mountain)
    FactoryBot.create(:list_mountain, list: list2, mountain: @mountain)
    assert @mountain.lists.count >= 2
  end

  test 'should not save a duplicate mountain' do
    duplicate_mountain = Mountain.new(
      name: @mountain.name,
      altitude: @mountain.altitude,
      lat: @mountain.lat,
      lng: @mountain.lng,
      region_id: @mountain.region.id
    )

    assert_not duplicate_mountain.save, 'saved an identical mountain'
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

    assert_equal  mountain.geojson_feature, feature,
                  'geojson feature rendered incorrectly'
  end

  def teardown
    ListMountain.delete_all
    List.delete_all
    Mountain.delete_all
    Region.delete_all
  end
end
