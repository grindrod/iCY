class UsersController < ApplicationController
  before_filter :save_login_state, :only=>[:new, :create, :change_password, :update]
  #before_filter :authenticate_user, :only => [:change_password, :destroy,:index, :edit, :show, :update]
  before_filter :special_auth, :only => [:new, :create]
  def new 
    @user = User.new
  end
  def show
    @user = User.find(session[:user_id])
  end
  def edit
    @user = User.find(session[:user_id])
  end
  def update
    @user = User.find(session[:user_id])
    if @user.update_attributes(params[:user])
      flash[:notice] = "User successfully updated. "
      redirect_to "/profile"
    else
      flash[:notice] = "User not updated, see below for details."
      render "edit"
    end
  end
  def profile
    @user = User.find(session[:user_id])
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
  def pass_help
    @user = User.find_user(params[:login_or_email])
    if !@user
      flash[:notice] = "Sorry, user does not exist."
      redirect_to "/forgot_password"
    end
  end
  def forgot_pass_attempt
    @user = User.authAns(params[:login],params[:answer])
    if @user
      session[:user_id] = @user.id
      redirect_to "/change_pass"
    else
      flash[:notice] = "Answer is incorrect."
      redirect_to "/forgot_password"
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
