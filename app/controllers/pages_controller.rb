class PagesController < ApplicationController
  def landing
    @lists = List.all
  end
end
