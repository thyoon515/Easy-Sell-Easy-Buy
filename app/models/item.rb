class Item < ApplicationRecord

    belongs_to :user
    belongs_to :location

    validates :title, presence: true
    validates :image, presence: true
    validates :price, presence: true
    validates :description, presence: true
end
