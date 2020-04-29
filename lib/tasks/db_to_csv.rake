require 'csv'

def make_attributes(class_name)
  class_name.columns.map do |instance|
    next if instance.name == 'created_at' || instance.name == 'updated_at'

    instance.name
  end.compact
end

def write_csv(class_name, csv_file_name)
  attributes = make_attributes(class_name)
  CSV.open("#{Dir.pwd}/db/csvs/#{csv_file_name}.csv", 'wb') do |csv|
    csv << attributes

    class_name.all.each do |instance|
      csv << attributes.map { |attr| instance.send(attr) }
    end
  end
end

namespace :db_to_csv do
  desc 'Make csv of mountains data'
  task mountains: :environment do
    write_csv(Mountain, 'mountain')
  end

  desc "Convert regions data to csv file"
  task regions: :environment do
    write_csv(Region, 'region')
  end
end
