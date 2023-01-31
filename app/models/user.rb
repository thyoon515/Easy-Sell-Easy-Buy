class User < ApplicationRecord
    has_secure_password

    has_many :buyer_transactions, class_name: "Transaction", foreign_key: 'buyer_id'
    has_many :seller_transactions, class_name: "Transaction", foreign_key: 'seller_id'
    has_many :items, through: :transactions

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true

    def transactions
        Transaction.where("buyer_id = ? OR seller_id = ?", self.id, self.id)
    end

    def purchase
        Transaction.where("buyer_id = ?", self.id)
    end

    def sale
        Transaction.where("seller_id = ?", self.id)
    end
end
