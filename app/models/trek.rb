# frozen_string_literal: true

class Trek < ApplicationRecord
    belongs_to :user
    validates :name, presence: true

    def parse_gpx(gpx_filepath)
    end
  end
  