class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :price, :description

  belongs_to :location
end
