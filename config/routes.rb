Rails.application.routes.draw do
  root to: "builds#new"
  
  devise_for :users

  resources :builds
  resources :rune_pages
end
