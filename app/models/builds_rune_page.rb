class BuildsRunePage < ApplicationRecord
  belongs_to :build
  belongs_to :rune_page
end
