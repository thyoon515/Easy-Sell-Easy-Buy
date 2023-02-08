class ItemsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

    def index
        if params[:user_id]
            user = User.find(params[:user_id])
            items = user.items
        else
            items = Item.all
        end
          render json: items, include: :location
    end

    def show
        item = find_item
        render json: item
    end

    def create
        item = Item.create!(item_params)
        render json: item, status: :created
    rescue ActiveRecord::RecordInvalid => e
        render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
    end

    def destroy
        item = find_item
        item.destroy
        render json: item
    end

    def update
        item = find_item
        item.update(item_params)
        render json: item, status: :accepted
    end

    private

    def find_item
        Item.find(params[:id])
    end

    def item_params
        params.permit(:title, :image, :price, :description)
    end

    def render_not_found_response
        render json: { error: "Item not found" }, status: :not_found
    end

end
