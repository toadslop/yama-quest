class AddMapleSeasonEndToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :maple_season_end, :string
  end
end
