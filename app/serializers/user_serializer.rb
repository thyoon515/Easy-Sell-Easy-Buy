class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email

  has_many :transactions
end
