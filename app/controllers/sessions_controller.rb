class SessionsController < ApplicationController
  before_filter :authenticate_user, :only => [:home, :profile]
  before_filter :save_login_state, :only =>[:login, :login_attempt]
  def login
  end
  
  def login_attempt
    authorized_user = User.authenticate(params[:login_or_email],params[:login_password])
    if authorized_user
      session[:user_id] = authorized_user.id
      flash[:notice] = "Welcome, you are logged in as #{authorized_user.login}"
      redirect_to(:action=>"home") 
    else
      flash[:notice]="Invalid Username or Password"
      flash[:color] = "invalid"
      redirect_to "/forgot_password"
    end
  end
  
  def logout
    session[:user_id] = nil
    flash.keep
    if User.all.size == 0
      redirect_to new_user_path
    else
      redirect_to :action => "login"
    end
  end

  def home
  end

  

  def setting
  end
end
