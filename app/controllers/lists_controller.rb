# frozen_string_literal: true

class ListsController < ApplicationController
  def index
    @lists = List.all
  end

  def show
    if List.exists?(id: params[:id])
      @list = List.find(params[:id])
      mountains = @list.mountains
      @mountains_by_region = {}
      mountains.each do |mountain|
        if @mountains_by_region.key?(mountain.region.name)
          @mountains_by_region[mountain.region.name]['mountains'] << mountain
        else
          @mountains_by_region[mountain.region.name] = {}
          @mountains_by_region[mountain.region.name]['id'] = mountain.region.id
          @mountains_by_region[mountain.region.name]['mountains'] = [mountain]
        end
      end
    else
      redirect_to list_path(List.first)
    end
  end
end
