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

def create_list(data_hash)
  return unless List.find_by_name(data_hash[:list]).nil?

  List.create!(name: data_hash[:list]) unless data_hash[:list].nil?
end

namespace :mountains do
  desc 'Scrape mountain data from Momoyama'
  task scrape: :environment do

    puts 'Scraping mountain data'
    # get html file to parse
    urls = [
      ['https://www.momonayama.net/hundred_mt_list_data/list.html', '百名山'],
      ['https://www.momonayama.net/mt_list_data/200/list/200_list.html', '二百名山'],
      ['https://www.momonayama.net/mt_list_data/300/list/300_list.html', '三百名山'],
      ['https://www.momonayama.net/mt_list_data/low/list/list.html', '百低山']
    ]

    # set up array to store the data
    mountains_array = []

    urls.each do |url|
      html_doc = get_html(url[0])
      mountains = html_doc.search('tr')

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
        columns = %i[number name region altitude terrain_diff physical_diff length url list]
        data_array.each_with_index do |datum, index|
          data_hash[columns[index]] = datum.text.strip unless datum.nil?
        end

        # add list name to data hash 
        data_hash[:list] = url[1]

        puts 'Creating lists'
        create_list(data_hash)
        puts 'done'

        puts 'Creating regions from mountain data'
        create_region(data_hash)
        puts '...done'

        mountains_array << data_hash
      end
    end
    puts mountains_array
    puts '...done'

    puts 'Adding scraped mountain data to DB'
    mountains_array.each do |mountain|
      next if mountain[:number].nil?
      next if Mountain.find_by_name(mountain[:name])

      new_mountain = Mountain.new(
        number: mountain[:number].to_i,
        name: mountain[:name],
        region_id: Region.find_by_name(mountain[:region]).id,
        altitude: mountain[:altitude].to_i,
        terrain_diff: mountain[:terrain_diff],
        physical_diff: mountain[:physical_diff],
        length: mountain[:length],
        url: mountain[:url],
      )
      
      new_list_mountain = ListMountain.new(
        list_id: List.find_by_name(mountain[:list]).id,
        mountain_id: Mountain.find_by_name(mountain[:name])
      )
      # puts new_mountain
    end
    puts '...done'

    # puts "Scraping individual mountain's data"
    # Mountain.all.each do |mountain|
    #   url = "#{base_url}#{mountain.url}"
    #   site_file = open(url).read
    #   html_doc = Nokogiri::HTML(site_file)

    #   puts "scraping lat and lng data for #{mountain.name}"
    #   result = html_doc.search('.sen-01')
    #   result.children.search('a').each do |element|
    #     matched = element['href'].match(/longitude=(\d*.\d*)&latitude=(\d*.\d*)/)
    #     next unless matched

    #     lng = matched[1]
    #     lat = matched[2]
    #     mountain.lng = lng
    #     mountain.lat = lat
    #     mountain.save!
    #   end

    #   puts "getting hiking season data for #{mountain.name}"
    #   result = html_doc.search('.bas_tim-01 .sen-01').text.strip
    #   match = result.match(/(\d.*)～(\d.*)/)

    #   if match
    #     mountain.hike_season_start = match[1]
    #     mountain.hike_season_end = match[2]
    #   else
    #     mountain.hike_season_start = result
    #     mountain.hike_season_end = result
    #   end

    #   puts "getting maple season data for #{mountain.name}"
    #   result = html_doc.search('.bas_tim-02 .sen-01').text.strip
    #   match = result.match(/(\d.*)～(\d.*)/)

    #   if match
    #     mountain.maple_season_start = match[1]
    #     mountain.maple_season_end = match[2]
    #   else
    #     mountain.maple_season_start = result
    #     mountain.maple_season_end = result
    #   end

    #   puts "getting snow season data for #{mountain.name}"
    #   result = html_doc.search('.bas_tim-02 .sen-01').text.strip
    #   match = result.match(/(\d.*)～(\d.*)/)

    #   if match
    #     mountain.snow_season_start = match[1]
    #     mountain.snow_season_end = match[2]
    #   else
    #     mountain.snow_season_start = result
    #     mountain.snow_season_end = result
    #   end

    #   puts "getting remaining snow data for #{mountain.name}"
    #   result = html_doc.search('.bas_tim-02 .sen-01').text.strip
    #   match = result.match(/(\d.*)～(\d.*)/)

    #   if match
    #     mountain.remaining_snow_start = match[1]
    #     mountain.remaining_snow_end = match[2]
    #   else
    #     mountain.remaining_snow_start = result
    #     mountain.remaining_snow_end = result
    #   end

    #   mountain.save!
    # end
    # puts '...done'
  end

  desc 'Add imgage urls to mountains'
  task add_img_url: :environment do
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
      puts mountain.name
      puts mountain.img_url
      mountain.save
    end
  end
end