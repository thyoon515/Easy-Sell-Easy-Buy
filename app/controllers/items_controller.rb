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

    def destroy
        item = Item.find_by(id: params[:id])
        if item
            item.destroy
            render json: item
        else
            render json: { error: "Item not found" }, status: :not_found
        end
    end

    private

    def item_params
        params.permit(:title, :image, :price, :description)
    end

end
