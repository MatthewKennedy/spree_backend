require "spec_helper"

describe Spree::Dash::ErrorsController, type: :controller do
  let(:user) { create(:user) }

  before { allow(controller).to receive_messages(spree_current_user: user) }

  context "#forbidden" do
    shared_context "should be able to display forbidden page" do
      it do
        get :forbidden
        expect(response).to have_http_status(403)
      end
    end

    context "user with dash role" do
      before { user.spree_roles << Spree::Role.find_or_create_by(name: "dash") }

      it_behaves_like "should be able to display forbidden page"
    end

    context "user without dash role" do
      it_behaves_like "should be able to display forbidden page"
    end
  end
end
