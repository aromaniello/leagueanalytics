class CreateBuildsRunePages < ActiveRecord::Migration[6.1]
  def change
    create_table :builds_rune_pages do |t|
      t.belongs_to :build
      t.belongs_to :rune_page

      t.timestamps
    end
  end
end
