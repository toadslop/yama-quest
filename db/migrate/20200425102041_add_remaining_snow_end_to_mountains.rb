class AddRemainingSnowEndToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :remaining_snow_end, :string
  end
end
