class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :post_date, :purchase, :sale, :user_id, :item_id

  belongs_to :user
  belongs_to :item
end
