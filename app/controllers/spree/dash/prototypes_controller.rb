module Spree
  module Dash
    class PrototypesController < ResourceController
      def show
        redirect_to spree.dash_prototypes_path
      end
    end
  end
end
