class AddHikeSeasonEndToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :hike_season_end, :string
  end
end
