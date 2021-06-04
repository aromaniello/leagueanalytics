require 'httparty'
require 'json'
require 'yaml'

namespace :league_data do
  desc "get champion stats from ddragon api"
  task :get_champion_stats => :environment do
    Data.champions.keys.each do |champion_name|
      response = HTTParty.get("http://ddragon.leagueoflegends.com/cdn/11.8.1/data/en_US/champion/#{champion_name}.json")

      data = JSON.parse(response.body)

      champion_data = YAML.load_file("app/data/champions.yml")

      champion_data[champion_name] = {} if champion_data[champion_name].nil?
      champion_data[champion_name]["base"] = {} if champion_data[champion_name]["base"].nil?
      champion_data[champion_name]["growth"] = {} if champion_data[champion_name]["growth"].nil?

      champion_data[champion_name]["base"]["health"] = data["data"][champion_name]["stats"]["hp"]
      champion_data[champion_name]["base"]["health_regen"] = data["data"][champion_name]["stats"]["hpregen"]
      champion_data[champion_name]["base"]["armor"] = data["data"][champion_name]["stats"]["armor"]
      champion_data[champion_name]["base"]["mr"] = data["data"][champion_name]["stats"]["spellblock"]
      champion_data[champion_name]["base"]["move_speed"] = data["data"][champion_name]["stats"]["movespeed"]
      champion_data[champion_name]["base"]["mana"] = data["data"][champion_name]["stats"]["mp"]
      champion_data[champion_name]["base"]["mana_regen"] = data["data"][champion_name]["stats"]["mpregen"]

      champion_data[champion_name]["growth"]["health"] = data["data"][champion_name]["stats"]["hpperlevel"]
      champion_data[champion_name]["growth"]["health_regen"] = data["data"][champion_name]["stats"]["hpregenperlevel"]
      champion_data[champion_name]["growth"]["mana"] = data["data"][champion_name]["stats"]["mpperlevel"]
      champion_data[champion_name]["growth"]["mana_regen"] = data["data"][champion_name]["stats"]["mpregenperlevel"]
      champion_data[champion_name]["growth"]["armor"] = data["data"][champion_name]["stats"]["armorperlevel"]
      champion_data[champion_name]["growth"]["mr"] = data["data"][champion_name]["stats"]["spellblockperlevel"]

      File.open("app/data/champions.yml", 'w') { |f| YAML.dump(champion_data, f) }
    end
  end
end
