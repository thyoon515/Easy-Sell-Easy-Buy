class User < ApplicationRecord
    has_secure_password

    has_many :transactions
    has_many :items, through: :transactions

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

end
