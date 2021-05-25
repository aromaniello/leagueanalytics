FactoryBot.define do
  factory :rune_page do
    name        { 'Test' }
    keystone    { 'conqueror' }
    primary_1   { 'triumph' }
    primary_2   { 'legend_alacrity' }
    primary_3   { 'coup_de_grace' }
    secondary_1 { 'magical_footwear' }
    secondary_2 { 'cosmic_insight' }
    stat_1      { 'attack_speed' }
    stat_2      { 'adaptive_force' }
    stat_3      { 'armor' }
  end
end
