class CreateListRegions < ActiveRecord::Migration[6.0]
  def change
    create_table :list_regions do |t|
      t.references :list, null: false, foreign_key: true
      t.references :region, null: false, foreign_key: true

      t.timestamps
    end
  end
end
