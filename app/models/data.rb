class Data
  def self.champions
    @@champions ||= YAML.load_file('app/data/champions.yml')
  end

  def self.rune_paths
    @@rune_paths ||= YAML.load_file('app/data/runes.yml')["Paths"]
  end

  def self.keystones
    @@keystones ||= YAML.load_file('app/data/runes.yml')["Keystones"]
  end

  def self.runes
    @@runes ||= YAML.load_file('app/data/runes.yml')["Runes"]
  end

  def self.rune_stats
    @@rune_stats ||= YAML.load_file('app/data/runes.yml')["Stats"]
  end
end
