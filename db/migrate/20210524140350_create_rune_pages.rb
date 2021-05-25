class CreateRunePages < ActiveRecord::Migration[6.1]
  def change
    create_table :rune_pages do |t|
      t.belongs_to :user

      t.string :name

      t.string :keystone
      t.string :primary_1
      t.string :primary_2
      t.string :primary_3
      t.string :secondary_1
      t.string :secondary_2
      t.string :stat_1
      t.string :stat_2
      t.string :stat_3

      t.timestamps
    end
  end
end
