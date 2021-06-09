class Data
  # TODO: cache these to redis
  def self.champion_names
    YAML.load_file('app/data/champion_stats.yml').keys
  end

  def self.champion_stats
    YAML.load_file('app/data/champion_stats.yml').map { |k, v| [k, v.deep_symbolize_keys] }.to_h
  end

  def self.champion_abilities
    YAML.load_file('app/data/champion_abilities.yml').map do |champion, abilities|
      [champion, abilities.map { |ability| ability.deep_symbolize_keys }]
    end.to_h
  end

  def self.items
    YAML.load_file('app/data/item_stats.yml').map do |name, stats|
      [name, stats.deep_symbolize_keys]
    end.to_h
  end

  def self.rune_data
    YAML.load_file('app/data/runes.yml')
  end

  def self.rune_paths
    rune_data["Paths"]
  end

  def self.keystones
    rune_data["Keystones"]
  end

  def self.runes
    rune_data["Runes"]
  end

  def self.rune_stats
    rune_data["Stats"]
  end
end
