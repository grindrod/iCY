class UpdateUsers < ActiveRecord::Migration
  def change
    add_column :users, :salt2, :string
  end
end
