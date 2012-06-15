class Record < ActiveRecord::Base
  # attr_accessible :title, :body
  include UUIDHelper
  set_primary_key :id
end
