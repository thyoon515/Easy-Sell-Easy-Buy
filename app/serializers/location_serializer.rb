class LocationSerializer < ActiveModel::Serializer
  attributes :id, :nyc_borough_name

  has_many :items
end
