module Spree
  module Admin
    class PrototypesController < ResourceController
      def show
        if request.xhr?
          render layout: false
        else
          redirect_to spree.admin_prototypes_path
        end
      end
    end
  end
end
