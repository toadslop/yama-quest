class AddNumberToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :number, :integer
  end
end
