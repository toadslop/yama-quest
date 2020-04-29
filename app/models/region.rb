class Region < ApplicationRecord
  has_many :mountains
  has_many :list_regions
end
