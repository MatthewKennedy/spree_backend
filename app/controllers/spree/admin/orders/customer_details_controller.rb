module Spree
  module Admin
    module Orders
      class CustomerDetailsController < Spree::Admin::BaseController
        include Spree::Admin::OrderConcern

        before_action :load_order
        before_action :load_user, only: :update, unless: :guest_checkout?

        def show
          edit
          render action: :edit
        end

        def edit
          @order.build_bill_address(country: current_store.default_country) if @order.bill_address.nil?
          @order.build_ship_address(country: current_store.default_country) if @order.ship_address.nil?

          @order.assign_attributes(order_params)
        end

        def update
          reset_address if guest_checkout?

          if @order.update(order_params)
            @order.associate_user!(@user) if @user.present?

            @order.next if @order.address?
            @order.refresh_shipment_rates(Spree::ShippingMethod::DISPLAY_ON_BACK_END)

            if @order.errors.empty?
              flash[:success] = Spree.t("customer_details_updated")
              redirect_to spree.edit_admin_order_url(@order)
            else
              render action: :edit, status: :unprocessable_entity
            end
          else
            render action: :edit, status: :unprocessable_entity
          end
        end

        private

        def order_params
          params.fetch(:order, {}).permit(
            :email, :user_id, :use_billing,
            bill_address_attributes: permitted_address_attributes,
            ship_address_attributes: permitted_address_attributes
          )
        end

        def model_class
          Spree::Order
        end

        def load_user
          return if guest_checkout?

          @user = (Spree.user_class.find_by(id: order_params[:user_id]) ||
            Spree.user_class.find_by(email: order_params[:email]))

          unless @user
            flash.now[:error] = Spree.t(:user_not_found)
            render :edit
          end
        end

        def guest_checkout?
          return true if params[:order][:user_id].blank?
        end

        def reset_address
          @order.email = nil if params[:order][:email].blank?
          @order.bill_address_id = nil
          @order.ship_address_id = nil
        end
      end
    end
  end
end
