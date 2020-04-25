class AddVolcanoRankToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :volcano_rank, :string
  end
end
