class ApplicationController < ActionController::Base
  protect_from_forgery
  def special_auth
    if session[:user_id]
      @current_user = User.find session[:user_id]
      return true
    elsif User.all.size == 0
      return true
    else
      redirect_to(:controller => "sessions", :action=>"login")
      return false
    end
  end
  def authenticate_user
    if session[:user_id]
      @current_user = User.find session[:user_id]
      return true
    elsif User.all.size == 0
      redirect_to new_user_path
      return false
    else
      redirect_to(:controller => "sessions", :action=>"login")
      return false
    end
  end
  def save_login_state
    if session[:user_id]
      return false
    else
      return true
    end
  end
  
end