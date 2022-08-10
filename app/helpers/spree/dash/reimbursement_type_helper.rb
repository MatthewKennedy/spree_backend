module Spree
  module Dash
    module ReimbursementTypeHelper
      def reimbursement_type_name(reimbursement_type)
        reimbursement_type.present? ? reimbursement_type.name.humanize : ""
      end
    end
  end
end
