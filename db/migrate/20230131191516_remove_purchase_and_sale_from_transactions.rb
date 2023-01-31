class RemovePurchaseAndSaleFromTransactions < ActiveRecord::Migration[6.1]
  def change
    remove_column :transactions, :purchase, :boolean
    remove_column :transactions, :sale, :boolean
  end
end
