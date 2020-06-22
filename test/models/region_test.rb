# Frozen string literal: true

require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  test 'should have a name' do
    region = Region.new
    assert_not region.save, 'saved a region without a name'
  end

  test 'should have a unique name' do
    existing_region = Region.first
    double_region = Region.new(name: existing_region.name)
    assert_not double_region.save, 'saved a region that already exists'
  end

  test 'should retrieve mountains in the region' do
    region = Region.first
    assert region.mountains
  end
end
