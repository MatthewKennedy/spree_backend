module Spree
  module Admin
    class WebhooksSubscribersController < ResourceController
      before_action :load_data
      create.before :process_subscriptions
      update.before :process_subscriptions

      def index
        params[:q] ||= {}
        params[:q][:s] ||= "created_at desc"

        search = Webhooks::Subscriber.accessible_by(current_ability).ransack(params[:q])
        @webhooks_subscribers = search.result
          .includes(:events)
          .page(params[:page])
          .per(params[:per_page])
      end

      def show
        @webhooks_subscriber = Webhooks::Subscriber.find(params[:id])
        @events = @webhooks_subscriber.events.order(created_at: :desc).page(params[:page]).per(params[:per_page])
      end

      private

      def load_main_menu_panel
        @menu_panel_kind = "settings"
      end

      def location_after_save
        spree.edit_admin_webhooks_subscriber_path(@object)
      end

      def resource
        @resource ||= Spree::Admin::Resource.new "spree/admin/webhooks/subscribers", "subscribers", nil
      end

      def process_subscriptions
        params[:webhooks_subscriber][:subscriptions] = if params[:subscribe_to_all_events] == "true"
          ["*"]
        else
          selected_events
        end

        params[:webhooks_subscriber] = params[:webhooks_subscriber].except(*@supported_events.keys)
      end

      def selected_events
        @supported_events.select { |resource, _events| params[:webhooks_subscriber][resource] == "true" }.values.flatten
      end

      def load_data
        @supported_events ||= Spree::Webhooks::Subscriber.supported_events
      end
    end
  end
end