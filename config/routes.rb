Rails.application.routes.draw do
  resources :locations, only: [:index]
  resources :items
  resources :users, only: [:show, :create]
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  # get "/search_items/:word", to: "items#search"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end



