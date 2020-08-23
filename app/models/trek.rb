# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    has_one :gpx
    validates :name, presence: true
end
  