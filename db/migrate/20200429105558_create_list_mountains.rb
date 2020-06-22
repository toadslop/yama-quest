# frozen_string_literal: true
class CreateListMountains < ActiveRecord::Migration[6.0]
  def change
    create_table :list_mountains do |t|
      t.integer :number
      t.references :list, null: false, foreign_key: true
      t.references :mountain, null: false, foreign_key: true

      t.timestamps
    end
  end
end
