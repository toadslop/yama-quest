Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope '(:locale)', locale: /jp/ do
    root to: 'pages#landing'
    resources :lists, only: %i[index show]
    resources :mountains, only: %i[index show]
    get '/explorer/:list_name', to: 'explorer#show', as: :explorer
  end

  # API routing
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/explorer/:list_name', to: 'explorer#list_regions', as: :list_regions
    end
  end
end
