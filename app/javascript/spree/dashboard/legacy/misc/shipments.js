/* eslint-disable no-undef */

// Shipments AJAX API
document.addEventListener('spree:load', function () {
  'use strict'

  // handle variant selection, show stock level.
  $('#add_variant_id').change(function () {
    const variantId = $(this)
      .val()
      .toString()
    const variant = _.find(window.variants, function (variant) {
      return variant.id.toString() === variantId
    })

    $('#stock_details').html(variantStockTemplate({ variant: variant }))
    $('#stock_details').show()

    $('button.add_variant').click(addVariantFromStockLocation)
  })

  // handle edit click
  $('a.edit-item').click(toggleItemEdit)

  // handle cancel click
  $('a.cancel-item').click(toggleItemEdit)

  // handle split click
  $('a.split-item').click(startItemSplit)

  // handle save click
  $('a.save-item').click(function () {
    const save = $(this)
    const shipmentNumber = save.data('shipment-number')
    const variantId = save.data('variant-id')

    const quantity = parseInt(
      save
        .parents('tr')
        .find('input.line_item_quantity')
        .val()
    )

    toggleItemEdit()
    adjustShipmentItems(shipmentNumber, variantId, quantity)
    return false
  })

  // handle delete click
  $('a.delete-item').click(function (event) {
    if (confirm(SpreeDash.translations.are_you_sure_delete)) {
      const del = $(this)
      const shipmentNumber = del.data('shipment-number')
      const variantId = del.data('variant-id')
      // eslint-disable-next-line
      var url =
        SpreeDash.routes.shipments_api_v2 +
        '/' +
        shipmentNumber +
        '/remove_item'

      toggleItemEdit()

      $.ajax({
        type: 'PATCH',
        url: SpreeDash.url(url),
        data: {
          shipment: {
            variant_id: variantId
          }
        },
        headers: SpreeDash.apiV2Authentication()
      })
        .done(function (msg) {
          window.location.reload()
        })
        .fail(function (msg) {
          alert(msg.responseJSON.error)
        })
    }
    return false
  })

  // handle ship click
  $('[data-hook=admin_shipment_form] a.ship').on('click', function () {
    const link = $(this)
    const url = SpreeDash.url(
      SpreeDash.routes.shipments_api_v2 +
        '/' +
        link.data('shipment-number') +
        '/ship'
    )
    $.ajax({
      type: 'PATCH',
      url: url,
      headers: SpreeDash.apiV2Authentication()
    })
      .done(function () {
        window.location.reload()
      })
      .fail(function (msg) {
        alert(msg.responseJSON.error)
      })
  })

  // handle shipping method edit click
  $('a.edit-method').click(toggleMethodEdit)
  $('a.cancel-method').click(toggleMethodEdit)

  // handle shipping method save
  $('[data-hook=admin_shipment_form] a.save-method').on('click', function (
    event
  ) {
    event.preventDefault()

    const link = $(this)
    const shipmentNumber = link.data('shipment-number')
    const selectedShippingRateId = link
      .parents('tbody')
      .find(
        "select#selected_shipping_rate_id[data-shipment-number='" +
          shipmentNumber +
          "']"
      )
      .val()
    const unlock = link
      .parents('tbody')
      .find(
        "input[name='open_adjustment'][data-shipment-number='" +
          shipmentNumber +
          "']:checked"
      )
      .val()
    const url = SpreeDash.url(
      SpreeDash.routes.shipments_api_v2 + '/' + shipmentNumber + '.json'
    )

    $.ajax({
      type: 'PATCH',
      url: url,
      data: {
        shipment: {
          selected_shipping_rate_id: selectedShippingRateId,
          unlock: unlock
        }
      },
      headers: SpreeDash.apiV2Authentication()
    })
      .done(function () {
        window.location.reload()
      })
      .fail(function (msg) {
        alert(msg.responseJSON.error)
      })
  })

  function toggleTrackingEdit (event) {
    event.preventDefault()

    const link = $(this)
    link
      .parents('tbody')
      .find('tr.edit-tracking')
      .toggle()
    link
      .parents('tbody')
      .find('tr.show-tracking')
      .toggle()
  }

  // handle tracking edit click
  $('a.edit-tracking').click(toggleTrackingEdit)
  $('a.cancel-tracking').click(toggleTrackingEdit)

  function createTrackingValueContent (data) {
    if (data.attributes.tracking_url && data.attributes.tracking) {
      return (
        '<a target="_blank" href="' +
        data.attributes.tracking_url +
        '">' +
        data.attributes.tracking +
        '<a>'
      )
    }

    return data.attributes.tracking
  }

  // handle tracking save
  $('[data-hook=admin_shipment_form] a.save-tracking').on('click', function (
    event
  ) {
    event.preventDefault()

    const link = $(this)
    const shipmentNumber = link.data('shipment-number')
    const tracking = link
      .parents('tbody')
      .find('input#tracking')
      .val()
    const url = SpreeDash.url(
      SpreeDash.routes.shipments_api_v2 + '/' + shipmentNumber + '.json'
    )

    $.ajax({
      type: 'PATCH',
      url: url,
      data: {
        shipment: {
          tracking: tracking
        }
      },
      headers: SpreeDash.apiV2Authentication()
    }).done(function (json) {
      link
        .parents('tbody')
        .find('tr.edit-tracking')
        .toggle()

      const show = link.parents('tbody').find('tr.show-tracking')
      show.toggle()

      if (json.data.attributes.tracking) {
        show
          .find('.tracking-value')
          .html($('<strong>').html(SpreeDash.translations.tracking + ': '))
          .append(createTrackingValueContent(json.data))
      } else {
        show
          .find('.tracking-value')
          .html(SpreeDash.translations.no_tracking_present)
      }
    })
  })
})

function adjustShipmentItems (shipmentNumber, variantId, quantity) {
  const shipment = _.findWhere(shipments, { number: shipmentNumber + '' })
  const inventoryUnits = _.where(shipment.inventory_units, {
    variant_id: variantId
  })
  let url = SpreeDash.routes.shipments_api_v2 + '/' + shipmentNumber
  const previousQuantity = inventoryUnits.reduce(function (
    accumulator,
    currentUnit,
    _index,
    _array
  ) {
    return accumulator + currentUnit.quantity
  },
  0)
  let newQuantity = 0

  if (previousQuantity < quantity) {
    url += '/add_item'
    newQuantity = quantity - previousQuantity
  } else if (previousQuantity > quantity) {
    url += '/remove_item'
    newQuantity = previousQuantity - quantity
  }
  url += '.json'

  if (newQuantity !== 0) {
    $.ajax({
      type: 'PATCH',
      url: SpreeDash.url(url),
      data: {
        shipment: {
          variant_id: variantId,
          quantity: newQuantity
        }
      },
      headers: SpreeDash.apiV2Authentication()
    })
      .done(function (msg) {
        window.location.reload()
      })
      .fail(function (msg) {
        alert(msg.responseJSON.error)
      })
  }
}

function toggleMethodEdit () {
  const link = $(this)
  link
    .parents('tbody')
    .find('tr.edit-method')
    .toggle()
  link
    .parents('tbody')
    .find('tr.show-method')
    .toggle()

  return false
}

function toggleItemEdit () {
  const link = $(this)
  const linkParent = link.parent()
  linkParent.find('a.edit-item').toggle()
  linkParent.find('a.cancel-item').toggle()
  linkParent.find('a.split-item').toggle()
  linkParent.find('a.save-item').toggle()
  linkParent.find('a.delete-item').toggle()
  link
    .parents('tr')
    .find('td.item-qty-show')
    .toggle()
  link
    .parents('tr')
    .find('td.item-qty-edit')
    .toggle()

  return false
}

function startItemSplit (event) {
  event.preventDefault()
  $('.cancel-split').each(function () {
    $(this).click()
  })
  const link = $(this)
  link
    .parent()
    .find('a.edit-item')
    .toggle()
  link
    .parent()
    .find('a.split-item')
    .toggle()
  link
    .parent()
    .find('a.delete-item')
    .toggle()
  const variantId = link.data('variant-id')

  let variant = {}
  $.ajax({
    type: 'GET',
    async: false,
    url: SpreeDash.routes.variants_api_v2 + '/' + variantId,
    data: {
      include: 'stock_items.stock_location'
    },
    headers: SpreeDash.apiV2Authentication()
  })
    .done(function (json) {
      const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer
      new JSONAPIDeserializer({ keyForAttribute: 'snake_case' }).deserialize(
        json,
        function (_err, deserializedJson) {
          variant = deserializedJson

          const maxQuantity = link.closest('tr').data('item-quantity')
          const splitItemTemplate = Handlebars.compile(
            $('#variant_split_template').text()
          )

          link.closest('tr').after(
            splitItemTemplate({
              variant: variant,
              shipments: shipments,
              max_quantity: maxQuantity
            })
          )
          $('a.cancel-split').click(cancelItemSplit)
          $('a.save-split').click(completeItemSplit)

          $('#item_stock_location').select2({
            width: 'resolve',
            placeholder: SpreeDash.translations.item_stock_placeholder
          })
        }
      )
    })
    .fail(function (msg) {
      alert(msg.responseJSON.error)
    })
}

function completeItemSplit (event) {
  event.preventDefault()

  if ($('#item_stock_location').val() === '') {
    alert('Please select the split destination.')
    return false
  }

  const link = $(this)
  const stockItemRow = link.closest('tr')
  const variantId = stockItemRow.data('variant-id')
  const quantity = stockItemRow.find('#item_quantity').val()

  const stockLocationId = stockItemRow.find('#item_stock_location').val()
  const originalShipmentNumber = link.closest('tbody').data('shipment-number')

  const selectedShipment = stockItemRow.find(
    '#item_stock_location option:selected'
  )
  const targetShipmentNumber = selectedShipment.data('shipment-number')
  const newShipment = selectedShipment.data('new-shipment')

  if (stockLocationId != 'new_shipment') {
    let path, additionalData
    if (newShipment !== undefined) {
      // transfer to a new location data
      path = '/transfer_to_location'
      additionalData = { stock_location_id: stockLocationId }
    } else {
      // transfer to an existing shipment data
      path = '/transfer_to_shipment'
      additionalData = { target_shipment_number: targetShipmentNumber }
    }

    const data = {
      variant_id: variantId,
      quantity: quantity
    }

    $.ajax({
      type: 'PATCH',
      async: false,
      url: SpreeDash.url(
        SpreeDash.routes.shipments_api_v2 + '/' + originalShipmentNumber + path
      ),
      data: {
        shipment: $.extend(data, additionalData)
      },
      headers: SpreeDash.apiV2Authentication()
    })
      .fail(function (msg) {
        alert(msg.responseJSON.error)
      })
      .done(function (msg) {
        window.location.reload()
      })
  }
}

function cancelItemSplit (event) {
  event.preventDefault()
  const link = $(this)
  const prevRow = link.closest('tr').prev()
  link.closest('tr').remove()
  prevRow.find('a.edit-item').toggle()
  prevRow.find('a.split-item').toggle()
  prevRow.find('a.delete-item').toggle()
}

function addVariantFromStockLocation (event) {
  event.preventDefault()

  $('#stock_details').hide()

  const variantId = $('select.variant_autocomplete').val()
  const stockLocationId = $(this).data('stock-location-id')
  const quantity = $(
    "input.quantity[data-stock-location-id='" + stockLocationId + "']"
  ).val()

  const shipment = _.find(shipments, function (shipment) {
    return (
      shipment.stock_location_id === stockLocationId &&
      (shipment.state === 'ready' || shipment.state === 'pending')
    )
  })

  if (shipment === undefined) {
    $.ajax({
      type: 'POST',
      url: SpreeDash.routes.shipments_api_v2,
      data: {
        shipment: {
          order_id: order_id,
          variant_id: variantId,
          quantity: quantity,
          stock_location_id: stockLocationId
        }
      },
      headers: SpreeDash.apiV2Authentication()
    })
      .done(function (msg) {
        window.location.reload()
      })
      .fail(function (msg) {
        alert(msg.responseJSON.error)
      })
  } else {
    // add to existing shipment
    adjustShipmentItems(shipment.number, variantId, quantity)
  }
  return 1
}
