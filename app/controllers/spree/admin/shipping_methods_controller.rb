module Spree
  module Admin
    class ShippingMethodsController < ResourceController
      before_action :load_data, except: :index
      before_action :set_shipping_category, only: [:create, :update]
      before_action :set_zones, only: [:create, :update]

      private

      def load_main_menu_panel
        @menu_panel_kind = "settings"
      end

      def set_shipping_category
        return true if params["shipping_method"][:shipping_categories].blank?

        @shipping_method.shipping_categories = Spree::ShippingCategory.where(id: params["shipping_method"][:shipping_categories])
        @shipping_method.save
        params[:shipping_method].delete(:shipping_categories)
      end

      def set_zones
        return true if params["shipping_method"][:zones].blank?

        @shipping_method.zones = Spree::Zone.where(id: params["shipping_method"][:zones])
        @shipping_method.save
        params[:shipping_method].delete(:zones)
      end

      def location_after_save
        spree.edit_admin_shipping_method_path(@shipping_method)
      end

      def load_data
        @available_zones = Zone.order(:name)
        @tax_categories = Spree::TaxCategory.order(:name)
        @calculators = ShippingMethod.calculators.sort_by(&:name)
      end
    end
  end
end
