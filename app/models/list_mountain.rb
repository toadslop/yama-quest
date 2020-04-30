class ListMountain < ApplicationRecord
  belongs_to :list
  belongs_to :mountain, -> { select(:id, :name, :region_id) }
  # belongs_to :list_data, -> { select(:id, :name, :region_id) }, class_name: 'Mountain', foreign_key: 'mountain_id'
  has_one :region, through: :mountain

  def list_data
    mountain.select(:name, :region_id)
  end
end
