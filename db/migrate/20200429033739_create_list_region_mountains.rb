class CreateListRegionMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :list_region_mountains do |t|
      t.references :list_region, null: false, foreign_key: true
      t.references :mountain, null: false, foreign_key: true
      t.integer :number

      t.timestamps
    end
  end
end
