# Frozen_string_literal: true

require 'test_helper'

class ListTest < ActiveSupport::TestCase
  test 'should not save without a name' do
    list = List.new
    assert_not list.save, 'saved without a name'
  end
end