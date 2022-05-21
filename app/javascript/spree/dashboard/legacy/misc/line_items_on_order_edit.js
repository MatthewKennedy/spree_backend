// This file contains the code for interacting with line items in the manual cart
document.addEventListener('spree:load', function () {
  'use strict'

  // handle variant selection, show stock level.
  $('#add_line_item_variant_id').change(function () {
    const variantId = $(this).val().toString()

    const variant = _.find(window.variants, function (variant) {
      return variant.id.toString() == variantId
    })
    $('#stock_details').html(variantLineItemTemplate({ variant: variant }))
    $('#stock_details').show()
    $('button.add_variant').click(addVariant)
  })
})

function addVariant () {
  $('#stock_details').hide()
  const variantId = $('select.variant_autocomplete').val()
  const quantity = parseInt($('input#variant_quantity').val())

  adjustLineItems(order_id, variantId, quantity)
  return 1
}

const adjustLineItems = function (order_id, variant_id, quantity) {
  $.ajax({
    type: 'POST',
    url: SpreeDash.routes.line_items_api_v2,
    data: {
      line_item: {
        order_id: order_id,
        variant_id: variant_id,
        quantity: quantity
      }
    },
    headers: SpreeDash.apiV2Authentication()
  }).done(function () {
    window.SpreeDash.advanceOrder()
    window.location.reload()
  }).fail(function (response) {
    SpreeDash.showFlash('error', response.responseJSON.error)
  })
}
