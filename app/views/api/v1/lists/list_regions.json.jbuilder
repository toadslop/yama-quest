# frozen_string_literal: true
json.array! @regions_list do |region|
  json.extract! region, :id, :name
end