class ListMountainTest < ActiveSupport::TestCase
  def teardown
    ListMountain.delete_all
    List.delete_all
  end
end
