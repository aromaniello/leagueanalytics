class Champion
  attr_accessor :name, :level, :data

  def initialize(name, level)
    self.name = name
    self.level = level
    self.data = Data.champions[name]
  end

  def health
    data["base"]["health"] + (level - 1) * data["per_level"]["health"]
  end
end
