# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.

class List < ApplicationRecord
  validates :name, presence: true
  has_many :list_regions
  has_many :regions, through: :list_regions
  has_many :list_region_mountains, through: :list_regions
  has_many :mountains, through: :list_region_mountains
end
