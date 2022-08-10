require "spec_helper"

describe Spree do
  describe ".dash_path" do
    it { expect(described_class.dash_path).to eq(Spree::Dash::Config[:dash_path]) }
  end

  describe ".dash_path=" do
    let!(:original_dash_path) { described_class.dash_path }
    let(:new_dash_path) { "/dash-secret-path" }

    before do
      described_class.dash_path = new_dash_path
    end

    after do
      described_class.dash_path = original_dash_path
    end

    it { expect(described_class.dash_path).to eq(new_dash_path) }
    it { expect(Spree::Dash::Config[:dash_path]).to eq(new_dash_path) }
  end
end
