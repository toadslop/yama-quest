FactoryBot.define do
  factory :list do
    sequence(:name) { |n| "List #{n}" }
    
    factory :list_with_listmountains do
      transient do
        list_mountains_count { 5 }
      end

      after(:create) do |list, evaluator|
        create_list(:list_mountain, evaluator.list_mountains_count, list: list)
      end
    end
  end
end
