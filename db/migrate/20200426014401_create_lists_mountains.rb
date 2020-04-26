class CreateListsMountains < ActiveRecord::Migration[6.0]
  def change
    drop_table :lists_mountains
    create_table :lists_mountains do |t|
      t.references :list, null: false, foreign_key: true
      t.references :mountain, null: false, foreign_key: true

      t.timestamps
    end
  end
end
