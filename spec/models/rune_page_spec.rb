require 'rails_helper'

RSpec.describe RunePage, type: :model do
  let(:user) { create(:user) }
  let(:params) do
    {
      name: "Test",
      keystone: "conqueror",
      primary_1: "triumph",
      primary_2: "legend_alacrity",
      primary_3: "coup_de_grace",
      secondary_1: "magical_footwear",
      secondary_2: "cosmic_insight",
      stat_1: "attack_speed",
      stat_2: "adaptive_force",
      stat_3: "armor"
    }
  end

  it "creates a valid rune page" do
    expect { user.rune_pages.create(params) }.to change { RunePage.count }.from(0).to(1)
  end

  it "is invalid if a rune does not exist" do
    params[:primary_1] = "invalid"
    rune_page = user.rune_pages.create(params)

    expect(rune_page).to_not be_valid
  end

  it "is invalid if a primary rune belongs to another path" do
    params[:primary_2] = "celerity"
    rune_page = user.rune_pages.create(params)

    expect(rune_page).to_not be_valid
  end

  it "is invalid if a secondary rune belongs to another path" do
    params[:primary_2] = "second_wind"
    rune_page = user.rune_pages.create(params)

    expect(rune_page).to_not be_valid
  end

  it "is invalid if both secondary runes belong to the same row" do
    params[:secondary_2] = "perfect_timing"
    rune_page = user.rune_pages.create(params)

    expect(rune_page).to_not be_valid
  end
end
