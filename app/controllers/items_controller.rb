class ItemsController < ApplicationController

    def index
        render json: Item.all
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    private

    def item_params
        params.permit(:title, :image, :price, :description)
    end

end
