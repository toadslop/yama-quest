class Mountain < ApplicationRecord
  belongs_to :region
  has_many :lists_mountains
  has_many :lists, through: :lists_mountains
end
