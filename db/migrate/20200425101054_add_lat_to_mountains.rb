# frozen_string_literal: true
class AddLatToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :lat, :float
  end
end
