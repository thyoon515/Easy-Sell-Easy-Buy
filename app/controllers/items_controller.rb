class ItemsController < ApplicationController

    def index
        render json: Item.all
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    end

    private

    def item_params
        params.permit(:title, :image, :price, :description)
    end

end
