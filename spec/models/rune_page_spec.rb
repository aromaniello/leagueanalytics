require 'rails_helper'

RSpec.describe RunePage, type: :model do
  let(:user) { create(:user) }
  let(:params) do
    {
      name: "Test",
      keystone: "Conqueror",
      primary_1: "Triumph",
      primary_2: "Legend: Alacrity",
      primary_3: "Coup de Grace",
      secondary_1: "Magical Footwear",
      secondary_2: "Cosmic Insight",
      stat_1: "Attack Speed",
      stat_2: "Adaptive Force",
      stat_3: "Armor"
    }
  end

  it "creates a valid rune page" do
    expect { user.rune_pages.create(params) }.to change { user.rune_pages.count }.from(0).to(1)
  end

  it "is invalid if a rune does not exist" do
    params[:primary_1] = "Invalid"
    expect(user.rune_pages.build(params)).to_not be_valid
  end

  it "is invalid if a primary rune belongs to another path" do
    params[:primary_2] = "Celerity"
    expect(user.rune_pages.build(params)).to_not be_valid
  end

  it "is invalid if a secondary rune belongs to another path" do
    params[:primary_2] = "Second Wind"
    expect(user.rune_pages.build(params)).to_not be_valid
  end

  it "is invalid if both secondary runes belong to the same row" do
    params[:secondary_2] = "Perfect Timing"
    expect(user.rune_pages.build(params)).to_not be_valid
  end
end
