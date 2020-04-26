class ListsController < ApplicationController
  def index
    @lists = List.all
  end

  def show
    if params[:id].blank?
      redirect_to list_path(List.first)
    else
      @list = List.find(params[:id])
      @mountains = @list.mountains.order(:number)
      @mountain = @mountains.first
    end
  end
end
