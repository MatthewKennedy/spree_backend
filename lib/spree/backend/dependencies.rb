module Spree
  module Backend
    class Dependencies
      include Spree::DependenciesHelper

      INJECTION_POINTS = [
        :platform_admin_user_serializer, :platform_coupon_handler, :platform_order_update_service,
        :platform_order_use_store_credit_service, :platform_order_remove_store_credit_service,
        :platform_order_complete_service, :platform_order_empty_service, :platform_order_destroy_service,
        :platform_order_next_service, :platform_order_advance_service, :platform_order_add_item_service,
        :platform_line_item_create_service, :platform_line_item_update_service,
        :platform_line_item_destroy_service, :platform_line_item_add_item_service,
        :platform_order_approve_service, :platform_order_cancel_service,
        :platform_shipment_change_state_service, :platform_shipment_create_service, :platform_shipment_update_service,
        :platform_shipment_add_item_service, :platform_shipment_remove_item_service
      ].freeze

      attr_accessor(*INJECTION_POINTS)

      def initialize
        set_platform_defaults
      end

      private

      def set_platform_defaults
        # coupon code handler
        @platform_coupon_handler = Spree::Dependencies.coupon_handler

        # order services
        @platform_order_recalculate_service = Spree::Dependencies.cart_recalculate_service
        @platform_order_update_service = Spree::Dependencies.checkout_update_service
        @platform_order_empty_service = Spree::Dependencies.cart_empty_service
        @platform_order_destroy_service = Spree::Dependencies.cart_destroy_service
        @platform_order_next_service = Spree::Dependencies.checkout_next_service
        @platform_order_advance_service = Spree::Dependencies.checkout_advance_service
        @platform_order_complete_service = Spree::Dependencies.checkout_complete_service
        @platform_order_use_store_credit_service = Spree::Dependencies.checkout_add_store_credit_service
        @platform_order_remove_store_credit_service = Spree::Dependencies.checkout_remove_store_credit_service
        @platform_order_approve_service = Spree::Dependencies.order_approve_service
        @platform_order_cancel_service = Spree::Dependencies.order_cancel_service
        @platform_order_add_item_service = Spree::Dependencies.cart_add_item_service

        # line item services
        @platform_line_item_add_item_service = Spree::Dependencies.cart_add_item_service
        @platform_line_item_create_service = Spree::Dependencies.line_item_create_service
        @platform_line_item_update_service = Spree::Dependencies.line_item_update_service
        @platform_line_item_destroy_service = Spree::Dependencies.line_item_destroy_service

        # shipment services
        @platform_shipment_create_service = Spree::Dependencies.shipment_create_service
        @platform_shipment_update_service = Spree::Dependencies.shipment_update_service
        @platform_shipment_change_state_service = Spree::Dependencies.shipment_change_state_service
        @platform_shipment_add_item_service = Spree::Dependencies.shipment_add_item_service
        @platform_shipment_remove_item_service = Spree::Dependencies.shipment_remove_item_service
      end
    end
  end
end
