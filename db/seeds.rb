# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# frozen_string_literal: true
# puts 'Destroying all mountains...'
# Mountain.destroy_all
# puts 'Done'

require 'csv'

puts 'destroying old data...'
# Region.destroy_all
# List.destroy_all
puts '...done'

def csv_text(model_name)
  File.read(
    Rails.root.join(
      'lib',
      'seeds',
      "#{Dir.pwd}/db/csvs/#{model_name}.csv"
    )
  )
end

def parse_csv(csv_text)
  CSV.parse(csv_text, :headers => true, :encoding => 'ISO-8859-1')
end

def hash_csv(model_name)
  csv_text = csv_text(model_name)
  csv = parse_csv(csv_text)
  csv.map do |row|
    row.to_hash
  end
end

# puts 'creating regions...'
# regions_hash = hash_csv('region')
# regions_hash.each do |region|
#   Region.create(region)
# end
# puts '...done'

# famous_100 = List.create(name: '100 Famous Mountains')
# Region.all.each do |region|
#   ListRegion.create(region: region, list: famous_100)
# end

mountains_hash = hash_csv('mountain')

mountains_hash.each do |mountain|
  number = mountain.delete('number')
  new_mountain = Mountain.new(mountain)
  new_mountain.region = Region.find(mountain['region_id'].to_i - 1)
  p mountain
  new_mountain.save
  new_lrm = ListRegionMountain.new(
    mountain: new_mountain,
    number: number,
    list_region: ListRegion.find(new_mountain.region.id)
  )
  new_lrm.save
end
