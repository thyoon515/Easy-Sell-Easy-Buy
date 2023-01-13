class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :price, :description
end
