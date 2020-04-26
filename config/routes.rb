Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: 'pages#landing'
  resources :lists, only: [:index, :show]
  resources :mountains, only: [:index, :show]

  # API routing
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :lists, only: [:show]
    end
  end
end
