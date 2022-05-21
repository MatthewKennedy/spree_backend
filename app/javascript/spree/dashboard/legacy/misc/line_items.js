document.addEventListener('spree:load', function () {
  // handle edit click
  $('a.edit-line-item').click(toggleLineItemEdit)
  // handle cancel click
  $('a.cancel-line-item').click(toggleLineItemEdit)
  // handle save click
  $('a.save-line-item').click(function () {
    const save = $(this)
    const lineItemId = save.data('line-item-id')
    const quantity = parseInt(
      save
        .parents('tr')
        .find('input.line_item_quantity')
        .val()
    )
    toggleItemEdit()
    adjustLineItem(lineItemId, quantity)
  })
  // handle delete click
  $('a.delete-line-item').click(function () {
    if (confirm(SpreeDash.translations.are_you_sure_delete)) {
      const del = $(this)
      const lineItemId = del.data('line-item-id')
      toggleItemEdit()
      deleteLineItem(lineItemId)
    }
  })
})

function toggleLineItemEdit () {
  const link = $(this)
  const parent = link.parent()
  const tr = link.parents('tr')
  parent.find('a.edit-line-item').toggle()
  parent.find('a.cancel-line-item').toggle()
  parent.find('a.save-line-item').toggle()
  parent.find('a.delete-line-item').toggle()
  tr.find('td.line-item-qty-show').toggle()
  tr.find('td.line-item-qty-edit').toggle()
}

function lineItemURL (lineItemId) {
  return SpreeDash.routes.line_items_api_v2 + '/' + lineItemId
}

function adjustLineItem (lineItemId, quantity) {
  $.ajax({
    type: 'PATCH',
    url: SpreeDash.url(lineItemURL(lineItemId)),
    data: {
      line_item: {
        quantity
      }
    },
    headers: SpreeDash.apiV2Authentication()
  }).done(function () {
    window.SpreeDash.advanceOrder()
  })
}

function deleteLineItem (lineItemId) {
  $.ajax({
    type: 'DELETE',
    url: SpreeDash.url(lineItemURL(lineItemId)),
    headers: SpreeDash.apiV2Authentication()
  }).done(function () {
    $('#line-item-' + lineItemId).remove()
    if ($('.line-items tr.line-item').length === 0) {
      $('.line-items').remove()
    }
    window.SpreeDash.advanceOrder()
  })
}
