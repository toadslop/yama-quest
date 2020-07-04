class CreateHikedMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :hiked_mountains do |t|
      t.references :user, null: false, foreign_key: true
      t.references :mountain, null: false, foreign_key: true

      t.timestamps
    end
  end
end
