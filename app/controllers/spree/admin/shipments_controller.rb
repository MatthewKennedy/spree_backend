module Spree
  module Admin
    class ShipmentsController < ResourceController
      def add_item
        result = add_item_service.call(
          shipment: @shipment,
          variant_id: params.dig(:shipment, :variant_id),
          quantity: params.dig(:shipment, :quantity)
        )

        if result.success?
          redirect_to spree.admin_order_path(@shipment.order)
        else
          flash[:error] = result.error.to_s
        end
      end

      def increment_item
        existing_line_item = @shipment.line_items.select { |li| li.variant_id == params.dig(:shipment, :variant_id).to_i }

        if existing_line_item[0].quantity < params.dig(:shipment, :quantity).to_i
          increment_by = (params.dig(:shipment, :quantity).to_i - existing_line_item[0].quantity)

          params[:shipment][:quantity] = increment_by
          add_item
        else
          increment_by = (existing_line_item[0].quantity - params.dig(:shipment, :quantity).to_i)

          params[:shipment][:quantity] = increment_by
          remove_item
        end
      end

      def remove_item
        result = remove_item_service.call(
          shipment: @shipment,
          variant_id: params.dig(:shipment, :variant_id),
          quantity: params.dig(:shipment, :quantity)
        )

        if result.success?
          redirect_to spree.admin_order_path(@shipment.order)
        else
          flash[:error] = result.error.to_s
        end
      end

      private

      def find_resource
        Spree::Shipment.find(params[:id])
      end

      def permitted_resource_params
        params.require(:shipment).permit(permitted_shipment_attributes + [:variant_id, :quantity, :order_id])
      end

      def create_service
        Spree::Backend::Dependencies.platform_shipment_create_service.constantize
      end

      def update_service
        Spree::Backend::Dependencies.platform_shipment_update_service.constantize
      end

      def change_state_service
        Spree::Backend::Dependencies.platform_shipment_change_state_service.constantize
      end

      def add_item_service
        Spree::Backend::Dependencies.platform_shipment_add_item_service.constantize
      end

      def remove_item_service
        Spree::Backend::Dependencies.platform_shipment_remove_item_service.constantize
      end
    end
  end
end
