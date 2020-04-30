class ListMountain < ApplicationRecord
  belongs_to :list
  belongs_to :mountain, -> { select(:id, :name, :region_id) }
  has_one :region, through: :mountain
end
