class Notifications < ActionMailer::Base
  default :from => "from@example.com"

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.notifications.forgot_password.subject
  #
  def forgot_password (to, login, pass, sent_at = Time.now)
    @login=login
    @pass = pass
    mail(:to => to, :subject => "Your password is...")
  end
end
