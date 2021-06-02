Rails.application.routes.draw do
  root to: "builds#new"

  namespace :api do
    post '/sim', to: "builds#sim"
  end

  devise_for :users

  resources :builds
  resources :rune_pages
end
