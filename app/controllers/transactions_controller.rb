class TransactionsController < ApplicationController

  def index
      if params[:user_id]
        user = User.find_by(id: params[:user_id])
        purchase = user.id === buyer_id
        render json: user.transactions.purchase
      elsif
        params[:user_id]
        user = User.find_by(id: params[:user_id])
        sale = user.id === seller_id
        render json: user.transactions.sale
      else
        render json: transactions
      end
  end

end
