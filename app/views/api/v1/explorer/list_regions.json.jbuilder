json.array! @regions_list do |region|
  json.extract! region, :id, :name
end