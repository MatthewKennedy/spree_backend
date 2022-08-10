module Spree
  module Dash
    class PromotionsController < ResourceController
      before_action :load_data, except: :clone

      helper "spree/dash/promotion_rules"

      def clone
        promotion = current_store.promotions.find(params[:id])
        duplicator = Spree::PromotionHandler::PromotionDuplicator.new(promotion)

        @new_promo = duplicator.duplicate

        if @new_promo.errors.empty?
          flash[:success] = I18n.t("spree.dash.promotion_cloned")
          redirect_to spree.edit_dash_promotion_url(@new_promo)
        else
          flash[:error] = I18n.t("spree.dash.promotion_not_cloned", error: @new_promo.errors.full_messages.to_sentence)
          redirect_to spree.dash_promotions_url(@new_promo)
        end
      end

      protected

      def location_after_save
        spree.edit_dash_promotion_url(@promotion)
      end

      def load_data
        @actions = Rails.application.config.spree.promotions.actions

        @calculators = Rails.application.config.spree.calculators.promotion_actions_create_adjustments
        @promotion_categories = Spree::PromotionCategory.order(:name)
      end

      def collection
        return @collection if defined?(@collection)

        params[:q] ||= HashWithIndifferentAccess.new
        params[:q][:s] ||= "id desc"

        @collection = super
        @search = @collection.ransack(params[:q])
        @collection = @search.result(distinct: true)
          .includes(promotion_includes)
          .page(params[:page])
          .per(params[:per_page] || Spree::Dash::Config[:dash_promotions_per_page])
      end

      def promotion_includes
        [:promotion_actions]
      end
    end
  end
end
