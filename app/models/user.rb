class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable,
         :trackable, :omniauthable

  has_many :builds
  has_many :rune_pages
end
