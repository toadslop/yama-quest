class ApplicationController < ActionController::Base
  before_action :set_locale
  # before_action :fetch_list, only: [:fetch_geojson]

  # def fetch_geojson
  #   @geojson = @list.feature_collection
  # end

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  def default_url_options
    { locale: I18n.locale == I18n.default_locale ? nil : I18n.locale }
  end

  def enumerable?(object)
    object.is_a? Enumerable
  end

  def localize_name(data)
    if enumerable?(data)
      data.map do |datum|
        datum.name = I18n.translate("#{datum.type}.#{datum.name}")
        datum
      end
    else
      data.name = I18n.translate("#{data.type}.#{data.name}")
      data
    end
  end

  # private

  # def fetch_list
  #   if List.exists?(id: params[:list_name])
  #     @list = List.find(params[:list_name])
  #   else
  #     @list = List.first
  #   end
  # end
end
