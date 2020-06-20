# frozen_string_literal: true
class AddRegionToMountains < ActiveRecord::Migration[6.0]
  def change
    add_reference :mountains, :region, null: false, foreign_key: true
  end
end
