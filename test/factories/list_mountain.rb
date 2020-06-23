FactoryBot.define do
  factory :list_mountain do
    number { ListMountain.last ? ListMountain.last.number + 1 : 1 }
    mountain
    list
  end
end