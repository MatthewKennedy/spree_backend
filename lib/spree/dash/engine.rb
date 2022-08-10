require_relative "configuration"

module Spree
  module Dash
    class Engine < ::Rails::Engine
      config.middleware.use "Spree::Dash::Middleware::SeoAssist"

      initializer "spree.dash.environment", before: :load_config_initializers do |_app|
        Spree::Dash::Config = Spree::Dash::Configuration.new
      end

      # filter sensitive information during logging
      initializer "spree.params.filter" do |app|
        app.config.filter_parameters += [:password, :password_confirmation, :number]
      end

      initializer "spree.dash.checking_deprecated_preferences" do
        Spree::Dash::Config.deprecated_preferences.each do |pref|
          # FIXME: we should only notify about deprecated preferences that are in use, not all of them
          # warn "[DEPRECATION] Spree::Dash::Config[:#{pref[:name]}] is deprecated. #{pref[:message]}"
        end
      end
    end
  end
end
