FactoryBot.define do
  factory :build do
    name     { 'Test' }
    champion { 'Lee Sin' }
    level    { 6 }
    q_level  { 3 }
    w_level  { 1 }
    e_level  { 1 }
    r_level  { 1 }
  end
end
