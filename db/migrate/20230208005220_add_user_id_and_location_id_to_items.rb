class AddUserIdAndLocationIdToItems < ActiveRecord::Migration[6.1]
  def change
    add_column :items, :user_id, :integer
    add_column :items, :location_id, :integer
  end
end
