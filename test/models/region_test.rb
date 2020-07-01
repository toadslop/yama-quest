# Frozen_string_literal: true

require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  def setup
    @region = FactoryBot.create(:region)
  end

  test 'should have a name' do
    region = Region.new
    assert_not region.save, 'saved a region without a name'
  end

  test 'should have a unique name' do
    double_region = Region.new(name: @region.name)
    assert_not double_region.save, 'saved a region that already exists'
  end

  test 'should retrieve mountains in the region' do
    mountain = FactoryBot.create(:mountain, region: @region)
    assert_includes @region.mountains, mountain
  end

  test 'should not retrieve a mountain not in the region' do
    mountain = FactoryBot.create(:mountain)
    assert_not_includes @region.mountains, mountain,
                        "retrieved a mountain that doesn't belong to the region"
  end

  def teardown
    Mountain.delete_all
    Region.delete_all
  end
end
