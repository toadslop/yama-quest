# frozen_string_literal: true
class AddLngToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :lng, :float
  end
end
