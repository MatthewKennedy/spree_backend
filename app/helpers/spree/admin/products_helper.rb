module Spree
  module Admin
    module ProductsHelper
      # will return a human readable string
      def available_status(product)
        return I18n.t("spree.admin.product.archived") if product.status == "archived"
        return I18n.t("spree.admin.product.deleted") if product.deleted?

        if product.available?
          I18n.t("spree.admin.product.active")
        else
          I18n.t("spree.admin.product.draft")
        end
      end
    end
  end
end
