# frozen_string_literal: true
class AddSnowSeasonStartToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :snow_season_start, :string
  end
end
