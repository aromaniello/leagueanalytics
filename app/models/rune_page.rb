class RunePage < ApplicationRecord
  belongs_to :user
  has_many :builds, through: :builds_rune_pages

  validates :name, :keystone, :primary_1, :primary_2, :primary_3, :secondary_1, :secondary_2,
            :stat_1, :stat_2, :stat_3, presence: true
  validate :runes_are_valid

  def keystones
    {
      precision: [
        :press_the_attack,
        :lethal_tempo,
        :fleet_footwork,
        :conqueror
      ],
      domination: [
        :electrocute,
        :predator,
        :dark_harvest,
        :hail_of_blades
      ],
      sorcery: [
        :summon_aery,
        :arcane_comet,
        :phase_rush
      ],
      resolve: [
        :grasp_of_the_undying,
        :aftershock,
        :guardian
      ],
      inspiration: [
        :glacial_augment,
        :unsealed_spellbook,
        :prototype_omnistone
      ]
    }
  end

  def runes
    {
      precision: {
        first_row: [
          :overheal,
          :triumph,
          :presence_of_mind
        ],
        second_row: [
          :legend_alacrity,
          :legend_tenacity,
          :legend_bloodline
        ],
        third_row: [
          :coup_de_grace,
          :cut_down,
          :last_stand
        ]
      },
      domination: {
        first_row: [
          :cheap_shot,
          :taste_of_blood,
          :sudden_impact
        ],
        second_row: [
          :zombie_ward,
          :ghost_poro,
          :eyeball_collection
        ],
        third_row: [
          :ravenous_hunter,
          :ingenious_hunter,
          :relentless_hunter,
          :ultimate_hunter
        ]
      },
      sorcery: {
        first_row: [
          :nullifying_orb,
          :manaflow_band,
          :nimbus_cloak
        ],
        second_row: [
          :transcencence,
          :celerity,
          :absolute_focus
        ],
        third_row: [
          :scorch,
          :waterwalking,
          :gathering_storm
        ]
      },
      resolve: {
        first_row: [
          :demolish,
          :font_of_life,
          :shield_bash
        ],
        second_row: [
          :conditioning,
          :second_wind,
          :bone_plating
        ],
        third_row: [
          :overgrowth,
          :revitalize,
          :unflinching
        ]
      },
      inspiration: {
        first_row: [
          :hextech_flashtraption,
          :magical_footwear,
          :perfect_timing
        ],
        second_row: [
          :futures_market,
          :minion_dematerializer,
          :biscuit_delivery
        ],
        third_row: [
          :cosmic_insight,
          :approach_velocity,
          :timewarp_tonic
        ]
      }
    }
  end

  def stats
    {
      first_row: [
        :adaptive_force,
        :attack_speed,
        :ability_haste
      ],
      second_row: [
        :adaptive_force,
        :armor,
        :magic_resist
      ],
      third_row: [
        :health,
        :armor,
        :magic_resist
      ]
    }
  end

  def paths
    %i[precision domination sorcery resolve inspiration]
  end

  def primary_path
    path_for_keystone(keystone)
  end

  def secondary_path
    path_for_rune(secondary_1)
  end

  private

  def path_for_keystone(keystone_name)
    paths.each { |path| return path if keystones[path].include? keystone_name.to_sym }
    nil
  end

  def path_for_rune(rune_name)
    paths.each { |path| return path if rune_in_path?(path, rune_name.to_sym) }
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
    errors.add(:primary_1, "invalid primary rune in first row")  unless runes[primary_path][:first_row].include?  primary_1.to_sym
    errors.add(:primary_2, "invalid primary rune in second row") unless runes[primary_path][:second_row].include? primary_2.to_sym
    errors.add(:primary_3, "invalid primary rune in third row")  unless runes[primary_path][:third_row].include?  primary_3.to_sym

    row1 = rune_row(secondary_1.to_sym)
    row2 = rune_row(secondary_2.to_sym)
    errors.add(:secondary_1, "invalid first secondary rune")  unless row1.present?
    errors.add(:secondary_2, "invalid second secondary rune") unless row2.present?
    errors.add(:secondary_1, "secondary runes can't belong to the same row") unless row1 != row2

    errors.add(:stat_1, "invalid stat in first row")  unless stats[:first_row].include?  stat_1.to_sym
    errors.add(:stat_2, "invalid stat in second row") unless stats[:second_row].include? stat_2.to_sym
    errors.add(:stat_3, "invalid stat in third row")  unless stats[:third_row].include?  stat_3.to_sym
  end
end
