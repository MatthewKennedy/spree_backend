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
          template "app/javascript/spree_dash.js"
        end
      end
    end
  end
end
