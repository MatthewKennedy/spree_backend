module Spree
  module Admin
    class ProductPropertiesController < ResourceController
      belongs_to "spree/product", find_by: :slug
      before_action :setup_property, only: :index

      private

      def setup_property
        @product.product_properties.build
      end

      def location_after_save
        spree.admin_product_product_properties_path
      end
    end
  end
end
