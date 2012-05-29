class ApplicationController < ActionController::Base
  protect_from_forgery
  before_filter :cors_preflight_check
  after_filter :cors_set_access_control_headers
  
  def cors_set_access_control_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    headers['Access-Control-Max-Age'] = "1728000"
  end

  def cors_preflight_check
    if request.method == :options
      headers['Access-Control-Allow-Origin'] = '*'
      headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
      headers['Access-Control-Allow-Headers'] = 'X-Requested-With, X-Prototype-Version'
      headers['Access-Control-Max-Age'] = '1728000'
      render :text => '', :content_type => 'text/plain'
    end
  end

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
