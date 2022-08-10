module Spree
  module Dash
    class OptionValuesController < ResourceController
      belongs_to "spree/option_type"

      def location_after_save
        spree.edit_dash_option_type_url(@option_type)
      end
    end
  end
end
