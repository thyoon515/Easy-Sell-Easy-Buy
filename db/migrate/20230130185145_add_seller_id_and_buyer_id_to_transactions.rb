class AddSellerIdAndBuyerIdToTransactions < ActiveRecord::Migration[6.1]
  def change
    add_column :transactions, :seller_id, :integer
    add_column :transactions, :buyer_id, :integer
  end
end
