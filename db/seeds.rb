# frozen_string_literal: true
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# frozen_string_literal: true

require 'csv'

puts 'destroying old data...'
ListMountain.destroy_all
List.destroy_all
Mountain.destroy_all
Region.destroy_all
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
  csv.map(&:to_hash)
end

puts 'creating regions...'
regions_hash = hash_csv('region')
regions_hash.each do |region|
  Region.create(region)
end

puts 'creating lists...'
famous100 = List.create(name: '百名山')
puts '...done'

puts 'creating mountains...'
mountains_hash = hash_csv('mountain')

mountains_hash.each do |mountain|
  number = mountain.delete('number')
  new_mountain = Mountain.new(mountain)
  new_mountain.region = Region.find(mountain['region_id'].to_i - 1)
  new_mountain.save
  new_list_mountain = ListMountain.new(
    mountain: new_mountain,
    number: number,
    list: famous100
  )
  new_list_mountain.save
end
puts '...dones'

puts 'adding urls to mountains'
csv_text = File.read(
  Rails.root.join(
    'lib',
    'seeds',
    "#{Dir.pwd}/db/csvs/img_url.csv"
  )
)
parsed_csv = CSV.parse(
  csv_text,
  headers: true,
  encoding: 'ISO-8859-1'
)

parsed_csv.each do |csv_line|
  mountain = Mountain.find_by_name(csv_line[0])
  mountain.img_url = csv_line[1]
  mountain.save
end
puts 'done'
