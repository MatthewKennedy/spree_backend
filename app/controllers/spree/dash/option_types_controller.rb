module Spree
  module Dash
    class OptionTypesController < ResourceController
      protected

      def location_after_save
        spree.edit_dash_option_type_url(@option_type)
      end
    end
  end
end
