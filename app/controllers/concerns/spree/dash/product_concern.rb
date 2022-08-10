module Spree
  module Dash
    module ProductConcern
      extend ActiveSupport::Concern

      def product_scope
        current_store.products.accessible_by(current_ability, :index)
      end
    end
  end
end
