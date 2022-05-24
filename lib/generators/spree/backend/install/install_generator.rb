module Spree
  module Backend
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
          template "vendor/assets/javascripts/spree/backend/all.js"
          template "vendor/assets/stylesheets/spree/backend/all.css"
          template "app/javascript/spree_dash.js"
          template "app/assets/stylesheets/spree/backend.scss"
        end
      end
    end
  end
end
