class UsersController < ApplicationController
  before_filter :save_login_state, :only=>[:new, :create, :change_password]
  before_filter :authenticate_user, :only => [:change_password, :destroy,:index]
  before_filter :special_auth, :only => [:new]
  def new 
    @user = User.new
  end
  def show
  end
  def create
    @user = User.new(params[:user])
    if @user.save
      flash[:notice] = "Sign up successful"
      flash[:color] = "valid"
      session[:user_id] = @user.id
      redirect_to(:controller => "sessions", :action=>"home")
    else
      flash[:notice] = "Form is invalid"
      flash[:color] = "invalid"
      render "new"
    end
  end
  def forgot_password
  end
  def send_password
    if request.post?
      u = User.find_by_email(params[:email])
      if u and u.send_new_password
        flash[:notice] = "A new password has been sent by email."
      else
        flash[:notice] = "Couldn't send password"
      end
      redirect_to "/login"
    end
  end
  def destroy
    @user = User.find(params[:id])
    if @user.id == session[:user_id]
      flash[:notice]="You have successfully deleted your account."
      @user.destroy
      redirect_to "/logout"
    else
      flash[:notice]="User successfully deleted."
      @user.destroy
      redirect_to users_path
    end
  end
  def index
    @users = User.all
  end
  def change_password
    if request.post? && @current_user 
      if @current_user.update_attributes(:password=>params[:password], :password_confirmation => params[:password_confirmation]) && params[:password].length>=6
        flash[:notice] = "Password changed successfully."
        redirect_to "/home"
      else
        flash[:notice] = "Please ensure both match and are valid passwords (at least 6 characters)."
      end
    end
  end
end
