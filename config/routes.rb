# frozen_string_literal: true
Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '(:locale)', locale: /jp/ do
    root to: 'pages#landing'
    get '/explorer/:list_name', to: 'explorer#load', as: :explorer
  end

  # API routing
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/lists/:list_name/regions', to: 'lists#list_regions'
      get '/lists/:list_name/geojson', to: 'lists#fetch_geojson'
      get '/lists/:list_name/bounds', to: 'lists#fetch_map_bounds'
      get '/:list_name/regions/:region_id', to: 'lists#region_geojson'
    end
  end
end
