class CreateItems < ActiveRecord::Migration[6.1]
  def change
    create_table :items do |t|
      t.string :title
      t.string :image
      t.string :price
      t.string :description

      t.timestamps
    end
  end
end
