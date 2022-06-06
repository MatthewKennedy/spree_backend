module Spree
  module Admin
    class LineItemsController < ResourceController
      include Spree::Admin::OrderConcern
      before_action :load_order, only: [:create]

      def create
        @variant = current_store.variants.find(permitted_resource_params[:variant_id])

        result = add_item_service.call(
          order: @order,
          variant: @variant,
          quantity: permitted_resource_params[:quantity]
        )

        if result.success?
          @order.update_with_updater!
          redirect_to spree.admin_order_path(@order)
        else
          flash[:error] = result.error.to_s
        end
      end

      def update
        @order = @line_item.order
        result = update_service.call(line_item: @object, line_item_attributes: permitted_resource_params)

        if result.success?
          @order.update_with_updater!
          redirect_to spree.admin_order_path(@order)
        else
          flash[:error] = result.error.to_s
        end
      end

      def destroy
        result = destroy_service.call(line_item: @object)

        if result.success?
          redirect_to spree.admin_order_path(@line_item.order)
        else
          flash[:error] = result.error.to_s
        end
      end

      private

      def add_item_service
        Spree::Backend::Dependencies.platform_line_item_add_item_service.constantize
      end

      def create_service
        Spree::Backend::Dependencies.platform_line_item_create_service.constantize
      end

      def update_service
        Spree::Backend::Dependencies.platform_line_item_update_service.constantize
      end

      def destroy_service
        Spree::Backend::Dependencies.platform_line_item_destroy_service.constantize
      end

      def permitted_resource_params
        params.require(:line_item).permit(permitted_line_item_attributes)
      end
    end
  end
end
