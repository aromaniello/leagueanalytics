require 'rails_helper'

RSpec.describe ItemSet, type: :model do
  let(:user)  { create(:user) }
  let(:build) { create(:build, user: user) }
  let(:params) do
    {
      items: ["Long Sword", "Amplifying Tome", "Blasting Wand"],
      trinket: ["Stealth Ward"]
    }
  end

  it 'creates a valid item set' do
    build.create_item_set(params)
    expect(build.item_set.present?).to be true
  end

  it 'is invalid if an item does not exist' do
    params[:items].push("Invalid Item")
    expect(build.build_item_set(params)).to_not be_valid
  end

  it "is invalid if there's more than 6 items" do
    4.times { params[:items].push("Long Sword") }
    expect(build.build_item_set(params)).to_not be_valid
  end
end
