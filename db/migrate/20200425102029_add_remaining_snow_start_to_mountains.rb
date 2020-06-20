# frozen_string_literal: true
class AddRemainingSnowStartToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :remaining_snow_start, :string
  end
end
