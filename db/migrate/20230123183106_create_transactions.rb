class CreateTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :transactions do |t|
      t.string :post_date
      t.boolean :purchase
      t.boolean :sale
      t.integer :user_id
      t.integer :item_id

      t.timestamps
    end
  end
end
