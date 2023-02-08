class RemoveSellerIdAndBuyerIdFromTransactions < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :seller_id, :integer
    remove_column :transactions, :buyer_id, :integer
  end
end
