module Spree
  module Dash
    module OrderConcern
      extend ActiveSupport::Concern

      included do
        rescue_from ActiveRecord::RecordNotFound, with: :resource_not_found
      end

      protected

      def load_order
        @order = current_store.orders.find_by!(number: params[:order_id] || params[:id])
        authorize! action, @order
        @order
      end

      def resource_not_found
        flash[:error] = flash_message_for(model_class.new, :not_found)
        redirect_to spree.dash_orders_path
      end
    end
  end
end