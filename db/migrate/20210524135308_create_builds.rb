class CreateBuilds < ActiveRecord::Migration[6.1]
  def change
    create_table :builds do |t|
      t.belongs_to :user

      t.string :name
      t.string :champion
      t.integer :level
      t.integer :q_level
      t.integer :w_level
      t.integer :e_level
      t.integer :r_level

      t.timestamps
    end
  end
end
