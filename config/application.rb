require_relative "boot"

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module Leagueanalytics
  class Application < Rails::Application
    config.load_defaults 6.1

    config.autoload_paths << Rails.root.join('app/services')

    config.react.server_renderer_extensions = ["jsx", "js", "tsx", "ts"]

    config.generators.system_tests = nil
  end
end
