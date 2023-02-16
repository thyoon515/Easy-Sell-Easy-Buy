class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email

  has_many :items

  # def test
  #   object.items.map()
  # end
end
