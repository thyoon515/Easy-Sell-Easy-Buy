class Item < ApplicationRecord

    validates :title, presence: true
    validates :image, presence: true
    validates :price, presence: true
    validates :description, presence: true
end
