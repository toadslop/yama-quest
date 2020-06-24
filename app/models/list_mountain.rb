# frozen_string_literal: true

# This model is the join table for lists and mountains.
class ListMountain < ApplicationRecord
  belongs_to :list
  belongs_to :mountain, -> { select(:id, :name, :region_id) }
  has_one :region, through: :mountain

  validates_uniqueness_of :list_id, scope: :mountain_id
end
