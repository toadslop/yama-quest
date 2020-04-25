class CreateMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :mountains do |t|
      t.integer :number
      t.string :name
      t.string :region
      t.integer :altitude
      t.string :terraint_diff
      t.string :physical_diff
      t.string :length
      t.string :url

      t.timestamps
    end
  end
end
