module Spree
  module Dash
    class ReturnItemsController < ResourceController
      def location_after_save
        spree.edit_dash_order_customer_return_path(@return_item.customer_return.order, @return_item.customer_return)
      end
    end
  end
end