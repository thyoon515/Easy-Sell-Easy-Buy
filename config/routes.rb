Rails.application.routes.draw do
  resources :locations, only: [:index]
  resources :items
  resources :users, only: [:index, :show, :create]
  post "/login", to: "sessions#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  # get '/items/:word' , to: "items#search"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

# Create a custom route that takes a parameter of a single word. That route should take us to an action where we look through items to see if any of the items have that word in the description (doesn’t have to be a full match, case-insensitive). The action will render json of all the users that have items that fit that criterion. If there is no match render json that says so.

