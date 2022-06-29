require_relative "configuration"
require_relative "dependencies"

module Spree
  module Backend
    class Engine < ::Rails::Engine
      config.middleware.use "Spree::Backend::Middleware::SeoAssist"

      initializer "spree.backend.environment", before: :load_config_initializers do |_app|
        Spree::Backend::Config = Spree::Backend::Configuration.new
        Spree::Backend::Dependencies = Spree::Backend::DashDependencies.new
      end

      # filter sensitive information during logging
      initializer "spree.params.filter" do |app|
        app.config.filter_parameters += [:password, :password_confirmation, :number]
      end

      initializer "spree.backend.checking_deprecated_preferences" do
        Spree::Backend::Config.deprecated_preferences.each do |pref|
          # FIXME: we should only notify about deprecated preferences that are in use, not all of them
          # warn "[DEPRECATION] Spree::Backend::Config[:#{pref[:name]}] is deprecated. #{pref[:message]}"
        end
      end
    end
  end
end
