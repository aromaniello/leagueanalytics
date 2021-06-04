require 'httparty'
require 'json'
require 'yaml'

namespace :league_data do
  desc "get champion stats from data dragon api"
  task :get_champion_stats => :environment do
    response = HTTParty.get("http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json")

    champion_stats = {}

    JSON.parse(response.body)["data"].each do |name, data|

      stats = data["stats"]

      champion_stats[name] = {
        "base" => {
          "health" => stats["hp"],
          "health_regen" => stats["hpregen"],
          "mana" => stats["mp"],
          "mana_regen" => stats["mpregen"],
          "armor" => stats["armor"],
          "mr" => stats["spellblock"],
          "attack_damage" => stats["attackdamage"],
          "attack_speed" => stats["attackspeed"],
          "crit_chance" => stats["crit"],
          "attack_range" => stats["attackrange"],
          "move_speed" => stats["movespeed"]
        },
        "growth" => {
          "health" => stats["hpperlevel"],
          "health_regen" => stats["hpregenperlevel"],
          "mana" => stats["mpperlevel"],
          "mana_regen" => stats["mpregenperlevel"],
          "armor" => stats["armorperlevel"],
          "mr" => stats["spellblockperlevel"],
          "attack_damage" => stats["attackdamageperlevel"],
          "attack_speed" => stats["attackspeedperlevel"],
          "crit_chance" => stats["critperlevel"],
        }
      }
    end

    File.open("app/data/champion_stats.yml", 'w') { |f| YAML.dump(champion_stats, f) }
  end
end
