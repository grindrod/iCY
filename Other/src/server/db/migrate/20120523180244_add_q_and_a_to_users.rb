class AddQAndAToUsers < ActiveRecord::Migration
  def change
    add_column :users, :hashed_answer, :string
    add_column :users, :question, :string
  end
end
