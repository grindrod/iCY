class UpdateRecored < ActiveRecord::Migration
  def up
    add_column :records, :deviceID, :string
  end
end
