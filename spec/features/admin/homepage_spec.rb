require "spec_helper"

describe "Homepage", type: :feature do
  context "as dash user" do
    stub_authorization!

    context "visiting the homepage" do
      before do
        visit spree.dash_path
      end

      it "has a link to products" do
        expect(page).to have_link("Products", href: "/dash/products")
      end

      it "has a link to stock" do
        expect(page).to have_link("Stock", href: "#sidebar-stock")
      end

      it "has a link to reports" do
        expect(page).to have_link("Reports", href: "/dash/reports")
      end

      it "has a link to settings" do
        expect(page).to have_link("Settings", href: "#sidebar-configuration")
      end

      it "has a link to return authorizations" do
        within(".sidebar") { expect(page).to have_link("Return Authorizations", href: "/dash/return_authorizations") }
      end

      it "has a link to customer returns" do
        within(".sidebar") { expect(page).to have_link("Customer Returns", href: "/dash/customer_returns") }
      end

      context "version number" do
        it "is displayed" do
          within(".sidebar") { expect(page).to have_content(Spree.version) }
        end

        context "if turned off" do
          before { Spree::Dash::Config[:dash_show_version] = false }

          it "is not displayed" do
            visit spree.dash_path
            within(".sidebar") { expect(page).not_to have_content(Spree.version) }
          end
        end
      end
    end

    context "visiting the orders tab" do
      before do
        visit spree.dash_orders_path(q: {completed_at_not_null: "1"})
      end

      it "has a link to all orders" do
        within(".sidebar") { expect(page).to have_link("All Orders", href: "/dash/orders?q%5Bcompleted_at_not_null%5D=1") }
      end

      it "has a link to draft orders" do
        within(".sidebar") { expect(page).to have_link("Draft Orders", href: "/dash/orders?q%5Bcompleted_at_not_null%5D=false&q%5Bstate_eq%5D=cart") }
      end

      it "has a link to abandoned checkouts" do
        within(".sidebar") { expect(page).to have_link("Abandoned Checkouts", href: "/dash/orders?q%5Bcompleted_at_not_null%5D=false&q%5Bstate_in%5D%5B%5D=address&q%5Bstate_in%5D%5B%5D=delivery&q%5Bstate_in%5D%5B%5D=payment&q%5Bstate_in%5D%5B%5D=confirm") }
      end
    end

    context "visiting the products tab" do
      before do
        visit spree.dash_products_path
      end

      it "has a link to products" do
        within(".sidebar") { expect(page).to have_link("Products", href: "/dash/products") }
      end

      it "has a link to option types" do
        within(".sidebar") { expect(page).to have_link("Option Types", href: "/dash/option_types") }
      end

      it "has a link to properties" do
        within(".sidebar") { expect(page).to have_link("Properties", href: "/dash/properties") }
      end

      it "has a link to prototypes" do
        within(".sidebar") { expect(page).to have_link("Prototypes", href: "/dash/prototypes") }
      end
    end

    context "visiting the stock tab" do
      before do
        visit spree.dash_stock_transfers_path
      end

      it "has a link to stock transfers" do
        within(".sidebar") { expect(page).to have_link("Stock Transfers", href: "/dash/stock_transfers") }
      end

      it "has a link to stock locations" do
        within(".sidebar") { expect(page).to have_link("Stock Locations", href: "/dash/stock_locations") }
      end
    end
  end

  context "as fakedispatch user" do
    let(:dash_app) { Spree::OauthApplication.create(name: "Admin Panel", scopes: "dash") }
    let(:dash_token) { Spree::OauthAccessToken.create!(application: dash_app, scopes: "dash").token }

    before do
      allow_any_instance_of(Spree::Dash::BaseController).to receive(:spree_current_user).and_return(Spree.user_class.new)
      allow_any_instance_of(Spree::Dash::BaseController).to receive(:dash_oauth_application).and_return(dash_app)
      allow_any_instance_of(Spree::Dash::BaseController).to receive(:dash_oauth_token).and_return(dash_token)
    end

    custom_authorization! do |_user|
      can [:dash, :edit, :index, :read], Spree::Order
    end

    it "only displays tabs fakedispatch has access to" do
      visit spree.dash_path
      expect(page).to have_link("Orders")
      expect(page).not_to have_link("Products")
      expect(page).not_to have_link("Promotions")
      expect(page).not_to have_link("Reports")
      expect(page).not_to have_link("Settings")
    end
  end
end
