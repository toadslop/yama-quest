class CreateListRegionMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :list_region_mountains do |t|
      t.references :list_regions
      t.references :mountains

      t.timestamps
    end
  end
end
