module Spree
  module Dash
    class CountriesController < ResourceController
      private

      def collection
        super.order(:name)
      end

      def load_main_menu_panel
        @menu_panel_kind = "settings"
      end

      def location_after_save
        spree.edit_dash_country_path(@object)
      end
    end
  end
end
