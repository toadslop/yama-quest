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
end
