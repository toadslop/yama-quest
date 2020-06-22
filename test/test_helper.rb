ENV["RAILS_ENV"] = "test"
require File.expand_path("../../config/environment", __FILE__)
require "rails/test_help"
require "minitest/rails"
require 'minitest/reporters'
require 'database_cleaner'

Minitest::Reporters.use!(
  Minitest::Reporters::ProgressReporter.new,
  ENV,
  Minitest.backtrace_filter
)

module AroundEachTest
  def before_setup
    super
    DatabaseCleaner.clean
    DatabaseCleaner.start
  end
end

DatabaseCleaner.strategy = :transaction

class Minitest::Unit::Test
  include FactoryBot::Syntax::Methods
  include AroundEachTest
end

class ActiveSupport::TestCase
  ActiveRecord::Migration.check_pending!
end