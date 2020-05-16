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

  def fetch_list
    if List.exists?(id: params[:id])
      # @list = localize_name(List.find(params[:id]))
      @list = List.find(params[:id])
    else
      redirect_to list_path(List.first)
    end
  end

  def fetch_regions_list
    # @regions_list = localize_name(@list.regions_list)
    @regions_list = @list.regions_list
  end
end
