# frozen_string_literal: true

# This model defines link between and mountains hiked.
class HikedMountain < ApplicationRecord
    belongs_to :user
    belongs_to :mountain

    validates :user, :mountain, presence: true
    validates_uniqueness_of :user_id, scope: :mountain_id
end
  