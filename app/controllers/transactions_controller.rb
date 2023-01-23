class TransactionsController < ApplicationController

    def index
        render json: Transaction.all, include: :user
    end

end
