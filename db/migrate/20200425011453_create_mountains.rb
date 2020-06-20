# frozen_string_literal: true
class CreateMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :mountains do |t|
      t.integer :number
      t.string :name
      t.integer :altitude
      t.string :terrain_diff
      t.string :physical_diff
      t.string :length
      t.string :url

      t.timestamps
    end
  end
end
