class ListMountain < ApplicationRecord
  belongs_to :list
  belongs_to :mountain
  has_one :region, through: :mountain
end
