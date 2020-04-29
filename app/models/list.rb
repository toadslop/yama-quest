# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.

class List < ApplicationRecord
  validates :name, presence: true
  has_many :list_mountains
  has_many :mountains, through: :list_mountains
  has_many :regions, through: :mountains
end
