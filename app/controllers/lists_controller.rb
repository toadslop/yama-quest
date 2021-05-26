# frozen_string_literal: true

# Controls the pages that display mountain lists
class ListsController < ApplicationController
  def index
    @lists = List.all
  end
end
