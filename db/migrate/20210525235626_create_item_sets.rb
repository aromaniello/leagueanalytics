class CreateItemSets < ActiveRecord::Migration[6.1]
  def change
    create_table :item_sets do |t|
      t.belongs_to :build

      t.string :items, array: true
      t.string :trinket

      t.timestamps
    end
  end
end
