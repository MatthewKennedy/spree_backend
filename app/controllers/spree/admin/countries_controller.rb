module Spree
  module Admin
    class CountriesController < ResourceController
      private

      def collection
        super.order(:name)
      end

      def load_main_menu_panel
        @menu_panel_kind = "settings"
      end
    end
  end
end
