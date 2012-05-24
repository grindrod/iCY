class User < ActiveRecord::Base
  attr_accessor :password, :answer, :change, :length
  attr_accessible :login, :email, :password, :password_confirmation, :question, :answer, :answer_confirmation,:length
  EMAIL_FORMAT = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
  validates :password, :presence => { :on => :create}
  validates :login, :presence => true, :uniqueness => true, :length => {:in => 3..20}
  validates :email, :presence => true, :uniqueness => true, :format => EMAIL_FORMAT
  validates :password, :confirmation => true
  validates_length_of :password, :in => 6..20, :on => :update
  validates_length_of :password, :in => 6..20, :on => :create
  validates_presence_of :question
  validates :answer, :presence => { :on => :create}
  validates :answer, :confirmation => true
  
  def encrypt_password
    if password.present?
      self.salt = BCrypt::Engine.generate_salt
      self.hashed_password = BCrypt::Engine.hash_secret(password, salt)
    end
  end
  def clear_password
    self.password = nil
  end
  def self.authenticate(login_or_email, login_pass)
    if EMAIL_FORMAT.match(login_or_email)
      user = User.find_by_email(login_or_email)
    else
      user = User.find_by_login(login_or_email)
    end
    if user &&user.match_password(login_pass)
      return user
    else
      return false
    end
  end
  def match_password(login_password)
    hashed_password == BCrypt::Engine.hash_secret(login_password, salt)
  end  
  def self.random_string(len)
    chars = ("a".."z").to_a + ("A".."Z").to_a + ("0".."9").to_a
    newpass = ""
    1.upto(len) { |i| newpass << chars[rand(chars.size-1)] }
    return newpass
  end
  before_save :encrypt_password
  after_save :clear_password
  def encrypt_answer
    if answer.present?
      self.salt2 = BCrypt::Engine.generate_salt
      self.hashed_answer = BCrypt::Engine.hash_secret(answer, salt2)
    end
  end
  def clear_answer
    self.answer = nil
  end
  def self.find_user(login_or_email)
    if EMAIL_FORMAT.match(login_or_email)
      user = User.find_by_email(login_or_email)
    else
      user = User.find_by_login(login_or_email)
    end
    if user 
      return user
    else
      return false
    end
  end
  def self.authAns(login_name, login_pass)
    user = User.find_by_login(login_name)
    if user &&user.match_answer(login_pass)
      return user
    else
      return false
    end
  end
  def match_answer(login_ans)
    hashed_answer == BCrypt::Engine.hash_secret(login_ans, salt2)
  end  
  before_save :encrypt_answer
  after_save :clear_answer
end
