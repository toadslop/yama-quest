# frozen_string_literal: true

class ListsController < ApplicationController
  # before_action :fetch_lists, only: [:index]
  before_action :fetch_list, only: [:show]
  before_action :fetch_regions_list, only: [:show]
  # before_action :fetch_mountains, only: [:show]
  # before_action :fetch_regions, only: [:show]

  def index; end

  def show; end

  private

  # def mountains_by_region
  #   @mountains.each do |mountain|
  #     if regions.key?(mountain.region.name)
  #       regions[mountain.region.name]['mountains'] << mountain
  #     else
  #       regions[mountain.region.name] = {}
  #       regions[mountain.region.name]['id'] = mountain.region.id
  #       regions[mountain.region.name]['mountains'] = [mountain]
  #     end
  #   end
  # end

  # def fetch_lists
  #   @lists = List.all
  # end

  def fetch_list
    if List.exists?(id: params[:id])
      @list = List.find(params[:id])
    else
      redirect_to list_path(List.first)
    end
  end

  def fetch_regions_list
    @regions_list = @list.regions_list
  end

  # def fetch_regions
  #   @regions = mountains_by_region
  # end

  # def fetch_mountains
  #   @mountains = @list.mountains.includes([:region])
  # end
end
