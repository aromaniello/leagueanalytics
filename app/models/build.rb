class Build < ApplicationRecord
  belongs_to :user

  has_one :rune_page, through: :builds_rune_pages
end
