class RemoveItemIdFromTransactions < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :item_id, :integer
  end
end
