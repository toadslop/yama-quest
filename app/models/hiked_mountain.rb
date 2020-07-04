# frozen_string_literal: true

# This model defines link between and mountains hiked.
class HikedMountain < ApplicationRecord
    belongs_to :user
    has_one :mountain
end
  