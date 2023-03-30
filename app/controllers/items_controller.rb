class ItemsController < ApplicationController
    before_action :authorize
    skip_before_action :authorize, only: [:index, :search]
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

    def index
        render json: Item.all
    end

    def show
        item = find_item
        render json: item
    end

    def create
        user = User.find(session[:user_id])
        item = user.items.create!(item_params)
        render json: item, status: :created
    end

    def destroy
        item = find_item
        item.destroy
        render json: item
    end

    def update
        item = find_item
        item.update!(item_params)
        render json: item, status: :accepted
    end

    # def search
    #     word = params[:word]
    #     items = Item.all
    #     items_with_word = items.where('lower(description) like ?', "%#{word.downcase}%")
    #     render json: items_with_word
    # end

    private

    def find_item
        user = User.find(session[:user_id])
        user.items.find(params[:id])
    end

    def item_params
        params.permit(:title, :image, :price, :description, :location_id)
    end

    def render_not_found_response
        render json: { error: "Item not found" }, status: :not_found
    end

    def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end

    def authorize
        return render json: { error: "Not authorized" }, status: :unauthorized unless session.include? :user_id
    end

end
