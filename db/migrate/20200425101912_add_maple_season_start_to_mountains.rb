# frozen_string_literal: true
class AddMapleSeasonStartToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :maple_season_start, :string
  end
end
