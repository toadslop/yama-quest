class AddSnowSeasonEndToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :snow_season_end, :string
  end
end
