#F rozen string literal: true

require 'test_helper'

class RegionTest < ActiveSupport::TestCase
  test 'should have a unique name' do
    existing_region = Region.first
    double_region = Region.new(name: existing_region.name)
    assert_not double_region.save, 'saved a region that already exists'
  end
end
