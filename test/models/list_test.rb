# Frozen_string_literal: true

require 'test_helper'

class ListTest < ActiveSupport::TestCase
  test 'should not save without a name' do
    list = List.new
    assert_not list.save, 'saved without a name'
  end

  test 'should reject saving if list name is not unique' do
    list = List.first
    duplicate_list = List.new(name: list.name)
    assert_not duplicate_list.save, 'saved a list without a unique name'
  end

  test 'should retrieve mountains that are in list' do
    list = List.first
    assert list.mountains
  end

  test 'should retrieve list_mountains from join table' do
    list = List.first
    assert list.list_mountains
  end
end
