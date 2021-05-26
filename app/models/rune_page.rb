class RunePage < ApplicationRecord
  belongs_to :user
  has_many :builds, through: :builds_rune_pages

  validates :name, :keystone, :primary_1, :primary_2, :primary_3, :secondary_1, :secondary_2,
            :stat_1, :stat_2, :stat_3, presence: true
  validate :runes_are_valid

  def keystones
    Data.keystones
  end

  def runes
    Data.runes
  end

  def stats
    Data.rune_stats
  end

  def paths
    Data.rune_paths
  end

  def primary_path
    path_for_keystone(keystone)
  end

  def secondary_path
    path_for_rune(secondary_1)
  end

  private

  def path_for_keystone(keystone_name)
    paths.each { |path| return path if keystones[path].include? keystone_name }
    nil
  end

  def path_for_rune(rune_name)
    paths.each { |path| return path if rune_in_path?(path, rune_name) }
    nil
  end

  def rune_in_path?(path, rune_name)
    runes[path][:first_row].include?(rune_name) ||
    runes[path][:second_row].include?(rune_name) ||
    runes[path][:third_row].include?(rune_name)
  end

  def rune_row(rune_name)
    runes.each do |path, rows|
      rows.each do |row, row_runes|
        return row if row_runes.include? rune_name
      end
    end
  end

  def runes_are_valid
    errors.add(:keystone, "invalid keystone") unless primary_path.present?
    errors.add(:primary_1, "invalid primary rune in first row")  unless runes[primary_path]['first_row'].include?  primary_1
    errors.add(:primary_2, "invalid primary rune in second row") unless runes[primary_path]['second_row'].include? primary_2
    errors.add(:primary_3, "invalid primary rune in third row")  unless runes[primary_path]['third_row'].include?  primary_3

    row1 = rune_row(secondary_1)
    row2 = rune_row(secondary_2)
    errors.add(:secondary_1, "invalid first secondary rune")  unless row1.present?
    errors.add(:secondary_2, "invalid second secondary rune") unless row2.present?
    errors.add(:secondary_1, "secondary runes can't belong to the same row") unless row1 != row2

    errors.add(:stat_1, "invalid stat in first row")  unless stats['first_row'].include?  stat_1
    errors.add(:stat_2, "invalid stat in second row") unless stats['second_row'].include? stat_2
    errors.add(:stat_3, "invalid stat in third row")  unless stats['third_row'].include?  stat_3
  end
end
