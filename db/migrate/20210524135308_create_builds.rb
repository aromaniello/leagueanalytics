class CreateBuilds < ActiveRecord::Migration[6.1]
  def change
    create_table :builds do |t|
      t.belongs_to :user

      t.timestamps
    end
  end
end
