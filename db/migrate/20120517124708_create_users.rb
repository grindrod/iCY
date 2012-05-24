class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.column :login, :string 
      t.column :hashed_password, :string
      t.column :email, :string
      t.column :salt, :string
      t.timestamps
    end
  end
end
