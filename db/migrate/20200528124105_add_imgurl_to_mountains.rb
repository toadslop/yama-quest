# frozen_string_literal: true
class AddImgurlToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :img_url, :string
  end
end
