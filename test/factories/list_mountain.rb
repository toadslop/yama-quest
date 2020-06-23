FactoryBot.define do
  factory :list_mountain do
    sequence(:number) { |n| n }
    mountain
    list
  end
end
