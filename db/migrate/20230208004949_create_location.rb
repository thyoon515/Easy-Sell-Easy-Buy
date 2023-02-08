class CreateLocation < ActiveRecord::Migration[6.1]
  def change
    create_table :locations do |t|
      t.string :nyc_borough_name

      t.timestamps
    end
  end
end
