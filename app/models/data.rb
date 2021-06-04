class Data
  def self.champions
    @@champions ||= YAML.load_file('app/data/champion_stats.yml')
  end

  def self.items
    @@items ||= YAML.load_file('app/data/item_stats.yml')
  end

  def self.rune_data
    @@rune_data ||= YAML.load_file('app/data/runes.yml')
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
