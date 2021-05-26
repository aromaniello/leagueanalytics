class ItemSet < ApplicationRecord
  belongs_to :build

  validates :items,
            length: { maximum: 6 },
            inclusion: { in: Items.values, message: "an item is invalid" }

  def add_item(item)
  end

  def remove_item(item)
  end
end
