# Frozen_string_literal: true

require 'test_helper'

class ListTest < ActiveSupport::TestCase
  def setup
    @list = FactoryBot.create(:list_with_listmountains)
  end

  test 'should not save without a name' do
    list = List.new
    assert_not list.save, 'saved without a name'
  end

  test 'should reject saving if list name is not unique' do
    duplicate_list = FactoryBot.build(:list, name: @list.name)
    assert_not duplicate_list.save, 'saved a list without a unique name'
  end

  test 'should retrieve mountains that are in list' do
    list = List.first
    assert list.mountains
  end

  test 'should not retrieve a mountain that is not in the list' do
    mountain = FactoryBot.create(:mountain)
    assert_not_includes @list.mountains, mountain,
                        'included a mountain not in the list'
  end

  test 'should retrieve list_mountains from join table' do
    list = List.first
    assert list.list_mountains
  end

  test 'all mountains in a list should be unique' do
    ListMountain.create(list_id: List.first.id, mountain_id: Mountain.first.id)
    list_mountain = ListMountain.new(list_id: List.first.id, mountain_id: Mountain.first.id)
    assert_not list_mountain.save
  end

  def teardown
    ListMountain.delete_all
    Mountain.delete_all
    List.delete_all
  end
end
