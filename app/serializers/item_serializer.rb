class ItemSerializer < ActiveModel::Serializer
  attributes :id, :title, :image, :price, :description, :location


  belongs_to :location
  belongs_to :user

end
