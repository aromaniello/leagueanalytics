require 'httparty'
require 'json'
require 'yaml'

namespace :league_data do
  desc "get items from data dragon api and rewrite yaml file"
  task :get_items => :environment do
    response = HTTParty.get("http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/item.json")
    api_data = JSON.parse(response.body)["data"]
    item_data = {}

    api_data.each do |code, item|
      next unless api_data[code]["maps"]["11"] && api_data[code]["gold"]["purchasable"] # skip if not available in Summoner's Rift or not purchasable

      item_name = item["name"]

      item_data[item_name] = {
        "code" => code.to_i,
        "cost" => api_data[code]["gold"]["total"]
      }

      stats = api_data[code]["stats"]
      item_data[item_name]["attack_damage"] = stats["FlatPhysicalDamageMod"] if stats["FlatPhysicalDamageMod"].present?
      item_data[item_name]["attack_speed"] = stats["PercentAttackSpeedMod"]  if stats["PercentAttackSpeedMod"].present?
      item_data[item_name]["crit_chance"] = stats["FlatCritChanceMod"]       if stats["FlatCritChanceMod"].present?
      item_data[item_name]["life_steal"] = stats["PercentLifeStealMod"]      if stats["PercentLifeStealMod"].present?
      item_data[item_name]["ability_power"] = stats["FlatMagicDamageMod"]    if stats["FlatMagicDamageMod"].present?
      item_data[item_name]["health"] = stats["FlatHPPoolMod"]                if stats["FlatHPPoolMod"].present?
      item_data[item_name]["health_regen"] = stats["FlatHPRegenMod"]         if stats["FlatHPRegenMod"].present?
      item_data[item_name]["mana"] = stats["FlatMPPoolMod"]                  if stats["FlatMPPoolMod"].present?
      item_data[item_name]["armor"] = stats["FlatArmorMod"]                  if stats["FlatArmorMod"].present?
      item_data[item_name]["mr"] = stats["FlatSpellBlockMod"]                if stats["FlatSpellBlockMod"].present?
      item_data[item_name]["move_speed"] = stats["FlatMovementSpeedMod"]     if stats["FlatMovementSpeedMod"].present?
    end


    File.open("app/data/item_stats.yml", 'w') { |f| YAML.dump(item_data, f) }
  end
end
