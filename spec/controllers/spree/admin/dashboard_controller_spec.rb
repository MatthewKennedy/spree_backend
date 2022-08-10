require "spec_helper"

describe Spree::Dash::DashboardController do
  render_views

  stub_authorization!

  describe "#show" do
    it "renders welcome page" do
      get :show
      expect(response).to have_http_status(200)
    end
  end
end
