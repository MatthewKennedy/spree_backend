/* eslint-disable no-undef */

$.fn.optionValueAutocomplete = function (options) {
  'use strict'

  // Default options
  options = options || {}
  const multiple =
    typeof options.multiple !== 'undefined' ? options.multiple : true
  const productSelect = options.productSelect
  const productId = options.productId
  const values = options.values
  const clearSelection = options.clearSelection

  function addOptions (select, productId, values) {
    $.ajax({
      type: 'GET',
      url: SpreeDash.routes.option_values_api_v2,
      headers: SpreeDash.apiV2Authentication(),
      dataType: 'json',
      data: {
        filter: {
          id_in: values,
          variants_product_id_eq: productId
        }
      }
    }).then(function (data) {
      select.addSelect2Options(data.data)
    })
  }

  this.select2({
    multiple: multiple,
    minimumInputLength: 1,
    ajax: {
      url: SpreeDash.routes.option_values_api_v2,
      dataType: 'json',
      headers: SpreeDash.apiV2Authentication(),
      data: function (params) {
        const selectedProductId =
          typeof productSelect !== 'undefined' ? productSelect.val() : null

        return {
          filter: {
            name_cont: params.term,
            variants_product_id_eq: selectedProductId
          }
        }
      },
      processResults: function (data) {
        return formatSelect2Options(data)
      }
    }
  })

  if (values && productId && !clearSelection) {
    addOptions(this, productId, values)
  }

  if (clearSelection) {
    this.val(null).trigger('change')
  }
}
