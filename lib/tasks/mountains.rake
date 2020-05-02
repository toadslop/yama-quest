# frozen_string_literal: true

require 'nokogiri'
require 'open-uri'

def get_html(url)
  site_file = open(url).read
  Nokogiri::HTML(site_file)
end

def create_region(data_hash)
  return unless Region.find_by_name(data_hash[:region]).nil?

  Region.create!(name: data_hash[:region]) unless data_hash[:region].nil?
end

namespace :mountains do
  desc 'Scrape mountain data from Momoyama'
  task scrape: :environment do

    puts 'Scraping mountain data'
    # get html file to parse
    url = 'https://www.momonayama.net/hundred_mt_list_data/list.html'
    html_doc = get_html(url)
    mountains = html_doc.search('tr')

    # set up array to store the data
    mountains_array = []

    # iterate over the mountains to parse out the data
    mountains.each do |mountain|
      # find all the data from each mountain
      data = mountain.search('td')

      # set up an array to catch the table data
      data_array = []

      # iterate over the tds and strip out the text
      data.each do |datum|
        data_array << datum
      end

      # organize data into a hash
      data_hash = {}
      data_hash[:number] = data_array[0].text.strip unless data_array[0].nil?
      data_hash[:name] = data_array[1].text.strip unless data_array[1].nil?
      data_hash[:region] = data_array[2].text.strip unless data_array[2].nil?
      data_hash[:altitude] = data_array[3].text.strip unless data_array[3].nil?
      data_hash[:terrain_diff] = data_array[4].text.strip unless data_array[4].nil?
      data_hash[:physical_diff] = data_array[5].text.strip unless data_array[5].nil?
      data_hash[:length] = data_array[6].text.strip unless data_array[6].nil?
      data_hash[:url] = data_array[1].css('a')[0]['href'] unless data_array[1].nil?

      mountains_array << data_hash

      puts 'Creating regions from mountain data'
      create_region(data_hash)
      puts '...done'
    end

    puts '...done'

    puts 'Adding scraped mountain data to DB'
    mountains_array.each do |mountain|
      next if mountain[:number].nil?

      Mountain.create!(
        number: mountain[:number].to_i,
        name: mountain[:name],
        region_id: Region.find_by_name(mountain[:region]).id,
        altitude: mountain[:altitude].to_i,
        terrain_diff: mountain[:terrain_diff],
        physical_diff: mountain[:physical_diff],
        length: mountain[:length],
        url: mountain[:url]
      )
    end
    puts '...done'

    puts "Scraping individual mountain's data"
    Mountain.all.each do |mountain|
      url = "#{base_url}#{mountain.url}"
      site_file = open(url).read
      html_doc = Nokogiri::HTML(site_file)

      puts "scraping lat and lng data for #{mountain.name}"
      result = html_doc.search('.sen-01')
      result.children.search('a').each do |element|
        matched = element['href'].match(/longitude=(\d*.\d*)&latitude=(\d*.\d*)/)
        next unless matched

        lng = matched[1]
        lat = matched[2]
        mountain.lng = lng
        mountain.lat = lat
        mountain.save!
      end

      puts "getting hiking season data for #{mountain.name}"
      result = html_doc.search('.bas_tim-01 .sen-01').text.strip
      match = result.match(/(\d.*)～(\d.*)/)

      if match
        mountain.hike_season_start = match[1]
        mountain.hike_season_end = match[2]
      else
        mountain.hike_season_start = result
        mountain.hike_season_end = result
      end

      puts "getting maple season data for #{mountain.name}"
      result = html_doc.search('.bas_tim-02 .sen-01').text.strip
      match = result.match(/(\d.*)～(\d.*)/)

      if match
        mountain.maple_season_start = match[1]
        mountain.maple_season_end = match[2]
      else
        mountain.maple_season_start = result
        mountain.maple_season_end = result
      end

      puts "getting snow season data for #{mountain.name}"
      result = html_doc.search('.bas_tim-02 .sen-01').text.strip
      match = result.match(/(\d.*)～(\d.*)/)

      if match
        mountain.snow_season_start = match[1]
        mountain.snow_season_end = match[2]
      else
        mountain.snow_season_start = result
        mountain.snow_season_end = result
      end

      puts "getting remaining snow data for #{mountain.name}"
      result = html_doc.search('.bas_tim-02 .sen-01').text.strip
      match = result.match(/(\d.*)～(\d.*)/)

      if match
        mountain.remaining_snow_start = match[1]
        mountain.remaining_snow_end = match[2]
      else
        mountain.remaining_snow_start = result
        mountain.remaining_snow_end = result
      end

      mountain.save!
    end
    puts '...done'
  end
end