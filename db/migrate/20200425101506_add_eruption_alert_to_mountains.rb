class AddEruptionAlertToMountains < ActiveRecord::Migration[6.0]
  def change
    add_column :mountains, :eruption_alert, :string
  end
end
