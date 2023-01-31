class TransactionSerializer < ActiveModel::Serializer
  attributes :id, :post_date, :buyer_id, :seller_id, :item_id

  belongs_to :user
  belongs_to :item
end
