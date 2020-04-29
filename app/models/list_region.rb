class ListRegion < ApplicationRecord
  belongs_to :list
  belongs_to :region
  has_many :mountains, through: :region
  has_many :list_region_mountains
end
