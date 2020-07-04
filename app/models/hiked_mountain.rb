# frozen_string_literal: true

# This model defines link between and mountains hiked.
class HikedMountain < ApplicationRecord
    belongs_to :user
    belongs_to :mountain
end
  