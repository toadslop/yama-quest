def mountain_name_hash
  mountains = Mountain.select(:name)
  mountain_hash = {mountains: {}}
  mountains.each { |mountain| mountain_hash[:mountains][mountain.name] = mountain.name }
  mountain_hash
end

def trip_length_hash
  mountain_lengths = Mountain.select(:length).distinct
  length_hash = {lengths: {}}
  mountain_lengths.each do |mountain_lengths|
    length_hash[:lengths][mountain_lengths.length] = mountain_lengths.length
  end
  length_hash
end

def combine_hashes(*hashes)
  hashes
end

def write_yaml(model_name, locales = [], data)
  locales.each do |locale|
    path = "config/locales/models/#{model_name}/#{locale}.yml"
    File.open(path, 'w') do |file|
      content = {"#{locale}": data}
      file.write(content.to_yaml)
    end
  end
end

namespace :localize_db do
  desc "Convert mountain data to yml so it can be localized."
  task mountains_to_yml: :environment do
    write_yaml('mountain', ['en', 'jp'], combine_hashes(mountain_name_hash, trip_length_hash))
  end
end
