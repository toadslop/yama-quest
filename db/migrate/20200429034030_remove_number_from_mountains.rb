class RemoveNumberFromMountains < ActiveRecord::Migration[6.0]
  def change
    remove_column :mountains, :number, :integer
  end
end
