class CreateGpxs < ActiveRecord::Migration[6.0]
  def change
    create_table :gpxes do |t|
      t.string :url
      t.references :trek, null: false, foreign_key: true
    end
  end
end
