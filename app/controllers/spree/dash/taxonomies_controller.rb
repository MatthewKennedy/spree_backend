module Spree
  module Dash
    class TaxonomiesController < ResourceController
      private

      def location_after_save
        if @taxonomy.previously_new_record?
          spree.edit_dash_taxonomy_url(@taxonomy)
        else
          spree.dash_taxonomies_url
        end
      end
    end
  end
end
