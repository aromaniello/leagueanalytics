require 'rails_helper'

RSpec.describe Build, type: :model do
  let(:user) { create(:user) }
  let(:params) do
    {
      name: "Test",
      champion: "Lee Sin",
      level: 6,
      q_level: 3,
      w_level: 1,
      e_level: 1,
      r_level: 1
    }
  end

  it "creates a valid build" do
    expect { user.builds.create(params) }.to change { user.builds.count }.from(0).to(1)
  end

  it "is invalid if the champion does not exist" do
    params[:champion] = "invalid"
    expect(user.builds.build(params)).to_not be_valid
  end

  it "is invalid if the level is out of range" do
    params[:level] = 19
    expect(user.builds.build(params)).to_not be_valid
  end

  it "is invalid if an ability level is out of range" do
    params[:level] = 8
    params[:q_level] = 6
    expect(user.builds.build(params)).to_not be_valid
  end

  it "is invalid if the sum of ability levels is greater than level" do
    params[:q_level] = 4
    expect(user.builds.build(params)).to_not be_valid
  end
end
