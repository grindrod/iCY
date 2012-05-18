# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Server::Application.initialize!

ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  :address => "mail.mydomain.com",
  :port => 25,
  :domain => "mydomain.com",
  :user_name => "MyUsername",
  :password => "MyPassword",
  :authentication => :login
}
