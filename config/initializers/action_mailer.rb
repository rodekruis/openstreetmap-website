# Configure ActionMailer SMTP settings
ActionMailer::Base.smtp_settings = {
  :address => "smtp.gmail.com",
  :port => "587",
  :domain => "gmail.com",
  :user_name => "missingmapsnl@gmail.com",
  :password => "510global",
  :authentication => ":plain",
  :enable_starttls_auto => true
}
