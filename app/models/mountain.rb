class Mountain < ApplicationRecord
  belongs_to :region, -> { select(:id, :name) }
  has_many :list_mountains
  has_many :lists, through: :list_mountains
end

