module Spree
  module Dash
    module Generators
      class InstallGenerator < Rails::Generators::Base
        desc "Installs Spree Dash"

        def self.source_paths
          [
            File.expand_path("templates", __dir__),
            File.expand_path("../templates", "../#{__FILE__}"),
            File.expand_path("../templates", "../../#{__FILE__}")
          ]
        end

        def install
          template "vendor/assets/javascripts/spree/dash/all.js"
          template "vendor/assets/stylesheets/spree/dash/all.css"
          template "app/javascript/spree_dash.js"
          template "app/assets/stylesheets/spree/dash.scss"
        end
      end
    end
  end
end
