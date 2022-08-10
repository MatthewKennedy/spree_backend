require "spec_helper"

module Spree
  module Dash
    RSpec.describe "DashPath", type: :routing do
      it "shoud route to dash by default" do
        expect(spree.dash_path).to eq("/dash")
      end

      it "routes to the the configured path" do
        Spree.dash_path = "/secret"
        Rails.application.reload_routes!
        expect(spree.dash_path).to eq("/secret")

        # restore the path for other tests
        Spree.dash_path = "/dash"
        Rails.application.reload_routes!
        expect(spree.dash_path).to eq("/dash")
      end
    end
  end
end
