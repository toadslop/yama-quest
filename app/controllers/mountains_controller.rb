# frozen_string_literal: true
class MountainsController < ApplicationController
  def index
    @mountains = Mountain.order(:number)
  end
end
