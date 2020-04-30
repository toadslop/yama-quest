# frozen_string_literal: true

# This class defines lists of mountains, like the 100 famous mountains.

class List < ApplicationRecord
  validates :name, presence: true
  has_many :list_mountains, -> { select(:id, :number, :mountain_id) }
  has_many :mountains, -> { select(:name, :region_id) }, through: :list_mountains
  has_many :regions, -> { select(:id, :name) }, through: :mountains

  def sidebar_data
    list_mountains.includes(:mountain).includes(:region)
  end
end
