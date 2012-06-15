class ChangeID < ActiveRecord::Migration
  def up
    change_column :records, :id, 'char(36) binary', :null => false, :primary => true
  end
end