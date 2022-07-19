module Spree
  module Admin
    class OptionValuesController < ResourceController
      belongs_to "spree/option_type"
    end
  end
end
