class Mountain < ApplicationRecord
  belongs_to :region
  has_many :list_region_mountains
  has_many :list_regions, through: :list_region_mountains
  has_many :lists, through: :list_regions
end
