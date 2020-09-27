# frozen_string_literal: true
require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module YamaQuest
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 6.0
    config.middleware.use I18n::JS::Middleware

    config.generators do |g|
      g.test_framework :minitest, spec: false, fixture: false
      # add this if you're using FactoryGirl
      g.fixture_replacement :factory_bot
    end

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # Set I18n load path
    config.i18n.load_path += Dir[
      Rails.root.join('config', 'locales', '**', '*.{rb,yml}')
    ]

    I18n.available_locales = %i[en jp]

    # Set default locale to something other than :en
    I18n.default_locale = :en
  end
end
