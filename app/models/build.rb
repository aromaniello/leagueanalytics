class Build < ApplicationRecord
  belongs_to :user

  has_one :rune_page, through: :builds_rune_pages

  validates :champion, inclusion: { in: Champions.values, message: "invalid champion name" }, presence: true
  validates :level, inclusion: { in: 1..18, message: "level must be between 1 and 18" }, presence: true
  validates :q_level, :w_level, :e_level, inclusion: { in: 1..5, message: "q, w and e level must be between 1 and 5" }, presence: true
  validates :r_level, inclusion: { in: 1..3, message: "r level must be between 1 and 3" }, presence: true
  validate  :sum_of_ability_levels_is_not_greater_than_level

  private

  def sum_of_ability_levels_is_not_greater_than_level
    errors.add(:level, "sum of ability levels is greater than level") if level < q_level + w_level + e_level + r_level
  end
end
