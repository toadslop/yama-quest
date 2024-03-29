# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.7.1'

gem 'rails', '>= 6.1.3.2'

# backend gems
gem 'actionpack', '>= 6.1.3.2'
gem 'bootsnap', '>= 1.4.2', require: false
gem 'cloudinary' # image storage
gem 'devise' # for users
gem 'pg', '>= 0.18', '< 2.0' # database
gem 'puma', '>= 4.3.8' # app server
gem 'rack', '>= 2.2.3'

# frontend gems
gem 'bootstrap', '~> 4.4.1'
gem 'font-awesome-rails'
gem 'i18n-js'
gem 'jbuilder', '~> 2.7'
gem 'jquery-rails'
gem 'react-rails'
gem 'sass-rails', '>= 6'
gem 'turbolinks', '~> 5'
gem 'webpacker', '~> 5.4.0'

group :development, :test do
  gem 'byebug', platforms: %i[mri mingw x64_mingw]
  gem 'pry-byebug'
  gem 'pry-rails'
end

group :development do
  gem 'bullet'
  gem 'dotenv-rails'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'rubocop', require: false
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara', '>= 2.15'
  gem 'database_cleaner'
  gem 'factory_bot_rails'
  gem 'faker'
  gem 'minitest'
  gem 'minitest-rails'
  gem 'minitest-reporters'
  gem 'selenium-webdriver'
  gem 'webdrivers'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
