class CreateListRegions < ActiveRecord::Migration[6.0]
  def change
    create_table :list_regions do |t|
      t.references :lists
      t.references :regions

      t.timestamps
    end
  end
end
