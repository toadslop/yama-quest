class ListMountainTest < ActiveSupport::TestCase
  def teardown
    ListMountain.delete_all
  end
end
