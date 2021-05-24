class CreateRunePages < ActiveRecord::Migration[6.1]
  def change
    create_table :rune_pages do |t|
      t.belongs_to :user

      t.timestamps
    end
  end
end
