FactoryBot.define do
  factory :mountain do
    sequence(:name) { |n| "Mountain #{n}" }
    altitude { 3776 }
    terrain_diff { '★★' }
    physical_diff { '★★' }
    length { '日帰り' }
    lat { 35.360747509167 }
    lng { 138.72735534793 }
    region
  end
end
