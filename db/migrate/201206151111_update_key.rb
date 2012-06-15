class UpdateKey < ActiveRecord::Migration
  def up
    change_column :records, :id, 'char(36)', :null => false, :primary => true
  end
end
