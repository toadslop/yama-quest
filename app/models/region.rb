# frozen_string_literal: true

class Region < ApplicationRecord
  has_many :mountains
  validates :name, uniqueness: true
  validates :name, presence: true
end
