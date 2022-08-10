module Spree
  module Dash
    class StateChangesController < Spree::Dash::BaseController
      include Spree::Dash::OrderConcern

      before_action :load_order, only: [:index]

      def index
        @state_changes = @order.state_changes.includes(:user).order(created_at: :desc)
      end
    end
  end
end
