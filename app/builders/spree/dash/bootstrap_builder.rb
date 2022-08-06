module Spree
  module Dash
    class BootstrapBuilder < ActionView::Helpers::FormBuilder
      # include ActionView::Helpers::TagHelper
      # include ActionView::Context

      def label(method, text = nil, options = {})
        super(method, text, options.reverse_merge(class: "form-label"))
      end

      def check_box(method, options = {}, checked_value = "1", unchecked_value = "0")
        super(method, options.reverse_merge(class: "form-check-input", data: {form_state_target: "watch"}), checked_value, unchecked_value)
      end

      def text_field(method, options = {})
        super(method, options.reverse_merge(placeholder: method.to_s.capitalize, class: "form-control", data: {form_state_target: "watch"}, autocomplete: false))
      end

      def text_area(method, options = {})
        super(method, options.reverse_merge(placeholder: method.to_s.capitalize, class: "form-control", data: {form_state_target: "watch"}))
      end

      def select(object_name, method_name, template_object, options = {})
        super(object_name, method_name, template_object, options.reverse_merge(class: "form-select", data: {controller: "ts--select", form_state_target: "watch"}))
      end

      def file_field(method, options = {})
        super(method, options.reverse_merge(class: "form-control", data: {form_state_target: "watch"}))
      end

      # def div_radio_button(method, tag_value, options = {})
      #   @template.content_tag(:div,
      #     @template.radio_button(
      #       @object_name, method, tag_value, objectify_options(options)
      #     ))
      # end
    end
  end
end
