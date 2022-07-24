module Spree
  module Admin
    class StatesController < ResourceController
      belongs_to "spree/country"
      before_action :load_data

      def index
        respond_with(@collection) do |format|
          format.html
        end
      end

      protected

      def load_main_menu_panel
        @menu_panel_kind = "settings"
      end

      def location_after_save
        admin_country_states_url(@country)
      end

      def collection
        super.order(:name)
      end

      def load_data
        @countries = Spree::Country.where(states_required: true).order(:name)
      end
    end
  end
end
