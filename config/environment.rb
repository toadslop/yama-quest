# Load the Rails application.
require_relative 'application'

# set cloudinary for external storage
config.active_storage.service = :cloudinary

# Initialize the Rails application.
Rails.application.initialize!
