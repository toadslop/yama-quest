# frozen_string_literal: true

# this class is for routing to all static pages
class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :landing

  def landing; end
end
