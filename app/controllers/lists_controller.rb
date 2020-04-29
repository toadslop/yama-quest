# frozen_string_literal: true

class ListsController < ApplicationController
  def index
    @lists = List.all
  end

  def show
    if List.exists?(id: params[:id])
      @list = List.find(params[:id])
      @regions = mountains_by_region(@list)
    else
      redirect_to list_path(List.first)
    end
  end

  private

  def mountains_by_region(list)
    mountains = list.mountains.includes([:region])
    regions = {}
    mountains.each do |mountain|
      if regions.key?(mountain.region.name)
        regions[mountain.region.name]['mountains'] << mountain
      else
        regions[mountain.region.name] = {}
        regions[mountain.region.name]['id'] = mountain.region.id
        regions[mountain.region.name]['mountains'] = [mountain]
      end
    end
    regions
  end
end
