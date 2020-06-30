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



# ENV['RAILS_ENV'] ||= 'test'
# require_relative '../config/environment'
# require 'rails/test_help'

# class ActiveSupport::TestCase
#   # Run tests in parallel with specified workers
#   parallelize(workers: :number_of_processors)

#   # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
#   fixtures :all

#   # Add more helper methods to be used by all tests here...
# end
