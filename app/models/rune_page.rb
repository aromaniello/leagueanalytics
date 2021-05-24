class RunePage < ApplicationRecord
  has_many :builds, through: :builds_rune_pages
end
