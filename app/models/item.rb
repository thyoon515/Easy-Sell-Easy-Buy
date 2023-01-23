class Item < ApplicationRecord

    has_many :transactions
    has_many :users, through: :transactions

    validates :title, presence: true
    validates :image, presence: true
    validates :price, presence: true
    validates :description, presence: true
end
