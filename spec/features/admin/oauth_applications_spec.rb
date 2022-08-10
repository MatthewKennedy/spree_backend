require "spec_helper"

describe "Stock Transfers", type: :feature, js: true do
  stub_authorization!

  let!(:oauth_application) { create(:oauth_application, name: "Test app") }

  it "renders a list of applications" do
    visit "/dash/oauth_applications"

    expect(page).to have_content("Test app")
  end

  it "can create a new app" do
    visit "/dash/oauth_applications/new"

    fill_in "Name", with: "My app"
    fill_in "Scope", with: "dash"
    click_button "Create"

    expect(page).to have_content("Client ID")
    expect(page).to have_content("Client Secret")
    expect(page).to have_content(Spree::OauthApplication.last.uid)
  end

  it "can modify existing app" do
    visit "/dash/oauth_applications/#{oauth_application.id}/edit"

    fill_in "Name", with: "New name"
    click_button "Update"

    expect(page).to have_content("successfully updated!")
    expect(page).to have_content("New name")
  end
end
