module Spree
  module Dash
    class ErrorsController < BaseController
      skip_before_action :authorize_dash

      def forbidden
        render status: 403
      end
    end
  end
end
