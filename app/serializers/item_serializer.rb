class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :price, :description, :user_id, :location_id

  belongs_to :location
end
