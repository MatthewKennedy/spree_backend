module Spree
  module Dash
    class BaseController < ApplicationController
      include Spree::Core::ControllerHelpers::Auth
      include Spree::Core::ControllerHelpers::Search
      include Spree::Core::ControllerHelpers::Store
      include Spree::Core::ControllerHelpers::StrongParameters
      include Spree::Core::ControllerHelpers::Locale
      include Spree::Core::ControllerHelpers::Currency

      respond_to :html

      helper "spree/base"
      helper "spree/dash/navigation"
      helper "spree/locale"
      helper "spree/currency"
      layout "spree/layouts/dash"

      before_action :authorize_dash, :load_stores, :load_main_menu_panel

      helper_method :dash_oauth_token, :stream_flash_alert

      protected

      def action
        params[:action].to_sym
      end

      def authorize_dash
        record = if respond_to?(:model_class, true) && model_class
          model_class
        else
          controller_name.to_sym
        end
        authorize! :dash, record
        authorize! action, record
      end

      def redirect_unauthorized_access
        if try_spree_current_user
          flash[:error] = Spree.t(:authorization_failure)
          redirect_to spree.dash_forbidden_path
        else
          store_location
          if defined?(spree.dash_login_path)
            redirect_to spree.dash_login_path
          elsif respond_to?(:spree_login_path)
            redirect_to spree_login_path
          elsif spree.respond_to?(:root_path)
            redirect_to spree.root_path
          else
            redirect_to main_app.respond_to?(:root_path) ? main_app.root_path : "/"
          end
        end
      end

      def flash_message_for(object, event_sym)
        resource_desc = object.class.model_name.human
        resource_desc += " \"#{object.name}\"" if (object.persisted? || object.destroyed?) && object.respond_to?(:name) && object.name.present? && !object.is_a?(Spree::Order)
        Spree.t(event_sym, resource: resource_desc)
      end

      def stream_flash_alert(message: I18n.t("spree.dash.no_message_set"))
        respond_to do |format|
          format.turbo_stream do
            render turbo_stream: turbo_stream.append("FlashAlertsContainer", partial: "spree/dash/shared/toast", locals: {message: message})
          end
        end
      end

      def config_locale
        Spree::Dash::Config[:locale]
      end

      def stores_scope
        Spree::Store.accessible_by(current_ability, :show)
      end

      def load_stores
        @stores = stores_scope.order(default: :desc)
      end

      def load_main_menu_panel
        @menu_panel_kind = "main"
      end

      def can_not_transition_without_customer_info
        unless @order.billing_address.present?
          flash[:notice] = Spree.t(:fill_in_customer_info)
          redirect_to spree.edit_dash_order_url(@order)
        end
      end

      def dash_oauth_application
        @dash_oauth_application ||= Spree::OauthApplication.find_or_create_by!(name: "Admin Panel", scopes: "dash", redirect_uri: "")
      end

      # FIXME: auto-expire this token
      def dash_oauth_token
        user = try_spree_current_user
        return unless user

        @dash_oauth_token ||= begin
          Spree::OauthAccessToken.active_for(user).where(application_id: dash_oauth_application.id).last ||
            Spree::OauthAccessToken.create!(
              resource_owner: user,
              application_id: dash_oauth_application.id,
              scopes: dash_oauth_application.scopes
            )
        end.token
      end
    end
  end
end
