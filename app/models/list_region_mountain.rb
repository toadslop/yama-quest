class ListRegionMountain < ApplicationRecord
  belongs_to :list_region
  has_one :region, through: :list_region
  belongs_to :mountain
end
