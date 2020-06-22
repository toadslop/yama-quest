# Frozen string literal: true

require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  def setup
    @region = Region.new(name: '北海道')
  end

  test 'should have a name' do
    region = Region.new
    assert_not region.save, 'saved a region without a name'
  end

  test 'should have a unique name' do
    @region.save
    double_region = Region.new(name: @region.name)
    assert_not double_region.save, 'saved a region that already exists'
  end

  test 'should retrieve mountains in the region' do
    @region.save
    assert @region.mountains
  end

  def teardown
    Region.delete_all
  end
end
