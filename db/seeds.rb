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

require 'nokogiri'
require 'open-uri'

# puts 'Scraping mountain data'
# # get html file to parse
# url = 'https://www.momonayama.net/hundred_mt_list_data/list.html'
# site_file = open(url).read
# html_doc = Nokogiri::HTML(site_file)
# mountains = html_doc.search('tr')

# # set up array to store the data
# mountains_array = []

# # iterate over the mountains to parse out the data
# mountains.each do |mountain|
#   # find all the data from each mountain
#   data = mountain.search('td')

#   # set up an array to catch the table data
#   data_array = []

#   # iterate over the tds and strip out the text
#   data.each do |datum|
#     data_array << datum
#   end

#   # organize data into a hash
#   data_hash = {}
#   data_hash[:number] = data_array[0].text.strip unless data_array[0].nil?
#   data_hash[:name] = data_array[1].text.strip unless data_array[1].nil?
#   data_hash[:region] = data_array[2].text.strip unless data_array[2].nil?
#   data_hash[:altitude] = data_array[3].text.strip unless data_array[3].nil?
#   data_hash[:terrain_diff] = data_array[4].text.strip unless data_array[4].nil?
#   data_hash[:physical_diff] = data_array[5].text.strip unless data_array[5].nil?
#   data_hash[:length] = data_array[6].text.strip unless data_array[6].nil?
#   data_hash[:url] = data_array[1].css('a')[0]['href'] unless data_array[1].nil?

#   mountains_array << data_hash

#   if Region.find_by_name(data_hash[:region]).nil?
#     Region.create!(name: data_hash[:region]) unless data_hash[:region].nil?
#   end
# end
# puts '...done'

# puts 'Adding scraped mountain data to DB'
# mountains_array.each do |mountain|
#   next if mountain[:number].nil?

#   Mountain.create!(
#     number: mountain[:number].to_i,
#     name: mountain[:name],
#     region_id: Region.find_by_name(mountain[:region]).id,
#     altitude: mountain[:altitude].to_i,
#     terrain_diff: mountain[:terrain_diff],
#     physical_diff: mountain[:physical_diff],
#     length: mountain[:length],
#     url: mountain[:url]
#   )
# end
# puts '...done'

base_url = 'https://www.momonayama.net/'

puts "Scrapting individual mountain's data"
Mountain.all.each do |mountain|
  url = "#{base_url}#{mountain.url}"
  site_file = open(url).read
  html_doc = Nokogiri::HTML(site_file)

  # scraping lat and lng data
  # result = html_doc.search('.sen-01')
  # result.children.search('a').each do |element|
  #   matched = element['href'].match(/longitude=(\d*.\d*)&latitude=(\d*.\d*)/)
  #   next unless matched
  #   lng = matched[1]
  #   lat = matched[2]
  #   mountain.lng = lng
  #   mountain.lat = lat
  #   mountain.save!
  # end


end
puts '...done'
