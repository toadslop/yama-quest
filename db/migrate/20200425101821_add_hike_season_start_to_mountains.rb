class AddHikeSeasonStartToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :hike_season_start, :string
  end
end
